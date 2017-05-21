
import { Meteor } from 'meteor/meteor';
import { Polls } from './Polls.js';
import { MasterState } from './MasterState.js';


let _currentPoll = -1;
const _startTime = new Date().getTime() + 2000;

let _poller = false;

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
    getNextPoll: () => {
        const state = PollsHelper.getState();
        if(state) {
            const nPollNo = state.currentPoll + 1;
            const polls = Polls.find({order: nPollNo}).fetch();
            if(polls.length !== 1) {
                return false;
            }
            return polls[0];

        }
        return false;
    },
    getNextPollStartTime: () => {
        const state = PollsHelper.getState();
        return state.startAt + ((state.currentPoll+1) * PollsHelper.getPollLife());
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
    getStatus: () => {
        const state = PollsHelper.getState();

        if(state) {
            return state.mainState;
        }
        return 0;
    },
    isActive: () => {
        const state = PollsHelper.getState();
        return (state && state.mainState === 1);
    },
    isDone: () => {
        const state = PollsHelper.getState();
        return (state && state.mainState === 2);
    },
    isWaiting: () => {
        const state = PollsHelper.getState();
        return (state && state.mainState === 0);
    },
    setStatusToStopped: () => {
        Meteor.call('masterstate.setstatus', -1);
    },
    setStatusToActive: () => {
        Meteor.call('masterstate.setstatus', 1);
    },
    setStatusToDone: () => {
        Meteor.call('masterstate.setstatus', 2);
    },
    setStatusToWaiting: () => {
        Meteor.call('masterstate.setstatus', 0);
    }
};

export default PollsHelper;

