import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Polls } from '../api/polls.js';
import { LocaIds } from '../api/localids.js';

import Poll from './Poll.jsx';
import Results from './Results.jsx';

// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      view: "poll"
    };

    if(!localStorage.getItem('localid')) {
      Meteor.call('localids.insert');
    }


    this.handleViewChange = this.handleViewChange.bind(this);

  }

  handleViewChange(newView) {
    this.setState({
        view: newView
    });
  }

  render() {
    const targetPoll = this.props.polls[0];

    if(this.state.view === "poll") {
        return (
            <div className="container">
              <Poll question={targetPoll} onChangeView={this.handleViewChange}></Poll>
            </div>
        );
    }

    return (
        <div className="container">
          <Results question={targetPoll} onChangeView={this.handleViewChange}></Results>
        </div>
    )

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
