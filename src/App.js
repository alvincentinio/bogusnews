import "./App.css";
import React, { Component } from "react";
import { navigate } from "@reach/router";
import { Router } from "@reach/router";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import Users from "./components/Users";
import Topics from "./components/Topics";
import TopicArticleList from "./components/TopicArticleList";
import Articles from "./components/Articles";
import Article from "./components/Article";
import ShowError from "./components/ShowError";
import Home from "./components/Home";
import Admin from "./components/Admin";
import UsersArticles from "./components/UsersArticles";

class App extends Component {
  state = {
    loggedinuser: null
  };
  componentDidMount() {
    const storedState = sessionStorage.getItem("storedState");
    if (storedState) {
      this.setState(JSON.parse(storedState));
    }
  }
  componentDidUpdate() {
    this.saveData();
  }
  saveData = () => {
    sessionStorage.setItem("storedState", JSON.stringify(this.state));
  };
  render() {
    return (
      <div id="page-container">
        <Header
          loginUser={this.loginUser}
          loggedinuser={this.state.loggedinuser}
          logoutUser={this.logoutUser}
        />
        <Navbar />
        <Router primary={false}>
          <ScrollToTop path="/">
            <Home path="/" loggedinuser={this.state.loggedinuser} />
            <Articles loggedinuser={this.state.loggedinuser} path="/articles" />
            <Article
              path="/articles/:article_id"
              loggedinuser={this.state.loggedinuser}
            />
            <Topics loggedinuser={this.state.loggedinuser} path="/topics" />
            <TopicArticleList
              loggedinuser={this.state.loggedinuser}
              path="/topics/:topic"
            />
            <Users loggedinuser={this.state.loggedinuser} path="/users" />
            <UsersArticles path="/users/:username/articles" />
            <Admin path="/myadmin" loggedinuser={this.state.loggedinuser} />
            <ShowError default path="/error" />
          </ScrollToTop>
        </Router>
      </div>
    );
  }
  loginUser = username => {
    this.setState({ loggedinuser: username });
  };
  logoutUser = () => {
    this.setState({ loggedinuser: null });
    navigate("/");
  };
}

export default App;
