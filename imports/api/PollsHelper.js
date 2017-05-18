
import { Meteor } from 'meteor/meteor';
import { Polls } from './polls.js';
import { MasterState } from './MasterState.js';


let _currentPoll = -1;
const _startTime = new Date().getTime() + 2000;

const PollsHelper = {
    // How many minutes each question is active.
    liveTime: 0.5,
    // When the first poll goes live!
    getState: () => {
        const stateArr = MasterState.find().fetch();
        if(!stateArr  || stateArr.length !== 1) {
            return false;
        }
        return stateArr[0];
    },
    startTime: () => {

        const state = PollsHelper.getState();
        if(state && state.startAt> -1) {
            return state.startAt;
        }
        return false;
    },
    getPollLife: () => {
        const state = PollsHelper.getState();
        if(state && state.liveTime> -1) {
            return state.liveTime * (1000 * 60);
        }
        return (1000*60*10);
    },
    getCurrent: () => {
        const state = PollsHelper.getState();
        if(state && state.currentPoll > -1) {
            const polls = Polls.find({order: state.currentPoll}).fetch();
            if(polls.length !== 1) {
                return false;
            }
            return polls[0];

        }
        return false;
    },
    setPoll: (pollOrderNo) => {
        console.log("Set Current Poll to ", pollOrderNo);
        Meteor.call('masterstate.set', pollOrderNo);
    },
    nextPoll: () => {
        console.log("Next Poll!");
        Meteor.call('masterstate.next');
    },
    prevPoll: () => {

    },
    countCurrent: () => {
        const nowTime = new Date().getTime();
        const obj = Polls.find( {from: { $lt: nowTime }, to: { $gt: nowTime } } ).fetch();
        return obj[0] ? obj[0] : false;
    }
};

export default PollsHelper;

