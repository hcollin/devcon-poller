import { Meteor } from 'meteor/meteor';

import Ticker from './../../server/Ticker.js';

Meteor.methods({
    'ticker.reset'(startAt, questionLen) {
        console.log("RESET!", startAt, questionLen);
        Ticker.reset(startAt, questionLen);
        Ticker.start();
    },
    'ticker.start'() {
        console.log("START!");
        Ticker.start();
    },
    'ticker.stop'() {
        console.log("STOP!");
        Ticker.stop();
    },
    'ticker.resetQuestions'() {
        console.log("reset questions");

        Ticker.questions();
    }
});