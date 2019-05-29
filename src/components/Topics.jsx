import React from "react";
import { getTopics } from "../api";
import TopicsList from "./TopicsList";
import NewTopicForm from "./NewTopicForm";

class Topics extends React.Component {
  state = {
    topics: null,
    loading: true
  };
  componentDidMount() {
    getTopics().then(topics => {
      this.setState({ topics, loading: false });
    });
  }

  render() {
    const { topics, loading } = this.state;
    return loading ? (
      <p>Loading...</p>
    ) : (
      <div>
        <NewTopicForm
          loggedinuser={this.props.loggedinuser}
          refreshTopics={this.refreshTopics}
        />
        <TopicsList topics={topics} loggedinuser={this.props.loggedinuser} />
      </div>
    );
  }
  refreshTopics = newTopic => {
    const newTopicsArray = this.state.topics.slice();
    newTopicsArray.unshift(newTopic);
    this.setState({ topics: newTopicsArray });
  };
}

export default Topics;
