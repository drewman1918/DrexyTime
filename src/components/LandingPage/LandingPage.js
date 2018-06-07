import React, { Component } from 'react';
import LandingNavBar from './LandingNavBar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import DialogContentText from '@material-ui/core/DialogContentText';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import './LandingPage.css';

export default class LandingPage extends Component {
    constructor(){
        super()

        this.state = {
            open: false,
            companyName: '',
            email: '',
            firstname: '',
            lastname: '',
            alreadyHaveEmail: false,
            loading: false
        }
        this.registerUser = this.registerUser.bind(this);
        this.handleWarningClose = this.handleWarningClose.bind(this);
        this.onToken = this.onToken.bind(this);
        this.checkUser = this.checkUser.bind(this);
    }

    handleCompanyName = (e) => {
        this.setState({
            companyName: e.target.value
        })
    }

    handleEmail = (e) => {
        this.setState({
            email: e.target.value
        })
        this.checkUser();
    }

    handleFirstName = (e) => {
        this.setState({
            firstname: e.target.value
        })
    }

    handleLastName = (e) => {
        this.setState({
            lastname: e.target.value
        })
    }

    handleClickOpen = () => {
        this.setState({ 
            open: true 
        });
    }
    
    handleClose = () => {
        this.setState({
            open: false
        });
    }
    
    handleWarningClose(){
        this.setState({
            alreadyHaveEmail: false
        });
    }

    resetState = () => {
        this.setState({
            open: false,
            companyName: '',
            email: '',
            firstname: '',
            lastname: ''
        })
    }

    registerUser(subscriptionID){
        const { REACT_APP_LOGIN } = process.env;
        axios.post('/api/register', {subscriptionid: subscriptionID, companyName: this.state.companyName, email: this.state.email, firstname: this.state.firstname, lastname: this.state.lastname})
            .then( () => window.location.href = REACT_APP_LOGIN)
    }

    checkUser(){
        axios.get('/api/emails')
        .then(res => {
            if (res.data.map(x => x.email).includes(this.state.email.toLowerCase())){
                this.setState({
                    alreadyHaveEmail: true
                })
            } else{
                null
            }
        })
    }

    onToken(token){
        this.setState({
            loading: true,
            open: false
        })
        axios.post('/api/stripe', {stripeToken: token.id, email: this.state.email})
            .then( res => {
                this.registerUser(res.data.id)
            })
    }
    
    render(){
        return(
            <div className = "landingPage">
                <LandingNavBar openRegisterModal = {this.handleClickOpen}/>
                <div className = "landingPageContentContainer">

                    {(this.state.loading) ?
                    <div className = "loader">
                        <Loader
                            type = "Ball-Triangle"
                            color = "#0097a7"
                            height = "100"
                            width = "100"
                        />
                    </div>
                    :
                    null
                    }

                    <Dialog
                        open={this.state.open}
                        onClose={this.resetState}
                        aria-labelledby="form-dialog-title"
                        >
                        <DialogTitle id="form-dialog-title">Register</DialogTitle>

                            <DialogContent>

                                <DialogContentText id="alert-dialog-description" className = "registrationInfo">
                                    By registering you will be charged $20 per month.
                                </DialogContentText>

                                <TextField
                                required
                                autoFocus
                                id="name"
                                label="Company Name"
                                fullWidth
                                onChange = {this.handleCompanyName}
                                value = {this.state.companyName}
                                />
                                 
                                <Tooltip title = "Must be a gmail account, or company G Suite account">
                                <TextField
                                required
                                id="fee"
                                label="Your Email"
                                type="email"
                                onBlur = {this.checkUser}
                                fullWidth
                                onChange = {this.handleEmail}
                                value = {this.state.email}
                                />
                                </Tooltip>
                                 
                                <TextField
                                required
                                id="fee"
                                label="First Name"
                                type="name"
                                fullWidth
                                onChange = {this.handleFirstName}
                                value = {this.state.firstname}
                                />
                                 
                                <TextField
                                required
                                id="fee"
                                label="Last Name"
                                type="name"
                                fullWidth
                                onChange = {this.handleLastName}
                                value = {this.state.lastname}
                                />

                            </DialogContent>

                            <DialogActions className = "registerButtonsRow">
                                <Button onClick={this.resetState} color="secondary">
                                Cancel
                                </Button>

                                <StripeCheckout
                                    token = {this.onToken}
                                    stripeKey = "pk_test_HucULoNXBgTURN9LBGQkvAKB"
                                    allowRememberMe = {false}
                                >
                                    <Button variant = "raised" color="primary">
                                    Register and Pay
                                    </Button>
                                </StripeCheckout>

                            </DialogActions>
                        </Dialog>

                        <Dialog
                        open={this.state.alreadyHaveEmail}
                        onClose={this.handleWarningClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        >
                        <DialogTitle id="alert-dialog-title">{"Somebody already used that email"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                            Please login or register with a different email
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick = {this.handleWarningClose} color="secondary" variant = "raised" autoFocus>
                            Agree
                            </Button>
                        </DialogActions>
                        </Dialog>
                </div>
            </div>
        )
    }
}