import '../imports/api/polls.js'

import UserId from '../imports/api/userid.js';

import { Meteor } from 'meteor/meteor';

import { Polls } from '../imports/api/polls.js';
import { MasterState } from '../imports/api/MasterState.js';

import PollsHelper from '../imports/api/PollsHelper.js';

Meteor.startup(() => {

    if(Meteor.isDevelopment) {
        console.log("Is development! Nuke everything at startup!");
        Polls.remove({});
        MasterState.remove({});
    }

    if(Meteor.isProduction) {
        console.log("Is Production! BEWARE!");
    }

    if(Polls.find().count() === 0) {
        console.log("Populate questions!");

        Meteor.call("polls.insert", {
            key: "jsframework",
            order: 1,
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

        Meteor.call("polls.insert", {
            key: "os",
            order: 0,
            question: "Kehitysympäristönä käytän mieluiten?",
            answers: [
                {
                    key: "win7",
                    text: "Windows 7"
                },
                {
                    key: "win10",
                    text: "Windows 10"
                },
                {
                    key: "osx",
                    text: "OSX"
                },
                {
                    key: "ubuntu",
                    text: "Ubuntu"
                },
                {
                    key: "debian",
                    text: "Debian"
                },
                {
                    key: "msdos",
                    text: "MS-DOS"
                }
            ]
        });
    }


    function startTimer() {
        console.log("START TIMER!");
        let waitTime = PollsHelper.startTime() - new Date().getTime();

        console.log("waitTime: ", waitTime);
        waitTime = waitTime > 0 ? waitTime : 0;

        Meteor.setTimeout(() => {
            console.log("GO Go GO!");
            PollsHelper.setStatusToActive();
            PollsHelper.setPoll(0);
            poller();

        }, waitTime);
    }

    function poller() {

        const pollCount = Polls.find().count();


        const pollLife = PollsHelper.getPollLife();

        let c = 1;
        let p = Meteor.setInterval(() => {

            if(c >= pollCount) {
                Meteor.clearInterval(p);
                PollsHelper.setPoll(-1);
                PollsHelper.setStatusToDone();
            } else {
                PollsHelper.nextPoll();
                c++;
            }
        },pollLife);
    }


    let states = MasterState.find({key: "POLLER"}).count();
    if(states > 1) {
        MasterState.remove({});
        states = 0;
    }

    // Insert new state only if there are no state currently stored.
    if(states === 0) {
        console.log("New master state!");
        const sTime = new Date().getTime() + 5000;
        console.log("sTime: ", sTime);
        Meteor.call("masterstate.insert", sTime, 0.1, () => {
            console.log("State set!");
            startTimer();
        });
    } else {
        startTimer();
    }







});
