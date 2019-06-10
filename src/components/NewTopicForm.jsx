import React, { Component } from "react";
import { addATopic } from "../api";
import ShowError from "./ShowError";

class NewTopicForm extends Component {
  state = {
    slugInput: "",
    descriptionInput: "",
    errorMsg: null,
    errorStatus: null
  };
  render() {
    const { errorMsg, errorStatus } = this.state;
    if (errorMsg)
      return (
        <ShowError errorMsg={errorMsg} errorStatus={errorStatus} from="topic" />
      );
    return this.props.loggedinuser ? (
      <div className="newTopicForm">
        <form id="addTopicForm" onSubmit={this.handleSubmit}>
          <input
            className="input-box"
            id="slugInput"
            type="text"
            required={true}
            placeholder="enter topic"
            onChange={this.handleInput}
            value={this.state.slugInput}
          />
          <input
            className="input-box"
            id="descriptionInput"
            type="text"
            required={true}
            placeholder="enter topic description"
            onChange={this.handleInput}
            value={this.state.descriptionInput}
          />
          <button className="button" id="submit">
            Add Topic
          </button>
          <button className="button redbutton" onClick={this.props.hideForm}>
            Close
          </button>
        </form>
      </div>
    ) : (
      <p>Please Sign In To Create A Topic</p>
    );
  }
  handleInput = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { refreshTopics } = this.props;
    const { slugInput, descriptionInput } = this.state;
    addATopic(slugInput.trim(), descriptionInput.trim())
      .then(topic => {
        refreshTopics(topic);
        this.setState({ slugInput: "", descriptionInput: "" });
      })
      .catch(({ response: { data, status } }) => {
        this.setState({
          errorMsg: data.msg,
          errorStatus: status
        });
      });
  };
}

export default NewTopicForm;
