import React, { Component } from 'react';
import Timer from './Timer.png';
import './LandingPage.css';

export default class LandingPageContent extends Component{
    render() {
        return(
            <div className = "contentContainerLanding">
                <div className="landingHeroHeading">
                    <h1>Welcome to <br /><span className="accent">Drexy</span>Time</h1>
                    <hr/>
                </div>

                <div className="landingHeroCards">

                    <div className="row1">
                        
                        <div className="timerCard heroCard">
                            <h2>Time Tracking</h2>
                            <div className="timerCardImage">
                                <img src = {Timer} alt = "timer"/>
                            </div>
                        </div>

                        <div className = "employeeStatisticsCard heroCard">
                            <h2>Employee Statistics</h2>
                        </div>
                    
                    </div>


                </div>
            </div>
        )
    }
}