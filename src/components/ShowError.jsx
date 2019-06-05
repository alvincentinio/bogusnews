import React from "react";

const ShowError = ({ location = {} }) => {
  return (
    <div>
      {location.state ? (
        <div>
          <h1>oops {location.state.status}</h1>
          <h2>{location.state.msg}</h2>
        </div>
      ) : (
        <h1>page not found</h1>
      )}
      {location.state && <p>From {location.state.from} page</p>}
    </div>
  );
};

export default ShowError;
