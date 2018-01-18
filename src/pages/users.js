import React, { Component } from 'react';
import UserList from './users/index';


class UsersView extends Component {
  render() {
    return (
      this.props.children || <UserList />
    );
  }
}

module.exports = UsersView;
