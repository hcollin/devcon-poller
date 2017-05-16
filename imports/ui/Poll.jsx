import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import { createContainer } from 'meteor/react-meteor-data';

import { Votes } from '../api/votes.js';

class Poll extends Component {

    constructor(props) {
        super(props);

        console.log("Poll.props.hasVoted?", this.props.hasVoted);
        console.log("Poll.props?", this.props);

        this.state = {
            voted: false
        };

        this.handleVote = this.handleVote.bind(this);
    }

    handleVote(e) {
        console.log("Vote!", e.target.value);
        Meteor.call('votes.vote', this.props.question.name, e.target.value, this.props.localId, (err, res) => {
            console.log("Voted!");
            this.setState({voted: true});
        });
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
        return (
            <div className="v-poll">
                <img className="v-poll-slogan" src="images/slogan.png" />

                <div className="v-poll-question">
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

    const lid = localStorage.getItem('localid');

    return {
        hasVoted: Votes.find({"votes.voter": lid}).fetch(),
        localId: lid
    };
}, Poll);

