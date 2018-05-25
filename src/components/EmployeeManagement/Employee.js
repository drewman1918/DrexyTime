import React, { Component } from 'react';
import axios from 'axios';
import "./EmployeeManagement.css";

export default class Employee extends Component{
    constructor(){
        super()

        this.state = {
            billingrate: 0,
            email: '',
            firstname: '',
            lastname: '',
            payrate: '',
            role: ''
        }
        this.handleFirstName = this.handleFirstName.bind(this);
        this.handleLastName = this.handleLastName.bind(this);
        this.handleRole = this.handleRole.bind(this);
        this.handlePayRate = this.handlePayRate.bind(this);
        this.handleBillRate = this.handleBillRate.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.updateEmployee = this.updateEmployee.bind(this);
    }

    componentDidMount(){
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
            .then(() => console.log('success'))
    }

    render(){
        return(
            <div className = "employeeInfo">

                <div className = "employeeName">
                    <h2>{this.state.firstname} {this.state.lastname}</h2>
                </div>

                <div className = "employeeTableContainer">
                    <div className = "tableHeader first">First</div>
                    <div className = "tableHeader">Last</div>
                    <div className = "tableHeader">Role</div>
                    <div className = "tableHeader">Pay Rate</div>
                    <div className = "tableHeader">Bill Rate</div>
                    <div className = "tableHeader last">Email</div>
                    <div className = "tableCell first"><input onChange = {this.handleFirstName} value = {this.state.firstname}/></div>
                    <div className = "tableCell"><input onChange = {this.handleLastName}  value = {this.state.lastname}/></div>
                    <div className = "tableCell role">
                        <select value = {this.state.role} onChange = {this.handleRole}>
                            <option value ="admin">Admin</option>
                            <option value = "user">User</option>
                        </select>
                    </div>
                    <div className = "tableCell"><input onChange = {this.handlePayRate}  value = {this.state.payrate}/></div>
                    <div className = "tableCell"><input onChange = {this.handleBillRate}  value = {this.state.billingrate}/></div>
                    <div className = "tableCell last"><input onChange = {this.handleEmail}  value = {this.state.email}/></div>
                </div>
                <button onClick = {this.updateEmployee}>Update</button>



            </div>
        )
    }
}