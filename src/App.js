import "./App.css";
import React, { Component } from "react";
import { navigate } from "@reach/router";
import { Router } from "@reach/router";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import Users from "./components/Users";
import Topics from "./components/Topics";
import TopicArticles from "./components/TopicArticles";
import Articles from "./components/Articles";
import SingleArticle from "./components/SingleArticle";
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
    const { loggedinuser } = this.state;
    return (
      <div id="page-container">
        <Header
          loginUser={this.loginUser}
          loggedinuser={loggedinuser}
          logoutUser={this.logoutUser}
        />
        <Navbar />
        <Router primary={false}>
          <ScrollToTop path="/">
            <Home path="/" loggedinuser={loggedinuser} />
            <Articles loggedinuser={loggedinuser} path="/articles" />
            <SingleArticle
              path="/articles/:article_id"
              loggedinuser={loggedinuser}
            />
            <Topics loggedinuser={loggedinuser} path="/topics" />
            <TopicArticles
              loggedinuser={loggedinuser}
              path="/topics/:topic/articles"
            />
            <Users loggedinuser={loggedinuser} path="/users" />
            <UsersArticles
              path="/users/:username/articles"
              loggedinuser={loggedinuser}
            />
            <Admin path="/myadmin" loggedinuser={loggedinuser} />
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
