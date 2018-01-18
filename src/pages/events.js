import React, { Component } from 'react';
import EventList from './events/index';

class EventsView extends Component {
  render() {
    return (
      this.props.children || <EventList />
    );
  }
}

module.exports = EventsView;
