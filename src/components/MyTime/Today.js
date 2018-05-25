import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import TodayMemo from './TodayMemo';
import { getTodayMemos } from './../../ducks/memoReducer';

class Today extends Component{
    constructor(){
        super()

        this.state = {
            loading: false
        }
        this.getTodayMemos = this.getTodayMemos.bind(this);
    }

    componentDidMount(){
        if(this.props.employeeid){
            this.getTodayMemos();
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps.employeeid !== this.props.employeeid){
            this.getTodayMemos();
        }
    }

    getTodayMemos(){
        var today = new Date().toDateString();
        axios.get(`/api/memos/${this.props.employeeid}/${today}`)
            .then( res => {
                this.props.getTodayMemos(res.data)
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