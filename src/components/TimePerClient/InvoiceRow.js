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
            open: false
        }
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleHours = this.handleHours.bind(this);
        this.updateMemo = this.updateMemo.bind(this);
        this.deleteMemo = this.deleteMemo.bind(this);
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
    }

    getEmployees(){
        axios.get('/api/employees')
            .then( res => {
                this.setState({
                    employees: res.data
                })
            });
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

    handleHours(e){
        this.setState({
            hours: e.target.value
        })
    }

    updateMemo(){
        axios.put(`/api/invoicememos/${this.state.memoid}`, {memo: this.state.memo, employeeid: this.state.employeeid, hours: this.state.hours})
            .then( () => {
                this.handleClose();
            })
    }
    
    render(){
        const displayDate = this.state.date.slice(4, 15);

        const employeeOptions = this.state.employees.map( employee => {
            return(
                    <option key = {employee.employeeid} value = {employee.employeeid}>{employee.firstname} {employee.lastname}</option>
            )
        })

        return(
            <div onDoubleClick = { this.handleClickOpen }className = "invoiceDataRow">

                <Tooltip title = "Double click to edit!"><div className = "invoiceMemo invoiceDataItem invoiceMemo">{this.state.memo}</div></Tooltip>

                <Tooltip title = "Double click to edit!"><div className = "invoiceEmployee invoiceDataItem invoiceEmployee">{ `${this.state.employeeFirstName} ${this.state.employeeLastName}` }</div></Tooltip>

                <div className = "invoiceDate invoiceDataItem invoiceDate">{displayDate}</div>

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
                            <div className = "editMemoModal">
                                <h3>Memo:</h3>
                                <textarea value = {this.state.memo} onChange = {this.handleMemo}/>
                            </div>
                            
                            <div className = "modalContentContainer">
                                <h3>Employee:</h3>
                                <div className = "invoiceModalSelect">
                                    <select onChange = {this.handleEmployee} value = {this.state.employeeid}>
                                        {employeeOptions}
                                    </select>
                                </div>
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
                            <Button onClick={this.handleClose} color="primary">
                            Cancel
                            </Button>
                            <Button onClick={this.deleteMemo} color="primary">
                            Delete
                            </Button>
                            <Button onClick={this.updateMemo} color="primary">
                            Edit
                            </Button>
                        </DialogActions>
                        </Dialog>
                </div>

            </div>
        )
    }
}



