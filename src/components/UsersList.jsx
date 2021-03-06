import React from "react";
import SingleUser from "./SingleUser";

const UsersList = ({ users }) => {
  return (
    <ul className="cardList">
      {users.map(user => {
        return (
          <li key={user.username}>
            <SingleUser user={user} />
          </li>
        );
      })}
    </ul>
  );
};

export default UsersList;
