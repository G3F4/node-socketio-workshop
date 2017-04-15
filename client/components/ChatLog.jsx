import React, { Component, PropTypes } from 'react';

export default class ChatLog extends Component {
  render() {
    const { messages, ...props } = this.props;
    const logProps = {
      ...props,
      label: 'CHAT',
      mouse: true,
      keys: true,
      draggable: true,
      scrollable: true,
      alwaysScroll: true,
      border: {
        type: 'line',
      },
      scrollbar: {
        style: {
          bg: 'blue',
          fg: 'lightblack'
        },
        track: {
          bg: 'lightyellow',
          fg: 'brightblue'
        },
      },
      style: {
        bg: '#EEEEEE',
        fg: '#000000',
        focus: {
          bg: '#CCCCCC',
        },
      },
    };

    return (
      <log {...logProps}>
        {messages.join('\n')}
      </log>
    );
  }
}
