import React, { Component } from "react";
import { deleteAUser, deleteATopic } from "../api";

class Admin extends Component {
  state = {
    slugInput: "",
    usernameInput: ""
  };
  render() {
    return (
      <div>
        <form id="deleteTopicForm" onSubmit={this.deleteTopic}>
          Delete Topic:
          <input
            id="slugInput"
            type="text"
            placeholder="enter topic"
            onChange={this.handleInput}
          />
          <button className="button" id="submitTopic">
            Submit
          </button>
        </form>
        <form id="deleteUserForm" onSubmit={this.deleteUser}>
          Delete User:
          <input
            id="usernameInput"
            type="text"
            placeholder="enter username"
            onChange={this.handleInput}
          />
          <button className="button" id="submitUsername">
            Submit
          </button>
        </form>
      </div>
    );
  }
  handleInput = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  deleteUser = event => {
    event.preventDefault();
    const { usernameInput } = this.state;
    deleteAUser(usernameInput);
  };

  deleteTopic = event => {
    event.preventDefault();
    const { slugInput } = this.state;
    deleteATopic(slugInput);
  };
}

export default Admin;
