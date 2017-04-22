import React, { Component } from 'react';
import List from '../List';

export default class Rooms extends Component {
  render() {
    const props = {
      label: 'ROOMS',
      position: {
        top: 0,
        left: '70%',
        height: '50%',
        width: '30%',
      },
      ...this.props,
    };

    return <List {...props} />;
  }
}
