import React, { Component } from 'react';
import axios from 'axios';
import Employee from './Employee';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import "./EmployeeManagement.css";

class EmployeeManagement extends Component{
    constructor(){
        super()

        this.state={
            employees: [],
            billingrate: '',
            email: '',
            firstname: '',
            lastname: '',
            payrate: '',
            role: '',
            open: false
        }
        this.getEmployees = this.getEmployees.bind(this);
        this.handleFirstName = this.handleFirstName.bind(this);
        this.handleLastName = this.handleLastName.bind(this);
        this.handleRole = this.handleRole.bind(this);
        this.handlePayRate = this.handlePayRate.bind(this);
        this.handleBillRate = this.handleBillRate.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.addEmployee = this.addEmployee.bind(this);
    }

    componentDidMount(){
        this.getEmployees();
    }

    handleClickOpen = () => {
        this.setState({ open: true });
      };
    
      handleClose = () => {
        this.setState({
            billingrate: '',
            email: '',
            firstname: '',
            lastname: '',
            payrate: '',
            role: '',
            open: false
        });
      };

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

    addEmployee(){
        axios.post('/api/employees', {email: this.state.email, firstname: this.state.firstname, lastname: this.state.lastname, billingrate: this.state.billingrate, payrate: this.state.payrate, role: this.state.role})
            .then( () => {
                this.getEmployees();
                this.handleClose();
            })
        
    }
    
    render(){
        const employees = this.state.employees.map( employee => {
            return(
                <div key = {employee.employeeid}>
                    <Employee getEmployeesFn = {this.getEmployees} employeeInfo = {employee}/>
                </div>
            )
        })

        return(
            <div className = "employeeManagementContainer">
                <div className = "EMTitleContainer">
                    <h2><span className = "accent">User</span>Management</h2>
                </div>

                <div>
                    <div className = "addEmployeeContainer">
                        
                        <div className = "addEmployee">
                            <Button variant = "raised" color = "secondary" onClick={this.handleClickOpen}>Add Employee</Button>
                        </div>

                    </div>

                    <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                    >
                    <DialogTitle id="form-dialog-title">Add Employee</DialogTitle>
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

                        <FormControl fullWidth>
                        <InputLabel htmlFor="role-simple">Role</InputLabel>
                        <Select
                            value={this.state.role}
                            onChange={this.handleRole}
                            inputProps={{
                            name: 'Role',
                            }}
                            fullWidth
                        >
                            <MenuItem value="admin">Admin</MenuItem>
                            <MenuItem value="user">User</MenuItem>
                        </Select>
                        </FormControl>

                        <TextField
                        margin="dense"
                        id="name"
                        label="Pay Rate"
                        fullWidth
                        value = {this.state.payrate}
                        onChange = {this.handlePayRate}
                        />

                        <TextField
                        margin="dense"
                        id="name"
                        label="Bill Rate"
                        fullWidth
                        value = {this.state.billingrate}
                        onChange = {this.handleBillRate}
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
                        <Button onClick={this.addEmployee} color="primary">
                        Add
                        </Button>
                    </DialogActions>
                    </Dialog>
                </div>

                <div className = "employees">
                    {employees}
                </div>
            </div>
        )
    }
}

export default EmployeeManagement;