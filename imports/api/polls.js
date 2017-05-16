import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

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



        Polls.insert({
            pollname: opts.name,
            question: opts.question,
            answers: opts.choises,
            createdAt: new Date()
        });
    },
    'polls.populate'() {
        const polls = [{
            name: "jsframework",
            question: "Suosikki JS Framework tai alusta?",
            answers: [
                {
                    key: "react",
                    text: "ReactJS"
                },
                {
                    key: "angular1",
                    text: "AngularJS"
                },
                {
                    key: "angular2",
                    text: "Angular 2"
                },
                {
                    key: "ember",
                    text: "EmberJS"
                },
                {
                    key: "vue",
                    text: "VueJS"
                },
                {
                    key: "vanilla",
                    text: "Vanilla JS"
                },
                {
                    key: "jquery",
                    text: "jquery"
                },
                {
                    key: "meteor",
                    text: "Meteor"
                },
                {
                    key: "nojs",
                    text: "JavaScript Sucks!"
                }
            ]
        }];



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
