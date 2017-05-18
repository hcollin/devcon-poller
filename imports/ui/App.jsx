import React, { Component } from 'react';



import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Polls } from '../api/polls.js';
import { LocaIds } from '../api/localids.js';

import UserId from '../api/userid.js';

import Poll from './Poll.jsx';
import Results from './Results.jsx';

// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);

    // create a new user id if one does not exist yet!
    UserId.create();

    // if(!localStorage.getItem('localid')) {
    //   console.log("Create local id");
    //   Meteor.call('localids.insert');
    // }
  }

  render() {
    const targetPoll = this.props.polls[0];
    return (
        <Router>
          <div className="container">
              <Route exact path="/" render={() => (
                  <Poll question={targetPoll} />
              )} />
              <Route exact path="/results" render={ () => (
                  <Results question={targetPoll} />
              )} />

          </div>
        </Router>
    )
  }
}

export default createContainer(() => {
  Meteor.subscribe('polls');

  return {
    polls: Polls.find({}, { sort: { createdAt: -1 } }).fetch()
  };
}, App);
