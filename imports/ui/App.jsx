import React, { Component } from 'react';



import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Polls } from '../api/Polls.js';
import { MasterState } from '../api/MasterState.js';

import UserId from '../api/userid.js';
import PollsHelper from '../api/PollsHelper.js';

import Waiting from './Waiting.jsx';
import Poll from './Poll.jsx';
import Results from './Results.jsx';
import FinalResults from './FinalResults.jsx';
import Admin from './Admin.jsx';

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
    const notStarted = PollsHelper.isWaiting();

    // console.log("targetPoll  : ", targetPoll);

    return (
        <Router>
          <div className="container">
              <Switch>
              <Route exact path="/" render={() => {
                  if(notStarted) {
                      return (
                          <Waiting />
                      )
                  }
                  if(done) {
                      return (
                          <FinalResults />
                      )
                  }

                  return (
                      <Poll question={targetPoll} />
                  );
              }} />
              <Route exact path="/results" render={ () => {

                  if(notStarted) {
                      return (
                          <Waiting />
                      )
                  }

                  if(done) {
                      return (
                          <FinalResults />
                      )
                  }
                  return (
                    <Results question={targetPoll} />
                  );
              }} />
              <Route exact path="/finalresults" render={ () => (
                  <FinalResults />
              )} />
                  <Route exact path="/admin" component={Admin} />
              </Switch>
          </div>
        </Router>
    );
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
