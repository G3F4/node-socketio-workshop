const { compare, hash } = require('bcrypt-as-promised');
const jsonwebtoken = require('jsonwebtoken');
const { addUser, getUser } = require('./db/api');
const { SECRET, DEFAULT_SALT } = require('./constans');

// wrap jsonwebtoken methods to return Promise
const sign = (claims, key, options) => {
  return new Promise(( resolve, reject ) => {
    jsonwebtoken.sign(claims, key, options, (error, token) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    })
  })
};
// złamać na trzy strzałki
const verify = (token, key, options) => {
  return new Promise(( resolve, reject ) => {
    jsonwebtoken.verify(token, key, options, (error, verified) => {
      if (error) {
        reject(error);
      } else {
        resolve(verified);
      }
    })
  })
};

// authentication
const signUser = async claims => await sign(claims, SECRET);
const verifyUser = async token => await verify(token, SECRET);

const login = async ({ name, password }) => {
  const user = await getUser(name);
  if (!user) {
    return null;
  }

  try {
    console.log(['login.compare'], password, user.passwordHash);
    const isPasswordCorrect = await compare(password, user.passwordHash);
    console.log(['login.isPasswordCorrect'], isPasswordCorrect);

    if(isPasswordCorrect) {
      const token = await signUser({ name });
      console.log(['login.token'], token);

      return token;
    }
  }

  catch (error) {
    console.log(['login.error'], error);
  }

  return null;
};
const register = async ({ name, password }) => {
  console.log(['register'], { name, password });
  try {
    const passwordHash = await hash(password, DEFAULT_SALT);
    const user = await addUser({ name, passwordHash });
    const token = user && await signUser({ name });
    console.log(['register.token'], token);
    return token;
  }

  catch (error) {
    console.log(['register.error'], error);
  }
};

module.exports = {
  login,
  register,
  verifyUser,
};
