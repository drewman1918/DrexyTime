import React, { Component } from 'react';
import axios from 'axios';
import Employee from './Employee';
import "./EmployeeManagement.css";

class EmployeeManagement extends Component{
    constructor(){
        super()

        this.state={
            employees: [],
            billingrate: 0,
            email: '',
            firstname: '',
            lastname: '',
            payrate: '',
            role: ''
        }
        this.getEmployees = this.getEmployees.bind(this);
        this.handleFirstName = this.handleFirstName.bind(this);
        this.handleLastName = this.handleLastName.bind(this);
        this.handleRole = this.handleRole.bind(this);
        this.handlePayRate = this.handlePayRate.bind(this);
        this.handleBillRate = this.handleBillRate.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
    }

    componentDidMount(){
        this.getEmployees();
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

    getEmployees(){
        axios.get('/api/employees')
            .then( res => {
                this.setState({
                    employees: res.data
                })
            });
    }
    
    render(){
        const employees = this.state.employees.map( employee => {
            return(
                <div key = {employee.employeeid}>
                    <Employee employeeInfo = {employee}/>
                </div>
            )
        })

        return(
            <div className = "employeeManagementContainer">
                <div className = "EMTitleContainer">
                    <h2><span className = "accent">Employee</span>Management</h2>
                </div>

                <div className = "addEmployee">
                    <h2>Add Employee</h2>
                    <div className = "addEmployeeInputFields">
                        <div><input onChange = {this.handleFirstName} value = {this.state.firstname}/></div>
                        <div><input onChange = {this.handleLastName}  value = {this.state.lastname}/></div>
                        <div>
                            <select value = {this.state.role} onChange = {this.handleRole}>
                                <option value ="admin">Admin</option>
                                <option value = "user">User</option>
                            </select>
                        </div>
                        <div><input onChange = {this.handlePayRate}  value = {this.state.payrate}/></div>
                        <div><input onChange = {this.handleBillRate}  value = {this.state.billingrate}/></div>
                        <div><input onChange = {this.handleEmail}  value = {this.state.email}/></div>
                    </div>
                    <button>Add</button>
                </div>

                <div className = "employees">
                    {employees}
                </div>
            </div>
        )
    }
}

export default EmployeeManagement;