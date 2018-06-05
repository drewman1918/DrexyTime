import React, {Component} from 'react';
import './NotAllowed.css';

export default class NotAllowed extends Component{
    render(){
        return(
            <div className = "notAllowed">
                <h2>Sorry, only Administrators may visit this page!</h2>
            </div>
        )
    }
}