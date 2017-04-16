import React, { Component, PropTypes } from 'react';

export default class UsersList extends Component {
  render() {
    const elementProps = {
      label: 'USERS',
      shadow: true,
      draggable: true,
      scrollable: true,
      alwaysScroll: true,
      mouse: true,
      keys: true,
      interactive: true,
      invertSelected: false,
      scrollbar: {
        bg: 'red',
        fg: 'blue'
      },
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
        screen.debug(['UsersList.onSelect'], node.content);
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
