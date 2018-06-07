import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import './LandingPage.css';

export default class LandingNavBar extends Component{
    render(){
        const { REACT_APP_LOGIN} = process.env;
        return(
            <div className = "header">
                <div className = "headerContainer">

                    <a href = "#" ><Button onClick = {this.props.openRegisterModal} variant = "raised" color="secondary">Register</Button></a>

                    <Typography variant="title" color="inherit"  noWrap>
                        <p className = "loginTitle">Drexy<span>Time</span></p>
                    </Typography>

                    <a href = {REACT_APP_LOGIN} ><Button variant = "raised" color="primary">Login</Button></a>

                </div>
            </div>
        )
    }
}