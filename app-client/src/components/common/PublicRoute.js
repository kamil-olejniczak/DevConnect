import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const PublicRoute = ({isAuthenticated, component: Component, ...rest}) => (
  <Route {...rest} render={(props) => (
    !isAuthenticated ? (<Component {...props}/>) : (<Redirect to="/dashboard"/>)
  )}/>
);

PublicRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, null, null, {pure: false})(PublicRoute);
