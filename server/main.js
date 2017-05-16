import '../imports/api/polls.js'
import '../imports/api/votes.js'
import '../imports/api/localids.js'

import { Polls } from '../imports/api/polls.js';
import { Votes } from '../imports/api/votes.js';
import { Users } from '../imports/api/localids.js';
import { Meteor } from 'meteor/meteor';


Meteor.startup(() => {

    if(Polls.find().count() === 0) {
        Polls.insert({
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
        });
    }
});
