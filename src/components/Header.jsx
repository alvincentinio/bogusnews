import React from "react";
import { Link } from "@reach/router";
// import newslogo from "../images/newslogo.png";
import SigninBox from "./SigninBox";
import bogusnews from "../images/bogusnews.png";
import bogus from "../images/bogus.png";
import news from "../images/news.png";

const Header = ({ loginUser, logoutUser, loggedinuser }) => {
  return (
    <div id="header">
      <div id="leftlogo">
        <Link to="/">
          <img id="logo" alt="logo" width="120px" src={bogusnews} />
        </Link>
      </div>
      <div id="title">
        <img id="bogus" alt="bogus" height="80px" src={bogus} />
        <img id="news" alt="news" height="50px" src={news} />
        <SigninBox
          loginUser={loginUser}
          logoutUser={logoutUser}
          loggedinuser={loggedinuser}
        />
      </div>
      <div id="rightlogo">
        <Link to="/">
          <img id="logo" alt="logo" width="120px" src={bogusnews} />
        </Link>
      </div>
    </div>
  );
};

export default Header;
