import React, { Component } from 'react';

class CurrencyInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      target: '',
      selectVal: 'USD',
      currencies: [
        {_id: 1, name: "United States Dollars", symbol: "$",short: "USD",USD: 1, GHC: 4.43, GBP: .79},
        {_id: 2,name: "Ghana Cedis",symbol: "¢",short: "GHC",GHC: 1, USD: .23, GBP: .18},
        {_id: 3,name: "Great Britain Pounds",symbol: "£",short: "GBP", GBP: 1, GHC: 6.20, USD: 1.27}
      ],
      currency: [{_id: 1, name: "United States Dollars", symbol: "$",short: "USD",USD: 1, GHC: 4.43, GBP: .79}]
    };

    this.onChange = this.onChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  renderCurrencies() {
    return this.state.currencies.map((currency) => {
      return <option key={currency._id} value={currency.short}>{currency.name}</option>
    })
  }

  forex() {
    let selectOne = document.getElementById("selectOne").value;
    let selectTwo = document.getElementById("selectTwo").value;
    let currencyOne = document.getElementById("currencyOne");
    let currencyTwo = document.getElementById("currencyTwo");

    if (this.state.target === "currencyOne" && this.state.value !== "") {
      currencyTwo.value = (parseFloat(this.state.value) * this.state.currency[0][selectTwo]).toFixed(2);
    } else if(this.state.target === "currencyTwo" && this.state.value !== ""){
      currencyOne.value = ((parseFloat(this.state.value)) * this.state.currency[0][selectOne]).toFixed(2);
    }
  }

  onChange(event) {
    this.setState({value: event.target.value, target: event.target.id }, () => {
      console.log(this.state.value);
      this.forex();
    });
  }

  onSelect(event){
    this.setState({selectVal: event.target.value}, () => {
      let filterCurrency = this.state.selectVal;
      this.setState({currency:this.state.currencies.filter(currency => currency.short === filterCurrency )}, () => {
      });
    });
  }

  componentDidUpdate(event) {
    let selectOne = document.getElementById("selectOne");
    let selectTwo = document.getElementById("selectTwo");
    let currencyOne = document.getElementById("currencyOne");
    let currencyTwo = document.getElementById("currencyTwo");

    if(event.selectId === "selectOne" && this.state.value !== "") {
      currencyOne.value = (parseFloat(currencyTwo.value) / this.state.currency[0][selectTwo.value]).toFixed(2);

    } else {
      currencyTwo.value = ((parseFloat(currencyOne.value)) / this.state.currency[0][selectOne.value]).toFixed(2);
    }

    if (isNaN(currencyTwo.value)) {
      currencyTwo.value = 0;
    } else if(isNaN(currencyOne.value)) {
      currencyOne.value = 0;
    }
  }

  render() {
    const {currency} = this.state;
    const {selectId, inputId} =this.props;
    return (
      <div>
        <div className="form-group">
          <label htmlFor={selectId}>{ currency[0].name }</label>
          <select className="form-control" id={selectId} onChange={this.onSelect}>
            {this.renderCurrencies()}
          </select>
        </div>
        <label className="sr-only" htmlFor={inputId}></label>
        <div className="input-group mb-2 mr-sm-2 mb-sm-0">
          <div className="input-group-addon">{currency !==null ? currency[0].symbol : null}</div>
          <input type="text" disabled="" className="form-control" value={this.state.value} onChange={this.onChange} name={this.props.inputId} id={this.props.inputId} placeholder="0" />
        </div>
      </div>
    );
  }
}

export default CurrencyInput;
