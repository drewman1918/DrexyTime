import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import TodayMemo from './TodayMemo';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { getTodayMemos } from './../../ducks/memoReducer';
import "./MyTime.css";
import { Button } from '@material-ui/core';

class Today extends Component{
    constructor(){
        super()

        this.state = {
            loading: false,
            day: new Date()
        }
        this.getTodayMemos = this.getTodayMemos.bind(this);
        this.handleDay = this.handleDay.bind(this);
    }

    componentDidMount(){
        if(this.props.employeeid){
            this.getTodayMemos();
        }
        this.props.setBar();
    }

    componentDidUpdate(prevProps){
        if(prevProps.employeeid !== this.props.employeeid){
            this.getTodayMemos();
        }
    }

    getTodayMemos() {
        axios.get(`/api/memos/${this.props.employeeid}/${this.state.day.toDateString()}`)
            .then(res => {
                this.props.getTodayMemos(res.data)
            })
    }

    handleDay(day){
        this.setState({
            day: day
        })
    }
    
    render(){
        let memos = this.props.memos.map( memo => {
            return(
                <div key = {memo.memoid}>
                <TodayMemo getMemos = {this.getTodayMemos} date = {memo.date} memoid = {memo.memoid} projectName = {memo.name} memoHours = {memo.hours} memo = {memo.memo} client = {`${memo.lastname}, ${memo.firstname}`} />
                </div>
            )
        })

        return(
            <div>
                <div className = "dayPicker">

                        <div className = "picker">
                            <p>Choose Date:</p>
                            <DayPickerInput 
                                inputProps={{ style: { 
                                    width: "100%",  
                                    fontSize: "16px", 
                                    minHeight: "38px", 
                                    textAlign: "center",
                                    cursor: "pointer",
                                    outline: "none" } }} 
                                    placeholder = "Choose Start Date"
                                    value = {this.state.day}
                                    onDayChange = {this.handleDay}/>
                        </div>

                        <Button onClick = {this.getTodayMemos} variant = "raised" color = "secondary">Fetch Data</Button>
                </div>
                {memos}
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        employeeid: state.userReducer.employeeid,
        memos: state.memoReducer.todayMemos
    }
}

export default connect(mapStateToProps, {getTodayMemos})(Today);