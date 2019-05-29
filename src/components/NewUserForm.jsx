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
      <form id="newUserForm" onSubmit={this.handleSubmit}>
        Add New User:
        <br />
        <input
          className="input-box"
          id="username"
          type="text"
          placeholder="enter unique username"
          onChange={this.handleInput}
        />
        <input
          className="input-box"
          id="avatar_url"
          type="text"
          placeholder="enter avatar url"
          onChange={this.handleInput}
        />
        <input
          className="input-box"
          id="name"
          type="text"
          placeholder="enter name"
          onChange={this.handleInput}
        />
        <button className="button" id="submit">
          Create User
        </button>
      </form>
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
    });
  };
}
export default NewUserForm;
