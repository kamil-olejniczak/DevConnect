import React from 'react';
import notFound from '../../assets/img/404_not_found.jpg';
import {Link} from 'react-router-dom';

const NotFound = () => (
  <div className="login">
    <div className="container">
      <div className="row">
        <div className="col-md-8 m-auto">
          <h1 className="display-4 text-center">Not Found</h1>
          <p className="lead text-center">Route you tried to access doesn't exist.</p>
          <Link to="/dashboard">
            <img src={notFound} alt="Not found" title="Image that represents 404 Not Found route"/>
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default NotFound;