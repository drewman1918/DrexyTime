import React, { Component } from 'react';
import FileUpload from './FileUpload';
import axios from 'axios';
import './MyCompany.css';

export default class MyCompany extends Component{
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
                    <div className = "MCTitleContainer">
                        <h2><span className = "accent">My</span>Company</h2>
                    </div>

                    <div className = "myCompanyInfoContainer">
                        <div className = "currentLogo">
                            <h2>Current Logo:</h2>
                            <img className = "companyLogo" src = {this.state.logo}/>
                            <hr/>
                        </div>

                        <div className = "uploadNewLogo">
                            <h2>Add New Logo:</h2>
                            <FileUpload getLogoFn = {this.getLogo}/>
                        </div>
                    </div>
            </div>
        )
    }
}