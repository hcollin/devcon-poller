import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import { createContainer } from 'meteor/react-meteor-data';
import { Polls } from '../api/Polls.js';
import UserId from '../api/userid.js';

class FinalResultsQuestion extends Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false
        };

        this.handleChangeListSize = this.handleChangeListSize.bind(this);

    }

    handleChangeListSize() {
        this.setState((cs, p) => ({
            open: !cs.open
        }));
    }

    render() {

        const poll = this.props.poll;
        if(!poll) {
            return (
                <div>

                </div>
            )
        }

        let votesPerAnswer = [];
        const totalAnswers = poll.votes.length;

        for(let i = 0; i < poll.answers.length; i++) {
            const answer = poll.answers[i];
            let ansres = {
                answer: answer.text,
                key: answer.key,
                votes: 0
            };

            for(let v = 0; v < poll.votes.length; v++) {
                const vote = poll.votes[v];
                if(vote.answer === answer.key) {
                    ansres.votes++;
                }
            }
            votesPerAnswer.push(ansres);
        }

        votesPerAnswer.sort((a, b) => {
            if( a.votes < b.votes) {
                return 1;
            }
            if( a.votes > b.votes) {
                return -1;
            }
            return 0;
        });

        const pollClass = "v-final-results-poll" + (this.state.open ? " open" : "");

        return (
            <div className={pollClass} onClick={this.handleChangeListSize}>
                <span className="v-final-results-poll-question">{poll.question}</span>
                <span className="v-final-results-poll-totalvotes">{poll.votes.length}</span>
                <div className="v-final-results-poll-answers">
                    {votesPerAnswer.map((ans, index) => {
                        if(!this.state.open && index > 2) {
                            return "";
                        }
                        return (
                        <div key={ans.key} className="v-final-results-poll-answer">
                            <span className="v-final-results-poll-answer-text">{ans.answer}</span>
                            <span className="v-final-results-poll-answer-votes">{ans.votes}</span>
                            <span className="v-final-results-poll-answer-percentage">{ totalAnswers > 0 ? Math.floor((ans.votes / totalAnswers)*100) : 0 }%</span>
                        </div>
                    )})}
                </div>
            </div>
        );
    }


}


export default createContainer(() => {
    Meteor.subscribe('polls');

    return {
        userId: UserId.get()
    };
}, FinalResultsQuestion);

