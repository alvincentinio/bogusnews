import React, { Component } from "react";
import { getComments } from "../api";
import SingleComment from "./SingleComment";
import NewCommentForm from "./NewCommentForm";

class CommentsList extends Component {
  state = {
    comments: [],
    commentBeenDeleted: false
  };

  componentDidMount() {
    getComments(this.props.article_id).then(comments => {
      this.setState({ comments });
    });
  }
  componentDidUpdate() {
    console.log("CommentsList Did Update");
  }
  render() {
    const { loggedinuser, article_id } = this.props;
    const { comments } = this.state;
    return (
      <div>
        <NewCommentForm
          loggedinuser={loggedinuser}
          article_id={article_id}
          refreshComments={this.refreshComments}
          refreshCommentCount={this.props.refreshCommentCount}
        />
        <ul>
          {comments.map(comment => {
            return (
              <li key={comment.comment_id}>
                <SingleComment
                  comment={comment}
                  commentBeenDeleted={this.commentBeenDeleted}
                  loggedinuser={loggedinuser}
                />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
  commentBeenDeleted = () => {
    this.setState({ commentBeenDeleted: true });
  };

  refreshComments = newComment => {
    const newCommentsArray = this.state.comments.slice();
    newCommentsArray.unshift(newComment);
    this.setState({ comments: newCommentsArray });
  };
}

export default CommentsList;
