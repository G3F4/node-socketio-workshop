import React, { Component } from 'react';
import io from 'socket.io-client';
import ChatLog from './ChatLog';
import RoomsList from './RoomsList';
import Input from './Input';

const socket = io('http://localhost:30001'); // now the client connects to the server
const INPUT_HEIGHT = 3;
export default class App extends Component {
  state = {
    height: screen.height,
    width: screen.width,
    connected: false,
    messages: [],
    rooms: [],
    room: null
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
    socket.on('room', (room) => {
      screen.debug(['socket.on.room'], room);
      this.setState({ room });
    });
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
  }

  onSubmit(value, node) {
    screen.debug(['App.onSubmit'], value, node);
    if (value.indexOf('@') === 0) {
      socket.emit('pm', value.slice(1));
    } else
    if (value.indexOf('/') === 0) {
      socket.emit('command', value.slice(1));
    }
    else {
      console.log(['emit.message'], value);
      socket.emit('message', value);
    }
  }

  onRoomSelect(room) {
    screen.debug(['App.onRoomSelect'], room);
    socket.emit('room', room);
  }

  render() {
    const { connected, messages, room, rooms, height, width } = this.state;
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
      active: room,
      items: rooms,
      position: {
        top: 0,
        left: '70%',
        height: '100%',
        width: '30%',
      },
      onSelect: this.onRoomSelect
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
        </box>
        <Input {...input}/>
      </box>
    ) : (
      <box>Connecting...</box>
    );
  }
}
