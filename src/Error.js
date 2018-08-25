import React from "react";

function Error(props) {
  return (
    <div className="Error">
      <p style={{ color: "red" }}>{props.errorMessage}</p>
    </div>
  );
}

export default Error;
