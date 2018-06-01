import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Client from "./Client";
import "./ClientManagement.css";

class ClientManagement extends Component{
    constructor(){
        super()

        this.state = ({
            open: false,
            firstname: '',
            lastname: '',
            email: '',
            clients: []
        })
        this.handleFirstName = this.handleFirstName.bind(this);
        this.handleLastName = this.handleLastName.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.addClient = this.addClient.bind(this);
        this.getClients = this.getClients.bind(this);
    }

    componentDidMount(){
        this.getClients();
    }

    getClients(){
        axios.get('/api/clients')
        .then(res => {
            this.setState({
                clients: res.data
            })
        })
    }

    handleFirstName(e){
        this.setState({
            firstname: e.target.value
        })
    }

    handleLastName(e){
        this.setState({
            lastname: e.target.value
        })
    }

    handleEmail(e){
        this.setState({
            email: e.target.value
        })
    }

    handleClickOpen = () => {
        this.setState({ 
            open: true 
        });
      }

    handleClose = () => {
    this.setState({
        email: '',
        firstname: '',
        lastname: '',
        open: false
    });
    }

    addClient(){
        axios.post('/api/clients', {firstname: this.state.firstname, lastname: this.state.lastname, email: this.state.email})
            .then( () => {
                this.handleClose();
                this.getClients();
            })
    }

    
    render(){
        const Clients = this.state.clients.map(client => {
            return (
                <div key = {client.clientid}>
                    <Client getClientsFn = {this.getClients} firstname = {client.firstname} lastname = {client.lastname} clientid = {client.clientid} email = {client.email}/>
                </div>
            )
        })


        return(
            <div className = "clientManagementContainer">
                <div className = "CMTitleContainer">
                    <h2><span className = "accent">Client</span>Management</h2>
                </div>

                <div className = "addClientContainer">
                        
                    <div className = "addClient">
                        <Button onClick = {this.handleClickOpen} variant = "raised" color = "secondary">Add Client</Button>
                    </div>
    
                </div>

                <div className = "addClientModal">
                    <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="form-dialog-title"
                        >
                        <DialogTitle id="form-dialog-title">Add Client</DialogTitle>
                        <DialogContent>

                            <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="First Name"
                            fullWidth
                            onChange = {this.handleFirstName}
                            value = {this.state.firstname}
                            />

                            <TextField
                            margin="dense"
                            id="name"
                            label="Last Name"
                            fullWidth
                            onChange = {this.handleLastName}
                            value = {this.state.lastname}
                            />

                            <TextField
                            margin="dense"
                            id="name"
                            label="Email Address"
                            type="email"
                            fullWidth
                            value = {this.state.email}
                            onChange = {this.handleEmail}
                            />

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                            Cancel
                            </Button>
                            <Button onClick={this.addClient} color="primary">
                            Add
                            </Button>
                        </DialogActions>
                        </Dialog>
                </div>

                <div className = "clients">
                    {Clients}
                </div>

            </div>
        )
    }
}

export default ClientManagement;