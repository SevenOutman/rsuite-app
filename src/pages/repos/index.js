import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { page } from '@rsuite/framework/view';
import * as actionCreators from '../../actions/repos';
import { RepoTable } from '../../components/Repos';
import PageTitleBar from '../../components/PageTitleBar';

class RepoList extends Component {
  render() {
    return (
      <div className="page-content">
        <PageTitleBar title="Repositories" />
        <RepoTable {...this.props} />
      </div>
    );
  }
}

function mapState2Props(state) {
  const currentStatus = state.store.repos;
  return {
    data: currentStatus.data,
    status: currentStatus.status,
  };
}

function mapDispatch2Props(dispatch) {
  const actions = bindActionCreators(actionCreators, dispatch);
  return {
    onFetchRepos: actions.fetchRepos,
  };
}

module.exports = page(RepoList, connect(mapState2Props, mapDispatch2Props));
