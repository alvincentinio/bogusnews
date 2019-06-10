import React, { Component } from "react";
import { addAUser } from "../api";
import ShowError from "./ShowError";

class NewUserForm extends Component {
  state = {
    username: "",
    avatar_url: "",
    name: "",
    invalid_url: false,
    errorMsg: null,
    errorStatus: null
  };
  render() {
    const { errorMsg, errorStatus } = this.state;
    if (errorMsg)
      return (
        <ShowError errorMsg={errorMsg} errorStatus={errorStatus} from="user" />
      );
    return (
      <div className="newUserForm">
        <form id="newUserForm" onSubmit={this.handleSubmit}>
          <input
            className="input-box"
            id="username"
            type="text"
            placeholder="enter unique username"
            required={true}
            value={this.state.username}
            onChange={this.handleInput}
          />
          <input
            className="input-box"
            id="name"
            type="text"
            required={true}
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
          {this.state.invalid_url && (
            <div className="avatarerror">
              <h6>please enter a valid url or leave blank</h6>
            </div>
          )}
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

  postNewUser = () => {
    const { refreshUsers } = this.props;
    const { username, avatar_url, name } = this.state;
    addAUser(username.trim(), avatar_url.trim(), name.trim())
      .then(newUser => {
        refreshUsers(newUser);
        this.setState({
          username: "",
          avatar_url: "",
          name: "",
          invalid_url: false
        });
      })
      .catch(({ response: { data, status } }) => {
        this.setState({
          errorMsg: data.msg,
          errorStatus: status
        });
      });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { avatar_url } = this.state;
    const regextest = /^((ftp|http|https):\/\/)?(www|i55)\.([A-z]+)\.([A-z]{2,})/.test(
      avatar_url
    );
    // const regextest = true;
    avatar_url.length === 0 || regextest
      ? this.postNewUser()
      : this.setState({ invalid_url: true });
  };
}
export default NewUserForm;
