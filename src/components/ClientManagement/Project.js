import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import "./ClientManagement.css";

export default class Project extends Component{
    constructor(){
        super()

        this.state = {
            name: '',
            type: '',
            flatfee: '',
            editing: false
        }
        this.handleFlatFee = this.handleFlatFee.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleType = this.handleType.bind(this);
        this.editingFalse = this.editingFalse.bind(this);
        this.editingTrue = this.editingTrue.bind(this);
        this.stateOriginSet = this.stateOriginSet.bind(this);
        this.deleteProject = this.deleteProject.bind(this);
        this.editProject = this.editProject.bind(this);
    }

    componentDidMount(){
        this.stateOriginSet();
    }

    stateOriginSet(){
        const { name, type, flatfee } = this.props;
        this.setState({
            name,
            type,
            flatfee,
            editing: false
        })
    }

    editingFalse(){
        this.setState({
            editing: false 
        });
    }

    editingTrue(){
        this.setState({
            editing: true 
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

    deleteProject(){
        axios.delete(`/api/projects/${this.props.projectid}`)
            .then( () => {
                this.props.getProjectsFn();
            })
    }

    editProject(){
        axios.put(`/api/projects/${this.props.projectid}`, {name: this.state.name, type: this.state.type, flatfee: this.state.flatfee})
            .then( () => {
                this.props.getProjectsFn();
                this.editingFalse();
            })
    }

    render(){
        return(
            <div>
            <div className = "project">
                
                <div className = "projectName bottom first deleteCell">
                    <DeleteIcon onClick = {this.deleteProject} className = "deleteIcon"/>
                    <input onClick = {this.editingTrue} onChange = {this.handleName} value = {this.state.name}/>
                </div>
                
                <div className = "projectType Bottom">
                    <select onClick = {this.editingTrue} onChange = {this.handleType} value = {this.state.type}>
                        <option value ="bill">Hourly</option>
                        <option value = "flat">Flat Rate</option>
                        <option value = "none">Non-Billing</option>
                    </select>
                </div>
                
                <div className = "projectFee bottom last">

                    {(this.state.type === 'flat') ?
                    <input onClick = {this.editingTrue} onChange = {this.handleFlatFee} value = {this.state.flatfee || ''}/>
                    :
                    <input value = '' disabled = {true} placeholder = "N/A"/>
                    }

                </div>

            </div>

            <div>
                {(this.state.editing === true) ?
                <div>
                    <Button className = "projectEditButton" variant = "outlined" color = "secondary"  onClick = {this.stateOriginSet}>Cancel</Button>
                    <Button className = "projectEditButton" variant = "outlined" color = "primary"  onClick = {this.editProject}>Update</Button>
                </div>
                :
                null
                }
            </div>
            </div>
        )
    }
}