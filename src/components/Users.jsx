import React, { Component } from "react";
import { getUsers } from "../api";
import loader from "../images/loader.gif";
import NewUserForm from "./NewUserForm";
import UsersList from "./UsersList";

class Users extends Component {
  state = {
    users: null,
    loading: true,
    showUserForm: false
  };

  componentDidMount() {
    getUsers().then(users => {
      this.setState({ users, loading: false });
    });
  }

  render() {
    const { users, loading } = this.state;
    return loading ? (
      <img alt="" src={loader} width="40px" />
    ) : (
      <div>
        {this.state.showUserForm ? (
          <NewUserForm
            loggedinuser={this.props.loggedinuser}
            refreshUsers={this.refreshUsers}
            hideForm={this.hideForm}
          />
        ) : (
          <button className="button" onClick={this.displayForm}>
            Add New User
          </button>
        )}
        <UsersList users={users} />
      </div>
    );
  }

  displayForm = event => {
    event.preventDefault();
    this.setState({ showUserForm: true });
  };
  hideForm = event => {
    event.preventDefault();
    this.setState({ showUserForm: false });
  };

  refreshUsers = newUser => {
    const newUsersArray = this.state.users.slice();
    newUsersArray.unshift(newUser);
    this.setState({ users: newUsersArray });
  };
}

export default Users;
