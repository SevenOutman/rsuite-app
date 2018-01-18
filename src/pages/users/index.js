import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { page } from '@rsuite/framework/view';
import * as actionCreators from '../../actions/users';
import { UserTable } from '../../components/Users';
import PageTitleBar from '../../components/PageTitleBar';

class UserListView extends Component {
  render() {
    return (
      <div className="page-content">
        <PageTitleBar title="userList" />
        <UserTable {...this.props} />
      </div>
    );
  }
}

function mapState2Props(state) {
  const currentStatus = state.store.users;
  return {
    data: currentStatus.data,
    page: currentStatus.page,
    status: currentStatus.status,
  };
}

function mapDispatch2Props(dispatch) {
  const actions = bindActionCreators(actionCreators, dispatch);
  return {
    onFetchUsers: actions.fetchUsers,
  };
}

module.exports = page(UserListView, connect(mapState2Props, mapDispatch2Props));
