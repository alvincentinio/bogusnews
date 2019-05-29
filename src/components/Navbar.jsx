import React from "react";
import { Link } from "@reach/router";

const Navbar = () => {
  return (
    <div id="topnav">
      <Link to="/articles">Articles </Link>
      <Link to="/topics">Topics </Link>
      <Link to="/users">Users </Link>
    </div>
  );
};

export default Navbar;
