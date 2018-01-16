import React, { Component } from 'react';
import Frame from '../components/Frame';
import RepoList from './repos';

class ReposView extends Component {

  render() {
    return (
      <Frame>
        {this.props.children || <RepoList />}
      </Frame>
    );
  }
}

module.exports = ReposView;
