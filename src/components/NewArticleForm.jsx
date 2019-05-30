import React, { Component } from "react";
import { submitArticle, getTopics } from "../api";
import { navigate } from "@reach/router";

class NewArticleForm extends Component {
  state = {
    title: "",
    body: "",
    topic: "",
    availableTopics: null,
    loading: true
  };
  componentDidMount() {
    getTopics().then(topics => {
      this.setState({ availableTopics: topics, loading: false });
    });
  }

  render() {
    return this.props.loggedinuser ? (
      <div id="centred">
        <form id="newArticleForm" onSubmit={this.handleSubmit}>
          {this.populateTopicSelect()}
          <input
            className="input-box"
            onChange={this.handleChange}
            id="title"
            placeholder="Article Title"
          />
          <textarea
            className="input-box"
            onChange={this.handleChange}
            width="260px"
            id="body"
            placeholder="Article Content"
          />
          <br />
          <button className="button">Submit Article</button>
          <button className="button" onClick={this.props.hideForm}>
            Close
          </button>
        </form>
      </div>
    ) : (
      <p>Please Sign In To Post An Article</p>
    );
  }
  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { loggedinuser } = this.props;
    const { title, body, topic } = this.state;
    submitArticle(loggedinuser.username, title, body, topic).then(article => {
      navigate(`/articles/${article.article_id}`, { state: { new: true } });
    });
  };

  populateTopicSelect = () => {
    const { availableTopics } = this.state;
    const { loading } = this.state;
    return loading ? (
      <select>loading</select>
    ) : (
      <select className="input-box" onChange={this.handleChange} id="topic">
        <option value="none" defaultValue>
          Choose Topic
        </option>
        {availableTopics.map((topic, index) => (
          <option key={index} value={topic.slug}>
            {topic.slug}
          </option>
        ))}
      </select>
    );
  };
}
export default NewArticleForm;
