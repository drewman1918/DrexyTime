import React, { Component } from 'react';
import './Sidebar.css';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Alarm from '@material-ui/icons/Alarm';
import Divider from '@material-ui/core/Divider';
import PersonAdd from '@material-ui/icons/PersonAdd';
import GroupAdd from '@material-ui/icons/GroupAdd';
import ShowChart from '@material-ui/icons/ShowChart';
import MonetizationOn from '@material-ui/icons/MonetizationOn';
import Timer from './Timer/Timer';
import { Link } from 'react-router-dom';


class Sidebar extends Component{
    constructor(){
        super()

        this.state = {
            value: 0
        }
    }


    handleChange = (event, value) => {
        this.setState({ value });
      };
    
    render(){
        return(
            <div className = "sidebar">
                <div className = "menu">
                    <Link to = "/mytime/day" style={{ textDecoration: 'none' }}>
                        <ListItem button>
                            <ListItemIcon>
                                <Alarm color = "primary"/>
                            </ListItemIcon>
                            <ListItemText primary= "My Time"/>
                        </ListItem>
                    </Link>

                    <Divider />

                    <Link to = "/invoicing" style={{ textDecoration: 'none' }}>
                        <ListItem button>
                            <ListItemIcon>
                                <MonetizationOn color = "primary" />
                            </ListItemIcon>
                            <ListItemText primary="Invoicing" />
                        </ListItem>
                    </Link>

                    <Divider />

                    <Link to = "/userstatistics" style={{ textDecoration: 'none' }}>
                        <ListItem button>
                            <ListItemIcon>
                                <ShowChart color = "primary"/>
                            </ListItemIcon>
                            <ListItemText primary= "User Statistics"/>
                        </ListItem>
                    </Link>

                    <Divider />

                    <Link to = "/usermanagement" style={{ textDecoration: 'none' }}>
                        <ListItem button>
                            <ListItemIcon>
                                <PersonAdd color = "primary" />
                            </ListItemIcon>
                            <ListItemText primary="User Management"/>
                        </ListItem>
                    </Link>

                    <Divider />

                    <Link to = "/clientmanagement" style={{ textDecoration: 'none' }}>
                        <ListItem button>
                            <ListItemIcon>
                                <GroupAdd color = "primary" />
                            </ListItemIcon>
                            <ListItemText primary="Client Management" />
                        </ListItem>
                    </Link>

                    <Divider />
                </div>

                <Timer/>

            </div>
        )
    }
}

export default Sidebar;