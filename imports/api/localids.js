import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const LocalIds = new Mongo.Collection('localids');

if (Meteor.isServer) {
    // This code only runs on the server
    // Only publish tasks that are public or belong to the current user
    Meteor.publish('localids', function localidsPublication() {
        return LocalIds.find({});
    });
}

Meteor.methods({
    'localids.insert'() {

        const rngNo = Math.floor(Math.random()*10000000);
        const currentUsersCount = LocalIds.find().count();
        const localId = "U" + rngNo + "-" + currentUsersCount;
        console.log("LocalId: ", localId);


        LocalIds.insert({
            localId: localId,
            createdAt: new Date()
        });

        localStorage.setItem('localid', results);

        return localId;
    }


});
