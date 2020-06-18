import React from "react";
import UsersList from "../UsersList";
import { render, screen } from "@testing-library/react";

test("renders", () => {
  const props = {
    users: [
      {
        name: "Test1",
        username: "testUserName1",
        avatar_url: null,
      },
      {
        name: "Test2",
        username: "testUserName2",
        avatar_url: null,
      },
    ],
  };
  render(<UsersList {...props} />);
  screen.debug();
});
// test("renders", () => {
//   const props = {
//     users: [
//       {
//         username: "testUserName1",
//       },
//       {
//         username: "testUserName2",
//       },
//     ],
//   };
//   render(<UsersList {...props} />);
//   screen.debug();
// });
