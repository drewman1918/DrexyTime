import React, { Component } from 'react';
import TwoWeekHeading from './TwoWeekHeading';
import TwoWeekRow from './TwoWeekRow';
import axios from 'axios';
import TotalRow from "./TotalRow";
import _ from 'lodash';
import "./TwoWeek.css";

class TwoWeek extends Component{
    constructor(){
        super()
        
        let today = new Date();
        const arr = "12345678901234".split('');
        const dates = arr.map((_, i) => {
            let day = new Date();
            day.setDate(today.getDate() + (i - 13));
            return day
        })

        this.state = {
            dates,
            memos: [],
            totals: []
        }
        
        this.changeDate = this.changeDate.bind(this);
    }
    
    componentDidMount(){
        this.getMemos();
        this.getTotals();
        this.props.setBar();
    }

    setToday = () => {
        let today = new Date();
        const arr = "12345678901234".split('');
        const dates = arr.map((_, i) => {
            let day = new Date();
            day.setDate(today.getDate() + (i - 13));
            return day
        })

        this.setState({
            dates: dates
        }, () => {
            this.getMemos();
            this.getTotals();
        })
    }

    getMemos = () => {
        axios.get(`/api/twoweekmemos/${this.state.dates[0].toDateString()}/${this.state.dates[13].toDateString()}`)
            .then(res => {
                console.log(res.data);
                this.setState({
                    memos: res.data.map(memo => {
                        memo.date = new Date(memo.date)
                        memo.date.setMinutes(memo.date.getMinutes() - memo.date.getTimezoneOffset());
                        return memo
                    })
                })
            })
    }

    getTotals = () => {
        axios.get(`/api/twoweektotals/${this.state.dates[0].toDateString()}/${this.state.dates[13].toDateString()}`)
            .then(res => {
                console.log('totals', res.data)
                this.setState({
                    totals: res.data.map(total => {
                        total.date = new Date(total.date)
                        total.date.setMinutes(total.date.getMinutes() - total.date.getTimezoneOffset());
                        return total
                    })
                })
            })
    }

    changeDate(number) {
        var { dates } = this.state;
        var newDates = dates.map( date => {
            date.setDate(date.getDate() + number)
            return date;
        })
        this.setState({
            dates: newDates
        }, () => {
            this.getMemos();
            this.getTotals();
        })
    }
    
    render(){
        const memos = Object.values(_.groupBy(this.state.memos, "completename")).map( (x, index) => {
            return(
                <div key = {index}>
                    <TwoWeekRow state = {this.state} data = {x}/>
                </div>
            )
        
        })


        return(
            <div className = "twoWeekView">
                <TwoWeekHeading state={this.state} setToday={this.setToday} changeDate={this.changeDate}/>
                {memos}
                <TotalRow state = {this.state} data = {this.state.totals}/>
            </div>
        ) 
    }
}

export default TwoWeek;