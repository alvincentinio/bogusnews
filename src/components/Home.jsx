import React from "react";
import Chart from "./Chart";

const Home = ({ loggedinuser }) => {
  return (
    <div>
      {!loggedinuser && (
        <div>
          <h5>Please Sign In To Post New Content, Vote & Add Comments</h5>
          <h6>Please use username "admin" to test</h6>
          <br />
        </div>
      )}
      <div>
        <Chart />
      </div>
    </div>
  );
};

export default Home;
