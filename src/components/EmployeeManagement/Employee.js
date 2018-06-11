import React, { Component } from 'react';
import axios from 'axios';
import ClearIcon from '@material-ui/icons/Clear';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import DeleteConfirm from './../DeleteConfirm/DeleteConfirm';
import "./EmployeeManagement.css";

export default class Employee extends Component{
    constructor(){
        super()

        this.state = {
            billingrate: '',
            email: '',
            firstname: '',
            lastname: '',
            payrate: '',
            role: '',
            editing: false,
            confirmOpen: false
        }
        this.handleFirstName = this.handleFirstName.bind(this);
        this.handleLastName = this.handleLastName.bind(this);
        this.handleRole = this.handleRole.bind(this);
        this.handlePayRate = this.handlePayRate.bind(this);
        this.handleBillRate = this.handleBillRate.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.updateEmployee = this.updateEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
        this.editingFalse = this.editingFalse.bind(this);
        this.editingTrue = this.editingTrue.bind(this);
        this.stateOriginSet = this.stateOriginSet.bind(this);
    }

    componentDidMount(){
        this.stateOriginSet();
    }

    handleConfirmOpen = () => {
        this.setState({
            confirmOpen: true
        })
    }

    handleClose = () => {
        this.setState({
            confirmOpen: false
        })
    }

    stateOriginSet(){
        const { billingrate, email, firstname, lastname, payrate, role } = this.props.employeeInfo;
        
        this.setState({
            billingrate,
            email,
            firstname,
            lastname,
            payrate,
            role
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

    handleRole(e){
        this.setState({
            role: e.target.value
        })
    }

    handlePayRate(e){
        this.setState({
            payrate: e.target.value
        })
    }

    handleBillRate(e){
        this.setState({
            billingrate: e.target.value
        })
    }

    handleEmail(e){
        this.setState({
            email: e.target.value
        })
    }

    updateEmployee(){
        axios.put(`/api/employees/${this.props.employeeInfo.employeeid}`, {firstname: this.state.firstname, lastname: this.state.lastname, role: this.state.role, payrate: this.state.payrate, billingrate: this.state.billingrate, email: this.state.email})
            .then(() => {
                this.setState({
                    editing: false
                })
            })
    }

    deleteEmployee(){
        axios.delete(`/api/employees/${this.props.employeeInfo.employeeid}`)
            .then(() => {
                this.props.getEmployeesFn()
            })
    }

    editingTrue(){
        this.setState({
            editing: true 
        })
    }

    editingFalse(){
        this.setState({
            editing: false 
        });
        this.stateOriginSet();
    }

    render(){
        return(
            <div className = "employeeInfo">

                <DeleteConfirm dialogueTitle="Are you sure?" dialogueText="This will permanently delete this employee, and all data associated with it, including past memos."
                    handleClose={this.handleClose} confirmFunction={this.deleteEmployee} open={this.state.confirmOpen} />

                <div className = "employeeName">
                    <h2>{this.state.firstname} {this.state.lastname}</h2>
                    <div className = "deleteIcon"><Tooltip title = "Delete Employee"><ClearIcon onClick = {this.handleConfirmOpen}/></Tooltip></div>
                </div>

                <div className = "employeeTableContainer">
                    <div className = "tableHeader first">First</div>
                    <div className = "tableHeader">Last</div>
                    <div className = "tableHeader">Role</div>
                    <div className = "tableHeader">Pay Rate</div>
                    <div className = "tableHeader">Bill Rate</div>
                    <div className = "tableHeader last">Email</div>
                    <div className = "tableCell first"><input onChange = {this.handleFirstName} value = {this.state.firstname} onClick = {this.editingTrue}/></div>
                    <div className = "tableCell"><input onChange = {this.handleLastName}  value = {this.state.lastname} onClick = {this.editingTrue}/></div>
                    <div className = "tableCell role">
                        <select value = {this.state.role} onChange = {this.handleRole} onClick = {this.editingTrue}>
                            <option value ="admin">Admin</option>
                            <option value = "user">User</option>
                        </select>
                    </div>
                    <div className = "tableCell"><input onChange = {this.handlePayRate}  value = {this.state.payrate} onClick = {this.editingTrue}/></div>
                    <div className = "tableCell"><input onChange = {this.handleBillRate}  value = {this.state.billingrate} onClick = {this.editingTrue}/></div>
                    <div className = "tableCell last"><input onChange = {this.handleEmail}  value = {this.state.email} onClick = {this.editingTrue}/></div>
                </div>

                {(this.state.editing === true) ?
                <div>
                    <Button className = "editingButton" variant = "outlined" color = "secondary"  onClick = {this.editingFalse}>Cancel</Button>
                    <Button className = "editingButton" variant = "outlined" color = "primary"  onClick = {this.updateEmployee}>Update</Button>
                </div>
                :
                null
                }



            </div>
        )
    }
}