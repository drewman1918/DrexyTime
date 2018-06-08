import React, {Component} from 'react';
import ReactTooltip from 'react-tooltip';
import "./TwoWeek.css";


export default class TwoWeekRow extends Component {
    render(){

        console.log('twoweekrow props.state', this.props.state);
        console.log('twoweekrow this.props.data', this.props.data);

        const oneHours = Number(this.props.data.filter( x => new Date(this.props.state.one).toDateString() === new Date(x.date).toDateString()).map( x => x.hours)).toFixed(2);
        const twoHours = Number(this.props.data.filter( x => new Date(this.props.state.two).toDateString() === new Date(x.date).toDateString()).map( x => x.hours)).toFixed(2);
        const threeHours = Number(this.props.data.filter( x => new Date(this.props.state.three).toDateString() === new Date(x.date).toDateString()).map( x => x.hours)).toFixed(2);
        const fourHours = Number(this.props.data.filter( x => new Date(this.props.state.four).toDateString() === new Date(x.date).toDateString()).map( x => x.hours)).toFixed(2);
        const fiveHours = Number(this.props.data.filter( x => new Date(this.props.state.five).toDateString() === new Date(x.date).toDateString()).map( x => x.hours)).toFixed(2);
        const sixHours = Number(this.props.data.filter( x => new Date(this.props.state.six).toDateString() === new Date(x.date).toDateString()).map( x => x.hours)).toFixed(2);
        const sevenHours = Number(this.props.data.filter( x => new Date(this.props.state.seven).toDateString() === new Date(x.date).toDateString()).map( x => x.hours)).toFixed(2);
        const eightHours = Number(this.props.data.filter( x => new Date(this.props.state.eight).toDateString() === new Date(x.date).toDateString()).map( x => x.hours)).toFixed(2);
        const nineHours = Number(this.props.data.filter( x => new Date(this.props.state.nine).toDateString() === new Date(x.date).toDateString()).map( x => x.hours)).toFixed(2);
        const tenHours = Number(this.props.data.filter( x => new Date(this.props.state.ten).toDateString() === new Date(x.date).toDateString()).map( x => x.hours)).toFixed(2);
        const elevenHours = Number(this.props.data.filter( x => new Date(this.props.state.eleven).toDateString() === new Date(x.date).toDateString()).map( x => x.hours)).toFixed(2);
        const twelveHours = Number(this.props.data.filter( x => new Date(this.props.state.twelve).toDateString() === new Date(x.date).toDateString()).map( x => x.hours)).toFixed(2);
        const thirteenHours = Number(this.props.data.filter( x => new Date(this.props.state.thirteen).toDateString() === new Date(x.date).toDateString()).map( x => x.hours)).toFixed(2);
        const fourteenHours = Number(this.props.data.filter( x => new Date(this.props.state.fourteen).toDateString() === new Date(x.date).toDateString()).map( x => x.hours)).toFixed(2);

        const oneMemo = this.props.data.filter( x => new Date(this.props.state.one).toDateString() === new Date(x.date).toDateString()).map( x => x.memo);
        const twoMemo = this.props.data.filter( x => new Date(this.props.state.two).toDateString() === new Date(x.date).toDateString()).map( x => x.memo);
        const threeMemo = this.props.data.filter( x => new Date(this.props.state.three).toDateString() === new Date(x.date).toDateString()).map( x => x.memo);
        const fourMemo = this.props.data.filter( x => new Date(this.props.state.four).toDateString() === new Date(x.date).toDateString()).map( x => x.memo);
        const fiveMemo = this.props.data.filter( x => new Date(this.props.state.five).toDateString() === new Date(x.date).toDateString()).map( x => x.memo);
        const sixMemo = this.props.data.filter( x => new Date(this.props.state.six).toDateString() === new Date(x.date).toDateString()).map( x => x.memo);
        const sevenMemo = this.props.data.filter( x => new Date(this.props.state.seven).toDateString() === new Date(x.date).toDateString()).map( x => x.memo);
        const eightMemo = this.props.data.filter( x => new Date(this.props.state.eight).toDateString() === new Date(x.date).toDateString()).map( x => x.memo);
        const nineMemo = this.props.data.filter( x => new Date(this.props.state.nine).toDateString() === new Date(x.date).toDateString()).map( x => x.memo);
        const tenMemo = this.props.data.filter( x => new Date(this.props.state.ten).toDateString() === new Date(x.date).toDateString()).map( x => x.memo);
        const elevenMemo = this.props.data.filter( x => new Date(this.props.state.eleven).toDateString() === new Date(x.date).toDateString()).map( x => x.memo);
        const twelveMemo = this.props.data.filter( x => new Date(this.props.state.twelve).toDateString() === new Date(x.date).toDateString()).map( x => x.memo);
        const thirteenMemo = this.props.data.filter( x => new Date(this.props.state.thirteen).toDateString() === new Date(x.date).toDateString()).map( x => x.memo);
        const fourteenMemo = this.props.data.filter( x => new Date(this.props.state.fourteen).toDateString() === new Date(x.date).toDateString()).map( x => x.memo);
        
        console.log('twoweekrow one-fourteen Hours', oneHours, twoHours, threeHours, fourHours, fiveHours, sixHours, sevenHours, eightHours, nineHours, tenHours, elevenHours, twelveHours, thirteenHours, fourteenHours)
        console.log('fourteen Details', new Date(this.props.state.fourteen), this.props.data.filter(x => new Date(x.date).toDateString()).map(x => x.hours));

        return(
            <div className = "twoWeekRow">

                    <div className = "rowCell title">
                        <p>{this.props.data[0].completename}</p>
                    </div>

                    <div className = "rowCell one">

                        { (oneHours == 0) ? 
                        <div className = "hoursWorked zeroWork">
                            {oneHours}
                        </div>
                        :
                        <div className = "hoursWorked">
                            <p data-tip = {oneMemo}>{oneHours}</p>
                            <ReactTooltip multiline = {true} place="top" type="dark" effect="solid"/>
                        </div>
                        }
                        
                    </div>

                    <div className = "rowCell two">

                        { (twoHours == 0) ? 
                        <div className = "hoursWorked zeroWork">
                            {twoHours}
                        </div>
                        :
                        <div className = "hoursWorked">
                            <p data-tip = {twoMemo}>{twoHours}</p>
                            <ReactTooltip multiline = {true} place="top" type="dark" effect="solid"/>
                        </div>
                        }


                    </div>

                    <div className = "rowCell three">
                        
                        { (threeHours == 0) ? 
                        <div className = "hoursWorked zeroWork">
                            {threeHours}
                        </div>
                        :
                        <div className = "hoursWorked">
                            <p data-tip = {threeMemo}>{threeHours}</p>
                            <ReactTooltip multiline = {true} place="top" type="dark" effect="solid"/>
                        </div>
                        }

                    </div>

                    <div className = "rowCell four">
                        
                        { (fourHours == 0) ? 
                        <div className = "hoursWorked zeroWork">
                            {fourHours}
                        </div>
                        :
                        <div className = "hoursWorked">
                            <p data-tip = {fourMemo}>{fourHours}</p>
                            <ReactTooltip multiline = {true} place="top" type="dark" effect="solid"/>
                        </div>
                        }

                    </div>

                    <div className = "rowCell five">
                        
                        { (fiveHours == 0) ? 
                        <div className = "hoursWorked zeroWork">
                            {fiveHours}
                        </div>
                        :
                        <div className = "hoursWorked">
                            <p data-tip = {fiveMemo}>{fiveHours}</p>
                            <ReactTooltip multiline = {true} place="top" type="dark" effect="solid"/>
                        </div>
                        }

                    </div>

                    <div className = "rowCell six">
                       
                        { (sixHours == 0) ? 
                        <div className = "hoursWorked zeroWork">
                            {sixHours}
                        </div>
                        :
                        <div className = "hoursWorked">
                            <p data-tip = {sixMemo}>{sixHours}</p>
                            <ReactTooltip multiline = {true} place="top" type="dark" effect="solid"/>
                        </div>
                        }

                    </div>

                    <div className = "rowCell seven">
                        
                        { (sevenHours == 0) ? 
                        <div className = "hoursWorked zeroWork">
                            {sevenHours}
                        </div>
                        :
                        <div className = "hoursWorked">
                            <p data-tip = {sevenMemo}>{sevenHours}</p>
                            <ReactTooltip multiline = {true} place="top" type="dark" effect="solid"/>
                        </div>
                        
                        }


                    </div>

                    <div className = "rowCell eight">
                        
                        { (eightHours == 0) ? 
                        <div className = "hoursWorked zeroWork">
                            {eightHours}
                        </div>
                        :
                        <div className = "hoursWorked">
                            <p data-tip = {eightMemo}>{eightHours}</p>
                            <ReactTooltip multiline = {true} place="top" type="dark" effect="solid"/>
                        </div>
                        }

                    </div>

                    <div className = "rowCell nine">
                        
                        { (nineHours == 0) ? 
                        <div className = "hoursWorked zeroWork">
                            {nineHours}
                        </div>
                        :
                        <div className = "hoursWorked">
                            <p data-tip = {nineMemo}>{nineHours}</p>
                            <ReactTooltip multiline = {true} place="top" type="dark" effect="solid"/>
                        </div>
                        }

                    </div>

                    <div className = "rowCell ten">
                        
                        { (tenHours == 0) ? 
                        <div className = "hoursWorked zeroWork">
                            {tenHours}
                        </div>
                        :
                        <div className = "hoursWorked">
                            <p data-tip = {tenMemo}>{tenHours}</p>
                            <ReactTooltip multiline = {true} place="top" type="dark" effect="solid"/>
                        </div>
                        }

                    </div>

                    <div className = "rowCell eleven">
                        
                        { (elevenHours == 0) ? 
                        <div className = "hoursWorked zeroWork">
                            {elevenHours}
                        </div>
                        :
                        <div className = "hoursWorked">
                            <p data-tip = {elevenMemo}>{elevenHours}</p>
                            <ReactTooltip multiline = {true} place="top" type="dark" effect="solid"/>
                        </div>
                        }

                    </div>

                    <div className = "rowCell twelve">
                        
                        { (twelveHours == 0) ? 
                        <div className = "hoursWorked zeroWork">
                            {twelveHours}
                        </div>
                        :
                        <div className = "hoursWorked">
                            <p data-tip = {twelveMemo}>{twelveHours}</p>
                            <ReactTooltip multiline = {true} place="top" type="dark" effect="solid"/>
                        </div>
                        }

                    </div>

                    <div className = "rowCell thirteen">
                        
                        { (thirteenHours == 0) ? 
                        <div className = "hoursWorked zeroWork">
                            {thirteenHours}
                        </div>
                        :
                        <div className = "hoursWorked">
                            <p data-tip = {thirteenMemo}>{thirteenHours}</p>
                            <ReactTooltip multiline = {true} place="top" type="dark" effect="solid"/>
                        </div>
                        }

                    </div>

                    <div className = "rowCell fourteen">
                        
                        { (fourteenHours == 0) ? 
                        <div className = "hoursWorked zeroWork">
                            {fourteenHours}
                        </div>
                        :
                        <div className = "hoursWorked">
                            <p data-tip = {fourteenMemo}>{fourteenHours}</p>
                            <ReactTooltip multiline = {true} place="top" type="dark" effect="solid"/>
                        </div>
                        }

                    </div>

                </div>
        )
    }
}