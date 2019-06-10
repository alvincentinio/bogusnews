import React, { Component } from "react";
import { patchCommentVotes, deleteAComment, getUsers } from "../api";
import loader from "../images/loader.gif";
import Moment from "react-moment";
import ShowError from "./ShowError";

class SingleComment extends Component {
  state = {
    commentVotes: 0,
    commentDeleted: false,
    defaultAvatarUrl:
      "https://i155.photobucket.com/albums/s313/alvincentinio/Avatars/default-avatar.png",
    users: null,
    loading: true,
    errorMsg: null,
    errorStatus: null
  };
  componentDidMount() {
    getUsers()
      .then(users => {
        this.setState({ users, loading: false });
      })
      .catch(({ response: { data, status } }) => {
        this.setState({
          errorMsg: data.msg,
          errorStatus: status,
          loading: false
        });
      });
  }

  render() {
    const { comment, loggedinuser } = this.props;
    const {
      commentVotes,
      defaultAvatarUrl,
      loading,
      errorMsg,
      errorStatus
    } = this.state;
    if (errorMsg)
      return <ShowError errorMsg={errorMsg} errorStatus={errorStatus} />;
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
        <div className="commentName">{comment.author} </div>
        <div className="commentTime">
          <Moment fromNow date={comment.created_at} />
        </div>
        <div className="commentDelete">
          {loggedinuser && loggedinuser.username === comment.author && (
            <button
              className="dislikeButton"
              id={comment.comment_id}
              onClick={this.handleDeleteComment}
            >
              Delete
            </button>
          )}
        </div>
        <div className="commentVotes">
          <span>{comment.votes + commentVotes} votes </span>
        </div>
        <div className="comment">{<h4>{comment.body}</h4>}</div>
        <div className="commentLike">
          <button
            className="likeButton"
            id={comment.comment_id}
            disabled={commentVotes === 1 || loggedinuser === comment.author}
            onClick={event => this.handleCommentVote(event, 1)}
          >
            Like
          </button>
        </div>
        <div className="commentDislike">
          <button
            className="dislikeButton"
            id={comment.comment_id}
            disabled={commentVotes === -1 || loggedinuser === comment.author}
            onClick={event => this.handleCommentVote(event, -1)}
          >
            Dislike
          </button>
        </div>
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
        this.setState({
          errorMsg: data.msg,
          errorStatus: status,
          loading: false
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
