import React, {Component} from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/authentication/Login';
import Register from './components/authentication/Register';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import {addAuthorizationHeader} from './utils/utils';
import {loginUser} from './store/actions/auth';
import store from './store/store';
import './App.css';

const token = localStorage.getItem('JWT_TOKEN');
if (token) {
  addAuthorizationHeader(token);
  store.dispatch(loginUser(jwt_decode(token)));
}

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar/>
          <Route path="/" component={Landing} exact/>
          <Route path="/login" component={Login} exact/>
          <Route path="/register" component={Register} exact/>
          <Footer/>
        </div>
      </Router>
    );
  }
}

export default App;
