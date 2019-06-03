import React, { Component } from "react";
import { addAUser } from "../api";

class NewUserForm extends Component {
  state = {
    username: "",
    avatar_url: "",
    name: ""
  };
  render() {
    return (
      <div className="newUserForm">
        <form id="newUserForm" onSubmit={this.handleSubmit}>
          <input
            className="input-box"
            id="username"
            type="text"
            placeholder="enter unique username"
            value={this.state.username}
            onChange={this.handleInput}
          />
          <input
            className="input-box"
            id="name"
            type="text"
            placeholder="enter name"
            value={this.state.name}
            onChange={this.handleInput}
          />
          <input
            className="input-box"
            id="avatar_url"
            type="text"
            placeholder="enter avatar url"
            value={this.state.avatar_url}
            onChange={this.handleInput}
          />
          <button className="button" id="submit">
            Create User
          </button>
          <button className="button redbutton" onClick={this.props.hideForm}>
            Close
          </button>
        </form>
      </div>
    );
  }
  handleInput = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { refreshUsers } = this.props;
    const { username, avatar_url, name } = this.state;
    addAUser(username, avatar_url, name).then(newUser => {
      refreshUsers(newUser);
      this.setState({ username: "", avatar_url: "", name: "" });
    });
  };
}
export default NewUserForm;
