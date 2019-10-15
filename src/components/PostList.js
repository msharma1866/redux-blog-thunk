import React from 'react'
import { connect } from 'react-redux'
import { fetchPosts, fetchPostsAndUsers } from '../actions'
import UserHeader from './UserHeader';

class PostList extends React.Component {
  componentDidMount() {
    this.props.fetchPostsAndUsers();
  }

  renderList() {
    //console.log(this.props.posts);   
    return this.props.posts.map(post => {
      return (
        <div className="item" key={post.id}>
          <div className="content">
            <div className="description">
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </div>
          </div>
          <b><UserHeader userId={post.userId} /></b>
        </div>
      );
    });
  }

  render() {
    //console.log(this.props.posts);
    return <div className="ui relaxed divided list"> {this.renderList()} </div>
  }
}

// this will make the state available to the component as props
const mapStateToProps = (state) => {
  return {
    posts: state.posts
  }
}
export default connect(mapStateToProps, { fetchPosts, fetchPostsAndUsers })(PostList);