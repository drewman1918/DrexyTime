import React, {Component} from 'react';
import "./TwoWeek.css";

export default class TotalRow extends Component {
    render() {


        const days = this.props.state.dates.map(day => {
            return {
                hour: Number(this.props.data.filter(x => day.toDateString() === x.date.toDateString()).map(x => x.totalhours)).toFixed(2)
            }
        });

        return(
            <div className = "twoWeekRow">

                <div className = "totalCell title totalTitle">
                    <p>Total</p>
                </div>
                
                <div className= "twoWeekTotalContainer">
                {
                    days.map( (day, i) => {
                        return (
                            <div key={i} className="totalCell">
                                {day.hour}
                            </div>
                        )
                    })
                }
                </div>
                
            </div>
        )
    }
}