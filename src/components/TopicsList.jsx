import React, { Component } from "react";
import { getArticles } from "../api";
import TopicArticleList from "./ArticleList";

class TopicsList extends Component {
  state = {
    articles: null,
    topic: null,
    total_count: 0
  };
  componentDidMount() {
    this.setState({ topic: null });
  }
  render() {
    const { topics } = this.props;
    return this.state.articles ? (
      this.state.articles.length === 0 ? (
        <p>no articles in this topic yet!</p>
      ) : (
        <div>
          <p>{this.state.articles[0].topic} articles</p>
          <TopicArticleList
            articles={this.state.articles}
            loggedinuser={this.props.loggedinuser}
            handleSort={this.handleSort}
            topic={this.state.topic}
          />
        </div>
      )
    ) : (
      <ul className="cards">
        {topics.map(topic => {
          return (
            <li className="card" key={topic.slug}>
              <p>
                Topic: {topic.slug}
                <br />
                Description: {topic.description}
              </p>
              <button
                className="button topicbutton"
                onClick={this.handleSubmit}
                id={topic.slug}
              >
                {topic.slug} Articles
              </button>
            </li>
          );
        })}
      </ul>
    );
  }
  handleSubmit = event => {
    const topic = event.target.id;
    getArticles({ topic }).then(({ data }) => {
      this.setState({
        articles: data.articles,
        topic,
        total_count: data.total_count
      });
    });
  };
  handleSort = (sort_by, order) => {
    const { topic } = this.state;
    const query = {
      topic: topic,
      sort_by: sort_by,
      order: order
    };
    getArticles(query).then(({ data }) => {
      this.setState({ articles: data.articles, total_count: data.total_count });
    });
  };
}

export default TopicsList;
