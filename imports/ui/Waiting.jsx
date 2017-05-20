import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import { createContainer } from 'meteor/react-meteor-data';
import { Polls } from '../api/polls.js';
import UserId from '../api/userid.js';

import PollsHelper from '../api/PollsHelper.js';

import Timer from './Timer.jsx';

class Waiting extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {

        // let countdown = new Date().getTime() + 6250000;

        const countdown = PollsHelper.getNextPollStartTime();

        return (
            <div className="v-waiting">


                <div className="v-waiting-slogan-container">
                    <img src="images/slogan.png" className="v-waiting-img-slogan" />
                </div>
                <div className="v-waiting-timer-container">
                    <h2 className="v-waiting-countdown-container">
                        <label>Kyselyt alkavat</label>
                        <Timer type="countdown" time={countdown} />
                    </h2>
                </div>

                <div className="s-logo-container">
                    <img src="images/logo.png" className="s-logo-img" />
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
}, Waiting);

