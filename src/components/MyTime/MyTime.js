import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import './MyTime.css';
import Today from './Today';
import TwoWeek from './TwoWeek';



class MyTime extends Component{
    constructor(){
        super()

        this.state = {
            activeView: ''
        }
        this.setToday = this.setToday.bind(this);
        this.setTwoWeek = this.setTwoWeek.bind(this);
    }

    setToday(){
        this.setState({
            activeView: 'today'
        })
    }

    setTwoWeek(){
        this.setState({
            activeView: 'twoWeek'
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

                        <Link to = "/mytime/day" style={{ textDecoration: 'none', color: "#0097a7", width: "100%" }}>
                            <div className = {(this.state.activeView === 'today') ? 'todayNav active': 'todayNav'}>
                                <h3>Single Day</h3>
                            </div>
                        </Link>

                        <Link to = "/mytime/week" style={{ textDecoration: 'none', color: "#0097a7", width: "100%" }}>
                            <div className = {(this.state.activeView === 'twoWeek') ? 'twoWeekNav active' : 'twoWeekNav'}>
                                <h3>Two Weeks</h3>
                            </div>
                        </Link>

                    </div>

                </div>
                <div className = "myTimeContent">
                        <Switch>
                            <Route path = "/mytime/day" render = {(props) => <Today setBar = {this.setToday} {...props}/>} />
                            <Route path = "/mytime/week" render = {(props) => <TwoWeek setBar = {this.setTwoWeek} {...props}/>} />
                        </Switch>
                </div>
            </div>
        )
    }
}

export default MyTime;