import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as authActions from "../../store/actions/auth";
import * as errorActions from "../../store/actions/error";
import PropTypes from 'prop-types';
import InputFieldGroup from '../common/form/InputFieldGroup';

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  componentDidMount() {
    this.props.cleanUpErrors();
    if (this.props.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  onChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  };

  onSubmit = (event) => {
    event.preventDefault();
    const newUser = {
      ...this.state,
    };

    this.props.initSaveNewUser(newUser, this.props.history);
  };

  render() {
    const {errors} = this.props;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your DevConnect account</p>
              <form onSubmit={this.onSubmit}>
                <InputFieldGroup autoComplete="name"
                                 error={errors.name}
                                 name="name"
                                 onChange={this.onChange}
                                 placeholder="Name"
                                 required={true}
                                 value={this.state.name}/>
                <InputFieldGroup autoComplete="email"
                                 error={errors.email}
                                 name="email"
                                 onChange={this.onChange}
                                 placeholder="Email Address"
                                 required={true}
                                 info="This site uses Gravatar so if you want a profile image, use a Gravatar email."
                                 type="email"
                                 value={this.state.email}/>
                <InputFieldGroup autoComplete="new-password"
                                 error={errors.password}
                                 name="password"
                                 onChange={this.onChange}
                                 placeholder="Password"
                                 required={true}
                                 info="This site uses Gravatar so if you want a profile image, use a Gravatar email."
                                 type="password"
                                 value={this.state.password}/>
                <InputFieldGroup autoComplete="new-password"
                                 error={errors.confirmPassword}
                                 name="confirmPassword"
                                 onChange={this.onChange}
                                 placeholder="Confirm Password"
                                 required={true}
                                 info="This site uses Gravatar so if you want a profile image, use a Gravatar email."
                                 type="password"
                                 value={this.state.confirmPassword}/>
                <input type="submit" className="btn btn-info btn-block mt-4"/>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  initSaveNewUser: PropTypes.func.isRequired,
  cleanUpErrors: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object.isRequired,
  errors: PropTypes.object
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    errors: state.errors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initSaveNewUser: (payload, history) => dispatch(authActions.initSaveNewUser(payload, history)),
    cleanUpErrors: () => dispatch(errorActions.cleanUpErrors())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);