import React, {Component} from 'react';
import FastForward from '@material-ui/icons/FastForward';
import FastRewind from '@material-ui/icons/FastRewind';
import ChevronRight from '@material-ui/icons/ChevronRight';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import { Button } from '@material-ui/core';
import "./TwoWeek.css";

export default class TwoWeekHeading extends Component {
    render(){
        return(
            <div className = "twoWeekView">
                <div className = "buttons">
                    <FastRewind className = "doubleLeftArrow icon" onClick = {this.props.backTwoWeeks}/>
                    <ChevronLeft className = "leftArrow icon" onClick = {this.props.backOneDay}/>
                    <Button color = "secondary" onClick = {this.props.setToday}>Today</Button>
                    <ChevronRight className = "rightArrow icon" onClick = {this.props.forwardOneDay}/>
                    <FastForward className = "doubleRightArrow icon" onClick = {this.props.forwardTwoWeeks}/>
                </div>

                <div className = "datesHeader">

                    <div className = "headerCell clientAndProject">
                        Client and Project
                    </div>

                    <div className = "headerCell one">
                        <div className = "dayOfWeek">
                            { this.props.state.one.toString().slice(0,3) }
                        </div>
                        <div className = "monthAndDate">
                            { this.props.state.one.toString().slice(4,10) }
                        </div>
                    </div>

                    <div className = "headerCell two">
                        <div className = "dayOfWeek">
                            { this.props.state.two.toString().slice(0,3) }
                        </div>
                        <div className = "monthAndDate">
                            { this.props.state.two.toString().slice(4,10) }
                        </div>
                    </div>

                    <div className = "headerCell three">
                        <div className = "dayOfWeek">
                            { this.props.state.three.toString().slice(0,3) }
                        </div>
                        <div className = "monthAndDate">
                            { this.props.state.three.toString().slice(4,10) }
                        </div>
                    </div>

                    <div className = "headerCell four">
                        <div className = "dayOfWeek">
                            { this.props.state.four.toString().slice(0,3) }
                        </div>
                        <div className = "monthAndDate">
                            { this.props.state.four.toString().slice(4,10) }
                        </div>
                    </div>

                    <div className = "headerCell five">
                        <div className = "dayOfWeek">
                            { this.props.state.five.toString().slice(0,3) }
                        </div>
                        <div className = "monthAndDate">
                            { this.props.state.five.toString().slice(4,10) }
                        </div>
                    </div>

                    <div className = "headerCell six">
                        <div className = "dayOfWeek">
                            { this.props.state.six.toString().slice(0,3) }
                        </div>
                        <div className = "monthAndDate">
                            { this.props.state.six.toString().slice(4,10) }
                        </div>
                    </div>

                    <div className = "headerCell seven">
                        <div className = "dayOfWeek">
                            { this.props.state.seven.toString().slice(0,3) }
                        </div>
                        <div className = "monthAndDate">
                            { this.props.state.seven.toString().slice(4,10) }
                        </div>
                    </div>

                    <div className = "headerCell eight">
                        <div className = "dayOfWeek">
                            { this.props.state.eight.toString().slice(0,3) }
                        </div>
                        <div className = "monthAndDate">
                            { this.props.state.eight.toString().slice(4,10) }
                        </div>
                    </div>

                    <div className = "headerCell nine">
                        <div className = "dayOfWeek">
                            { this.props.state.nine.toString().slice(0,3) }
                        </div>
                        <div className = "monthAndDate">
                            { this.props.state.nine.toString().slice(4,10) }
                        </div>
                    </div>

                    <div className = "headerCell ten">
                        <div className = "dayOfWeek">
                            { this.props.state.ten.toString().slice(0,3) }
                        </div>
                        <div className = "monthAndDate">
                            { this.props.state.ten.toString().slice(4,10) }
                        </div>
                    </div>

                    <div className = "headerCell eleven">
                        <div className = "dayOfWeek">
                            { this.props.state.eleven.toString().slice(0,3) }
                        </div>
                        <div className = "monthAndDate">
                            { this.props.state.eleven.toString().slice(4,10) }
                        </div>
                    </div>

                    <div className = "headerCell twelve">
                        <div className = "dayOfWeek">
                            { this.props.state.twelve.toString().slice(0,3) }
                        </div>
                        <div className = "monthAndDate">
                            { this.props.state.twelve.toString().slice(4,10) }
                        </div>
                    </div>

                    <div className = "headerCell thirteen">
                        <div className = "dayOfWeek">
                            { this.props.state.thirteen.toString().slice(0,3) }
                        </div>
                        <div className = "monthAndDate">
                            { this.props.state.thirteen.toString().slice(4,10) }
                        </div>
                    </div>

                    <div className = "headerCell fourteen">
                        <div className = "dayOfWeek">
                            { this.props.state.fourteen.toString().slice(0,3) }
                        </div>
                        <div className = "monthAndDate">
                            { this.props.state.fourteen.toString().slice(4,10) }
                        </div>
                    </div>

                </div>

            </div>
        )
    }
}