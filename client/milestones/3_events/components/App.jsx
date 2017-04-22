import React, { Component } from 'react';
import update from 'immutability-helper';
import { socketEmitter, socketListener } from '../socketio';
import { Input, Log } from './Chat';

const INPUT_HEIGHT = 3;

export default class App extends Component {
  state = {
    connected: false,
    height: screen.height,
    width: screen.width,
    messages: [],
  };

  componentDidMount() {
    screen.on('resize', () => {
      const { height, width } = screen;
      this.setState({ height, width });
    });
    socketListener(this.updateState);
  }

  updateState = mutation => this.setState(update(this.state, mutation));
  onSubmit = message => socketEmitter('message', { message });

  render() {
    const { connected, height, width, messages } = this.state;
    const rootProps = { width, height };
    const wrapperProps = {
      width,
      height: height - INPUT_HEIGHT,
    };
    const logProps = {
      messages,
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
        </box>
        <Input {...inputProps}/>
      </box>
    ) : (
      <box>Connecting...</box>
    );
  }
}
