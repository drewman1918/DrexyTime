import React, {Component} from 'react';
import "./TwoWeek.css";

export default class TotalRow extends Component {
    render(){

        const oneHours = Number(this.props.data.filter( x => new Date(this.props.state.one).toDateString() === new Date(x.date).toDateString()).map( x => x.totalhours)).toFixed(2);
        const twoHours = Number(this.props.data.filter( x => new Date(this.props.state.two).toDateString() === new Date(x.date).toDateString()).map( x => x.totalhours)).toFixed(2);
        const threeHours = Number(this.props.data.filter( x => new Date(this.props.state.three).toDateString() === new Date(x.date).toDateString()).map( x => x.totalhours)).toFixed(2);
        const fourHours = Number(this.props.data.filter( x => new Date(this.props.state.four).toDateString() === new Date(x.date).toDateString()).map( x => x.totalhours)).toFixed(2);
        const fiveHours = Number(this.props.data.filter( x => new Date(this.props.state.five).toDateString() === new Date(x.date).toDateString()).map( x => x.totalhours)).toFixed(2);
        const sixHours = Number(this.props.data.filter( x => new Date(this.props.state.six).toDateString() === new Date(x.date).toDateString()).map( x => x.totalhours)).toFixed(2);
        const sevenHours = Number(this.props.data.filter( x => new Date(this.props.state.seven).toDateString() === new Date(x.date).toDateString()).map( x => x.totalhours)).toFixed(2);
        const eightHours = Number(this.props.data.filter( x => new Date(this.props.state.eight).toDateString() === new Date(x.date).toDateString()).map( x => x.totalhours)).toFixed(2);
        const nineHours = Number(this.props.data.filter( x => new Date(this.props.state.nine).toDateString() === new Date(x.date).toDateString()).map( x => x.totalhours)).toFixed(2);
        const tenHours = Number(this.props.data.filter( x => new Date(this.props.state.ten).toDateString() === new Date(x.date).toDateString()).map( x => x.totalhours)).toFixed(2);
        const elevenHours = Number(this.props.data.filter( x => new Date(this.props.state.eleven).toDateString() === new Date(x.date).toDateString()).map( x => x.totalhours)).toFixed(2);
        const twelveHours = Number(this.props.data.filter( x => new Date(this.props.state.twelve).toDateString() === new Date(x.date).toDateString()).map( x => x.totalhours)).toFixed(2);
        const thirteenHours = Number(this.props.data.filter( x => new Date(this.props.state.thirteen).toDateString() === new Date(x.date).toDateString()).map( x => x.totalhours)).toFixed(2);
        const fourteenHours = Number(this.props.data.filter( x => new Date(this.props.state.fourteen).toDateString() === new Date(x.date).toDateString()).map( x => x.totalhours)).toFixed(2);

        return(
            <div className = "twoWeekRow">

                    <div className = "totalCell title totalTitle">
                        <p>Total</p>
                    </div>

                    <div className = "totalCell one">
                        {oneHours}
                    </div>

                    <div className = "totalCell two">
                        {twoHours}
                    </div>

                    <div className = "totalCell three">
                        {threeHours}
                    </div>

                    <div className = "totalCell four">
                        {fourHours}
                    </div>

                    <div className = "totalCell five">
                        {fiveHours}
                    </div>

                    <div className = "totalCell six">
                        {sixHours}
                    </div>

                    <div className = "totalCell seven">
                        {sevenHours}
                    </div>

                    <div className = "totalCell eight">
                        {eightHours}
                    </div>

                    <div className = "totalCell nine">
                        {nineHours}
                    </div>

                    <div className = "totalCell ten">
                        {tenHours}
                    </div>

                    <div className = "totalCell eleven">
                        {elevenHours}
                    </div>

                    <div className = "totalCell twelve">
                        {twelveHours}
                    </div>

                    <div className = "totalCell thirteen">
                        {thirteenHours}
                    </div>

                    <div className = "totalCell fourteen">
                        {fourteenHours}
                    </div>

                </div>
        )
    }
}