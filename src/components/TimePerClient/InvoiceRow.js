import React, {Component} from 'react';
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
            clientid: ''
        }
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
    
    render(){

        const displayDate = this.state.date.slice(4, 15);

        return(
            <div className = "invoiceDataRow">
                            
                <div className = "invoiceMemo invoiceDataItem invoiceMemo">{this.state.memo}</div>

                <div className = "invoiceEmployee invoiceDataItem invoiceEmployee">{ `${this.state.employeeFirstName} ${this.state.employeeLastName}` }</div>

                <div className = "invoiceDate invoiceDataItem invoiceDate">{displayDate}</div>

                <div className = "invoiceHours invoiceDataItem invoiceHours">{Number(this.state.hours).toFixed(2)}</div>

                <div className = "invoiceRate invoiceDataItem invoiceRate">${this.state.billingrate}</div>

                <div className = "invoiceHours invoiceDataItem invoiceTotal">${(Number(this.state.hours).toFixed(2) * this.state.billingrate).toFixed(2)}</div>

            </div>
        )
    }
}



