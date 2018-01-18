import React, { Component } from 'react';
import RepoList from './repos/index';

class ReposView extends Component {
  render() {
    return (
      this.props.children || <RepoList />
    );
  }
}

module.exports = ReposView;
