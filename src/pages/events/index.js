import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/events';
import EventTable from '../../components/Events/EventTable';
import PageTitleBar from '../../components/PageTitleBar';

class EventListView extends Component {
  render() {
    return (
      <div className="page-content">
        <PageTitleBar title="Events" />
        <EventTable {...this.props} />
      </div>
    );
  }
}

function mapState2Props(state) {
  const currentStatus = state.store.events;
  return {
    data: currentStatus.data,
    status: currentStatus.status,
  };
}

function mapDispatch2Props(dispatch) {
  const actions = bindActionCreators(actionCreators, dispatch);
  return {
    onFetchEvents: actions.fetchEvents,
  };
}

module.exports = connect(mapState2Props, mapDispatch2Props)(EventListView);
