import React, { Component } from 'react';

class Home extends Component {
  static redirect = 'events';

  render() {
    return (
      <div className="page-content">
        Home
      </div>
    );
  }
}

module.exports = Home;
