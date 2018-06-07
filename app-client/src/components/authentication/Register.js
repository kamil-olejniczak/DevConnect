import React, {Component} from 'react';
import classnames from 'classnames';
import {connect} from 'react-redux';
import * as developerActions from "../../store/actions/auth";
import PropTypes from 'prop-types';

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  onChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  };

  onSubmit = (event) => {
    event.preventDefault();
    const newUser = {
      ...this.state,
    };
    delete newUser['errors'];

    this.props.initSaveNewUser(newUser, this.props.history);
  };

  render() {
    const {user, errors} = this.props;
    return (
      <div className="register">
        {user ? user.name : null}
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your DevConnector account</p>
              <form onSubmit={this.onSubmit} autoComplete="off">
                <div className="form-group">
                  <input type="text"
                         className={classnames('form-control form-control-lg', {'is-invalid': errors.name})}
                         placeholder="Name"
                         name="name" autoComplete="name"
                         value={this.state.name}
                         onChange={this.onChange}
                         required/>
                  {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                </div>
                <div className="form-group">
                  <input type="email"
                         className={classnames('form-control form-control-lg', {'is-invalid': errors.email})}
                         placeholder="Email Address"
                         name="email"
                         autoComplete="email"
                         value={this.state.email}
                         onChange={this.onChange}/>
                  <small className="form-text text-muted">This site uses Gravatar so if you want a
                    profile image, use a Gravatar email.
                  </small>
                  {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                </div>
                <div className="form-group">
                  <input type="password"
                         className={classnames('form-control form-control-lg', {'is-invalid': errors.password})}
                         placeholder="Password"
                         name="password"
                         autoComplete="new-password"
                         value={this.state.password}
                         onChange={this.onChange}/>
                  {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                </div>
                <div className="form-group">
                  <input type="password"
                         className={classnames('form-control form-control-lg', {'is-invalid': errors.confirmPassword})}
                         placeholder="Confirm Password"
                         name="confirmPassword"
                         autoComplete="new-password"
                         value={this.state.confirmPassword}
                         onChange={this.onChange}/>
                  {errors.confirmPassword && (<div className="invalid-feedback">{errors.confirmPassword}</div>)}
                </div>
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
  user: PropTypes.object.isRequired,
  errors: PropTypes.object
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    errors: state.errors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initSaveNewUser: (payload, history) => dispatch(developerActions.initSaveNewUser(payload, history))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);