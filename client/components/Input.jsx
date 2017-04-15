import React, { Component, PropTypes } from 'react';

export default class Input extends Component {
  render() {
    const elementProps = {
      draggable: true,
      scrollable: true,
      alwaysScroll: true,
      mouse: true,
      keys: true,
      inputOnFocus: true,
      border: {
        type: 'line',
      },
      style: {
        fg: 'lightcyan',
        bg: 'brightred',
        focus: {
          bg: 'brightblue',
          fg: 'brightblack'
        },
        hover: {
          bg: 'brightwhite',
          fg: 'brightmagent'
        },
      },
      ...this.props,
      // cannot be overridden
      ref: 'input',
      onSubmit: () => {
        screen.debug(['Input.onSubmit'], this.refs.input.value);
        if (this.props.onSubmit) {
          this.props.onSubmit(this.refs.input.value);
        }
        this.refs.input.clearValue();
        this.refs.input.focus();
      },
    };

    return (
      <textbox {...elementProps} />
    );
  }
}
