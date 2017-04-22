import React, { Component } from 'react';

export default class Input extends Component {
  componentDidMount() {
    this.refs.el.focus();
  }

  render() {
    const props = {
      draggable: true,
      scrollable: true,
      alwaysScroll: true,
      mouse: true,
      keys: true,
      inputOnFocus: true,
      border: {
        type: 'line',
      },
      ...this.props,
      // cannot be overridden
      ref: 'el',
      onSubmit: () => {
        this.props.onSubmit(this.refs.el.value);
        this.refs.el.clearValue();
        this.refs.el.focus();
      },
    };

    return <textbox {...props} />;
  }
}
