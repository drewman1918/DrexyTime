import React, { Component } from 'react';
import ClearIcon from '@material-ui/icons/Clear';
import Tooltip from '@material-ui/core/Tooltip';
import axios from 'axios';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Project from './Project';
import "./ClientManagement.css";
import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import DoneIcon from '@material-ui/icons/Done';

export default class Client extends Component {
    constructor(){
        super()

        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            projects: [],
            name: '',
            type: '',
            flatfee: '',
            open: false,
            editingEmail: false 
        }
        this.getProjects = this.getProjects.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleType = this.handleType.bind(this);
        this.handleFlatFee = this.handleFlatFee.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
    }

    componentDidMount(){
        const { firstname, lastname, email } = this.props;

        this.setState({
            firstname,
            lastname,
            email
        })

        this.getProjects();
    }

    handleEmail(e){
        this.setState({
            email: e.target.value
        })
    }

    handleName(e){
        this.setState({
            name: e.target.value
        })
    }

    handleType(e){
        this.setState({
            type: e.target.value
        })
    }

    handleFlatFee(e){
        this.setState({
            flatfee: e.target.value
        })
    }

    getProjects(){
        axios.get(`/api/projects/${this.props.clientid}`)
        .then( res => {
            this.setState({
                projects: res.data
            })
        })
    }

    handleClickOpen = () => {
        this.setState({ 
            open: true 
        });
      }

    handleClose = () => {
    this.setState({
        open: false,
        name: '',
        type:'',
        flatfee: ''
    });
    }

    updateEmail = () => {
        axios.put(`/api/clients/${this.props.clientid}`, {email: this.state.email})
            .then( () => {
                this.setState({editingEmail: false})
            })
    }

    addProject = () => {
        if(this.state.flatfee === ''){
            axios.post('/api/projects', {clientid: this.props.clientid, name: this.state.name, type: this.state.type, flatfee: null})
                .then( () => {
                    this.getProjects()
                    this.setState({
                        name: '',
                        type:'',
                        flatfee: '',
                        open: false
                    })
                })
        }else {
            axios.post('/api/projects', {clientid: this.props.clientid, name: this.state.name, type: this.state.type, flatfee: this.state.flatfee})
            .then( () => {
                this.getProjects()
                this.setState({
                    name: '',
                    type:'',
                    flatfee: '',
                    open: false
                })
            })  
        }
    }

    deleteClient = () => {
        axios.delete(`/api/clients/${this.props.clientid}`)
            .then ( () => {
                this.props.getClientsFn();
            })
    }

    render(){

        const Projects = this.state.projects.map( project => {
            return (
                <div key = {project.projectid}>
                    <Project getProjectsFn = {this.getProjects} projectid = {project.projectid} name = {project.name} type = {project.type} flatfee = {project.flatfee}/>
                </div>
            
            )
        })
        return(
            <div className = "client">

                <div className = "clientName">
                    <h2>{this.state.lastname}, {this.state.firstname}</h2>
                    <div className = "deleteIcon"><Tooltip title = "Delete Client"><ClearIcon onClick = {this.deleteClient} /></Tooltip></div>
                </div>

                <div className = "clientInfo">

                    <div className = "clientEmail">
                        <p>Email: </p>
                        <input onClick = {() => this.setState({editingEmail: true})} onChange = {this.handleEmail} value = {this.state.email || ''}/>

                        { (this.state.editingEmail) ? 
                        <Tooltip title = "Confirm Changes"><Button mini onClick = {this.updateEmail} className = "editButton" variant = "fab" color = "primary"><DoneIcon/></Button></Tooltip>
                        :
                        null
                        }
                    </div>

                    <div className = "projectsAccordion">
                        <ExpansionPanel>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <p>Projects ({this.state.projects.length}):</p>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <div className = "projects">

                                    <div className = "addProjectButtonRow">
                                        <Button onClick = {this.handleClickOpen} className = "addProjectButton" color = "secondary" variant = "raised">Add Project</Button>
                                    </div>

                                    <div className = "projectTitle">
                                        <div className = "projectName top first">Name:</div>
                                        <div className = "projectType top">Hourly/Flat Rate:</div>
                                        <div className = "projectFee top last">Flat Fee:</div>
                                    </div>

                                    {Projects}
                                </div>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </div>

                    <div className = "addProjectModal">
                    <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="form-dialog-title"
                        >
                        <DialogTitle id="form-dialog-title">Add Project</DialogTitle>
                        <DialogContent>

                            <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Name"
                            fullWidth
                            onChange = {this.handleName}
                            value = {this.state.name}
                            />

                            <FormControl fullWidth>
                            <InputLabel htmlFor="role-simple">Type</InputLabel>
                            <Select
                                onChange={this.handleType}
                                value={this.state.type}
                                inputProps={{
                                name: 'Type',
                                }}
                                fullWidth
                            >
                                <MenuItem value="bill">Hourly</MenuItem>
                                <MenuItem value="flat">Flat Rate</MenuItem>
                                <MenuItem value="none">Non-Billing</MenuItem>
                            </Select>
                            </FormControl>
                            
                            {(this.state.type === "flat") ? 
                            <TextField
                            margin="dense"
                            id="fee"
                            label="Monthly Fee"
                            type="number"
                            fullWidth
                            onChange = {this.handleFlatFee}
                            value = {this.state.flatfee}
                            />
                            :
                            <TextField
                            margin="dense"
                            id="fee"
                            label="Monthly Fee"
                            type="number"
                            fullWidth
                            disabled
                            onChange = {this.handleFlatFee}
                            value = {this.state.flatfee}
                            />
                            }

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                            Cancel
                            </Button>
                            <Button onClick={this.addProject} color="primary">
                            Add
                            </Button>
                        </DialogActions>
                        </Dialog>
                </div>

                </div>

            </div>
        )
    }
}