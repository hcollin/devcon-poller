
import { Meteor } from 'meteor/meteor';
import { Polls } from './Polls.js';


let _userId = null;

const UserId = {
    get: () => {
        if (_userId === null) {
            UserId.create();
        }
        return _userId;
    },
    create: () => {
        if (UserId.load()) {
            return _userId;
        }
        const rngNo = Math.floor(Math.random() * 10000);
        const ts = new Date().getTime();
        _userId = ts + "-" + rngNo;
        if (!UserId.save()) {
            _userId = null;
            return false;
        }
        return _userId;

    },
    save: () => {
        if (Meteor.isClient) {
            localStorage.setItem('userId', _userId);
            return true;
        }
        console.warn("Cannot save userId on server side as localStorage is not available");
        return false;
    },
    load: () => {
        if (Meteor.isClient) {
            const lsId = localStorage.getItem('userId');
            if (lsId) {
                _userId = lsId;
                return true;
            }
        }
        return false;
    },
    clear: () => {
        if (Meteor.isClient) {
            localStorage.removeItem('userId')
        }
    },
    hasVotedFor: (qkey) => {
        const hasVoted = Polls.find({"key": qkey, "votes.voter": UserId.get()}).count();
        return hasVoted > 0;
    }

};

export default UserId;