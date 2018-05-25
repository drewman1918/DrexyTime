import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Avatar from './Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import './Header.css';

class Header extends Component{
    render(){
        return(
            <div className = "header">
                <div className = "headerContainer">
                    <IconButton  color="inherit" aria-label="Menu">
                        <Avatar/>
                    </IconButton>

                    <Typography variant="title" color="inherit"  noWrap>
                        <p className = "loginTitle">Drexy<span>Time</span></p>
                    </Typography>

                    <Button color="inherit">Logout</Button>
                </div>
            </div>
        )
    }
}

export default Header;