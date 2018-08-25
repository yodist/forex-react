import React from "react";

function NewCurrency(props) {
  return (
    <div className="NewCurrency">
      <div className="currency-form row" hidden>
        <select
          value={props.newCurr}
          onChange={props.changeHandler}
          className="col-10"
        >
          {props.currencyCode.map(code => <option key={code} value={code}>{code}</option>)};
        </select>
        <button className="col-2" onClick={props.addCurrency}>
          Submit
        </button>
      </div>
      <div className="placeholder" onClick={props.showHandler}>
        <span>(+) Add More Currencies</span>
      </div>
    </div>
  );
}

export default NewCurrency;
