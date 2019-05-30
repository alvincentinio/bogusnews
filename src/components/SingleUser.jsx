import React, { Component } from "react";
// import { getArticles } from "../api";
import { Link } from "@reach/router";

class SingleUser extends Component {
  state = {
    articles: null,
    total_count: 0
  };
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
        <button className="button">
          <Link to={`/users/${user.username}/articles/`}>
            View {user.username}'s articles
          </Link>
        </button>
      </div>
    );
  }

  handleSubmit = event => {};
  // handleSubmit = event => {
  //   const author = this.props.user.username;
  //   getArticles({ author }).then(({ data }) => {
  //     this.setState({
  //       articles: data.articles,
  //       total_count: data.total_count
  //     });
  //   });
  // };
}

export default SingleUser;
