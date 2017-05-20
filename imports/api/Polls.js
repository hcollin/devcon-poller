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
    'polls.insert'(opts) {
        const nt = new Date().getTime();

        // console.log("OPTS", opts, PollsHelper.liveTime, PollsHelper.startTime);

        const start = PollsHelper.startTime + (1000 * 60 * PollsHelper.liveTime * opts.order);
        const end = start + (1000 * 60 * PollsHelper.liveTime) - 1;

        Polls.insert({
            key: opts.key,
            question: opts.question,
            answers: opts.answers,
            order: opts.order,
            votes: [],
            active: false,
            createdAt: new Date(),
            from: start,
            to: end
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
    // 'tasks.remove'(taskId) {
    //     check(taskId, String);
    //
    //     const task = Tasks.findOne(taskId);
    //     if (task.private && task.owner !== this.userId) {
    //         // If the task is private, make sure only the owner can delete it
    //         throw new Meteor.Error('not-authorized');
    //     }
    //
    //     Tasks.remove(taskId);
    // },
    // 'tasks.setChecked'(taskId, setChecked) {
    //     check(taskId, String);
    //     check(setChecked, Boolean);
    //
    //     const task = Tasks.findOne(taskId);
    //     if (task.private && task.owner !== this.userId) {
    //         // If the task is private, make sure only the owner can check it off
    //         throw new Meteor.Error('not-authorized');
    //     }
    //
    //     Tasks.update(taskId, { $set: { checked: setChecked } });
    // },
    // 'tasks.setPrivate'(taskId, setToPrivate) {
    //     check(taskId, String);
    //     check(setToPrivate, Boolean);
    //
    //     const task = Tasks.findOne(taskId);
    //
    //     // Make sure only the task owner can make a task private
    //     if (task.owner !== this.userId) {
    //         throw new Meteor.Error('not-authorized');
    //     }
    //
    //     Tasks.update(taskId, { $set: { private: setToPrivate } });
    // },
});
