import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';

import { createContainer } from 'meteor/react-meteor-data';
import { Polls } from '../api/Polls.js';
import UserId from '../api/userid.js';

import PollsHelper from '../api/PollsHelper.js';

import Timer from './Timer.jsx';
import Waiting from './Waiting.jsx';

class Results extends Component {

    constructor(props) {
        super(props);
    }


    render() {

        let votesPerAnswer = {};

        const nextPollStarts = PollsHelper.getNextPollStartTime();

        if(this.props.question) {

            for(let i = 0; i < this.props.question.votes.length; i++) {
                const ans = this.props.question.votes[i];
                // console.log("Ans", ans);
                if(!votesPerAnswer[ans.answer]) {
                    votesPerAnswer[ans.answer] = 0;
                }

                votesPerAnswer[ans.answer]++;
            }

        }

        if(!this.props.question) {
            return (

                <Waiting />

            )
        }

        // console.log("Votes Per Answer: ", votesPerAnswer, this.props.question.votes);
        const totalVotes = this.props.question.votes.length;

        return (
            <div className="v-results">
                <img src="images/slogan.png" className="v-results-slogan" />
                <header className="v-results-header">
                    <h2 className="v-results-header-h2">Results for...</h2>
                    <h1 className="v-results-header-h1">{this.props.question.question}</h1>


                </header>
                <div className="v-results-answers">

                {this.props.question && this.props.question.answers.map((answer) => {
                    const votes = votesPerAnswer[answer.key];
                    const votePerc = Math.round((totalVotes > 0 && votes > 0 ? votes / totalVotes : 0) * 100);
                    const bgStyle = {
                        background: 'linear-gradient(to top, rgba(255,255,255, 0.75) ' + votePerc+'%, transparent ' + votePerc + '%)'
                    };
                    return (
                        <div key={answer.key} className="v-results-answer-column">
                            <div className="v-results-answer-column-value" style={bgStyle}>
                                {votesPerAnswer[answer.key] &&
                                    <p className="v-results-answer-column-value-text">{votesPerAnswer[answer.key]}</p>
                                }
                            </div>
                            <h3 className="v-results-answer-column-label">{ answer.text }</h3>
                        </div>
                    );
                    }
                )}
                </div>

                <footer className="v-results-footer">
                </footer>

                <div className="v-results-footer-poll">
                    <Link to="/">
                        <button className="v-results-footer-poll-img c-button">
                            <img src="images/poll.svg" />
                        </button>
                    </Link>
                </div>

                <div className="v-results-footer-timer">
                    <Timer type="countdown" time={nextPollStarts} key={this.props.question.key} />
                </div>



                <div className="s-logo-container">
                    <img className="s-logo-img" src="images/logo.png" />
                </div>
            </div>
        )

    }
}

export default createContainer(() => {

    return {
        userId: UserId.get()
    };
}, Results);

