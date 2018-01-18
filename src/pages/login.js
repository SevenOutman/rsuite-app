import React, { Component } from 'react';
import Login from './login/index';

class LoginView extends Component {
  static layoutProps = {
    hideSidebar: true,
  };

  render() {
    return (
      this.props.children || <Login />
    );
  }
}

module.exports = LoginView;
