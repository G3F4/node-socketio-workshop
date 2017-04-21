const jsonwebtoken = require('jsonwebtoken');
const { addUser, getUser } = require('./db/api');
const { SECRET } = require('./constans');

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
  try {
    const user = await getUser({ name, password });
    if (!user) {
      return null;
    }

    const token = await signUser({ name });
    console.log(['login.token'], token);

    return token;
  }

  catch (error) {
    console.log(['login.error'], error);
  }
};
const register = async ({ name, password }) => {
  console.log(['register'], { name, password });
  try {
    const user = await addUser({ name, password });
    const token = user && await signUser({ name });
    console.log(['register.token'], token);
    return token;
  }

  catch (error) {
    console.log(['register.error'], error);
  }
};

const verifyToken = (next, onFail) => async (...args) => {
  const [data] = args;
  const isVerified = await data.token && verify(data.token);
  if (isVerified) {
    return next(...args);
  }

  onFail();
  return false;
};

module.exports = {
  login,
  register,
  verify: verifyUser,
  verifyToken,
};
