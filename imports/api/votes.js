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
}

Meteor.methods({
    'votes.vote'(qkey, akey, lid) {

        console.log("Method votes.voted", qkey, akey, lid);


        // console.log("hasVoted?", Votes.find());

        //
        let voteObj = {
            "voter": lid,
            "answer": akey,
            "when": new Date(),
            "qkey": qkey
        };

        const hasVoted = Votes.find({"qkey": qkey, "votes.voter": lid}).count();


        console.log("VoteObject", voteObj);
        console.log("Voter has voted for this question? ", hasVoted);

        Votes.update({"qkey": qkey}, {
            $push: { votes: voteObj}
        });


        // Votes.update({qkey: qkey, "totals.key": akey}, {
        //     $inc: { "totals.$.total": 1 }
        // });
        //
        // Votes.update({qkey: qkey }, {
        //     $push: { "votes": voteObj }
        // });
        return true;

    },
    'votes.insert'(qkey) {

        Votes.insert({
            qkey: "qkey",
            votes: []
        })
    }
});
