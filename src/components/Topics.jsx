import React from "react";
import { getTopics } from "../api";
import loader from "../images/loader.gif";
import TopicsList from "./TopicsList";
import NewTopicForm from "./NewTopicForm";

class Topics extends React.Component {
  state = {
    topics: null,
    loading: true,
    showTopicForm: false
  };
  componentDidMount() {
    getTopics().then(topics => {
      this.setState({ topics, loading: false });
    });
  }

  render() {
    const { topics, loading } = this.state;
    return loading ? (
      <img alt="" src={loader} width="40px" />
    ) : (
      <div>
        {this.state.showTopicForm ? (
          <NewTopicForm
            loggedinuser={this.props.loggedinuser}
            refreshTopics={this.refreshTopics}
            hideForm={this.toggleForm}
          />
        ) : (
          <button className="button" onClick={this.toggleForm}>
            Add New Topic
          </button>
        )}
        <TopicsList topics={topics} loggedinuser={this.props.loggedinuser} />
      </div>
    );
  }
  toggleForm = event => {
    event.preventDefault();
    this.setState({ showTopicForm: !this.state.showTopicForm });
  };

  refreshTopics = newTopic => {
    const newTopicsArray = this.state.topics.slice();
    newTopicsArray.unshift(newTopic);
    this.setState({ topics: newTopicsArray });
  };
}

export default Topics;
