import React, {Component} from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/authentication/Login';
import Register from './components/authentication/Register';
import Dashboard from './components/dashboard/Dashboard';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import PrivateRoute from './components/common/PrivateRoute';
import jwt_decode from 'jwt-decode';
import {addAuthorizationHeader} from './utils/utils';
import {initTokenHasExpired, loginUser} from './store/actions/auth';
import store from './store/store';
import './App.css';
import CreateProfile from './components/create-profile/CreateProfile';
import AddExperience from './components/add-experience/AddExperience';
import PublicRoute from './components/common/PublicRoute';
import AddEducation from './components/add-education/AddEducation';
import Profiles from './components/profiles/Profiles';
import DeveloperProfile from './components/profile/DeveloperProfile';
import NotFound from './components/common/NotFound';
import Posts from './components/posts/Posts';

const token = localStorage.getItem('JWT_TOKEN');
if (token) {
  addAuthorizationHeader(token);
  const decoded = jwt_decode(token);
  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    store.dispatch(initTokenHasExpired());
  } else {
    const timeLeft = (decoded.exp - currentTime);
    store.dispatch(loginUser(decoded, timeLeft));
  }
}

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar/>
          <Switch>
            <PublicRoute path="/" component={Landing} exact/>
            <PublicRoute path="/login" component={Login} exact/>
            <PublicRoute path="/register" component={Register} exact/>
            <PrivateRoute path="/dashboard" component={Dashboard} exact/>
            <PrivateRoute path="/create-profile" component={CreateProfile} exact/>
            <PrivateRoute path="/edit-profile" component={CreateProfile} exact/>
            <PrivateRoute path="/add-experience" component={AddExperience} exact/>
            <PrivateRoute path="/add-education" component={AddEducation} exact/>
            <PrivateRoute path="/developers" component={Profiles} exact/>
            <PrivateRoute path="/developers/:handle" component={DeveloperProfile} exact/>
            <PrivateRoute path="/posts" component={Posts} exact/>
            < Route path="/*" component={NotFound}/>
          </Switch>
          <Footer/>
        </div>
      </Router>
    );
  }
}

export default App;
