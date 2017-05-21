import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import { createContainer } from 'meteor/react-meteor-data';
import { Polls } from '../api/Polls.js';
import { MasterState } from '../api/MasterState.js';

import UserId from '../api/userid.js';

import PollsHelper from '../api/PollsHelper.js';

class Admin extends Component {

    constructor(props) {
        super(props);

        this.handleReset = this.handleReset.bind(this);
        this.handleDebug = this.handleDebug.bind(this);
        this.handleStart = this.handleStart.bind(this);

    }


    handleReset() {
        console.log("reset!");
        Meteor.call('ticker.reset');
    }

    handleDebug() {
        console.log("\nMaster State: \n", MasterState.find().fetch());
        console.log("\nPolls: \n", Polls.find().fetch());
    }

    handleStart() {
        Meteor.call('ticker.start');
    }


    render() {

        const state = PollsHelper.getState();



        const currentPoll = PollsHelper.getCurrent();
        let allPolls = Polls.find({}, { sort: { order: 1 }}).fetch();

        // console.log("Current", allPolls);

        return (
            <div className="v-admin">
                <header className="v-admin-header">
                    <h1>Admin</h1>
                </header>

                <div className="v-admin-content">

                    <div className="v-admin-toolbar">
                        <button onClick={this.handleReset} className="c-button v-admin-button-reset"><img src="images/nuke.svg" /></button>
                        <button onClick={this.handleDebug} className="c-button v-admin-button-reset"><img src="images/debug.svg" /></button>
                        {/*<button onClick={this.handleStart} className="c-button v-admin-button-reset">GO!</button>*/}

                    </div>

                    <div className="v-admin-main-container">
                        <div className="v-admin-statusbar">
                            <div className={state.mainState === -1 ? "active": ""}>Stopped</div>
                            <div className={state.mainState === 0 ? "active": ""}>Waiting</div>
                            <div className={state.mainState === 1 ? "active": ""}>Active</div>
                            <div className={state.mainState === 2 ? "active": ""}>Done</div>
                        </div>

                        <div className="v-admin-polls">
                            {allPolls && allPolls.map((item) => (
                                <div className={item.key === currentPoll.key ? "v-admin-polls-poll active" : "v-admin-polls-poll"} key={item.key}>
                                    <div className="v-admin-polls-poll-question">{item.question}</div>
                                    <div className="v-admin-polls-poll-votes">{item.votes.length}</div>
                                </div>
                            ))}
                        </div>

                        <div className="v-admin-debug-area">
                            CurrentPoll Order No : {state.currentPoll} <br />
                            Main State: {state.mainState} <br />
                            Key: {state.key} <br />
                            Question Length : {state.liveTime} minutes <br />
                            First question starts at: {state.startAt} <br />

                        </div>
                    </div>


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
    Meteor.subscribe('masterstate');

    return {
        userId: UserId.get()
    };
}, Admin);


