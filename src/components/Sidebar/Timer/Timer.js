import React, { Component } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { connect } from 'react-redux';
import { getAllClients, getClientProjects } from './../../../ducks/clientReducer';
import Button from '@material-ui/core/Button';
import './Timer.css';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { getTodayMemos } from './../../../ducks/memoReducer';

class Timer extends Component{
    constructor(){
        super()

        this.state={
            clientID: '',
            projectID: '',
            hours: '',
            timing: 'false',
            date: '',
        }
        this.handleClient = this.handleClient.bind(this);
        this.handleProject = this.handleProject.bind(this);
        this.handleHours = this.handleHours.bind(this);
        this.handleDayChange = this.handleDayChange.bind(this);
        this.handleMemo = this.handleMemo.bind(this);
        this.getProjects = this.getProjects.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.resumeTimer = this.resumeTimer.bind(this);
        this.submitTime = this.submitTime.bind(this);
    }

    componentDidMount(){
        axios.get('/api/clients')
            .then( (res) => {
                this.props.getAllClients(res.data)
            })
    }

    handleDayChange(day) {
        this.setState({
            date: day
        })
      }

    handleClient(target){
        this.setState({
            clientID: target.value
        });
        this.getProjects(target.value);
    }

    handleProject(target){
        this.setState({
            projectID: target.value
        })
    }

    handleMemo(e){
        this.setState({
            memo: e.target.value
        })
    }
    
    getProjects(clientID){
        axios.get(`/api/projects/${clientID}`)
            .then( res => {
                this.props.getClientProjects(res.data)
            })
    }

    startTimer(){
        this.setState({
            timing: 'true'
        });
        if (this.seconds) {
            this.intervalID = setInterval( () => {
                ++this.seconds}
                , 1000) 
        }else {
            this.seconds = 0;
            this.intervalID = setInterval( () => {
                ++this.seconds}
                , 1000)
        }
    }

    stopTimer(){
        let time = (this.seconds / 60 / 60).toFixed(2);
        this.setState({
            timing: 'paused',
            hours: time
        });
        clearInterval(this.intervalID);
    }

    resumeTimer(){
        this.setState({
            timing: 'true'
        });
        this.intervalID = setInterval( () => {
            ++this.seconds}
            , 1000)
    }

    handleHours(e){
        this.setState({
            hours: e.target.value
        })
        this.seconds = e.target.value * 60 * 60;
    }

    submitTime(){
        let memo = {hours: Number(this.state.hours), date: this.state.date, memo: this.state.memo, projectid: this.state.projectID, employeeid: this.props.employeeid};
        axios.post('/api/memos', {memo})
            .then( () => {
                this.seconds = 0;
                this.setState({
                    hours: '',
                    timing: 'false',
                    memo: ''
                })

                var today = new Date().toDateString();
                axios.get(`/api/memos/${this.props.employeeid}/${today}`)
                    .then( res => {
                        this.props.getTodayMemos(res.data)
                    })

            })
    }
    
    render(){
        const clientOptions = this.props.clients.map( client => {
            return { 
                label: `${client.lastname}, ${client.firstname}`, value: client.clientid
            }
        });

        const projectOptions = this.props.projects.map( project => {
            return {
                value: project.projectid, label: project.name
            }
        });

        return(
            <div className = "timerContainer">
                <div className = "timer">
                    <Select className = "timerInput" options = {clientOptions} placeholder = "Select Client" onChange = {this.handleClient}/>
                    <Select className = "timerInput" options = {projectOptions} placeholder = "Select Project" onChange = {this.handleProject}/>
                    {/* <input className = "timerInput date" type = "text" placeholder = "Choose Date"/> */}
                    <DayPickerInput 
                        inputProps={{ style: { width: "99%", border: 0, marginBottom: "10px", fontSize: "16px", height: "38px", textAlign: "center" } }} 
                        onDayChange={this.handleDayChange} 
                        placeholder = "Choose Date"/>
                    
                    <div className = "trackRow">

                        {/* Conditional rendering of the hours display. */}
                        { (this.state.timing === 'false') ?
                        <input className = "timerHours" type = "number" placeholder = "Hours" value = {this.state.hours} onChange = {this.handleHours} step = "0.01"/>
                        :
                        (this.state.timing === 'true') ?
                        <input disabled = {true} className = "timerHours" type = "number" placeholder = "Timing..."  value = {this.state.hours} step = "0.01"/>
                        :
                        <input className = "timerHours" type = "number" placeholder = "Hours" value = {this.state.hours} onChange = {this.handleHours} step = "0.01"/>
                        }

                        {/* Conditional rendering of the track button */}
                        { (this.state.timing === 'false') ?
                        <Button onClick = {this.startTimer} className = "trackButton" variant = "raised" color = "secondary">Track</Button>
                        :
                        (this.state.timing === 'true') ?
                        <Button onClick = {this.stopTimer} className = "trackButton" variant = "raised" color = "secondary">Pause</Button>
                        :
                        <Button onClick = {this.resumeTimer} className = "trackButton" variant = "raised" color = "secondary">Resume</Button>
                        }

                    </div>

                    <textarea value = {this.state.memo} className = "memo" placeholder = "Memo" onChange = {this.handleMemo}/>
                    <Button onClick = {this.submitTime} variant = "raised" color = "secondary">Submit</Button>

                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        clients: state.clientReducer.clients,
        projects: state.clientReducer.client1Projects,
        employeeid: state.userReducer.employeeid
    }
}

const actions = {
    getAllClients,
    getClientProjects,
    getTodayMemos
}

export default connect(mapStateToProps, actions)(Timer);