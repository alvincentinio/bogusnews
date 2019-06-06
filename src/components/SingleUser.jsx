import React from "react";
import { Link } from "@reach/router";

const SingleUser = ({ user }) => {
  const defaultAvatarUrl =
    "https://i155.photobucket.com/albums/s313/alvincentinio/Avatars/default-avatar.png";

  return (
    <div className="userCard">
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
      <button className="button">
        <Link to={`/users/${user.username}/articles/`}>
          View {user.username}'s articles
        </Link>
      </button>
    </div>
  );
};

export default SingleUser;
