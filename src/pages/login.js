import React, { Component } from 'react';
import Frame from '../components/Frame';
import Login from './login';

class LoginView extends Component {
  render() {
    return (
      <Frame
        hideSidebar
      >
        {this.props.children || <Login />}
      </Frame>
    );
  }
}
module.exports = LoginView;
