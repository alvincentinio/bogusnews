import React, { Component } from "react";
import { addATopic } from "../api";

class NewTopicForm extends Component {
  state = {
    slugInput: "",
    descriptionInput: ""
  };
  render() {
    return this.props.loggedinuser ? (
      <div>
        <form id="addTopicForm">
          Create New Topic:
          <br />
          <input
            className="input-box"
            id="slugInput"
            type="text"
            placeholder="enter topic"
            onChange={this.handleInput}
            value={this.state.slugInput}
          />
          <input
            className="input-box"
            id="descriptionInput"
            type="text"
            placeholder="enter topic description"
            onChange={this.handleInput}
            value={this.state.descriptionInput}
          />
          <button className="button" onClick={this.handleSubmit} id="submit">
            Submit
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
    addATopic(slugInput, descriptionInput).then(topic => {
      refreshTopics(topic);
      this.setState({ slugInput: "", descriptionInput: "" });
    });
  };
}

export default NewTopicForm;
