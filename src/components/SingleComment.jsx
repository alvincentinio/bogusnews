import React, { Component } from "react";
import { patchCommentVotes, deleteAComment } from "../api";
import { formatDate } from "../utils/formatData";
import { navigate } from "@reach/router";

class SingleComment extends Component {
  state = {
    commentVotes: 0,
    commentDeleted: false
  };

  render() {
    const { comment, loggedinuser } = this.props;
    const { commentVotes } = this.state;

    return this.state.commentDeleted ? (
      <div>comment deleted</div>
    ) : (
      <div className="card">
        <h3>
          Posted By: {comment.author}@ {formatDate(comment.created_at)}
        </h3>
        <p>{comment.body}</p>
        <button
          className="button"
          id={comment.comment_id}
          disabled={commentVotes === 1 || loggedinuser === comment.author}
          onClick={event => this.handleCommentVote(event, 1)}
        >
          Like
        </button>
        <span> Votes: {comment.votes + commentVotes} </span>
        <button
          className="redbutton"
          id={comment.comment_id}
          disabled={commentVotes === -1 || loggedinuser === comment.author}
          onClick={event => this.handleCommentVote(event, -1)}
        >
          Dislike
        </button>
        <br />
        {loggedinuser && loggedinuser.username === comment.author && (
          <button
            className="redbutton"
            id={comment.comment_id}
            onClick={this.handleDeleteComment}
          >
            Delete Your Comment
          </button>
        )}
      </div>
    );
  }
  handleCommentVote = (event, voteIncrement) => {
    patchCommentVotes(event.target.id, voteIncrement).catch(err => {
      this.setState(prevState => {
        const newVote = prevState.commentVotes - voteIncrement;
        return {
          commentVotes: newVote
        };
      });
    });
    this.setState(prevState => {
      const newVote = prevState.commentVotes + voteIncrement;
      return {
        commentVotes: newVote
      };
    });
  };
  handleDeleteComment = (event, comment_id) => {
    const { refreshCommentCount } = this.props;
    deleteAComment(event.target.id, comment_id)
      .then(res => {
        this.setState({ commentDeleted: true });
        refreshCommentCount();
      })
      .catch(({ response: { data, status } }) => {
        navigate("/error", {
          state: { from: "comments", msg: data.msg, status },
          replace: true
        });
      });
  };
}

export default SingleComment;
