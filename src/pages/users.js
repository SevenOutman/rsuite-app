import React, { Component } from 'react';
import Frame from '../components/Frame';
import UsersList from './users';

class UsersListView extends Component {

  render() {
    return (
      <Frame>
        {this.props.children || <UsersList />}
      </Frame>
    );
  }
}

module.exports = UsersListView;
