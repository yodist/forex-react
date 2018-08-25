import React from "react";

function Currency(props) {
  return (
    <div className="Currency">
      <div className="row">
        <div className="col-10">
          <div className="row">
            <h4 className="col">{props.currency.curr}</h4>
            <h4 className="col amount">
              {isNaN(props.currency.amount)
                ? props.currency.amount
                : props.currency.amount.toLocaleString(
                    "en-US",
                    { minimumFractionDigits: 4 }
                  )}
            </h4>
          </div>
          <div className="row">
            <p className="col" style={{ fontStyle: "italic" }}>
              {props.currency.curr} - {props.currency.name}
            </p>
          </div>
          <div className="row">
            <p className="col">
              1 {props.currency.curr} = {}
              {props.currency.rates.toLocaleString(
                "en-US",
                { minimumFractionDigits: 4 }
              )}
            </p>
          </div>
        </div>
        <div
          className="col removeButton"
          onClick={() => props.removeCurrency(props.currency.curr)}
        >
          <span>( - )</span>
        </div>
      </div>
    </div>
  );
}

export default Currency;
