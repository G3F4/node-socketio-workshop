import React, { Component } from 'react';
import List from '../List';

export default class Users extends Component {
  render() {
    const props = {
      label: 'USERS',
      position: {
        top: '50%',
        left: '70%',
        height: '50%',
        width: '30%',
      },
      ...this.props,
    };

    return <List {...props} />;
  }
}
