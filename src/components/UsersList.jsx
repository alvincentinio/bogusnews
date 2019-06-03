import React from "react";
import SingleUser from "./SingleUser";

const UsersList = ({ users }) => {
  return (
    <ul className="cards">
      {users.map(user => {
        return (
          <li className="card" key={user.username}>
            <SingleUser user={user} />
          </li>
        );
      })}
    </ul>
  );
};

export default UsersList;
