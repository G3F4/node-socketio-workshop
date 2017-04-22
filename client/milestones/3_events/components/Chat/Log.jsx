import React, { Component } from 'react';

export default class Log extends Component {
  render() {
    const props = {
      draggable: true,
      mouse: true,
      scrollable: true,
      alwaysScroll: true,
      border: {
        type: 'line',
      },
      position: {
        top: 0,
        left: 0,
        height: '100%',
        width: '70%',
      },
      scrollbar: {
        style: {
          bg: '#0F0',
        },
        track: {
          bg: '#00F',
        },
      },
      ...this.props,
    };

    return (
      <log {...props}>
        {this.props.messages.join('\n')}
      </log>
    );
  }
}
