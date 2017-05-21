import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import PollsHelper from './PollsHelper.js';

export const Polls = new Mongo.Collection('polls');

if (Meteor.isServer) {
    // This code only runs on the server
    // Only publish tasks that are public or belong to the current user
    Meteor.publish('polls', function pollsPublication() {
        return Polls.find({});
    });
}

Meteor.methods({
    'polls.insert'(key, order, question) {

        const nt = new Date().getTime();

        // console.log("OPTS", opts, PollsHelper.liveTime, PollsHelper.startTime);

        const start = PollsHelper.startTime + (1000 * 60 * PollsHelper.liveTime * order);
        const end = start + (1000 * 60 * PollsHelper.liveTime) - 1;

        Polls.insert({
            key: key,
            question: question,
            // answers: opts.answers,
            answers: [],
            order: order,
            votes: [],
            active: false,
            createdAt: new Date()
        });
    },
    'polls.addanswer'(qkey, key, text) {
        const ansObj = {
            key: key,
            text: text
        };
        Polls.update({key: qkey}, {
            $push: { answers: ansObj }
        });
    },
    'polls.vote'(qkey, akey, lid) {


        const hasVoted = Polls.find({"key": qkey, "votes.voter": lid}).count();
        console.log("Has this user voted already?", hasVoted);
        if(hasVoted > 0) {
            return;
        }

        const voteObj = {
            "voter": lid,
            "answer": akey,
            "when": new Date(),
            "qkey": qkey
        };
        console.log("Vote Object in Polls", voteObj);
        Polls.update({key: qkey}, {
            $push: { "votes": voteObj }
        });
    },
    'polls.reset'() {
        console.log("polls.reset");
        Polls.update({}, {
            $set: {votes: [], active: false}
        }, {multi: true});
    }
});
