import React, { Component } from 'react'
import axios from 'axios'
import './MyCompany.css';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';


function sendToback(photo){
    return axios.post('/api/photoUpload', photo)
}

export default class FileUpload extends Component {
    constructor(){
        super()

        this.state={
            file: '',
            filename: '',
            filetype: ''
        }
        this.handlePhoto=this.handlePhoto.bind(this)
        this.sendPhoto=this.sendPhoto.bind(this)
    }

    handlePhoto(event){
        const reader = new FileReader()
            , file = event.target.files[0]
            // , _this = this
        
        reader.onload = photo => {
            this.setState({
                file: photo.target.result,
                filename: file.name,
                filetype: file.type
            })
        }
        reader.readAsDataURL(file)
    }

    sendPhoto(event){
        event.preventDefault()

        sendToback(this.state).then(response => {
            axios.put('/api/companylogo', {logoURL: response.data.Location})
                .then( () => this.props.getLogoFn())
        })

        this.setState({
            file: ''
        })
    }

    render(){
        return (
            <div className="FileUpload">
                <Tooltip title = "The best logo will have a maximum height of 150px"><input type="file" onChange={this.handlePhoto}/></Tooltip>
                <br/>
                {
                this.state.file &&
                <img src={this.state.file} alt="" className="file-preview"/>  
                }
                <Button variant = "raised" className = "uploadLogoButton" color = "secondary" onClick={this.sendPhoto}>Upload</Button>
            </div>
        )
    }
}