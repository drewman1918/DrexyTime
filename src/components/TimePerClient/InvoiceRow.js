import React, {Component} from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button } from '@material-ui/core';
import axios from 'axios';
import './TimePerClient.css';


export default class InvoiceRow extends Component {
    constructor(){
        super()

        this.state = {
            memo: '',
            employeeFirstName: '',
            employeeLastName: '',
            projectName: '',
            hours: '',
            date: '',
            billingrate: '',
            memoid: '',
            projectid: '',
            employeeid: '',
            clientid: '',
            employees: [],
            projects: [],
            open: false
        }
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleHours = this.handleHours.bind(this);
        this.updateMemo = this.updateMemo.bind(this);
        this.deleteMemo = this.deleteMemo.bind(this);
        this.getProjects = this.getProjects.bind(this);
        this.resetState = this.resetState.bind(this);
    }

    componentDidMount(){
        const { data } = this.props;
        this.setState({
            memo: data.memo,
            employeeFirstName: data.employee_firstname,
            employeeLastName: data.employee_lastname,
            projectName: data.projectname,
            hours: data.hours,
            date: new Date(data.date).toDateString(),
            billingrate: data.billingrate,
            memoid: data.memoid,
            projectid: data.projectid,
            employeeid: data.employeeid,
            clientid: data.clientid,
        })
        this.getEmployees();
        this.getProjects();
    }

    resetState(){
        const { data } = this.props;
        this.setState({
            memo: data.memo,
            employeeFirstName: data.employee_firstname,
            employeeLastName: data.employee_lastname,
            projectName: data.projectname,
            hours: data.hours,
            projectid: data.projectid,
            employeeid: data.employeeid,
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

    getProjects(){
        axios.get(`/api/projects/${this.props.data.clientid}`)
        .then( res => {
            this.setState({
                projects: res.data
            })
        })
    }

    deleteMemo(){
        axios.delete(`/api/memos/${this.state.memoid}`)
            .then( () => {
                this.handleClose();
                this.props.getMemosFn();
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
        });
        this.resetState();
    }

    handleMemo = (e) => {
        this.setState({
            memo: e.target.value
        })
    }

    handleEmployee = (e) => {
        const employee = this.state.employees.filter( employee => employee.employeeid == e.target.value)
        const { firstname, lastname } = employee[0]
        
        this.setState({
            employeeid: e.target.value,
            employeeFirstName: firstname,
            employeeLastName: lastname
        });
    }

    handleProject = (e) => {
        const project = this.state.projects.filter( project => project.projectid == e.target.value);
        const { name } = project[0]

        this.setState({
            projectid: e.target.value,
            projectName: name
        })
    }

    handleHours(e){
        this.setState({
            hours: e.target.value
        })
    }

    updateMemo(){
        axios.put(`/api/invoicememos/${this.state.memoid}`, {memo: this.state.memo, employeeid: this.state.employeeid, hours: this.state.hours, projectid: this.state.projectid})
            .then( () => {
                this.setState({
                    open: false
                });
            })
    }
    
    render() {
        console.log('Invoice Row State', this.state);
        const displayDate = this.state.date.slice(4, 15);
        console.log(displayDate);

        const employeeOptions = this.state.employees.map( employee => {
            return(
                    <option key = {employee.employeeid} value = {employee.employeeid}>{employee.firstname} {employee.lastname}</option>
            )
        })

        const projectOptions = this.state.projects.map( project => {
            return(
                <option key = {project.projectid} value = {project.projectid}>{project.name}</option>
            )
        })


        return(
            <div onDoubleClick = { this.handleClickOpen }className = "invoiceDataRow">

                <div className = "invoiceDate invoiceDataItem invoiceDate">{displayDate}</div>

                <Tooltip title = "Double click to edit!"><div className = "invoiceEmployee invoiceDataItem invoiceEmployee">{ `${this.state.employeeFirstName} ${this.state.employeeLastName}` }</div></Tooltip>

                <Tooltip title = "Double click to edit!"><div className = "invoiceEmployee invoiceDataItem invoiceProject">{ this.state.projectName }</div></Tooltip>

                <Tooltip title = "Double click to edit!"><div className = "invoiceMemo invoiceDataItem invoiceMemo">{this.state.memo}</div></Tooltip>

                <Tooltip title = "Double click to edit!"><div className = "invoiceHours invoiceDataItem invoiceHours">{Number(this.state.hours).toFixed(2)}</div></Tooltip>

                <div className = "invoiceRate invoiceDataItem invoiceRate">${this.state.billingrate}</div>

                <div className = "invoiceHours invoiceDataItem invoiceTotal">${(Number(this.state.hours).toFixed(2) * this.state.billingrate).toFixed(2)}</div>

                <div className = "invoicingModal">
                    <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="form-dialog-title"
                        >
                        <DialogTitle id="form-dialog-title">Edit Memo</DialogTitle>
                        <DialogContent>

                        <div className = "invoiceModalContent">
                            
                            <div className = "modalContentContainer">
                                <h3>Staff:</h3>
                                <div className = "invoiceModalSelect">
                                    <select onChange = {this.handleEmployee} value = {this.state.employeeid}>
                                        {employeeOptions}
                                    </select>
                                </div>
                            </div>

                            <div className = "modalContentContainer">
                                <h3>Project:</h3>
                                <div className = "invoiceModalSelect">
                                    <select onChange = {this.handleProject} value = {this.state.projectid}>
                                        {projectOptions}
                                    </select>
                                </div>
                            </div>

                            <div className = "editMemoModal">
                                <h3>Memo:</h3>
                                <textarea value = {this.state.memo} onChange = {this.handleMemo}/>
                            </div>
                            
                            <div className = "modalContentContainer">
                                <h3>Hours:</h3>
                                <div className = "editHoursModal">
                                    <input type = "number" value = {this.state.hours} onChange = {this.handleHours} step = "0.01"/>
                                </div>
                            </div>
                        </div>

                        </DialogContent>
                        <DialogActions>
                            <div className = "editInvoiceModalButtons">
                                <Button onClick={this.handleClose} color="secondary">
                                Cancel
                                </Button>
                                <Button onClick={this.deleteMemo} color="secondary" variant = "raised">
                                Delete
                                </Button>
                                <Button onClick={this.updateMemo} color="primary">
                                Edit
                                </Button>
                            </div>
                        </DialogActions>
                        </Dialog>
                </div>

            </div>
        )
    }
}



