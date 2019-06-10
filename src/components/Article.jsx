import React, { Component } from "react";
import { getArticle, patchArticleVotes, deleteAnArticle } from "../api";
import CommentsList from "./CommentsList";
import { navigate } from "@reach/router";
import loader from "../images/loader.gif";
import redarrow from "../images/redarrow48x48.png";
import greenarrow from "../images/greenarrow48x48.png";
import Moment from "react-moment";

class Article extends Component {
  state = {
    article: null,
    articleVotes: 0,
    commentsUpdated: false,
    loading: true,
    confirmButtonsShowing: false
  };

  componentDidMount() {
    getArticle(this.props.article_id)
      .then(article => {
        this.setState({ article, loading: false, commentsUpdated: false });
      })
      .catch(({ response: { data, status } }) => {
        navigate("/error", {
          state: { from: "article", msg: data.msg, status },
          replace: true
        });
      });
  }
  componentDidUpdate() {
    if (this.state.commentsUpdated === true) {
      getArticle(this.props.article_id).then(article => {
        this.setState({ article, commentsUpdated: false });
      });
    }
  }

  render() {
    const {
      article,
      articleVotes,
      loading,
      confirmButtonsShowing
    } = this.state;
    const { loggedinuser } = this.props;
    const { state: locationState } = this.props.location;
    if (loading) return <img alt="" src={loader} width="30px" />;
    return (
      <div className="articleMain">
        <div className="singleArticleCard">
          <div className="articleHeader">
            {locationState && locationState.new && (
              <p>Your Newly Posted Article</p>
            )}
            <h2>{article.title}</h2>
            <h4>Topic: {article.topic}</h4>
            <h5>
              Posted by {article.author}{" "}
              <Moment fromNow date={article.created_at} />
            </h5>
            {confirmButtonsShowing && (
              <div>
                <h5>Delete Your Article & All It's Comments?</h5>
                <button className="button" onClick={this.deleteArticle}>
                  Yes
                </button>
                <button className="redbutton" onClick={this.toggleConfirm}>
                  No
                </button>
              </div>
            )}
          </div>
          <div className="articleBody">
            <h4>{article.body}</h4>
            {loggedinuser &&
              loggedinuser.username === article.author &&
              !confirmButtonsShowing && (
                <button className="redbutton" onClick={this.toggleConfirm}>
                  Delete Your Article
                </button>
              )}
            <br />
            <h5>This article has {article.comment_count} comments</h5>
          </div>
          <div className="articleLike">
            <img
              alt=""
              src={greenarrow}
              className="votearrow"
              disabled={articleVotes === 1}
              onClick={() => this.handleArticleVote(1)}
            />

            {/* <button
              className="button"
              disabled={articleVotes === 1}
              onClick={() => this.handleArticleVote(1)}
            >
              Like
            </button> */}
          </div>
          <div className="articleVotes">
            <h4>{article.votes + articleVotes}</h4>
          </div>
          <div className="articleDislike">
            <img
              alt=""
              src={redarrow}
              className="votearrow"
              disabled={articleVotes === -1}
              onClick={() => this.handleArticleVote(-1)}
            />

            {/* <button
              className="redbutton"
              disabled={articleVotes === -1}
              onClick={() => this.handleArticleVote(-1)}
            >
              Dislike
            </button> */}
          </div>
        </div>
        <CommentsList
          article_id={article.article_id}
          commentCount={article.comment_count}
          loggedinuser={loggedinuser}
          refreshCommentCount={this.refreshCommentCount}
        />
      </div>
    );
  }
  handleArticleVote = voteIncrement => {
    patchArticleVotes(this.props.article_id, voteIncrement).catch(err => {
      this.setState(prevState => {
        const newVote = prevState.articleVotes - voteIncrement;
        return {
          articleVotes: newVote
        };
      });
    });
    this.setState(prevState => {
      const newVote = prevState.articleVotes + voteIncrement;
      return {
        articleVotes: newVote
      };
    });
  };
  toggleConfirm = event => {
    const { confirmButtonsShowing } = this.state;
    event.preventDefault();
    this.setState({ confirmButtonsShowing: !confirmButtonsShowing });
  };

  deleteArticle = event => {
    event.preventDefault();
    const { article_id } = this.props;
    deleteAnArticle(article_id).then(res => {
      navigate("/articles", { state: { deletedArticle: true } });
    });
  };
  refreshCommentCount = () => {
    this.setState({ commentsUpdated: true });
  };
}
export default Article;
