import React, { Component } from 'react';
import FileUpload from './FileUpload';
import axios from 'axios';
import { connect } from 'react-redux';
import NotAllowed from './../NotAllowed/NotAllowed';
import './MyCompany.css';

class MyCompany extends Component{
    constructor(){
        super()

        this.state = {
            logo: ''
        }
        this.getLogo = this.getLogo.bind(this);
    }
    
    componentDidMount(){
        this.getLogo();
    }

    getLogo(){
        axios.get('/api/companylogo')
        .then(res => {
            this.setState({
                logo: res.data[0].logo
            })
        })
    }
    
    render(){
        return(
            <div className = "myCompanyContainer">
                {(this.props.role !== 'admin') ? <NotAllowed/> :
                <div>
                    <div className = "MCTitleContainer">
                        <h2><span className = "accent">My</span>Company</h2>
                    </div>

                    <div className = "myCompanyInfoContainer">
                        <div className = "currentLogo">
                            <h2>Current Logo:</h2>
                            <img className = "companyLogo" src = {this.state.logo} alt = "Company Logo"/>
                            <hr/>
                        </div>

                        <div className = "uploadNewLogo">
                            <h2>Add New Logo:</h2>
                            <FileUpload getLogoFn = {this.getLogo}/>
                        </div>
                    </div>
                </div>}
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        role: state.userReducer.role
    }
}

export default connect(mapStateToProps)(MyCompany);