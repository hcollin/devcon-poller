import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import { createContainer } from 'meteor/react-meteor-data';
import { Polls } from '../api/Polls.js';
import UserId from '../api/userid.js';

class FinalResults extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="v-final-results">
                <header className="v-final-results-header">
                    <h1>Final Results</h1>
                </header>

                <div className="v-final-results-container">


                </div>


                <div className="s-logo-container">
                    <img className="s-logo-img" src="images/logo.png" />
                </div>

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

