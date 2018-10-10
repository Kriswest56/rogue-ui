import React from 'react';
import CircularProgressbar from 'react-circular-progressbar';

import 'react-circular-progressbar/dist/styles.css';
import './timer.css';

const TURN_LENGTH = 5000;

class Timer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            nextUpdate: props.nextUpdate
        }

    }

    startTimer = () => {
        clearInterval(this.timer)
        this.timer = setInterval(this.tick.bind(this), 100);
    } 

    tick = () => {
        this.setState({
            nextUpdate: (this.state.nextUpdate - 100)
        })

        if(this.state.nextUpdate < 0){
            this.props.getBoard();
            this.setState({
                nextUpdate: 5000
            })
        }
    }

    render() {

        this.startTimer(this.state.nextUpdate);

        let timeRemaining = "" + this.state.nextUpdate;

        return (
            <div id="timer" className="timer">
                <CircularProgressbar 
                    percentage={(this.state.nextUpdate / TURN_LENGTH) * 110}
                    text={Math.ceil(timeRemaining/1000)}
                    background
                    backgroundPadding={6}
                    styles={{
                        background: {
                            fill: '#234323',
                        },
                        text: {
                            fill: '#d8d8d8',
                        },
                        path: {
                            stroke: '#d8d8d8',
                        },
                        trail: { 
                            stroke: 'transparent' 
                        }
                    }}
                />
            </div>
        );
    }

}

export default Timer;