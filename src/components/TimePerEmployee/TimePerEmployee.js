import DayPickerInput from 'react-day-picker/DayPickerInput';
import Button from '@material-ui/core/Button';
import React, { Component } from 'react';
import "./TimePerEmployee.css";
import axios from 'axios';
import { Pie } from 'react-chartjs-2';

class TimePerEmployee extends Component{
    constructor(){
        super()

        this.state = {
            dateStart: new Date(),
            dateEnd: new Date(),
            employees: [],
            mainData: []
        }
        this.handleDayChangeEnd = this.handleDayChangeEnd.bind(this);
        this.handleDayChangeStart = this.handleDayChangeStart.bind(this);
        this.getEmployees = this.getEmployees.bind(this);
        this.getMainData = this.getMainData.bind(this);
    }

    componentDidMount(){
        let today = new Date();
        let month = today.getMonth();
        let year = today.getFullYear();
        let firstDay = new Date(year, month, 1);
        let lastDay = new Date(year, month + 1, 0);
        this.setState({
            dateStart: firstDay,
            dateEnd: lastDay
        })
        this.getEmployees();
    }

    getEmployees(){
        axios.get('/api/employees')
            .then( res => {
                this.setState({
                    employees: res.data
                })
                this.getMainData();
            });
    }

    getMainData(){
        axios.get(`/api/maindata/${this.state.dateStart.toDateString()}/${this.state.dateEnd.toDateString()}`)
            .then( res => {
                this.setState({
                    mainData: res.data
                })
            });
    }

    handleDayChangeStart(day){
        this.setState({
            dateStart: day
        })
    }

    handleDayChangeEnd(day){
        this.setState({
            dateEnd: day
        })
    }
    
    render(){
        //This generates the list of employees instead of using a different component to do it, since none of this data will be editable.
        const employees = this.state.employees.map( employee => {

            const mainData = this.state.mainData.filter( entry => entry.employeeid == employee.employeeid)
            const billableHours = mainData.filter(x => x.type == 'bill').map(x => x.totalhours);
            const myData = mainData.map(x => x.totalhours)
            const totalHours = myData.reduce( (agg, curr) => agg+=curr, 0 );

            const data = {
                labels: ['Billable Hours', 'Flat-Rate Hours', 'Non-Earning Hours'],
                datasets: [{
                    data: [...myData],
                    backgroundColor: ['#4caf50', '#ffeb3b', '#b71c1c'],
                    hoverBackgroundColor: ['#98ee99', '#ffff72', '#f05545']
                }],
            };

            return(
                <div className = "employeeData" key = {employee.employeeid}>
                    <div className = "employeeName">
                        <h3>{`${employee.firstname} ${employee.lastname}`}</h3>
                    </div>

                    <div className = "employeeTimeRow">

                        <div className = "left">

                            <div className = "payRate">
                                    <p>Pay Rate: ${employee.payrate}</p>
                            </div>

                            <div className = "billRate">
                                    <p>Bill Rate: ${employee.billingrate}</p>
                            </div>

                            <div className = "employeeEarnings">
                                    <p>Wages to Employee: ${(employee.payrate * totalHours).toFixed(2)}</p>
                            </div>

                            <div className = "companyEarnings">
                                    <p>Income from Employee: ${(employee.billingrate * billableHours).toFixed(2)}</p>
                            </div>

                        </div>

                        <div className = "right">
                                <Pie data = {data}/>
                        </div>

                    </div>

                </div>
            )
        })

        return(
            <div className = "timePerEmployeeContainer">

                <div className = "myTime">
                    <div className = "titleContainer">
                        <h2><span className = "accent">Employee</span>Statistics</h2>
                    </div>
                </div>

                <div className = "datePickers">
                    <div className = "startDate">
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
                                        value = {this.state.dateStart}
                                        onDayChange = {this.handleDayChangeStart}/>
                    </div>

                    <div className = "endDate">
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
                                        value = {this.state.dateEnd}
                                        onDayChange = {this.handleDayChangeEnd}/>
                    </div>
                    
                    <Button className = "fetchButton" color = "secondary" variant = "raised" onClick = {this.getMainData}>Fetch Data</Button>

                </div>
                
                <div>
                    {employees}
                </div>

            </div>
        )
    }
}

export default TimePerEmployee;