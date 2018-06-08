import React, {Component} from 'react';
import ReactTooltip from 'react-tooltip';
import "./TwoWeek.css";


export default class TwoWeekRow extends Component {
    render(){

        const days = this.props.state.dates.map( day => {
            return{
                hour: Number(this.props.data.filter( x => new Date(day).toDateString() === new Date(x.date).toDateString()).map( x => x.hours)).toFixed(2),
                memo: this.props.data.filter( x => new Date(day).toDateString() === new Date(x.date).toDateString()).map( x => x.memo)
            }
        });
        
        return(
            <div className = "twoWeekRow">

                    <div className = "rowCell title">
                        <p>{this.props.data[0].completename}</p>
                    </div>

                    {
                        days.map( (day, i) => {
                            return(

                                <div key={i} className = "rowCell">

                                    { (day.hour == 0) ? 
                                    <div className = "hoursWorked zeroWork">
                                        {day.hour}
                                    </div>
                                    :
                                    <div className = "hoursWorked">
                                        <p data-tip = {day.memo}>{day.hour}</p>
                                        <ReactTooltip multiline = {true} place="top" type="dark" effect="solid"/>
                                    </div>
                                    } 
                                    
                                </div>
                            )
                        })
                    }

                </div>
        )
    }
}