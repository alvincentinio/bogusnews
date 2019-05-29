import React, { Component } from "react";

class SingleUser extends Component {
  render() {
    const { user, defaultAvatarUrl } = this.props;
    return (
      <div>
        <img
          src={user.avatar_url}
          onError={e => {
            e.target.onerror = null;
            e.target.src = defaultAvatarUrl;
          }}
          width="100"
          height="100"
          alt={`${user.username}_avatar`}
        />
        <br />
        {user.name}
        <br />
        username: {user.username}
        <br />
        <button className="button">View {user.username}'s xxx articles</button>
      </div>
    );
  }
}

export default SingleUser;
