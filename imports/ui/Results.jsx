import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import { createContainer } from 'meteor/react-meteor-data';

import { Polls } from '../api/polls.js';

class Results extends Component {

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.question.key)  {
            const hasVoted = Polls.find({"key": nextProps.question.key, "votes.voter": nextProps.localId}).count();
            if(hasVoted > 0) {
                this.setState({
                    voted: true
                });
            }
        }


    }

    render() {

        return (
            <div className="v-results">
                Results!

            </div>
        )

    }
}

// Poll.propTypes = {
//
// };


export default createContainer(() => {
    Meteor.subscribe('votes');

    const lid = localStorage.getItem('localid');

    return {
        localId: lid
    };
}, Results);

