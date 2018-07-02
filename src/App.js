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
      .then((res) => {
        this.props.setUser(res.data)
      }
    ).then(() => {
      this.props.history.push('/mytime/day')
      } );
  }
  
  render() {
    return (
      <HashRouter>
        { (this.props.role === 'admin') ? 
          // ((this.props.location.pathname !== '/' ) ?
          //   <div className="App">
          //     <Header/>
          //       <div className = "content">
          //         <Sidebar/>
          //         <div className = "main">
          //           {routes}
          //         </div>
          //       </div>
          //   </div>

          // :
          //   <div className = "App">
          //     <LandingPage/>
          //   </div>)
          <div className="App">
            <Header />
            <div className="content">
              <Sidebar />
              <div className="main">
                {routes}
              </div>
            </div>
          </div>
        :
        // (this.props.role === 'user') ?
        //   ((this.props.location.pathname !== '/' ) ?
        //     <div className="App">
        //       <Header/>
        //         <div className = "content">
        //           <Sidebar/>
        //           <div className = "main">
        //             {routes}
        //           </div>
        //         </div>
        //     </div>

        //   :
        //     <div className = "App">
        //       <LandingPage/>
        //     </div>)
        // :
        // <LandingPage/>
            <div className="App">
              <Header />
              <div className="content">
                <Sidebar />
                <div className="main">
                  {routes}
                </div>
              </div>
            </div>
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
