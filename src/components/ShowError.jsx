import React from "react";

const ShowError = ({ location = {} }) => {
  // props.location.state
  // msg: not found
  return (
    <div>
      {location.state ? (
        <h1>oops {location.state.status}</h1>
      ) : (
        <h1>page not found</h1>
      )}
      {location.state && <p>{location.state.from} not found</p>}
    </div>
  );
};

export default ShowError;
