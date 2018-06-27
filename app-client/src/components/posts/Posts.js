import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {initGetPosts} from '../../store/actions/post';
import PostForm from './PostForm';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import isEmpty from '../../utils/emptyObjectValidator';

class Posts extends Component {
  componentDidMount() {
    this.props.initGetPosts();
  }

  render() {
    const {posts} = this.props.post;
    const {errors} = this.props;
    const {isDataLoading} = this.props.common;
    let renderedPosts;

    if ((isDataLoading && isEmpty(posts)) || (isEmpty(posts) && isEmpty(errors))) {
      renderedPosts = (<Spinner/>);
    } else if (posts.postsNotFound || errors.serverStatus) {
      renderedPosts = errors.serverStatus ? (<p className="lead text-muted">{errors.serverStatus}</p>) : (
        <div>
          <p className="lead text-muted">Currently there are no posts in database. Feel free to post something!</p>
        </div>);
    } else {
      renderedPosts = posts.map(post => <PostItem post={post} key={post._id}/>);
    }

    return (
      <div className="posts">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center mb-3">Recently Added Posts</h1>
              <PostForm/>
              {renderedPosts}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  initGetPosts: PropTypes.func.isRequired,
  common: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    common: state.common,
    post: state.post,
    errors: state.errors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initGetPosts: () => dispatch(initGetPosts())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);