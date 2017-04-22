# warsawjs-workshop-5-chat

## Warsztat
Repozytorium szkoleniowe. Zawiera zbiór branchy, na których został przedstawiony proces budowania aplikacji czatu w opraciu o web sockety w środowisku node.
Aby rozpocząć wybierz kolejność implementacji:
- serwer
- client

Po wybraniu przejdź odpowiednio do brancha server-milestone#0-initial dla serwera
albo client-milestone#0-initial
i zacznij realizować cele przedstawione w README. Każdy branch posiada także rozwiązanie referencyjne.

## Testowanie serwera czatu

Aby uruchomić serwer czatu należy po sklonowaniu repozytorium zainstalować niezbędne zależności dla serwera:

    $ npm i

Następnie uruchomić serwer poprzez wywołanie skrypty npm:

    $ npm start

Na koniec przejść do przeglądarki i odpalić adres localhost:30001

## Testowanie klienta

Aby uruchomić klienta terminalowego należy po sklonowaniu repozytorium przejść do folderu client

    $ cd client

Następnie zainstalować wymagane zależności:

    $ npm i

Odpalić klienta z połączeniem do serwera lokalnego:

    $ npm start

Albo odpalić do serwera zdalnego:

    $ npm run connect:heroku
    

# workshop FAQ

## biblioteki

prod
[express](https://github.com/expressjs/express)
[socket.io](https://github.com/socketio/socket.io)
[socket.io-client](https://github.com/socketio/socket.io-client)
[blessed](https://github.com/chjj/blessed)
[react-blessed](https://github.com/Yomguithereal/react-blessed)
[bcrypt](https://github.com/kelektiv/node.bcrypt.js)
[jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
dev
[nodemon](https://github.com/remy/nodemon)

## socket.io

Dołączenie do pokoju

    socket.join(ROOM);


Opuszczenie pokoju

    socket.leave(ROOM);


Emitowanie do wysyłającego

    socket.emit(EVENT, MESSAGE);


Emitowanie do wszystkich w pokoju

    socket.broadcast.on(ROOM).emit(EVENT, MESSAGE);


Emitowanie do wszystkich w pokoju z wyjątkiem wysyłającego

    socket.broadcast.to(ROOM).emit(EVENT, MESSAGE);


do wszystkich poza wysyłającym

    socket.broadcast.emit(EVENT, MESSAGE);


do wszystkich użytkowników poza wysyłającym znajdujących się w konkretnym pokoju

    socket.to(ROOM).emit(EVENT, MESSAGE);


do więcej niż jednego pokoju

    socket.to(ROOM1).to(ROOM2).emit(EVENT, MESSAGE);


do konkretnego użytkownika w oparciu o id jego socketa

    socket.to(SOCKET.ID).emit(EVENT, MESSAGE);


do wszystkich w pokoju

    io.in(ROOM).emit(EVENT, MESSAGE);

do wszystkich

    io.local.emit(EVENT, MESSAGE);
