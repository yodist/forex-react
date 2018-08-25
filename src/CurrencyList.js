import React from "react";
import Currency from "./Currency";

function CurrencyList(props) {
  return (
    <div className="CurrencyList">
      {props.currencies.map(currency => (
        <Currency currency={currency} removeCurrency={props.removeCurrency} />
      ))}
    </div>
  );
}

export default CurrencyList;
