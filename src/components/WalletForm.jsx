import React, { Component } from 'react';
import { connect } from 'react-redux';
import InputTextWithLabel from './InputTextWithLabel';
import SelectWithLabel from './SelectWithLabel';

class WalletForm extends Component {
  render() {
    return (
      <div className="walletFormContainer">
        <form className="formExpense">
          <InputTextWithLabel
            labelText="Descrição da despesa"
            className="inputExpense"
            datatestid="value-input"
            name="inputExpense"
            // onChange={ onChange }
            // placeholder={ placeholder }
            type="text"
            // value={ value }
          />
          <SelectWithLabel
            labelText="Categoria da despesa"
            className="selectCategory"
            datatestid="description-input"
            name="inputExpense"
            // onChange={ onChange }
            // placeholder={ placeholder }
            type="text"
          />
          <InputTextWithLabel
            labelText="Valor"
            className="inputValue"
            datatestid="value-input"
            name="inputExpense"
            // onChange={ onChange }
            // placeholder={ placeholder }
            type="number"
          // value={ value }
          />
          <SelectWithLabel
            labelText="Método de pagamento"
            className="inputPayment"
            datatestid="value-input"
            name="inputExpense"
            // onChange={ onChange }
            // placeholder={ placeholder }
            type="text"
          />
          <SelectWithLabel
            labelText="Moeda"
            className="inputCoin"
            datatestid="currency-input"
            name="inputExpense"
            // options={options}
            // onChange={ onChange }
            // placeholder={ placeholder }
            type="text"
          />
        </form>
      </div>
    );
  }
}

export default connect()(WalletForm);
