import React, { Component } from 'react';
import io from 'socket.io-client';
import ChatLog from './ChatLog';
import RoomsList from './RoomsList';
import UsersList from './UsersList';
import Input from './Input';

const socket = io('http://localhost:30001'); // now the client connects to the server
const INPUT_HEIGHT = 3;
let token = null;

export default class App extends Component {
  state = {
    height: screen.height,
    width: screen.width,
    connected: false,
    messages: [],
    rooms: [],
    room: null,
    user: null,
    users: [],
  };

  componentDidMount() {
    screen.debug(['App.componentDidMount']);
    screen.on('resize', () => {
      screen.debug(['screen.resize']);
      const { height, width } = screen;
      this.setState({ height, width });
    });
    socket.on('connect', () => {
      screen.debug(['socket.on.connect']);
      this.setState({ connected: true })
    });
    socket.on('user', user => this.setState({ user }));
    socket.on('room', room => this.setState({ room }));
    socket.on('rooms', (rooms) => {
      screen.debug(['socket.on.rooms'], rooms);
      this.setState({ rooms });
    });
    socket.on('pm', (msg) => {
      screen.debug(['socket.on.pm'], msg);
      this.setState({ messages: [...this.state.messages, msg] });
    });
    socket.on('message', (msg) => {
      screen.debug(['socket.on.msg'], msg);
      this.setState({ messages: [...this.state.messages, msg] });
    });
    socket.on('users', (users) => {
      screen.debug(['socket.on.users'], users);
      this.setState({ users });
    });
    socket.on('logged', (auth) => {
      token = auth;
      screen.debug(['socket.on.logged'], auth);
    });

    socket.on('errors', (errors) => {
      screen.debug(['socket.on.errors'], errors);
      this.setState({ messages: [...this.state.messages, errors] });
    });
  }

  onSubmit(value, node) {
    screen.debug(['App.onSubmit'], value, node);
    if (value.indexOf('@') === 0) {
      const userName = value.substr(1, value.indexOf(' ')).trim();
      const message = value.substr(value.indexOf(' '), value.length).trim();

      socket.emit('pm', { token, userName, message });
    } else
    if (value.indexOf('/login') === 0) {
      const [name, password] = value.slice('/login'.length).trim().split(' ');
      socket.emit('login', { name, password });
    } else
    if (value.indexOf('/register') === 0) {
      const [name, password] = value.slice('/register'.length).trim().split(' ');
      socket.emit('register', { name, password });
    } else
    if (value.indexOf('/name') === 0) {
      socket.emit('name', {
        token,
        name: value.slice('/name'.length).trim(),
      });
    } else
    if (value.indexOf('/room') === 0) {
      socket.emit('room', {
        token,
        room: value.slice('/room'.length).trim(),
      });
    }
    else {
      console.log(['emit.message'], value);
      socket.emit('message', {
        message: value
      });
    }
  }

  onRoomSelect(room) {
    screen.debug(['App.onRoomSelect'], room);
    socket.emit('room', { token, room });
  }

  onUserSelect(userName) {
    screen.debug(['App.onUserSelect'], userName);
    socket.emit('pm', { token, userName, message: `Pozdrawiam` });
  }

  render() {
    const { connected, user, users, messages, room, rooms, height, width } = this.state;
    const root = {
      width,
      height,
      ref: 'el',
    };
    const wrapper = {
      width,
      height: height - INPUT_HEIGHT,
    };
    const chat = {
      messages,
      position: {
        top: 0,
        left: 0,
        height: '100%',
        width: '70%',
      }
    };
    const roomsProps = {
      selected: room,
      items: rooms,
      position: {
        top: 0,
        left: '70%',
        height: '50%',
        width: '30%',
      },
      onSelect: this.onRoomSelect
    };
    const usersProps = {
      selected: user,
      items: users,
      position: {
        top: '50%',
        left: '70%',
        height: '50%',
        width: '30%',
      },
      onSelect: this.onUserSelect
    };
    const input = {
      onSubmit: this.onSubmit,
      height: INPUT_HEIGHT,
      top: height - INPUT_HEIGHT,
    };

    return connected ? (
      <box {...root}>
        <box {...wrapper}>
          <ChatLog {...chat} />
          <RoomsList {...roomsProps} />
          <UsersList {...usersProps} />
        </box>
        <Input {...input}/>
      </box>
    ) : (
      <box>Connecting...</box>
    );
  }
}
