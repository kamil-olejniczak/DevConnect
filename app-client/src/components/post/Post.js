import React, {Component} from 'react';
import {connect} from 'react-redux';
import {initGetPost} from '../../store/actions/post';
import PropTypes from 'prop-types';
import isEmpty from '../../utils/emptyObjectValidator';
import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';

class Post extends Component {
  componentDidMount() {
    this.props.initGetPost(this.props.match.params.id);
  }

  render() {
    const {post} = this.props.post;
    const {errors} = this.props;
    const {isDataLoading} = this.props.isDataLoading;
    let renderedPost;

    if ((isDataLoading && isEmpty(post)) || (isEmpty(post) && isEmpty(errors))) {
      renderedPost = (<Spinner/>);
    } else if (post.postNotFound || errors.serverStatus) {
      renderedPost = errors.serverStatus ? (<p className="lead text-muted">{errors.serverStatus}</p>) : (
        <div>
          <p className="lead text-muted">Currently there is no post with given id in database!</p>
        </div>);
    } else {
      renderedPost = <PostItem post={post} key={post._id}/>;
    }

    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center mb-3">
                You are viewing post created by: <br/>
                <small className="text-muted">{post.name}</small>
              </h1>
              {renderedPost}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  initGetPost: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  isDataLoading: PropTypes.bool.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    errors: state.errors,
    isDataLoading: state.common.isDataLoading,
    post: state.post
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initGetPost: (id) => dispatch(initGetPost(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);