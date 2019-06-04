import React from "react";
import Chart from "./Chart";

const Home = ({ loggedinuser }) => {
  return (
    <div>
      {!loggedinuser && (
        <div>
          <p>Please Sign In To Post New Content & Comment</p>
          <p>Please use username "admin" to test</p>
        </div>
      )}
      <div className="homeflex">
        <Chart />
      </div>
    </div>
  );
};

export default Home;
