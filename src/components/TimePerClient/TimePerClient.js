import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import Button from '@material-ui/core/Button';
import { getAllClients } from './../../ducks/clientReducer';
import axios from 'axios';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import InvoiceRow from './InvoiceRow';
import "./TimePerClient.css";
import ReactExport from "react-data-export";
import NotAllowed from './../NotAllowed/NotAllowed';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

class TimePerClient extends Component{
    constructor(){
        super()

        this.state = {
            clientID: '',
            startDate: new Date(),
            endDate: new Date(),
            memos: [],
            invoiceNumber: '',
            clientName: '',
            logo: ''
        }
        this.handleClient = this.handleClient.bind(this);
        this.handleDayChangeEnd = this.handleDayChangeEnd.bind(this);
        this.handleDayChangeStart = this.handleDayChangeStart.bind(this);
        this.getMemos = this.getMemos.bind(this);
        this.handleNumber = this.handleNumber.bind(this);
    }

    componentDidMount(){
        let today = new Date();
        let month = today.getMonth();
        let year = today.getFullYear();
        let firstDay = new Date(year, month, 1);
        let lastDay = new Date(year, month + 1, 0);
        this.setState({
            startDate: firstDay,
            endDate: lastDay
        })
        axios.get('/api/clients')
            .then( (res) => {
                this.props.getAllClients(res.data)
            })
        axios.get('/api/companylogo')
            .then(res => {
                this.setState({
                    logo: res.data[0].logo
                })
        })
    }

    getMemos(){
        axios.get(`/api/invoicememos/${this.state.clientID}/${this.state.startDate.toDateString()}/${this.state.endDate.toDateString()}`)
            .then( res => {
                this.setState({
                    memos: res.data,
                    clientName: `${res.data[0].lastname}, ${res.data[0].firstname}`
                })
            })
    }

    handleNumber(e){
        this.setState({
            invoiceNumber: e.target.value
        })
    }

    handleClient(target){
        this.setState({
            clientID: target.value
        });
    }

    handleDayChangeStart(day){
        this.setState({
            startDate: day
        })
    }

    handleDayChangeEnd(day){
        this.setState({
            endDate: day
        })
    }
    
    render(){
        const clientOptions = this.props.clients.map( client => {
            return { 
                label: `${client.lastname}, ${client.firstname}`, value: client.clientid
            }
        });

        const today = new Date().toDateString().slice(4, 15);

        const memos = this.state.memos.map( memo => {
            return(
                <div key = {memo.memoid}>
                    <InvoiceRow getMemosFn = {this.getMemos} data = {memo}/>
                </div>
            )
        })

        const sum = this.state.memos.reduce( (acc, curr) => {
            return(
                acc += curr.hours * curr.billingrate
            )
        }, 0 ).toFixed(2)

        const practice = this.state.memos.map( memo => {
            const name = `${memo.employee_firstname} ${memo.employee_lastname}`;
            const total = Number(memo.hours) * Number(memo.billingrate);
            return [memo.memo, name, memo.date, memo.hours, memo.billingrate, total]
        })

        const invoiceDataSet = [
            {
                columns: ["Date", "Staff", "Project", "Memo", "Hours", "Rate/Hr", "Total"],
                data:
                    this.state.memos.map( memo => {
                        const name = `${memo.employee_firstname} ${memo.employee_lastname}`;
                        const total = Number(memo.hours) * Number(memo.billingrate);
                        return [memo.date.slice(0,10), name, memo.projectname, memo.memo, memo.hours, memo.billingrate, total] })
            }
        ]

        return(
            <div className = "timePerClientContainer">
                {(this.props.role !== 'admin') ? <NotAllowed/> : 
                <div>
                <div className = "myTime">
                    <div className = "titleContainer">
                        <h2><span className = "accent">Client</span>Invoicing</h2>
                    </div>
                </div>

                <div className = "clientInvoicingContainer">

                    <div className = "parameters">

                        <div className = "selectContainer">
                            <Select className = "clientSelector" styles = { {control: styles => ({...styles, backgroundColor: 'white'})} } options = {clientOptions} placeholder = "Select Client" onChange = {this.handleClient}/>
                        </div>

                        <div className = "clientDatePickers">
                            <div>
                                <p>Start Date:</p>
                                <DayPickerInput 
                                            inputProps={{ style: { 
                                                width: "100%",  
                                                fontSize: "16px", 
                                                minHeight: "38px", 
                                                textAlign: "center",
                                                cursor: "pointer",
                                                outline: "none" } }} 
                                                placeholder = "Choose Start Date"
                                                value = {this.state.startDate}
                                                onDayChange = {this.handleDayChangeStart}/>
                            </div>

                            <div className = "bottom">
                            <p>End Date:</p>
                                <DayPickerInput 
                                            inputProps={{ style: { 
                                                width: "100%",  
                                                fontSize: "16px", 
                                                minHeight: "38px", 
                                                textAlign: "center",
                                                cursor: "pointer",
                                                outline: "none" } }} 
                                                placeholder = "Choose End Date"
                                                value = {this.state.endDate}
                                                onDayChange = {this.handleDayChangeEnd}/>
                            </div>
                        </div>
                    
                        <div className = "clientFetchButtonContainer">
                            <Button onClick = {this.getMemos} variant = "raised" color = "secondary" className = "clientFetchButton">Fetch Data</Button>
                        </div>

                    </div>

                    <div className = "invoice">
                    
                        <div className = "invoiceRow1">
                        
                            <div className = "invoiceAndInfo">
                                <h2>Invoice</h2>
                                <h3>Bill To: {this.state.clientName}</h3>
                                <h3>Date: {today}</h3>
                                <div className = "invoiceNumber">
                                    <h3>Invoice Number: </h3> <input value = {this.state.invoiceNumber} onChange = {this.handleNumber} />
                                </div>
                            </div>

                            <div className = "companyLogo">
                                <img src = {this.state.logo} alt = "company Logo" />
                            </div>
                        
                        </div>

                        <div className = "invoiceData">
                            
                            <div className = "invoiceHeaderRow">
                            
                                <div className = "invoiceDate invoiceHeader">Date</div>

                                <div className = "invoiceEmployee invoiceHeader">Staff</div>

                                <div className = "invoiceMemo invoiceHeader">Project</div>

                                <div className = "invoiceMemo invoiceHeader">Memo</div>

                                <div className = "invoiceHours invoiceHeader">Hours</div>

                                <div className = "invoiceRate invoiceHeader">Rate/Hr</div>

                                <div className = "invoiceHours invoiceHeader">Total</div>

                            </div>

                            {memos}

                            <div className = "invoiceTotalsRow">
                            
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div className = "invoiceTotals invoiceTotalTitle">Total:</div>
                                <div className = "invoiceTotals invoiceTotalSum">${sum}</div>
                            
                            </div>

                        </div>
                    
                    </div>

                
                </div>

                <div className = "downloadInvoiceButtons">
                    <div className = "excel">
                        <ExcelFile filename = {`${this.state.clientName}_${this.state.startDate.toDateString().slice(4, 15)}_to_${this.state.endDate.toDateString().slice(4, 15)}`} 
                                   element = {<Button variant = "raised" color = "primary">Download Data to Excel</Button>}>
                            <ExcelSheet 
                            dataSet = {invoiceDataSet} 
                            name = {new Date().toDateString().slice(4, 15)}
                            />
                        </ExcelFile>
                    </div>
                </div>
            </div>}
            </div>

        )
    }
}

function mapStateToProps(state){
    return{
        clients: state.clientReducer.clients,
        role: state.userReducer.role
    }
}

const actions = {
    getAllClients
}

export default connect(mapStateToProps, actions)(TimePerClient);