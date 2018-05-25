import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import './MyTime.css';
import Today from './Today';
import TwoWeek from './TwoWeek';

class MyTime extends Component{
    constructor(){
        super()

        this.state = {
            today: 'active',
            twoWeek: 'inactive'
        }

        this.clickToday = this.clickToday.bind(this);
        this.clickTwoWeek = this.clickTwoWeek.bind(this);
    }

    clickToday(){
        this.setState({
            today: 'active',
            twoWeek: 'inactive'
        })
    }

    clickTwoWeek(){
        this.setState({
            today: 'inactive',
            twoWeek: 'active'
        })
    }
    
    render(){
        return(
            <div className = "myTimeContainer">
                <div className = "myTime">
                    <div className = "titleContainer">
                        <h2><span className = "accent">My</span>Time</h2>
                    </div>

                    <div className = "myTimeNav">

                        <Link to = "/mytime/today" style={{ textDecoration: 'none', color: "#0097a7", width: "100%" }}>
                            <div className = {`todayNav ${this.state.today}`} onClick = {this.clickToday}>
                                <h3>Today</h3>
                            </div>
                        </Link>

                        <Link to = "/mytime/twoweek" style={{ textDecoration: 'none', color: "#0097a7", width: "100%" }}>
                            <div className = {`twoWeekNav ${this.state.twoWeek}`} onClick = {this.clickTwoWeek}>
                                <h3>Two Week</h3>
                            </div>
                        </Link>

                    </div>

                </div>
                <div className = "myTimeContent">
                        <Switch>
                            <Route path = "/mytime/today" component = {Today}/>
                            <Route path = "/mytime/twoweek" component = {TwoWeek}/>
                        </Switch>
                </div>
            </div>
        )
    }
}

export default MyTime;