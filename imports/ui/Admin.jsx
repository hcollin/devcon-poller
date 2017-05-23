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


        const state = PollsHelper.getState();


        this.state = {
            startAt: 1495702800000,
            lifeTime: 8.5
        };

        this.handleReset = this.handleReset.bind(this);
        this.handleDebug = this.handleDebug.bind(this);
        this.handleStart = this.handleStart.bind(this);

        this.onChangeLifeTime = this.onChangeLifeTime.bind(this);
        this.onChangeStartAt = this.onChangeStartAt.bind(this);

    }

    componentDidMount() {
        const state = PollsHelper.getState();
        if(state.startAt && state.lifeTime) {
            this.setState({
                startAt: parseInt(state.startAt),
                lifeTime: parseFloat(state.lifeTime)
            });
        }

    }

    onChangeStartAt(e) {
        this.setState({
            startAt: e.target.value
        });
    }

    onChangeLifeTime(e) {
        this.setState({
            lifeTime: e.target.value
        });
    }


    handleReset() {
        console.log("reset!");
        Meteor.call('ticker.reset', this.state.startAt, this.state.lifeTime);
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

        let txtStart = "unknown";
        if(state.startAt) {
            txtStart = new Date(parseInt(state.startAt)).toLocaleString();
        }


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
                            <h2>Questions</h2>
                            {allPolls && allPolls.map((item) => (
                                <div className={item.key === currentPoll.key ? "v-admin-polls-poll active" : "v-admin-polls-poll"} key={item.key}>
                                    <div className="v-admin-polls-poll-question">{item.question}</div>
                                    <div className="v-admin-polls-poll-votes">{item.votes.length}</div>
                                </div>
                            ))}
                        </div>


                        <div className="v-admin-settings-area">
                            <h2>Settings</h2>
                            <div className="v-admin-settings-container">
                                <div className="v-admin-setting-option">
                                    <span className="v-admin-setting-option-name">Start Time (in ms)</span>
                                    <input className="v-admin-settings-option-value" type="number" value={this.state.startAt} onChange={this.onChangeStartAt}/>
                                </div>
                                <div className="v-admin-setting-option">
                                    <span className="v-admin-setting-option-name">Single question is a live (in minutes)</span>
                                    <input className="v-admin-settings-option-value"  type="number" value={this.state.liveTime} onChange={this.onChangeLifeTime}/>
                                </div>
                                <div className="v-admin-settings-submit-container">
                                    <button onClick={this.handleReset} className="c-button v-admin-button-reset"><img src="images/nuke.svg" /></button>
                                </div>
                            </div>

                        </div>

                        <div className="v-admin-debug-area">
                            CurrentPoll Order No : {state.currentPoll} <br />
                            Main State: {state.mainState} <br />
                            Key: {state.key} <br />
                            Question Length : {state.liveTime} minutes <br />
                            First question starts at: {state.startAt} {txtStart}<br />


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
        userId: UserId.get(),

        startAt: PollsHelper.startTime(),
        lifeTime: PollsHelper.getPollLife()
    };
}, Admin);


