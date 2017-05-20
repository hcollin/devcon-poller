import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import { createContainer } from 'meteor/react-meteor-data';
import { Polls } from '../api/polls.js';
import UserId from '../api/userid.js';

class FinalResults extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="v-final-results">
                <header className="v-final-results-header"></header>


            </div>
        )
    }
}


export default createContainer(() => {
    Meteor.subscribe('polls');

    return {
        userId: UserId.get()
    };
}, FinalResults);

