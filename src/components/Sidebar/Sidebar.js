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
import InsertChart from '@material-ui/icons/InsertChart';
import Timer from './Timer/Timer';
import { Link } from 'react-router-dom';


class Sidebar extends Component{
    render(){
        return(
            <div className = "sidebar">
                <div className = "menu">
                    <Link to = "/mytime/today" style={{ textDecoration: 'none' }}>
                        <ListItem button>
                            <ListItemIcon>
                                <Alarm color = "primary"/>
                            </ListItemIcon>
                            <ListItemText primary= "My Time"/>
                        </ListItem>
                    </Link>

                    <Divider />

                    <Link to = "/timeperemployee" style={{ textDecoration: 'none' }}>
                        <ListItem button>
                            <ListItemIcon>
                                <ShowChart color = "primary"/>
                            </ListItemIcon>
                            <ListItemText primary= "Time per Employee"/>
                        </ListItem>
                    </Link>

                    <Divider />

                    <Link to = "/timeperclient" style={{ textDecoration: 'none' }}>
                        <ListItem button>
                            <ListItemIcon>
                                <InsertChart color = "primary" />
                            </ListItemIcon>
                            <ListItemText primary="Time per Client" />
                        </ListItem>
                    </Link>

                    <Divider />

                    <Link to = "/employeemanagement" style={{ textDecoration: 'none' }}>
                        <ListItem button>
                            <ListItemIcon>
                                <PersonAdd color = "primary" />
                            </ListItemIcon>
                            <ListItemText primary="Employee Management"/>
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