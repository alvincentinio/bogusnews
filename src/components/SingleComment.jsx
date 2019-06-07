import React, { Component } from "react";
import { patchCommentVotes, deleteAComment, getUsers } from "../api";
// import { formatDate } from "../utils/formatData";
import { navigate } from "@reach/router";
import loader from "../images/loader.gif";
import Moment from "react-moment";

class SingleComment extends Component {
  state = {
    commentVotes: 0,
    commentDeleted: false,
    defaultAvatarUrl:
      "https://i155.photobucket.com/albums/s313/alvincentinio/Avatars/default-avatar.png",
    users: null,
    loading: true
  };
  componentDidMount() {
    getUsers()
      .then(users => {
        this.setState({ users, loading: false });
      })
      .catch(({ response: { data, status } }) => {
        navigate("/error", {
          state: { from: "comment", msg: data.msg, status },
          replace: true
        });
      });
  }

  render() {
    const { comment, loggedinuser } = this.props;
    const { commentVotes, defaultAvatarUrl, loading } = this.state;

    return this.state.commentDeleted ? (
      <h5>Your comment has been deleted</h5>
    ) : (
      <div className="commentCard">
        <div className="avatar">
          {loading ? (
            <img alt="" src={loader} width="20px" />
          ) : (
            <img
              className="comment-avatar"
              src={this.getUserAvatar(comment.author)}
              onError={e => {
                e.target.onerror = null;
                e.target.src = defaultAvatarUrl;
              }}
              width="26"
              height="26"
              alt=""
            />
          )}
        </div>
        <div className="commentName">{comment.author}</div>
        <div className="commentTime">
          {/* {formatDate(comment.created_at)} */}
          <Moment fromNow date={comment.created_at} />
        </div>
        <div className="commentDelete">
          {loggedinuser && loggedinuser.username === comment.author && (
            <button
              className="redbutton"
              id={comment.comment_id}
              onClick={this.handleDeleteComment}
            >
              Delete
            </button>
          )}
        </div>
        <div className="commentVotes">
          <h5> Votes: {comment.votes + commentVotes} </h5>
        </div>
        <div className="comment">{<h4>{comment.body}</h4>}</div>
        <div className="commentLike">
          <button
            className="button"
            id={comment.comment_id}
            disabled={commentVotes === 1 || loggedinuser === comment.author}
            onClick={event => this.handleCommentVote(event, 1)}
          >
            Like
          </button>
        </div>
        <div className="commentDislike">
          <button
            className="redbutton"
            id={comment.comment_id}
            disabled={commentVotes === -1 || loggedinuser === comment.author}
            onClick={event => this.handleCommentVote(event, -1)}
          >
            Dislike
          </button>
        </div>
        {/* <h3>
          Posted By: {comment.author}@ {formatDate(comment.created_at)}
        </h3>
        <p>{comment.body}</p>
        <button
          className="button"
          id={comment.comment_id}
          disabled={commentVotes === 1 || loggedinuser === comment.author}
          onClick={event => this.handleCommentVote(event, 1)}
        >
          <span aria-label="like " role="img">
            👍
          </span>
          Like
        </button>
        <h5> Votes: {comment.votes + commentVotes} </h5>
        <button
          className="redbutton"
          id={comment.comment_id}
          disabled={commentVotes === -1 || loggedinuser === comment.author}
          onClick={event => this.handleCommentVote(event, -1)}
        >
          <span aria-label="like " role="img">
            👎
          </span>
          Dislike
        </button>
        <br />
        {loggedinuser && loggedinuser.username === comment.author && (
          <button
            className="redbutton"
            id={comment.comment_id}
            onClick={this.handleDeleteComment}
          >
            Delete
          </button>
        )} */}
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
  getUserAvatar = author => {
    const { comment } = this.props;
    const { users } = this.state;
    for (let i = 0; i < users.length; i++) {
      if (users[i].username === comment.author) {
        return users[i].avatar_url;
      }
    }
  };
}

export default SingleComment;
