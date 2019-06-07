import React from "react";
import { getUser, getUsers } from "../api";

class SigninBox extends React.Component {
  state = {
    usernameInput: "",
    defaultAvatarUrl:
      "https://i155.photobucket.com/albums/s313/alvincentinio/Avatars/default-avatar.png",
    users: null,
    invalidUser: false
  };
  componentDidMount() {
    getUsers().then(users => {
      this.setState({ users });
    });
  }

  render() {
    const { loggedinuser } = this.props;
    const { logoutUser } = this.props;
    const { defaultAvatarUrl, invalidUser } = this.state;
    return loggedinuser ? (
      <div id="signinBox">
        {loggedinuser.name}
        <img
          id="avatar-img"
          src={loggedinuser.avatar_url}
          onError={e => {
            e.target.onerror = null;
            e.target.src = defaultAvatarUrl;
          }}
          width="26"
          height="26"
          alt={`${loggedinuser.username}_avatar`}
        />
        <button className="button" onClick={logoutUser}>
          Sign Out
        </button>
      </div>
    ) : invalidUser ? (
      <div id="signinbox">
        <form onSubmit={this.handleSubmit}>
          <input
            className="input-box"
            onChange={this.handleInput}
            required={true}
            placeholder="enter username"
          />
          <br />
          <h6>invalid user, please try again</h6>
          <button className="button">Sign In</button>
        </form>
      </div>
    ) : (
      <div id="signinbox">
        <form onSubmit={this.handleSubmit}>
          <input
            className="usernameInput"
            onChange={this.handleInput}
            required={true}
            placeholder="enter username"
          />
          <button className="button">Sign In</button>
        </form>
      </div>
    );
  }
  handleInput = event => {
    const usernameInput = event.target.value;
    this.setState({ usernameInput });
  };
  handleSubmit = event => {
    event.preventDefault();
    const { loginUser } = this.props;
    const { users, usernameInput } = this.state;
    const foundUser = users.some(user => user.username === usernameInput);
    foundUser
      ? getUser(usernameInput).then(validUser => {
          loginUser(validUser);
          this.setState({ invalidUser: false });
        })
      : this.setState({ invalidUser: true, usernameInput: "" });
  };
}

export default SigninBox;
