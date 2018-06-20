import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {initGetGitHubRepos} from '../../../store/actions/profile';
import isEmpty from '../../../utils/emptyObjectValidator';

class ProfileGitHub extends Component {
  componentDidMount() {
    this.props.initGetGitHubRepos(this.props.gitHubUsername);
  }

  render() {
    const {repos} = this.props;

    const developerRepos = repos.map(repo => (
      <li key={repo.id} className="list-group-item">
        <h4><a className="text-info" href={repo.html_url} target="_blank">{repo.name}</a></h4>
        <p>{repo.description}</p>
        <span className="badge badge-primary mr-2">Stars: {repo.stargazers_count}</span>
        <span className="badge badge-info mr-2">Watchers: {repo.watchers_count}</span>
        <span className="badge badge-success">Forks: {repo.forks_count}</span>
      </li>
    ));

    return (
      <div className="row">
        <div className="col-lg-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info mb-3">
              {isEmpty(repos) ? null : ('Recently created repositories by ' + repos[0].owner.login)}
            </h3>
            <ul className="list-group">
              {developerRepos}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

ProfileGitHub.propTypes = {
  initGetGitHubRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
};

const mapStateToProps = state => {
  return {
    repos: state.profile.repos
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initGetGitHubRepos: (gitHubUsername) => dispatch(initGetGitHubRepos(gitHubUsername))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileGitHub);