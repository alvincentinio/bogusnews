import React, { Component } from "react";
import { getUsers } from "../api";
import loader from "../images/loader.gif";
import NewUserForm from "./NewUserForm";
import UsersList from "./UsersList";

class Users extends Component {
  state = {
    users: null,
    loading: true,
    defaultAvatarUrl:
      "https://i155.photobucket.com/albums/s313/alvincentinio/Avatars/default-avatar.png"
  };

  componentDidMount() {
    getUsers().then(users => {
      this.setState({ users, loading: false });
    });
  }
  render() {
    const { users, loading, defaultAvatarUrl } = this.state;
    return loading ? (
      <img alt="" src={loader} width="40px" />
    ) : (
      <div>
        <NewUserForm
          refreshUsers={this.refreshUsers}
          loggedinuser={this.props.loggedinuser}
        />
        <div className="cards">
          <UsersList users={users} defaultAvatarUrl={defaultAvatarUrl} />
        </div>
      </div>
    );
  }
  refreshUsers = newUser => {
    const newUsersArray = this.state.users.slice();
    newUsersArray.unshift(newUser);
    this.setState({ users: newUsersArray });
  };
}

export default Users;
