import React, { Component } from 'react';
import CurrencyInput from './CurrencyInput';

class App extends Component {

  render() {
    return (
      <div className="container">
        <h1 className="text-center">$$Tabby Forex$$</h1>
        <div className="row exchange-card">
          <div className="col-md-6">
            <CurrencyInput
              inputId="currencyOne"
              selectId="selectOne"
            />
          </div>
          <div className="col-md-6">
            <CurrencyInput
              inputId="currencyTwo"
              selectId="selectTwo"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
