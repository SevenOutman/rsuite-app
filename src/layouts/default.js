import React, { Component } from 'react';
import Frame from '../components/Frame';

class DefaultLayout extends Component {
  render() {
    return (
      <Frame>
        {this.props.children}
      </Frame>
    );
  }
}

module.exports = DefaultLayout;
