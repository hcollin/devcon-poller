import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Polls } from '../api/polls.js';
import { LocaIds } from '../api/localids.js';

import Poll from './Poll.jsx';

// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);

    if(!localStorage.getItem('localid')) {
      Meteor.call('localids.insert');
    }

  }

  render() {
    const targetPoll = this.props.polls[0];
    return (
      <div className="container">
        <Poll question={targetPoll}></Poll>
      </div>
    );
  }
}

App.propTypes = {
  polls: PropTypes.array.isRequired,
};

export default createContainer(() => {
  Meteor.subscribe('polls');

  return {
    polls: Polls.find({}, { sort: { createdAt: -1 } }).fetch()
  };
}, App);
