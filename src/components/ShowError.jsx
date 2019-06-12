import React from "react";

const ShowError = ({ errorMsg, errorStatus, from }) => {
  return errorMsg ? (
    <div>
      <h1>oops {errorStatus}</h1>
      {from ? <h2>duplicate {from}</h2> : <h2>{errorMsg}</h2>}
    </div>
  ) : (
    <h1>sorry page not found ...</h1>
  );
};

export default ShowError;
