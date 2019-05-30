import React from "react";
import { getArticles } from "../api";
import loader from "../images/loader.gif";
import ArticleList from "./ArticleList";
import NewArticleForm from "./NewArticleForm";

class Articles extends React.Component {
  state = {
    articles: null,
    loading: true,
    articlesSorted: false,
    authorsArticlesShowing: false,
    author: null,
    p: 1,
    total_count: 0,
    showArticleForm: false
  };
  componentDidMount() {
    const { p } = this.state;
    getArticles({ p })
      .then(({ data }) => {
        this.setState({
          articles: data.articles,
          loading: false,
          total_count: data.total_count,
          authorArticlesShowing: false
        });
      })
      .catch(err => {
        console.dir(err);
      });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.p !== this.state.p) {
      this.fetchArticles();
    }
  }

  render() {
    const { articles, loading, p } = this.state;
    const { state: locationState } = this.props.location;
    return loading ? (
      <img alt="" src={loader} width="40px" />
    ) : (
      <div>
        {locationState && locationState.deletedArticle && (
          <p>Article Deleted</p>
        )}
        {this.props.loggedinuser && (
          <button className="button" onClick={this.getAuthorsArticles}>
            View Your Articles
          </button>
        )}
        {this.state.showArticleForm ? (
          <NewArticleForm
            loggedinuser={this.props.loggedinuser}
            hideForm={this.hideForm}
          />
        ) : (
          <button className="button" onClick={this.displayForm}>
            Submit New Article
          </button>
        )}
        <ArticleList
          loggedinuser={this.props.loggedinuser}
          articles={articles}
          handleSort={this.handleSort}
        />
        <h5>
          Page {this.state.p} of {Math.ceil(this.state.total_count / 10)}
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
          disabled={p === Math.ceil(this.state.total_count / 10)}
          onClick={() => this.changePage(1)}
        >
          Next Page
        </button>
      </div>
    );
  }
  // toggleAuthorsArticles = () => {
  //   this.setState(prevState => ({
  //     authorArticlesShowing: !prevState.authorArticlesShowing
  //   }));
  // };
  // toggleAuthorsArticles = () => {
  //   this.setState({
  //     authorArticlesShowing: !this.state.authorArticlesShowing
  //   });
  // };
  displayForm = event => {
    event.preventDefault();
    this.setState({ showArticleForm: true });
  };
  hideForm = event => {
    event.preventDefault();
    this.setState({ showArticleForm: false });
  };

  getAuthorsArticles = props => {
    if (this.props.loggedinuser) {
      const author = this.props.loggedinuser.username;
      getArticles({ author }).then(({ data }) => {
        this.setState({
          articles: data.articles,
          loading: false,
          authorArticlesShowing: false,
          total_count: data.total_count,
          p: 1
        });
      });
    }
  };

  fetchArticles = () => {
    const { p } = this.state;
    getArticles({ p }).then(({ data }) => {
      this.setState({
        articles: data.articles,
        total_count: data.total_count,
        loading: false
      });
    });
  };

  changePage = direction => {
    this.setState(prevState => {
      return { p: prevState.p + direction };
    });
  };

  handleSort = (sort_by, order) => {
    const query = {
      sort_by: sort_by,
      order: order
    };
    getArticles(query).then(({ data }) => {
      this.setState({
        articles: data.articles,
        loading: false,
        articlesSorted: true,
        total_count: data.total_count
      });
    });
  };
}

export default Articles;
