import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Votes = new Mongo.Collection('votes');

if (Meteor.isServer) {
    // This code only runs on the server
    // Only publish tasks that are public or belong to the current user
    Meteor.publish('votes', function pollsPublication() {
        return Votes.find({});
    });

    Meteor.publish('hasVoted', function(qkey, lid) {
        return Votes.find({"qkey": qkey, "votes.voter": lid}).count();
    });

}

Meteor.methods({
    'votes.vote'(qkey, akey, lid) {

        console.log("Method votes.voted", qkey, akey, lid);


        // console.log("hasVoted?", Votes);

        //
        // let voteObj = {
        //     "voter": locallid,
        //     "answer": akey,
        //     "when": new Date()
        // };
        //
        // Votes.update({qkey: qkey, "totals.key": akey}, {
        //     $inc: { "totals.$.total": 1 }
        // });
        //
        // Votes.update({qkey: qkey }, {
        //     $push: { "votes": voteObj }
        // });

    },
    'votes.init'(qkey, akeys) {

        let totals = [];
        for(let i = 0; i<akeys.length; i++) {
            totals.push({
                key : akeys[i],
                total: 0
            });
        }

        Votes.insert({
            qkey: qkey,
            votes: [],
            totals: totals
        })
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
