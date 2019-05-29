import React from "react";

const Home = ({ loggedinuser }) => {
  return loggedinuser ? (
    <div>
      <p>Welcome To Al's News</p>
    </div>
  ) : (
    <div>
      <p>Welcome To Al's News</p>
      <p>Please Sign In To Post New Content & Comment</p>
      <p>Please use username "admin" to test</p>
    </div>
  );
};

export default Home;
