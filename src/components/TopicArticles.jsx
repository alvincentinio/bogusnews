import React, { Component } from "react";
import { getArticles } from "../api";
import loader from "../images/loader.gif";
import ArticleList from "./ArticleList";
import ShowError from "./ShowError";

class TopicArticles extends Component {
  state = {
    articles: null,
    loading: true,
    total_count: 0,
    p: 1,
    errorMsg: null,
    errorStatus: null
  };
  componentDidMount() {
    const { topic } = this.props;
    getArticles({ topic })
      .then(({ data }) => {
        this.setState({
          articles: data.articles,
          loading: false,
          total_count: data.total_count
        });
      })
      .catch(({ response: { data, status } }) => {
        this.setState({
          errorMsg: data.msg,
          errorStatus: status,
          loading: false
        });
      });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.p !== this.state.p) {
      this.fetchArticles();
    }
  }
  render() {
    const {
      articles,
      loading,
      p,
      total_count,
      errorMsg,
      errorStatus
    } = this.state;
    const { topic, loggedinuser } = this.props;
    if (errorMsg)
      return <ShowError errorMsg={errorMsg} errorStatus={errorStatus} />;
    return loading ? (
      <img alt="" src={loader} width="30px" />
    ) : (
      <div>
        {total_count ? (
          <div>
            <h4>
              There are {total_count} {topic} articles
            </h4>
          </div>
        ) : loading ? (
          <img alt="" src={loader} width="30px" />
        ) : (
          <h4>Sorry there are no articles in the {topic} topic yet</h4>
        )}
        <ArticleList
          loggedinuser={loggedinuser}
          articles={articles}
          handleSort={this.handleSort}
        />
        <h5>
          Page {p} of {total_count < 10 ? 1 : Math.ceil(total_count / 10)}
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
          disabled={total_count < 10 || p === Math.ceil(total_count / 10)}
          onClick={() => this.changePage(1)}
        >
          Next Page
        </button>
      </div>
    );
  }
  fetchArticles = () => {
    const { p } = this.state;
    const { topic } = this.props;
    getArticles({ p, topic })
      .then(({ data }) => {
        this.setState({
          articles: data.articles,
          total_count: data.total_count,
          loading: false
        });
      })
      .catch(({ response: { data, status } }) => {
        this.setState({
          errorMsg: data.msg,
          errorStatus: status,
          loading: false
        });
      });
  };
  handleSort = (sort_by, order) => {
    const { topic } = this.props;
    const query = {
      sort_by: sort_by,
      order: order,
      topic: topic
    };
    getArticles(query)
      .then(({ data }) => {
        this.setState({
          articles: data.articles,
          loading: false,
          total_count: data.total_count
        });
      })
      .catch(({ response: { data, status } }) => {
        this.setState({
          errorMsg: data.msg,
          errorStatus: status,
          loading: false
        });
      });
  };
  changePage = direction => {
    this.setState(prevState => {
      return { p: prevState.p + direction };
    });
  };
}

export default TopicArticles;
