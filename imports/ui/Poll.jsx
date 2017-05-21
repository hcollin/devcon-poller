import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { createContainer } from 'meteor/react-meteor-data';

import { Polls } from '../api/Polls.js';

import UserId from '../api/userid.js';
import PollsHelper from '../api/PollsHelper.js';

import Waiting from './Waiting.jsx';
import Timer from './Timer.jsx';

class Poll extends Component {

    constructor(props) {
        super(props);

        this.state = {
            voted: false
        };

        this.handleVote = this.handleVote.bind(this);
        this.debugVotes = this.debugVotes.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.question.key)  {
            if(UserId.hasVotedFor(nextProps.question.key)) {
                this.setState({
                    voted: true
                });
            }
        }


    }

    handleVote(e) {

        Meteor.call('polls.vote', this.props.question.key, e.target.value, this.props.userId, (err, res) => {
            // Nothing to do here!
        });


    }

    debugVotes(e) {
        console.debug("Current Polls: ", Polls.find().fetch());
    }

    render() {


        const hasVoted = UserId.hasVotedFor(this.props.question.key);
        // Give tasks a different className when they are checked off,
        // so that we can style them nicely in CSS
        const p = this.props.question;
        if(!p) {

            return (
                <div className="container">
                    <Waiting />
                </div>
            );
        }

        if(hasVoted) {
            //TODO: Make a counter to the next question and show it!

            const nextPollStarts = PollsHelper.getNextPollStartTime();

            return (
              <div className="v-poll">
                  <h2 className="v-poll-thank-you">Kiitos!</h2>
                  <div className="v-poll-timer-next">
                      <Timer type="countdown"  time={nextPollStarts} />
                  </div>

                  <Link to="/results">
                      <button className="v-poll-link-results c-button ">
                        <img src="images/results.svg"  />
                      </button>
                  </Link>

                  <div className="s-logo-container">
                      <img className="s-logo-img" src="images/logo.png" />
                  </div>
              </div>
            );
        }

        return (
            <div className="v-poll">
                <img className="v-poll-slogan" src="images/slogan.png" />

                <div className="v-poll-question" onClick={this.debugVotes}>
                    <h1 className="v-poll-question-h1">{p.question}</h1>
                </div>

                <div className="v-poll-answers">
                {p.answers.map((ans) =>
                    <button className="v-poll-button-answer" key={ans.key} value={ans.key} onClick={this.handleVote}>
                        {ans.text}
                    </button>
                )}
                </div>

                <footer className="v-poll-footer">
                    <div className="s-logo-container">
                        <img className="s-logo-img" src="images/logo.png" />
                    </div>
                </footer>

            </div>
        );
    }
}

// Poll.propTypes = {
//
// };


export default createContainer(() => {


    return {
        userId: UserId.get()
    };
}, Poll);

