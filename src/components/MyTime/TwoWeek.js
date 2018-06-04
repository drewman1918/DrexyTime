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

        this.state = {
            one: new Date(),
            two: new Date(),
            three: new Date(),
            four: new Date(),
            five: new Date(),
            six: new Date(),
            seven: new Date(),
            eight: new Date(),
            nine: new Date(),
            ten: new Date(),
            eleven: new Date(),
            twelve: new Date(),
            thirteen: new Date(),
            fourteen: new Date(),
            memos: [],
            totals: []
        }
        this.backTwoWeeks = this.backTwoWeeks.bind(this);
        this.backOneDay = this.backOneDay.bind(this);
        this.forwardOneDay = this.forwardOneDay.bind(this);
        this.forwardTwoWeeks = this.forwardTwoWeeks.bind(this);
        this.setToday = this.setToday.bind(this);
        this.getMemos = this.getMemos.bind(this);
        this.getTotals = this.getTotals.bind(this);
    }
    
    componentDidMount(){
        this.setToday();
        this.props.setBar();
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.one !== this.state.one){
            this.getMemos();
            this.getTotals();
        }
    }

    getMemos(){
        axios.get(`/api/twoweekmemos/${this.state.one.toDateString()}/${this.state.fourteen.toDateString()}`)
            .then(res => this.setState({memos: res.data}))
    }

    getTotals(){
        axios.get(`/api/twoweektotals/${this.state.one.toDateString()}/${this.state.fourteen.toDateString()}`)
            .then(res => this.setState({totals: res.data}))
    }

    setToday(){
        const fourteen = new Date();
        let month = fourteen.getMonth();
        let year = fourteen.getFullYear();
        let day = fourteen.getDate();
        const one = new Date(year, month, day - 13 );
        const two = new Date(year, month, day - 12 );
        const three = new Date(year, month, day - 11 );
        const four = new Date(year, month, day - 10 );
        const five = new Date(year, month, day - 9 );
        const six = new Date(year, month, day - 8 );
        const seven = new Date(year, month, day - 7 );
        const eight = new Date(year, month, day - 6 );
        const nine = new Date(year, month, day - 5 );
        const ten = new Date(year, month, day - 4 );
        const eleven = new Date(year, month, day - 3 );
        const twelve = new Date(year, month, day - 2 );
        const thirteen = new Date(year, month, day - 1 );
        this.setState({
            one,
            two,
            three,
            four,
            five,
            six,
            seven,
            eight,
            nine,
            ten,
            eleven,
            twelve,
            thirteen,
            fourteen: fourteen
        })
        this.getMemos();
    }

    backTwoWeeks(){
        var { one, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve, thirteen, fourteen } = this.state
        one.setDate(one.getDate() - 14 );
        two.setDate(two.getDate() - 14 );
        three.setDate(three.getDate() - 14 );
        four.setDate(four.getDate() - 14 );
        five.setDate(five.getDate() - 14 );
        six.setDate(six.getDate() - 14 );
        seven.setDate(seven.getDate() - 14 );
        eight.setDate(eight.getDate() - 14 );
        nine.setDate(nine.getDate() - 14 );
        ten.setDate(ten.getDate() - 14 );
        eleven.setDate(eleven.getDate() - 14 );
        twelve.setDate(twelve.getDate() - 14 );
        thirteen.setDate(thirteen.getDate() - 14 );
        fourteen.setDate(fourteen.getDate() - 14 );
        this.setState({
            one,
            two,
            three,
            four,
            five,
            six,
            seven,
            eight,
            nine,
            ten,
            eleven,
            twelve,
            thirteen,
            fourteen
        })
        this.getMemos();
    }

    backOneDay(){
        var { one, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve, thirteen, fourteen } = this.state
        one.setDate(one.getDate() - 1 );
        two.setDate(two.getDate() - 1 );
        three.setDate(three.getDate() - 1 );
        four.setDate(four.getDate() - 1 );
        five.setDate(five.getDate() - 1 );
        six.setDate(six.getDate() - 1 );
        seven.setDate(seven.getDate() - 1 );
        eight.setDate(eight.getDate() - 1 );
        nine.setDate(nine.getDate() - 1 );
        ten.setDate(ten.getDate() - 1 );
        eleven.setDate(eleven.getDate() - 1 );
        twelve.setDate(twelve.getDate() - 1 );
        thirteen.setDate(thirteen.getDate() - 1 );
        fourteen.setDate(fourteen.getDate() - 1 );
        this.setState({
            one,
            two,
            three,
            four,
            five,
            six,
            seven,
            eight,
            nine,
            ten,
            eleven,
            twelve,
            thirteen,
            fourteen
        })
        this.getMemos();
    }

    forwardOneDay(){
        var { one, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve, thirteen, fourteen } = this.state
        one.setDate(one.getDate() + 1 );
        two.setDate(two.getDate() + 1 );
        three.setDate(three.getDate() + 1 );
        four.setDate(four.getDate() + 1 );
        five.setDate(five.getDate() + 1 );
        six.setDate(six.getDate() + 1 );
        seven.setDate(seven.getDate() + 1 );
        eight.setDate(eight.getDate() + 1 );
        nine.setDate(nine.getDate() + 1 );
        ten.setDate(ten.getDate() + 1 );
        eleven.setDate(eleven.getDate() + 1 );
        twelve.setDate(twelve.getDate() + 1 );
        thirteen.setDate(thirteen.getDate() + 1 );
        fourteen.setDate(fourteen.getDate() + 1 );
        this.setState({
            one,
            two,
            three,
            four,
            five,
            six,
            seven,
            eight,
            nine,
            ten,
            eleven,
            twelve,
            thirteen,
            fourteen
        })
        this.getMemos();
    }

    forwardTwoWeeks(){
        var { one, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve, thirteen, fourteen } = this.state
        one.setDate(one.getDate() + 14 );
        two.setDate(two.getDate() + 14 );
        three.setDate(three.getDate() + 14 );
        four.setDate(four.getDate() + 14 );
        five.setDate(five.getDate() + 14 );
        six.setDate(six.getDate() + 14 );
        seven.setDate(seven.getDate() + 14 );
        eight.setDate(eight.getDate() + 14 );
        nine.setDate(nine.getDate() + 14 );
        ten.setDate(ten.getDate() + 14 );
        eleven.setDate(eleven.getDate() + 14 );
        twelve.setDate(twelve.getDate() + 14 );
        thirteen.setDate(thirteen.getDate() + 14 );
        fourteen.setDate(fourteen.getDate() + 14 );
        this.setState({
            one,
            two,
            three,
            four,
            five,
            six,
            seven,
            eight,
            nine,
            ten,
            eleven,
            twelve,
            thirteen,
            fourteen
        })
        this.getMemos();
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
                <TwoWeekHeading state = {this.state} setToday = {this.setToday} backTwoWeeks = {this.backTwoWeeks} backOneDay = {this.backOneDay} forwardOneDay = {this.forwardOneDay} forwardTwoWeeks = {this.forwardTwoWeeks}/>
                {memos}
                <TotalRow state = {this.state} data = {this.state.totals}/>
            </div>
        ) 
    }
}

export default TwoWeek;