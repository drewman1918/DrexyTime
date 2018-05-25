import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import "./TodayMemo.css";
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import Tooltip from '@material-ui/core/Tooltip';
import axios from 'axios';

export default class TodayMemo extends Component {
    constructor(){
        super()
        
        this.state = {
            memoid: 0,
            projectName: '',
            memoHours: '',
            memo: '',
            client: '',
            date: ''
        }
        this.handleDayChange = this.handleDayChange.bind(this)
        this.handleHoursChange = this.handleHoursChange.bind(this);
        this.handleMemoChange = this.handleMemoChange.bind(this);
        this.submitEdit = this.submitEdit.bind(this);
        this.deleteMemo = this.deleteMemo.bind(this);

    }

    submitEdit(){
        axios.put(`/api/memos/${this.props.memoid}`, {memo: this.state.memo, hours: this.state.memoHours, date: this.state.date})
            .then(() => {
                this.props.getMemos()
            })
    }

    deleteMemo(){
        axios.delete(`/api/memos/${this.props.memoid}`)
            .then(() => {
                this.props.getMemos()
            });
    }

    handleDayChange(day){
        this.setState({
            date: day
        })
    }

    handleHoursChange(e){
        this.setState({
            memoHours: e.target.value
        })
    }

    handleMemoChange(e){
        this.setState({
            memo: e.target.value
        })
    }

    componentDidMount(){
        this.setState({
            memoid: this.props.memoid,
            projectName: this.props.projectName,
            memoHours: this.props.memoHours,
            memo: this.props.memo,
            date: this.props.date.slice(0, 10),
            client: this.props.client
        })
    }

    render(){
        return(
            <div className = "memoContainer">
                
                <div className = "memoClient">
                    <h3>{this.state.client}</h3>
                </div>

                <div className = "bottomRow">

                    <div className = "memoProject">
                        <h3>{this.state.projectName}</h3>
                    </div>
                    
                    <div className = "memoDate">
                        <DayPickerInput 
                            inputProps={{ style: { 
                                width: "100%",  
                                fontSize: "16px", 
                                minHeight: "38px", 
                                textAlign: "center",
                                border: 0,
                                cursor: "pointer",
                                outline: "none" } }} 
                                placeholder = "Choose Date"
                                value = {this.state.date}
                                onDayChange = {this.handleDayChange}/>
                    </div>
                    
                    <input onChange = {this.handleHoursChange} className = "memoHours" value = {this.state.memoHours}/>

                    <textarea onChange = {this.handleMemoChange} className = "memoMemo" value = {this.state.memo}/>

                    <div className = "buttonRow">
                        <Tooltip title = "Confirm Changes"><Button mini onClick = {this.submitEdit} className = "editButton" variant = "fab" color = "primary"><DoneIcon/></Button></Tooltip>
                        <Tooltip title = "Delete Entry"><Button mini onClick = {this.deleteMemo} className = "deleteButton" variant = "fab" color = "secondary"><DeleteIcon/></Button></Tooltip>
                    </div>

                </div>

            </div> 
        )
    }
}
