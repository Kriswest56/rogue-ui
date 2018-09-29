import React from 'react';

import './timer.css';

class Timer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            countdown: props.countdown
        }

    }

    startTimer = () => {
        clearInterval(this.timer)
        this.timer = setInterval(this.tick.bind(this), 1000)
    } 

    tick = () => {
        this.setState({
            countdown: (this.state.countdown - 1)
        })

        if(this.state.countdown === 0){
            this.props.sendMoves("Sending moves to server");
            this.setState({
                countdown: 5
            })
        }
    }

    render() {

        this.startTimer(this.state.countdown);

        return (
            <div id="timer">
                <h3>{this.state.countdown}</h3>
            </div>
        );
    }

}

export default Timer;