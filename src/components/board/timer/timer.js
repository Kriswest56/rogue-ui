import React from 'react';
import CircularProgressbar from 'react-circular-progressbar';

import 'react-circular-progressbar/dist/styles.css';
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

        if(this.state.countdown === -1){
            this.props.sendMoves("Sending moves to server");
            this.setState({
                countdown: 5
            })
        }
    }

    render() {

        this.startTimer(this.state.countdown);

        let timeRemaining = "" + this.state.countdown;

        return (
            <div id="timer" className="timer">
                <CircularProgressbar 
                    percentage={(this.state.countdown / 5) * 100}
                    text={timeRemaining}
                    background
                    backgroundPadding={6}
                    styles={{
                        background: {
                            fill: '#3e98c7',
                        },
                        text: {
                            fill: '#fff',
                        },
                        path: {
                            stroke: '#fff',
                        },
                        trail: { stroke: 'transparent' }
                    }}
                />
            </div>
        );
    }

}

export default Timer;