import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { createContainer } from 'meteor/react-meteor-data';

import { Polls } from '../api/polls.js';

import UserId from '../api/userid.js';

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

        // Give tasks a different className when they are checked off,
        // so that we can style them nicely in CSS
        const p = this.props.question;
        if(!p) {
            return (
                <div className="v-poll">

                </div>
            )
        }

        if(this.state.voted) {
            return (
              <div className="v-poll">
                  <h2>Kiitos äänestäsi!</h2>
                  <p>Aikaa seuraavaan kysymykseen: ei tietoo</p>
                  <Link to="/results">
                      Tulokset
                  </Link>
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

                    <img className="v-poll-logo" src="images/logo.png" />
                </footer>

            </div>
        );
    }
}

// Poll.propTypes = {
//
// };


export default createContainer(() => {
    Meteor.subscribe('votes');

    return {
        userId: UserId.get()
    };
}, Poll);

