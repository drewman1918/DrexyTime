import React, { Component } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { connect } from 'react-redux';
import { getAllClients, getClientProjects1, getClientProjects2, getClientProjects3 } from './../../../ducks/clientReducer';
import Button from '@material-ui/core/Button';
import './Timer.css';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { getTodayMemos } from './../../../ducks/memoReducer';
import Alarm from '@material-ui/icons/Alarm';
import PauseCircle from '@material-ui/icons/PauseCircleOutline';

class Timer extends Component{
    constructor(){
        super()

        this.state={
            clientID1: '',
            projectID1: '',
            hours1: '',
            timing1: 'false',
            date1: new Date(),
            memo1: '',
            clientID2: '',
            projectID2: '',
            hours2: '',
            timing2: 'false',
            date2: new Date(),
            memo2: '',
            clientID3: '',
            projectID3: '',
            hours3: '',
            timing3: 'false',
            date3: new Date(),
            memo3: '',
            active: 1
        }
        //Handle Active Tab
        this.setActive1 = this.setActive1.bind(this);
        this.setActive2 = this.setActive2.bind(this);
        this.setActive3 = this.setActive3.bind(this);

        //Handlers
        this.handleClient1 = this.handleClient1.bind(this);
        this.handleProject1 = this.handleProject1.bind(this);
        this.handleHours1 = this.handleHours1.bind(this);
        this.handleDayChange1 = this.handleDayChange1.bind(this);
        this.handleMemo1 = this.handleMemo1.bind(this);
        this.handleClient2 = this.handleClient2.bind(this);
        this.handleProject2 = this.handleProject2.bind(this);
        this.handleHours2 = this.handleHours2.bind(this);
        this.handleDayChange2 = this.handleDayChange2.bind(this);
        this.handleMemo2 = this.handleMemo2.bind(this);
        this.handleClient3 = this.handleClient3.bind(this);
        this.handleProject3 = this.handleProject3.bind(this);
        this.handleHours3 = this.handleHours3.bind(this);
        this.handleDayChange3 = this.handleDayChange3.bind(this);
        this.handleMemo3 = this.handleMemo3.bind(this);

        //Get Projects
        this.getProjects1 = this.getProjects1.bind(this);
        this.getProjects2 = this.getProjects2.bind(this);
        this.getProjects3 = this.getProjects3.bind(this);

        //Timer Functions
        this.startTimer1 = this.startTimer1.bind(this);
        this.stopTimer1 = this.stopTimer1.bind(this);
        this.resumeTimer1 = this.resumeTimer1.bind(this);
        this.submitTime1 = this.submitTime1.bind(this);
        this.startTimer2 = this.startTimer2.bind(this);
        this.stopTimer2 = this.stopTimer2.bind(this);
        this.resumeTimer2 = this.resumeTimer2.bind(this);
        this.submitTime2 = this.submitTime2.bind(this);
        this.startTimer3 = this.startTimer3.bind(this);
        this.stopTimer3 = this.stopTimer3.bind(this);
        this.resumeTimer3 = this.resumeTimer3.bind(this);
        this.submitTime3 = this.submitTime3.bind(this);
    }

    //Get clients for all 3 timers
    componentDidMount(){
        axios.get('/api/clients')
            .then( (res) => {
                this.props.getAllClients(res.data)
            })
    }

    //Handler Functions
    handleDayChange1(day) {
        this.setState({
            date1: day
        })
      }

    handleClient1(target){
        this.setState({
            clientID1: target.value
        });
        this.getProjects1(target.value);
    }

    handleProject1(target){
        this.setState({
            projectID1: target.value
        })
    }

    handleMemo1(e){
        this.setState({
            memo1: e.target.value
        })
    }
    
    handleHours1(e){
        this.setState({
            hours1: e.target.value
        })
        this.seconds1 = e.target.value * 60 * 60;
    }
    
    handleDayChange2(day) {
        this.setState({
            date2: day
        })
      }

    handleClient2(target){
        this.setState({
            clientID2: target.value
        });
        this.getProjects2(target.value);
    }

    handleProject2(target){
        this.setState({
            projectID2: target.value
        })
    }

    handleMemo2(e){
        this.setState({
            memo2: e.target.value
        })
    }
    
    handleHours2(e){
        this.setState({
            hours2: e.target.value
        })
        this.seconds2 = e.target.value * 60 * 60;
    }
    
    handleDayChange3(day) {
        this.setState({
            date3: day
        })
      }

    handleClient3(target){
        this.setState({
            clientID3: target.value
        });
        this.getProjects3(target.value);
    }

    handleProject3(target){
        this.setState({
            projectID3: target.value
        })
    }

    handleMemo3(e){
        this.setState({
            memo3: e.target.value
        })
    }
    
    handleHours3(e){
        this.setState({
            hours3: e.target.value
        })
        this.seconds3 = e.target.value * 60 * 60;
    }
    
    //get Projects Functions...
    getProjects1(clientID){
        axios.get(`/api/projects/${clientID}`)
            .then( res => {
                this.props.getClientProjects1(res.data)
            })
    }

    getProjects2(clientID){
        axios.get(`/api/projects/${clientID}`)
            .then( res => {
                this.props.getClientProjects2(res.data)
            })
    }

    getProjects3(clientID){
        axios.get(`/api/projects/${clientID}`)
            .then( res => {
                this.props.getClientProjects3(res.data)
            })
    }

    //Timer Functions
    startTimer1(){
        this.setState({
            timing1: 'true'
        });
        if (this.seconds1) {
            this.intervalID1 = setInterval( () => {
                ++this.seconds1}
                , 1000) 
        }else {
            this.seconds1 = 0;
            this.intervalID1 = setInterval( () => {
                ++this.seconds1}
                , 1000)
        }
    }

    stopTimer1(){
        let time = (this.seconds1 / 60 / 60).toFixed(2);
        this.setState({
            timing1: 'paused',
            hours1: time
        });
        clearInterval(this.intervalID1);
    }

    resumeTimer1(){
        this.setState({
            timing1: 'true'
        });
        this.intervalID1 = setInterval( () => {
            ++this.seconds1}
            , 1000)
    }

    submitTime1(){
        let memo = {hours: Number(this.state.hours1), date: this.state.date1, memo: this.state.memo1, projectid: this.state.projectID1, employeeid: this.props.employeeid};
        axios.post('/api/memos', {memo})
            .then( () => {
                this.seconds1 = 0;
                this.setState({
                    hours1: '',
                    timing1: 'false',
                    memo1: ''
                })

                var today = new Date().toDateString();
                axios.get(`/api/memos/${this.props.employeeid}/${today}`)
                    .then( res => {
                        this.props.getTodayMemos(res.data)
                    })

            })
    }

    startTimer2(){
        this.setState({
            timing2: 'true'
        });
        if (this.seconds2) {
            this.intervalID2 = setInterval( () => {
                ++this.seconds2}
                , 1000) 
        }else {
            this.seconds2 = 0;
            this.intervalID2 = setInterval( () => {
                ++this.seconds2}
                , 1000)
        }
    }

    stopTimer2(){
        let time = (this.seconds2 / 60 / 60).toFixed(2);
        this.setState({
            timing2: 'paused',
            hours2: time
        });
        clearInterval(this.intervalID2);
    }

    resumeTimer2(){
        this.setState({
            timing2: 'true'
        });
        this.intervalID2 = setInterval( () => {
            ++this.seconds2}
            , 1000)
    }

    submitTime2(){
        let memo = {hours: Number(this.state.hours2), date: this.state.date2, memo: this.state.memo2, projectid: this.state.projectID2, employeeid: this.props.employeeid};
        axios.post('/api/memos', {memo})
            .then( () => {
                this.seconds2 = 0;
                this.setState({
                    hours2: '',
                    timing2: 'false',
                    memo2: ''
                })

                var today = new Date().toDateString();
                axios.get(`/api/memos/${this.props.employeeid}/${today}`)
                    .then( res => {
                        this.props.getTodayMemos(res.data)
                    })

            })
    }

    startTimer3(){
        this.setState({
            timing3: 'true'
        });
        if (this.seconds3) {
            this.intervalID3 = setInterval( () => {
                ++this.seconds3}
                , 1000) 
        }else {
            this.seconds3 = 0;
            this.intervalID3 = setInterval( () => {
                ++this.seconds3}
                , 1000)
        }
    }

    stopTimer3(){
        let time = (this.seconds3 / 60 / 60).toFixed(2);
        this.setState({
            timing3: 'paused',
            hours3: time
        });
        clearInterval(this.intervalID3);
    }

    resumeTimer3(){
        this.setState({
            timing3: 'true'
        });
        this.intervalID3 = setInterval( () => {
            ++this.seconds3}
            , 1000)
    }

    submitTime3(){
        let memo = {hours: Number(this.state.hours3), date: this.state.date3, memo: this.state.memo3, projectid: this.state.projectID3, employeeid: this.props.employeeid};
        axios.post('/api/memos', {memo})
            .then( () => {
                this.seconds3 = 0;
                this.setState({
                    hours3: '',
                    timing3: 'false',
                    memo3: ''
                })

                var today = new Date().toDateString();
                axios.get(`/api/memos/${this.props.employeeid}/${today}`)
                    .then( res => {
                        this.props.getTodayMemos(res.data)
                    })

            })
    }

    //Control which tab is showing as active. Also stop the other timers if they are running, when you switch to a different timer. 
    setActive1(){
        this.setState({
            active: 1
        })
        if(this.state.timing2 !== 'false'){
            this.stopTimer2();
        }
        if(this.state.timing3 !== 'false'){
            this.stopTimer3();
        }
    }

    setActive2(){
        this.setState({
            active: 2
        })
        if(this.state.timing1 !== 'false'){
            this.stopTimer1();
        }
        if(this.state.timing3 !== 'false'){
            this.stopTimer3();
        }
    }

    setActive3(){
        this.setState({
            active: 3
        })
        if(this.state.timing1 !== 'false'){
            this.stopTimer1();
        }
        if(this.state.timing2 !== 'false'){
            this.stopTimer2();
        }
    }
    
    render(){
        console.log('timer state', this.state);
        const clientOptions = this.props.clients.map( client => {
            return { 
                label: `${client.lastname}, ${client.firstname}`, value: client.clientid
            }
        });

        const projectOptions1 = this.props.projects1.map( project => {
            return {
                value: project.projectid, label: project.name
            }
        });

        const projectOptions2 = this.props.projects2.map( project => {
            return {
                value: project.projectid, label: project.name
            }
        });

        const projectOptions3 = this.props.projects3.map( project => {
            return {
                value: project.projectid, label: project.name
            }
        });

        return(
            <div className = "timerContainer">

                <div className = "timer">

                    <div className = "timerNavigation">
                        
                        <div onClick = {this.setActive1} className = {(this.state.active === 1) ? "timerNavigation1 activeTimer" : "timerNavigation1" }>
                            { (this.state.timing1 === 'paused') ?
                            <PauseCircle color = {(this.state.active === 1) ? "primary" : "disabled" }/>
                            :
                            <Alarm color = {(this.state.active === 1) ? "primary" : "disabled" }/>
                            }
                        </div>
                        <div onClick = {this.setActive2} className = {(this.state.active === 2) ? "timerNavigation2 activeTimer" : "timerNavigation2" }>
                            { (this.state.timing2 === 'paused') ?
                            <PauseCircle color = {(this.state.active === 2) ? "primary" : "disabled" }/>
                            :
                            <Alarm color = {(this.state.active === 2) ? "primary" : "disabled" }/>
                            }
                        </div>
                        <div onClick = {this.setActive3} className = {(this.state.active === 3) ? "timerNavigation3 activeTimer" : "timerNavigation3" }>
                            { (this.state.timing3 === 'paused') ?
                            <PauseCircle color = {(this.state.active === 3) ? "primary" : "disabled" }/>
                            :
                            <Alarm color = {(this.state.active === 3) ? "primary" : "disabled" }/>
                            }
                        </div>
                    
                    </div>

                    {/**********FIRST TIMER**********/}
                    <div className = { (this.state.active === 1) ? 'actualTimer' : 'actualTimer inactiveTimer' }>
                        <Select classNamePrefix = "timerSelect" styles = { {control: styles => ({...styles, backgroundColor: 'white', borderRadius: 0, border: "1px solid #0097a7"})} } className = "timerSelectContainer" options = {clientOptions} placeholder = "Select Client" onChange = {this.handleClient1}/>
                        <Select classNamePrefix = "timerSelect" styles = { {control: styles => ({...styles, backgroundColor: 'white', borderRadius: 0, border: "1px solid #0097a7"})} } className = "timerSelectContainer" options = {projectOptions1} placeholder = "Select Project" onChange = {this.handleProject1}/>
                        <DayPickerInput 
                            inputProps={{ style: { width: "99%", border: "1px solid #0097a7", marginBottom: "10px", fontSize: "16px", height: "38px", textAlign: "center" } }} 
                            onDayChange={this.handleDayChange1} 
                            placeholder = "Choose Date"
                            value = {this.state.date1}/>
                    
                        <div className = "trackRow">

                            {/* Conditional rendering of the hours display. */}
                            { (this.state.timing1 === 'false') ?
                            <input className = "timerHours" type = "number" placeholder = "Hours" value = {this.state.hours1} onChange = {this.handleHours1} step = "0.01"/>
                            :
                            (this.state.timing1 === 'true') ?
                            <input disabled = {true} className = "timerHours" type = "number" placeholder = "Timing..."  value = "Timing..." step = "0.01"/>
                            :
                            <input className = "timerHours" type = "number" placeholder = "Hours" value = {this.state.hours1} onChange = {this.handleHours1} step = "0.01"/>
                            }

                            {/* Conditional rendering of the track button */}
                            { (this.state.timing1 === 'false') ?
                            <Button onClick = {this.startTimer1} className = "trackButton" variant = "raised" color = "primary">Track</Button>
                            :
                            (this.state.timing1 === 'true') ?
                            <Button onClick = {this.stopTimer1} className = "trackButton" variant = "raised" color = "primary">Pause</Button>
                            :
                            <Button onClick = {this.resumeTimer1} className = "trackButton" variant = "raised" color = "primary">Resume</Button>
                            }

                        </div>

                        <textarea value = {this.state.memo1} className = "memo" placeholder = "Memo" onChange = {this.handleMemo1}/>
                        { (this.state.timing1 === 'true' ) ? 
                        <Button onClick = {this.submitTime1} disabled variant = "raised" color = "primary">Submit</Button>
                        :
                        <Button onClick = {this.submitTime1} variant = "raised" color = "primary">Submit</Button>
                        }
                    </div>

                    {/**********SECOND TIMER**********/}
                    <div className = { (this.state.active === 2) ? 'actualTimer' : 'actualTimer inactiveTimer' }>
                        <Select classNamePrefix = "timerSelect" styles = { {control: styles => ({...styles, backgroundColor: 'white', borderRadius: 0, border: "1px solid #0097a7"})} } className = "timerSelectContainer" options = {clientOptions} placeholder = "Select Client" onChange = {this.handleClient2}/>
                        <Select classNamePrefix = "timerSelect" styles = { {control: styles => ({...styles, backgroundColor: 'white', borderRadius: 0, border: "1px solid #0097a7"})} } className = "timerSelectContainer" options = {projectOptions2} placeholder = "Select Project" onChange = {this.handleProject2}/>
                        <DayPickerInput 
                            inputProps={{ style: { width: "99%", border: "1px solid #0097a7", marginBottom: "10px", fontSize: "16px", height: "38px", textAlign: "center" } }} 
                            onDayChange={this.handleDayChange2} 
                            placeholder = "Choose Date"
                            value = {this.state.date2}/>
                    
                        <div className = "trackRow">

                            {/* Conditional rendering of the hours display. */}
                            { (this.state.timing2 === 'false') ?
                            <input className = "timerHours" type = "number" placeholder = "Hours" value = {this.state.hours2} onChange = {this.handleHours2} step = "0.01"/>
                            :
                            (this.state.timing2 === 'true') ?
                            <input disabled = {true} className = "timerHours" type = "number" placeholder = "Timing..."  value = "Timing..." step = "0.01"/>
                            :
                            <input className = "timerHours" type = "number" placeholder = "Hours" value = {this.state.hours2} onChange = {this.handleHours2} step = "0.01"/>
                            }

                            {/* Conditional rendering of the track button */}
                            { (this.state.timing2 === 'false') ?
                            <Button onClick = {this.startTimer2} className = "trackButton" variant = "raised" color = "primary">Track</Button>
                            :
                            (this.state.timing2 === 'true') ?
                            <Button onClick = {this.stopTimer2} className = "trackButton" variant = "raised" color = "primary">Pause</Button>
                            :
                            <Button onClick = {this.resumeTimer2} className = "trackButton" variant = "raised" color = "primary">Resume</Button>
                            }

                        </div>

                        <textarea value = {this.state.memo2} className = "memo" placeholder = "Memo" onChange = {this.handleMemo2}/>
                        { (this.state.timing2 === 'true' ) ? 
                        <Button onClick = {this.submitTime2} disabled variant = "raised" color = "primary">Submit</Button>
                        :
                        <Button onClick = {this.submitTime2} variant = "raised" color = "primary">Submit</Button>
                        }
                    </div>

                    {/**********THIRD TIMER**********/}
                    <div className = { (this.state.active === 3) ? 'actualTimer' : 'actualTimer inactiveTimer' }>
                        <Select classNamePrefix = "timerSelect" styles = { {control: styles => ({...styles, backgroundColor: 'white', borderRadius: 0, border: "1px solid #0097a7"})} } className = "timerSelectContainer" options = {clientOptions} placeholder = "Select Client" onChange = {this.handleClient3}/>
                        <Select classNamePrefix = "timerSelect" styles = { {control: styles => ({...styles, backgroundColor: 'white', borderRadius: 0, border: "1px solid #0097a7"})} } className = "timerSelectContainer" options = {projectOptions3} placeholder = "Select Project" onChange = {this.handleProject3}/>
                        <DayPickerInput 
                            inputProps={{ style: { width: "99%", border: "1px solid #0097a7", marginBottom: "10px", fontSize: "16px", height: "38px", textAlign: "center" } }} 
                            onDayChange={this.handleDayChange3} 
                            placeholder = "Choose Date"
                            value = {this.state.date3}/>
                    
                        <div className = "trackRow">

                            {/* Conditional rendering of the hours display. */}
                            { (this.state.timing3 === 'false') ?
                            <input className = "timerHours" type = "number" placeholder = "Hours" value = {this.state.hours3} onChange = {this.handleHours3} step = "0.01"/>
                            :
                            (this.state.timing3 === 'true') ?
                            <input disabled = {true} className = "timerHours" type = "number" placeholder = "Timing..."  value = "Timing..." step = "0.01"/>
                            :
                            <input className = "timerHours" type = "number" placeholder = "Hours" value = {this.state.hours3} onChange = {this.handleHours3} step = "0.01"/>
                            }

                            {/* Conditional rendering of the track button */}
                            { (this.state.timing3 === 'false') ?
                            <Button onClick = {this.startTimer3} className = "trackButton" variant = "raised" color = "primary">Track</Button>
                            :
                            (this.state.timing3 === 'true') ?
                            <Button onClick = {this.stopTimer3} className = "trackButton" variant = "raised" color = "primary">Pause</Button>
                            :
                            <Button onClick = {this.resumeTimer3} className = "trackButton" variant = "raised" color = "primary">Resume</Button>
                            }

                        </div>

                        <textarea value = {this.state.memo3} className = "memo" placeholder = "Memo" onChange = {this.handleMemo3}/>
                        { (this.state.timing3 === 'true' ) ? 
                        <Button onClick = {this.submitTime3} disabled variant = "raised" color = "primary">Submit</Button>
                        :
                        <Button onClick = {this.submitTime3} variant = "raised" color = "primary">Submit</Button>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        clients: state.clientReducer.clients,
        projects1: state.clientReducer.client1Projects,
        projects2: state.clientReducer.client2Projects,
        projects3: state.clientReducer.client3Projects,
        employeeid: state.userReducer.employeeid
    }
}

const actions = {
    getAllClients,
    getClientProjects1,
    getClientProjects2,
    getClientProjects3,
    getTodayMemos
}

export default connect(mapStateToProps, actions)(Timer);