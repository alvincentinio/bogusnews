import React from "react";
import { getUser } from "../api";

class SigninBox extends React.Component {
  state = {
    usernameInput: "",
    defaultAvatarUrl:
      "https://i155.photobucket.com/albums/s313/alvincentinio/Avatars/default-avatar.png"
  };
  render() {
    const { loggedinuser } = this.props;
    const { logoutUser } = this.props;
    const { defaultAvatarUrl } = this.state;

    return loggedinuser ? (
      <div id="signinBox">
        {loggedinuser.name}
        <br />
        <button className="button" onClick={logoutUser}>
          Sign Out
        </button>{" "}
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
      </div>
    ) : (
      <form onSubmit={this.handleSubmit}>
        <input
          className="input-box"
          onChange={this.handleInput}
          required={true}
          placeholder="enter username"
        />
        <br />
        <button className="button">Sign In</button>{" "}
      </form>
    );
  }
  handleInput = event => {
    const usernameInput = event.target.value;
    this.setState({ usernameInput });
  };
  handleSubmit = event => {
    event.preventDefault();
    const { loginUser } = this.props;
    getUser(this.state.usernameInput).then(validUser => {
      loginUser(validUser);
    });
  };
}

export default SigninBox;
