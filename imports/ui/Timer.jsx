import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import { createContainer } from 'meteor/react-meteor-data';

import UserId from '../api/userid.js';

class Timer extends Component {

    constructor(props) {
        super(props);

        this.tick = false;

        this.state = {
            timer: 0
        };
    }

    componentDidMount() {

        if(!this.tick && this.props.type) {

            if(this.props.type === "countdown") {

                this.setState({
                    timer: this.props.time - new Date().getTime()
                });

                this.tick = Meteor.setInterval(() => {
                    this.setState( (ps, p) => ({
                        timer: ps.timer - 1000
                    }));

                }, 1000);


            }
        }
    }

    componentWillUnmount() {
        Meteor.clearInterval(this.tick);
    }

    componentWillReceiveProps(np) {
        console.log("new props!", np);


    }

    render() {

        if(this.props.type==="countdown") {
            const tsecs = Math.round(this.state.timer / 1000);

            if(tsecs < 0) {
                return (
                    <div className="c-timer">
                        00:00:00
                    </div>
                )
            }

            const hours = Math.floor(tsecs / 3600);
            const mins = Math.floor((tsecs - (hours * 3600)) / 60);
            const secs = Math.floor(tsecs - (hours * 3600) - (mins * 60));



            return (
                <div className="c-timer">
                    {("00" + hours).slice(-2)}:{("00" + mins).slice(-2)}:{("00" + secs).slice(-2)}
                </div>
            )
        }
        return (
            <div className="c-timer">

            </div>
        )
    }
}


export default createContainer(() => {

    return {
        userId: UserId.get()
    };
}, Timer);

