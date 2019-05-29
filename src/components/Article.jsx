import React, { Component } from "react";
import {
  getArticle,
  patchArticleVotes,
  formatDate,
  deleteAnArticle
} from "../api";
import CommentsList from "./CommentsList";
import { navigate } from "@reach/router";
import ShowError from "./ShowError";

class Article extends Component {
  state = {
    article: null,
    articleVotes: 0,
    errorStatus: null,
    errorMsg: null,
    commentsUpdated: false,
    loading: true
  };

  componentDidMount() {
    console.log("single article mounted");
    getArticle(this.props.article_id)
      .then(article => {
        this.setState({ article, loading: false, commentsUpdated: false });
      })
      .catch(({ response: { data, status } }) => {
        console.log(data.msg, status);
        //error in state
        this.setState({
          errorMsg: data.msg,
          errorStatus: status,
          loading: false
        });
        // navigate -> /notfound
        // navigate("/error", {
        //   state: { from: "article", msg: data.message, status },
        //   replace: true
        // });
      });
  }
  componentDidUpdate() {
    console.log("single article updated");
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
      errorMsg,
      errorStatus
    } = this.state;
    const { loggedinuser } = this.props;
    const { state: locationState } = this.props.location;
    if (loading) return <p>Loading...</p>;
    if (errorMsg)
      return <ShowError errorMsg={errorMsg} errorStatus={errorStatus} />;
    return (
      <div>
        {locationState && locationState.new && <p>Your newly posted article</p>}
        <h2>{article.title}</h2>
        {loggedinuser && loggedinuser.username === article.author && (
          <button className="redbutton" onClick={this.deleteArticle}>
            Delete Your Article
          </button>
        )}
        <h4>Topic: {article.topic}</h4>
        <h5>Author: {article.author}</h5>
        <h5>Posted @ {formatDate(article.created_at)}</h5>
        <h4>{article.body}</h4>
        <button
          className="button"
          disabled={articleVotes === 1}
          onClick={() => this.handleArticleVote(1)}
        >
          Like
        </button>
        <h5>Votes: {article.votes + articleVotes}</h5>
        <button
          className="redbutton"
          disabled={articleVotes === -1}
          onClick={() => this.handleArticleVote(-1)}
        >
          Dislike
        </button>
        <h6>Number Of Comments: {article.comment_count}</h6>
        <CommentsList
          article_id={article.article_id}
          loggedinuser={loggedinuser}
          refreshCommentCount={this.refreshCommentCount}
        />
      </div>
    );
  }
  handleArticleVote = voteIncrement => {
    patchArticleVotes(this.props.article_id, voteIncrement);
    this.setState(prevState => {
      const newVote = prevState.articleVotes + voteIncrement;
      return {
        articleVotes: newVote
      };
    });
  };
  deleteArticle = event => {
    event.preventDefault();
    const { article_id } = this.props;
    if (window.confirm("Delete Article & All It's Comments?")) {
      deleteAnArticle(article_id).then(res => {
        console.log("deleted article in article");
        navigate("/articles", { state: { deletedArticle: true } });
      });
    }
  };
  refreshCommentCount = () => {
    this.setState({ commentsUpdated: true });
  };
}
export default Article;

// {
//   loggedinuser ? (
//     <div>
//       <button
//         disabled={articleVotes === 1}
//         onClick={() => this.handleArticleVote(1)}
//       >
//         Like
//             </button>
//       <button
//         disabled={articleVotes === -1}
//         onClick={() => this.handleArticleVote(-1)}
//       >
//         Hate
//             </button>
//       <h6>Number Of Comments: {article.comment_count}</h6>
//       <CommentsList
//         article_id={article.article_id}
//         loggedinuser={loggedinuser}
//         refreshCommentCount={this.refreshCommentCount}
//       />
//     </div>
//   ) : (
//       <p>Please Sign In To Vote & See Comments</p>
//     )
// }

// function PageNumbers({ paginateArticles }) {
//   return (
//     <div>
//       <button onClick={e => paginateArticles(1)} >1</button>
//       <button onClick={e => paginateArticles(2)} >2</button>
//       <button onClick={e => paginateArticles(3)} >3</button>
//       <button onClick={e => paginateArticles(4)} >4</button>
//     </div>
//   )
// };

// export default PageNumbers;

// paginateArticles = (pageNumber) => {
//   getArticles(pageNumber)
//     .then(articles => {
//       this.setState({ articles });
//     });
// }

/* <div>
  <SortArticles sortArticles={this.sortArticles} />
  {articles && <ArticleGrid articles={articles} />}
  <PageNumbers paginateArticles={this.paginateArticles} />
</div> */

//errors
// componentDidMount() {
//   const { article_id } = this.props;

//   axios.get(`https://alcrewe-news.herokuapp.com/api/articles/${article_id}`)
//     .then(({ data: { article } }) => {
//       this.setState({ article });
//     })
//     .catch(({ response }) => {
//       navigate("/oops", {
//         replace: true, state: {
//           code: response.status,
//           msg: response.data.msg
//         }
//       });
//     });

//   axios.get(`https://alcrewe-news.herokuapp.com/api/articles/${article_id}/comments`)
//     .then(({ data: { comments } }) => {
//       this.setState({ comments })
//     });
// }
//if (this.state.err)
// return (
//   <Link
//     to={{
//       pathname: "/error",
//       state: { err: this.state.err, from: "article" }
//     }}
//   />
