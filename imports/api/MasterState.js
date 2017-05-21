import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const MasterState = new Mongo.Collection('masterstate');

if (Meteor.isServer) {
    // This code only runs on the server
    // Only publish tasks that are public or belong to the current user
    Meteor.publish('masterstate', function masterstatePublication() {
        return MasterState.find({});
    });
}

Meteor.methods({
    'masterstate.insert'(startTime, defaultLiveTime) {

        MasterState.insert({
            startAt: startTime,
            liveTime: defaultLiveTime,
            currentPoll: -1,
            key: "POLLER",
            mainState: -1
        });
    },
    'masterstate.reset'(startTime, questionLen) {
        MasterState.remove({});
        Meteor.call('masterstate.insert', startTime, questionLen);
    },
    'masterstate.next'() {
        MasterState.update({key: "POLLER"}, {
            $inc: { currentPoll: 1}
        });
    },
    'masterstate.set'(targetOrder) {
        MasterState.update({key: "POLLER"}, {
            $set: { currentPoll: targetOrder}
        });
    },
    'masterstate.setstatus'(targetStatus) {
        MasterState.update({key: "POLLER"}, {
            $set: { mainState: targetStatus}
        });
    }
});
