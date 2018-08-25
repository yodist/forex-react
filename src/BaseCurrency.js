import React from "react";
import Error from "./Error";

function BaseCurrency(props) {
  return (
    <div className="BaseCurrency fixed-top">
      <div className="row">
        <p className="col">
          {props.base} - {props.name}
        </p>
        <Error errorMessage={props.errorMessage} />
      </div>
      <div className="row">
        <h4 className="col">{props.base}</h4>
        <input
          className="col"
          value={props.amount.toLocaleString(
            "en-US",
            { minimumFractionDigits: 4 }
          )}
          onChange={props.changeHandler}
        />
      </div>
    </div>
  );
}

export default BaseCurrency;
