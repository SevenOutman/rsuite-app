import React, { Component } from 'react';
import Frame from '../components/Frame';
import EventList from './events';


class EventListView extends Component {
  render() {
    return (
      <Frame>
        {this.props.children || <EventList />}
      </Frame>
    );
  }
}

module.exports = EventListView;
