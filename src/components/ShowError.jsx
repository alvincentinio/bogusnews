import React from "react";

const ShowError = ({ errorMsg, errorStatus }) => {
  if (errorMsg)
    return (
      <div>
        <h1>oops {errorStatus}</h1>
        <h2>{errorMsg}</h2>
      </div>
    );
};

export default ShowError;
