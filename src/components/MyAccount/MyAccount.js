import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import {connect} from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
import "./MyAccount.css";

class MyAccount extends Component {
    constructor(){
        super()

        this.state = {
            name: '',
            subject: '',
            email: '',
            message: '',
            success: false
        }
        this.handleEmail = this.handleEmail.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleSubject = this.handleSubject.bind(this);
        this.handleMessage = this.handleMessage.bind(this);
        this.sendEmail = this.sendEmail.bind(this);
    }

    componentDidMount(){
        this.setState({
            success: false,
            name: `${this.props.firstname} ${this.props.lastname}`,
            email: this.props.email
        })
    }

    componentDidUpdate(prevProps){
        if(prevProps !== this.props){
            this.setState({
                name: `${this.props.firstname} ${this.props.lastname}`,
                email: this.props.email
            })
        }
    }

    handleName(e){
        this.setState({
            name: e.target.value
        })
    }

    handleSubject(e){
        this.setState({
            subject: e.target.value
        })
    }

    handleEmail(e){
        this.setState({
            email: e.target.value
        })
    }

    handleMessage(e){
        this.setState({
            message: e.target.value
        })
    }

    sendEmail(){
        axios.post('/api/email', {subject: this.state.subject, senderName: this.state.name, senderEmail: this.state.email, message: this.state.message})
            .then( () => {
                this.setState({
                    subject: '',
                    message: ''
                })
            });
    }
    
    render(){
        return(
            <div className = "myAccountContainer">
                    <div className = "MATitleContainer">
                        <h2><span className = "accent">My</span>Account</h2>
                    </div>

                    <div className = "myAccountInfo">
                        <div className = "profilePictureContainer">
                            <Tooltip title = "Update image on your gmail account!"><img src = {this.props.picture} alt = "profileImg"/></Tooltip>
                        </div>

                        <p className = "accountInfoP">Name: <span className = "accountInfo">{this.state.name}</span></p>
                        <p className = "accountInfoP">Email: <span className = "accountInfo">{this.state.email}</span></p>
                        <p className = "accountInfoP">Role: <span className = "accountInfo">{this.props.role}</span></p>

                    </div>
                    
                    <div className = "contactForm">

                        <div className = "contactFormTitle">
                            <h2>Questions? Bugs? Suggestions? Tell us!</h2>
                        </div>

                        <div className = "name">
                            <div className = "nameInput">
                                <p>Your Name:</p>
                                <input value = {this.state.name} onChange = {this.handleName} type = "text" placeholder = "John Smith"/>
                            </div>

                            <div className = "nameInput">
                                <p>Your Email:</p>
                                <input value = {this.state.email} onChange = {this.handleEmail}  type = "text" placeholder = "john@smith.com"/>
                            </div>

                        </div>

                        <div className = "subject">
                            <p>Subject:</p>
                            <input value = {this.state.subject} onChange = {this.handleSubject}  type = "text" placeholder = "I love your app!"/>
                        </div>

                        <div className = "message">
                            <p>Message:</p>
                            <textarea value = {this.state.message} onChange = {this.handleMessage}  type = "text" placeholder = "Keep doing what you're doing!"/>
                        </div>

                        <Button className = "contactFormButton" onClick = {this.sendEmail} variant = "raised" color = "primary">Send</Button>

                    </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        firstname: state.userReducer.firstname,
        lastname: state.userReducer.lastname,
        email: state.userReducer.email,
        role: state.userReducer.role,
        picture: state.userReducer.profilepicture
    }
}

export default connect(mapStateToProps)(MyAccount);