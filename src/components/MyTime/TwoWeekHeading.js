import React, {Component} from 'react';
import FastForward from '@material-ui/icons/FastForward';
import FastRewind from '@material-ui/icons/FastRewind';
import ChevronRight from '@material-ui/icons/ChevronRight';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import { Button } from '@material-ui/core';
import "./TwoWeek.css";

export default class TwoWeekHeading extends Component {
    render(){

        const days = this.props.state.dates;

        return(
            <div className = "twoWeekView">
                <div className = "buttons">
                    <FastRewind className = "doubleLeftArrow icon" onClick = {() => this.props.changeDate(-13)}/>
                    <ChevronLeft className="leftArrow icon" onClick={() => this.props.changeDate(-1)}/>
                    <Button color = "secondary" onClick = {this.props.setToday}>Today</Button>
                    <ChevronRight className="rightArrow icon" onClick={() => this.props.changeDate(1)}/>
                    <FastForward className="doubleRightArrow icon" onClick={() => this.props.changeDate(13)}/>
                </div>

                <div className = "datesHeader">

                    <div className = "headerCell clientAndProject">
                        Client and Project
                    </div>

                    {
                        days.map( (day, i) => {
                            return(

                                <div key={i} className = "headerCell one">
                                    <div className = "dayOfWeek">
                                        { day.toString().slice(0,3) }
                                    </div>
                                    <div className = "monthAndDate">
                                        { day.toString().slice(4,10) }
                                    </div>
                                </div>
                            )
                        })
                    }


                </div>

            </div>
        )
    }
}