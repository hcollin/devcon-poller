import React, { Component } from 'react';



import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Polls } from '../api/polls.js';
import { MasterState } from '../api/MasterState.js';

import UserId from '../api/userid.js';
import PollsHelper from '../api/PollsHelper.js';

import Poll from './Poll.jsx';
import Results from './Results.jsx';
import FinalResults from './FinalResults.jsx';

// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);
    // create a new user id if one does not exist yet!
    UserId.create();
  }

  render() {
    // const targetPoll = this.props.polls[0];
    const targetPoll = PollsHelper.getCurrent();

    const done = PollsHelper.isDone();

    if(done) {
        return (
            <Router>
                <div className="container">
                    <FinalResults />
                </div>
            </Router>
        )
    }

    console.log("targetPoll  : ", targetPoll);

    return (
        <Router>
          <div className="container">
              <Route exact path="/" render={() => (
                  <Poll question={targetPoll} />
              )} />
              <Route exact path="/results" render={ () => (
                  <Results question={targetPoll} />
              )} />
              <Route exact path="/finalresults" render={ () => (
                  <FinalResults />
              )} />

          </div>
        </Router>
    )
  }
}

export default createContainer(() => {
  Meteor.subscribe('polls');
  Meteor.subscribe('masterstate');

  return {
      polls: Polls.find({}, { sort: { order: 1 } }).fetch(),
      masterState: MasterState.find().fetch()
  };
}, App);
