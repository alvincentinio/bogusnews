import React from "react";

const ShowError = ({ errorMsg, errorStatus, from }) => {
  if (errorMsg)
    return (
      <div>
        <h1>oops {errorStatus}</h1>
        {from ? <h2>duplicate {from}</h2> : <h2>{errorMsg}</h2>}
      </div>
    );
};

export default ShowError;
