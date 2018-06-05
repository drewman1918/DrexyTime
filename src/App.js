import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setUser } from './ducks/userReducer';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import LandingPage from './components/LandingPage/LandingPage';
import routes from './routes';
import { HashRouter } from 'react-router-dom';
import './App.css';

class App extends Component {
  
  componentDidMount(){
    axios.get('/auth/me')
      .then( (res) => this.props.setUser(res.data));
  }
  
  render() {
    return (
      <HashRouter>
      <div className="App">
        <Header/>
          <div className = "content">
            <Sidebar/>
            <div className = "main">
              {routes}
            </div>
          </div>

      </div>
      </HashRouter>
    );
  }
}

const actions = {
  setUser
}

export default connect(null, actions)(App);
