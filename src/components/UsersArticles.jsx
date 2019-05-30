import React, { Component } from "react";
import { getArticles } from "../api";

class UsersArticles extends Component {
  state = {
    articles: null
  };
  componentDidMount() {
    const author = this.props.username;
    // getArticles(author);
  }
  render() {
    return <div>Users Articles</div>;
  }
}

export default UsersArticles;
