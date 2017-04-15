import React, { Component, PropTypes } from 'react';

export default class RoomsList extends Component {
  render() {
    const elementProps = {
      label: 'ROOMS',
      shadow: true,
      draggable: true,
      scrollable: true,
      alwaysScroll: true,
      mouse: true,
      keys: true,
      interactive: true,
      invertSelected: false,
      border: {
        type: 'line',
      },
      style: {
        fg: 'lightcyan',
        bg: 'brightred',
        selected: {
          bg: 'red',
          fg: 'brightcyan'
        },
        item: {
          bg: 'brightgreen',
          fg: 'brightyellow',
          hover: {
            bg: 'brightwhite',
            fg: 'brightmagent'
          },
          focus: {
            bg: 'brightblue',
            fg: 'brightblack'
          },
        },
      },
      ...this.props,
      // cannot be overridden
      onSelect: (node) => {
        screen.debug(['RoomsList.onSelect'], node.content);
        if (this.props.onSelect) {
          this.props.onSelect(node.content);
        }
      },
    };

    return (
      <list {...elementProps} />
    );
  }
}
