import React from "react";
import { Link } from "@reach/router";
import newslogo from "../images/newslogo.png";
import SigninBox from "./SigninBox";

const Header = ({ loginUser, logoutUser, loggedinuser }) => {
  return (
    <div id="header">
      <div id="leftlogo">
        <Link to="/">
          <img alt="logo" width="80" src={newslogo} />
        </Link>
      </div>
      <div id="title">
        <h1>BOGUS NEWS</h1>
        <SigninBox
          loginUser={loginUser}
          logoutUser={logoutUser}
          loggedinuser={loggedinuser}
        />
      </div>
      <div id="rightlogo">
        <Link to="/">
          <img alt="logo" width="80" src={newslogo} />
        </Link>
      </div>
    </div>
  );
};

export default Header;
