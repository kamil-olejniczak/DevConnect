import React, {Component} from 'react';
import classnames from 'classnames';
import {connect} from 'react-redux';
import * as authActions from '../../store/actions/auth';
import * as errorActions from '../../store/actions/error';
import PropTypes from 'prop-types';

class Login extends Component {
  state = {
    email: '',
    password: '',
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
    const userData = {
      ...this.state,
    };

    this.props.initLoginUser(userData, this.props.history);
  };

  render() {
    const {errors} = this.props;
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">Sign in to your DevConnector account</p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input type="email"
                         className={classnames('form-control form-control-lg', {'is-invalid': errors.email})}
                         placeholder="Email Address"
                         name="email"
                         autoComplete="email"
                         value={this.state.email}
                         onChange={this.onChange}/>
                  {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                </div>
                <div className="form-group">
                  <input type="password"
                         className={classnames('form-control form-control-lg', {'is-invalid': errors.password})}
                         placeholder="Password"
                         name="password"
                         autoComplete="current-password"
                         value={this.state.password}
                         onChange={this.onChange}/>
                  {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
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

Login.propTypes = {
  initLoginUser: PropTypes.func.isRequired,
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
    initLoginUser: (payload, history) => dispatch(authActions.initLoginUser(payload, history)),
    cleanUpErrors: () => dispatch(errorActions.cleanUpErrors())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);