import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { page } from '@rsuite/framework/view';
import * as actionCreators from '../../actions/auth';
import LoginForm from '../../components/Login';

class LoginPage extends Component {
  render() {
    return (
      <div className="login">
        <LoginForm {...this.props} />
      </div>
    );
  }
}

function mapState2Props(state) {
  const currentStatus = state.store.login;
  return {
    status: currentStatus.status,
  };
}

function mapDispatch2Props(dispatch) {
  const actions = bindActionCreators(actionCreators, dispatch);
  return {
    onLogin: actions.login,
  };
}

module.exports = page(LoginPage, connect(mapState2Props, mapDispatch2Props));
