import React from "react";
import { getTopics } from "../api";
import loader from "../images/loader.gif";
import TopicsList from "./TopicsList";
import NewTopicForm from "./NewTopicForm";
import { navigate } from "@reach/router";

class Topics extends React.Component {
  state = {
    topics: null,
    loading: true,
    showTopicForm: false
  };
  componentDidMount() {
    getTopics()
      .then(topics => {
        this.setState({ topics, loading: false });
      })
      .catch(({ response: { data, status } }) => {
        navigate("/error", {
          state: { from: "topics", msg: data.msg, status },
          replace: true
        });
      });
  }

  render() {
    const { topics, loading } = this.state;
    const { loggedinuser } = this.props;
    return loading ? (
      <img alt="" src={loader} width="30px" />
    ) : (
      <div>
        {this.state.showTopicForm ? (
          <NewTopicForm
            loggedinuser={loggedinuser}
            refreshTopics={this.refreshTopics}
            hideForm={this.toggleForm}
          />
        ) : (
          <button className="button" onClick={this.toggleForm}>
            Add New Topic
          </button>
        )}
        <TopicsList topics={topics} loggedinuser={loggedinuser} />
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
