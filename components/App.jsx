import React, { Component } from 'react';
import update from 'immutability-helper';
import { socketEmitter, socketListener } from '../socketio';
import { Input, Log, Rooms, Users } from './Chat';

const INPUT_HEIGHT = 3;

export default class App extends Component {
  state = {
    connected: false,
    height: screen.height,
    width: screen.width,
    messages: [],
    room: null,
    user: null,
    rooms: [],
    users: [],
  };

  componentDidMount() {
    screen.on('resize', () => {
      const { height, width } = screen;
      this.setState({ height, width });
    });
    socketListener(this.updateState);
  }

  updateState = mutation => this.setState(update(this.state, mutation));
  onSubmit = value => {
    if (value.indexOf('@') === 0) {
      const userName = value.substr(1, value.indexOf(' ')).trim();
      const message = value.substr(value.indexOf(' '), value.length).trim();

      socketEmitter('pm', { userName, message });
    } else
    if (value.indexOf('/login') === 0) {
      const [name, password] = value.slice('/login'.length).trim().split(' ');
      socketEmitter('login', { name, password });
    } else
    if (value.indexOf('/register') === 0) {
      const [name, password] = value.slice('/register'.length).trim().split(' ');
      socketEmitter('register', { name, password });
    } else
    if (value.indexOf('/name') === 0) {
      socketEmitter('name', { name: value.slice('/name'.length).trim() });
    } else
    if (value.indexOf('/room') === 0) {
      socketEmitter('room', { room: value.slice('/room'.length).trim() });
    }
    else {
      socketEmitter('message', { message: value });
    }
  };
  onRoomSelect = room =>socketEmitter('room', { room });
  onUserSelect = userName => socketEmitter('pm', { userName, message: `Pozdrawiam` });

  render() {
    const { connected, height, width, messages, user, room, users, rooms } = this.state;
    const rootProps = { width, height };
    const wrapperProps = {
      width,
      height: height - INPUT_HEIGHT,
    };
    const logProps = {
      messages,
      label: `${user}@${room}`,
    };
    const roomsProps = {
      selected: room,
      items: rooms,
      onSelect: this.onRoomSelect,
    };
    const usersProps = {
      selected: user,
      items: users,
      onSelect: this.onUserSelect,
    };
    const inputProps = {
      onSubmit: this.onSubmit,
      position: {
        height: INPUT_HEIGHT,
        top: height - INPUT_HEIGHT,
      }
    };

    return connected ? (
      <box {...rootProps}>
        <box {...wrapperProps}>
          <Log {...logProps} />
          <Rooms {...roomsProps} />
          <Users {...usersProps} />
        </box>
        <Input {...inputProps}/>
      </box>
    ) : (
      <box>Connecting...</box>
    );
  }
}
