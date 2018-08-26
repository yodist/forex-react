import React, { Component } from "react";
import axios from "axios";

import BaseCurrency from "./BaseCurrency";
import CurrencyList from "./CurrencyList";
import NewCurrency from "./NewCurrency";

// import "./styles.css";
// import "bootstrap/dist/css/bootstrap.css";

const currencyName = {
  USD: "United States Dollar",
  CAD: "Canadian Dollar",
  IDR: "Indonesian Rupiah",
  GBP: "British Pound",
  CHF: "Swiss Franc",
  SGD: "Singapore Dollar",
  INR: "Indian Rupee",
  MYR: "Malaysian Ringgit",
  JPY: "Japanese Yen",
  KRW: "South Korean Won"
};

const ERROR_MSG = {
  NUMBER: "Please input number only",
  EXIST: "Selected data is already on the list"
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      base: "USD",
      baseAmount: 1.0,
      currencies: [],
      currencyCode: [],
      currencyRate: "",
      newCurr: "CAD",
      errorMessage: ""
    };

    // This binding is necessary to make `this` work in the callback
    this.showCurrencyForm = this.showCurrencyForm.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.newCurrChangeHandler = this.newCurrChangeHandler.bind(this);
    this.addCurrency = this.addCurrency.bind(this);
    this.removeCurrency = this.removeCurrency.bind(this);
  }

  componentDidMount() {
    axios
      .get("https://api.exchangeratesapi.io/latest?base=USD")
      .then(response => {
        this.setState({
          currencyRate: response.data.rates
        });
      })
      .then(() => {
        this.setState({
          currencies: [
            {
              curr: "CAD",
              name: currencyName["CAD"],
              rates: this.state.currencyRate["CAD"],
              amount: this.state.currencyRate["CAD"] * this.state.baseAmount
            },
            {
              curr: "IDR",
              name: currencyName["IDR"],
              rates: this.state.currencyRate["IDR"],
              amount: this.state.currencyRate["IDR"] * this.state.baseAmount
            }
          ]
        });
      })
      .catch(error => console.log(error));
      document.title = "Foreign Exchange App";
  }

  changeHandler(event) {
    if (isNaN(event.target.value))
      this.setState({
        baseAmount: event.target.value,
        errorMessage: ERROR_MSG.NUMBER
      });
    else
      this.setState(prevState => ({
        baseAmount: event.target.value,
        currencies: prevState.currencies.map(currency =>
          Object.assign(currency, {
            amount: currency.rates * event.target.value
          })
        ),
        errorMessage: ""
      }));
  }

  newCurrChangeHandler(event) {
    this.setState({
      newCurr: event.target.value
    });
  }

  showCurrencyForm(e) {
    this.setState({ errorMessage: "" });
    e.preventDefault();
    document
      .getElementsByClassName("currency-form")[0]
      .removeAttribute("hidden");
    document
      .getElementsByClassName("placeholder")[0]
      .setAttribute("hidden", "hidden");
  }

  addCurrency(e) {
    if (this.state.currencies.find(o => o.curr === this.state.newCurr)) {
      this.setState({
        errorMessage: ERROR_MSG.EXIST
      });
    } else {
      this.setState(prevState => ({
        currencies: [
          ...prevState.currencies,
          {
            curr: prevState.newCurr,
            name: currencyName[prevState.newCurr],
            rates: prevState.currencyRate[prevState.newCurr],
            amount:
              prevState.currencyRate[prevState.newCurr] * prevState.baseAmount
          }
        ],
        newCurr: "CAD"
      }));
    }

    e.preventDefault();
    document
      .getElementsByClassName("currency-form")[0]
      .setAttribute("hidden", "hidden");
    document.getElementsByClassName("placeholder")[0].removeAttribute("hidden");
  }

  removeCurrency(curr) {
    this.setState(prevState => ({
      currencies: prevState.currencies.filter(obj => obj.curr !== curr)
    }));
  }

  render() {
    return (
      <div className="App">
        <BaseCurrency
          base={this.state.base}
          name={currencyName[this.state.base]}
          amount={this.state.baseAmount}
          changeHandler={this.changeHandler}
          errorMessage={this.state.errorMessage}
        />
        <div className="AppBody">
          <CurrencyList
            currencies={this.state.currencies}
            removeCurrency={this.removeCurrency}
          />
          <NewCurrency
            newCurr={this.state.newCurr}
            changeHandler={this.newCurrChangeHandler}
            showHandler={this.showCurrencyForm}
            addCurrency={this.addCurrency}
            currencyCode={Object.keys(currencyName).filter(
              code => code !== this.state.base
            )}
          />
        </div>
      </div>
    );
  }
}

export default App;
