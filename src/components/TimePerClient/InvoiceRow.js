import React, {Component} from 'react';
import './TimePerClient.css';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { Button } from '@material-ui/core';

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
            open: false
        }
        this.handleClickOpen = this.handleClickOpen.bind(this);
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
            clientid: data.clientid
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
    
    render(){

        const displayDate = this.state.date.slice(4, 15);

        return(
            <div onDoubleClick = { this.handleClickOpen }className = "invoiceDataRow">
                            
                <div className = "invoiceMemo invoiceDataItem invoiceMemo">{this.state.memo}</div>

                <div className = "invoiceEmployee invoiceDataItem invoiceEmployee">{ `${this.state.employeeFirstName} ${this.state.employeeLastName}` }</div>

                <div className = "invoiceDate invoiceDataItem invoiceDate">{displayDate}</div>

                <div className = "invoiceHours invoiceDataItem invoiceHours">{Number(this.state.hours).toFixed(2)}</div>

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

                            <div className = "editMemoModal">
                                <textarea value = {this.state.memo}/>
                            </div>

                            <FormControl fullWidth>
                            <InputLabel htmlFor="role-simple">Employee</InputLabel>
                            <Select
                                inputProps={{
                                name: 'Employee',
                                }}
                                fullWidth
                            >
                                <MenuItem value="bill">Hourly</MenuItem>
                                <MenuItem value="flat">Flat Rate</MenuItem>
                                <MenuItem value="none">Non-Billing</MenuItem>
                            </Select>
                            </FormControl>

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
        )
    }
}



