import React, { Component } from 'react';
import Timer from './Timer.png';
import Memo from './memo.png';
import Invoice from './invoice.png';
import './LandingPage.css';

export default class LandingPageContent extends Component{
    render() {
        return(
            <div className="contentContainerLanding">
                
                <div className="landingPageHeader">
                    <h2>Welcome</h2>
                </div>

                <div className="landingPageContent">
                    
                    <h2 className = "sectionHeader">Hassle-free Time Tracking</h2>
                    <hr />

                    <div className="row1">
                        <div className="row1Picture">
                            
                            <div className="row1PictureLeft">
                                <img src={Timer} alt="Timer" />
                            </div>

                            <div className="row1PictureRight">
                                <img src={Memo} alt="Memo" />

                                <div className="row1RightText">
                                    <p>Easily track time for any client and project. Our elegant timer provides three separate timers.
                                       If a client calls in the middle of working on a different project, simply switch to a new timer.
                                       Your current job will pause, and you can track time for the new project.
                                       <br /> <br/>
                                       Memos will appear on your dashboard, and are easily editable to correct typos, incorrent dates, or hours worked. 
                                    </p>
                                </div>

                            </div>

                        </div>
                    </div>

                    <div className="landingRow2">
                        <div className="row2TitleFlex"><h2 className="sectionHeader">Seamless Invoicing</h2></div>
                        <hr />

                        <div className="row2Picture">
                            <div className="row2PictureDescription">
                                <p>Simply select the client and a date range, and DrexyTime will generate an invoice for you!
                                   The data is downloadable to excel with the click of a button.
                                   If you notice a typo in any of the memos, want to adjust the hours worked, or think it should be billed to a different project, you can easily edit from this screen.</p>
                            </div>
                            <div className = "row2PictureImg"><img src={Invoice} alt="Invoice" /></div>
                        </div>
                    </div>

                </div>

            </div>
        )
    }
}