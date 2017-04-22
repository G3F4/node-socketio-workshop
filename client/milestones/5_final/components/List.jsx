import React, { Component } from 'react';

export default class List extends Component {
  render() {
    const props = {
      alwaysScroll: true,
      draggable: true,
      scrollable: true,
      mouse: true,
      border: {
        type: 'line',
      },
      scrollbar: {
        style: {
          bg: '#0F0',
        },
        track: {
          bg: '#00F',
        },
      },
      style: {
        item: {
          hover: {
            bg: '#FFF',
            fg: '#000'
          },
        },
      },
      ...this.props,
      onSelect: node => this.props.onSelect(node.content),
    };

    return <list {...props} />;
  }
}
