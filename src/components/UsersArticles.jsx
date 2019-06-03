import React, { Component } from "react";
import { getArticles } from "../api";
import loader from "../images/loader.gif";

class UsersArticles extends Component {
  state = {
    articles: null,
    loading: true
  };
  componentDidMount() {
    const author = this.props.username;
    getArticles({ author }).then(({ data }) => {
      this.setState({
        articles: data.articles,
        loading: false,
        total_count: data.total_count,
        p: 1
      });
    });
  }
  render() {
    return (
      <div>
        {this.state.total_count ? (
          <div>
            <h4>
              {this.props.username} has {this.state.total_count} articles
            </h4>
          </div>
        ) : this.state.loading ? (
          <img alt="" src={loader} width="40px" />
        ) : (
          <h4>Sorry {this.props.username} hasn't written any articles yet</h4>
        )}
        ;
      </div>
    );
  }
}

export default UsersArticles;
