import { Meteor } from 'meteor/meteor';

import { Polls } from '../imports/api/Polls.js';

import PollsHelper from '../imports/api/PollsHelper.js';

let Ticker = function() {

    let ticker = false;

    function reset(startAt, questionLen) {
        startAt = startAt > new Date().getTime() ? startAt : new Date().getTime() + 15000;
        questionLen = questionLen > 0 ? questionLen : 0.4;
        stop();

        Meteor.call('masterstate.reset', startAt, questionLen);
        Meteor.call('polls.reset');
    }

    function start() {
        let waitTime = PollsHelper.startTime() - new Date().getTime();
        waitTime = waitTime > 0 ? waitTime : 0;
        PollsHelper.setStatusToWaiting();
        Meteor.setTimeout(() => {
            PollsHelper.setStatusToActive();
            PollsHelper.setPoll(0);
            poller();
        }, waitTime);
    }

    function poller() {
        const pollCount = Polls.find().count();
        const pollLife = PollsHelper.getPollLife();

        ticker = Meteor.setInterval(() => {
            const state = PollsHelper.getState();
            console.log("\tTicker: Current Poll", state.currentPoll);
            if(state.currentPoll >= (pollCount - 1)) {
                Meteor.clearInterval(ticker);
                PollsHelper.setPoll(-1);
                PollsHelper.setStatusToDone();
                Meteor.clearInterval(ticker);
            } else {
                PollsHelper.nextPoll();
            }
        },pollLife);
    }


    function stop() {
        Meteor.clearInterval(ticker);
        PollsHelper.setStatusToStopped();
        // PollsHelper.setPoll(-1);
        // PollsHelper.setStatusToDone();
    }

    return {
        reset: reset,
        start: start,
        stop: stop,
        continue: poller
    };
};

let instance = new Ticker();

export default instance;