import React, { Component } from "react";
import { getComments } from "../api";
import SingleComment from "./SingleComment";
import NewCommentForm from "./NewCommentForm";

class CommentsList extends Component {
  state = {
    comments: [],
    commentBeenDeleted: false,
    p: 1
  };

  componentDidMount() {
    const { article_id } = this.props;
    const { p } = this.state;
    getComments(article_id, p).then(comments => {
      this.setState({ comments });
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.p !== this.state.p) {
      this.fetchComments();
    }
  }

  render() {
    const {
      loggedinuser,
      article_id,
      commentCount,
      refreshCommentCount
    } = this.props;
    const { comments, p } = this.state;
    return (
      <div>
        <NewCommentForm
          loggedinuser={loggedinuser}
          article_id={article_id}
          refreshComments={this.refreshComments}
          refreshCommentCount={refreshCommentCount}
        />
        <ul className="cardList">
          {comments.map(comment => {
            return (
              <li key={comment.comment_id}>
                <SingleComment
                  comment={comment}
                  commentBeenDeleted={this.commentBeenDeleted}
                  loggedinuser={loggedinuser}
                  refreshCommentCount={refreshCommentCount}
                />
              </li>
            );
          })}
        </ul>
        <h5>
          Page {p} of {commentCount < 10 ? 1 : Math.ceil(commentCount / 10)}
        </h5>
        <button
          className="button"
          disabled={p === 1}
          onClick={() => this.changePage(-1)}
        >
          Previous Page
        </button>
        <button
          className="button"
          disabled={commentCount < 10 || p === Math.ceil(commentCount / 10)}
          onClick={() => this.changePage(1)}
        >
          Next Page
        </button>
      </div>
    );
  }
  commentBeenDeleted = () => {
    this.setState({ commentBeenDeleted: true });
  };
  fetchComments = () => {
    console.log("fetching next page of comments");
    const { p } = this.state;
    const { article_id } = this.props;
    getComments(article_id, p).then(comments => {
      this.setState({
        comments
      });
    });
  };

  refreshComments = newComment => {
    const newCommentsArray = this.state.comments.slice();
    newCommentsArray.unshift(newComment);
    this.setState({ comments: newCommentsArray });
  };
  changePage = direction => {
    this.setState(prevState => {
      return { p: prevState.p + direction };
    });
  };
}

export default CommentsList;
