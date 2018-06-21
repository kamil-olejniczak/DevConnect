import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {initCreatePost} from '../../store/actions/post';
import TextAreaFieldGroup from '../common/form/TextAreaFieldGroup';

class PostForm extends Component {
  state = {
    text: ''
  };

  onSubmit = (event) => {
    event.preventDefault();

    const {user} = this.props.auth;
    const postData = {
      ...this.state,
      avatar: user.avatar,
      name: user.name
    };
    this.props.initCreatePost(postData, this.props.history);
  };

  onChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  };

  render() {
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">
            Describe what are you working at currently:
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  error={this.props.errors.text}
                  name="text"
                  onChange={this.onChange}
                  placeholder="Write what you want."
                  value={this.state.text}/>
                <button
                  className="btn btn-info"
                  type="submit"
                  disabled={!!this.props.errors.serverStatus}>Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

PostForm.propTypes = {
  initCreatePost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    errors: state.errors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initCreatePost: (payload, history) => dispatch(initCreatePost(payload, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);