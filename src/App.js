import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setUser } from './ducks/userReducer';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import LandingPage from './components/LandingPage/LandingPage';
import routes from './routes';
import { HashRouter } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import './App.css';

class App extends Component {
  
  componentDidMount(){
    axios.get('/auth/me')
      .then( (res) => this.props.setUser(res.data));
  }
  
  render() {
    return (
      <HashRouter>
        { (this.props.role === 'admin') ? 
          ((this.props.location.pathname !== '/' ) ?
            <div className="App">
              <Header/>
                <div className = "content">
                  <Sidebar/>
                  <div className = "main">
                    {routes}
                  </div>
                </div>
            </div>

          :
            <div className = "App">
              <LandingPage/>
            </div>)
        :
        (this.props.role === 'user') ?
          ((this.props.location.pathname !== '/' ) ?
            <div className="App">
              <Header/>
                <div className = "content">
                  <Sidebar/>
                  <div className = "main">
                    {routes}
                  </div>
                </div>
            </div>

          :
            <div className = "App">
              <LandingPage/>
            </div>)
        :
        <LandingPage/>
        }

      </HashRouter>
    );
  }
}

function mapStateToProps(state){
  return{
    role: state.userReducer.role
  }
}

const actions = {
  setUser
}

export default withRouter(connect(mapStateToProps, actions)(App));
