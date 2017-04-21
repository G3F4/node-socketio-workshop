# warsawjs-workshop-5-chat
WebSocket based, NodeJS chat application for the purposes of 5th edition of WarsawJS Workshops


Kolejne milestony:

[Inicjalizacja repozytorium i powstawienie serwera](https://review.gerrithub.io/358093)

[Dodanie osbługi socket.io](https://review.gerrithub.io/358096)

[Zdarzenia czatu](https://review.gerrithub.io/358097)

[Utrzymywanie danych](https://review.gerrithub.io/358098)

[Logowanie](https://review.gerrithub.io/358100)

[Autoryzacja](https://review.gerrithub.io/358101)


# socket.io workshop FAQ

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


sending to all clients except sender

    socket.broadcast.emit('broadcast', 'hello friends!');


sending to all clients in 'game' room except sender

    socket.to('game').emit('nice game', "let's play a game");


sending to all clients in 'game1' and/or in 'game2' room, except sender

    socket.to('game1').to('game2').emit('nice game', "let's play a game (too)");


sending to all clients in 'game' room, including sender

    io.in('game').emit('big-announcement', 'the game will start soon');


sending to all clients in namespace 'myNamespace', including sender

    io.of('myNamespace').emit('bigger-announcement', 'the tournament will start soon');


sending to individual socketid (private message)

    socket.to(<socketid>).emit('hey', 'I just met you');


sending with acknowledgement

    socket.emit('question', 'do you think so?', function (answer) {});


sending without compression

    socket.compress(false).emit('uncompressed', "that's rough");


sending a message that might be dropped if the client is not ready to receive messages

    socket.volatile.emit('maybe', 'do you really need it?');


sending to all clients on this node (when using multiple nodes)

    io.local.emit('hi', 'my lovely babies');
