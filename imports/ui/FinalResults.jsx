import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import { createContainer } from 'meteor/react-meteor-data';
import { Polls } from '../api/Polls.js';
import UserId from '../api/userid.js';

import FinalResultsQuestion from './FinalResultsQuestion.jsx';

class FinalResults extends Component {

    constructor(props) {
        super(props);
    }

    render() {


        const allPolls = Polls.find({}).fetch();

        return (
            <div className="v-final-results">

                <div className="v-final-results-container">
                    {allPolls && allPolls.map((poll) => {
                        return (
                            <FinalResultsQuestion poll={poll} key={poll.key} />
                        );
                    })}
                </div>

                <div className="v-final-results-footer">
                </div>


                <div className="s-logo-container">
                    <img className="s-logo-img" src="images/logo.png" />
                </div>

            </div>
        )
    }
}


export default createContainer(() => {
    Meteor.subscribe('polls');

    return {
        userId: UserId.get()
    };
}, FinalResults);

