import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InputTextWithLabel from './InputTextWithLabel';
import SelectWithLabel from './SelectWithLabel';

class WalletForm extends Component {
  state = {
    expenseDescription: '',
    expenseCategory: '',
    expenseValue: '',
    payment: '',
    coin: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  render() {
    const { expenseDescription, expenseCategory,
      expenseValue, payment, coin } = this.state;
    const { currencies } = this.props;
    const expenseCategories = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const paymentMethods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    // const coins = currencies.map((e) => e.code);
    return (
      <div className="walletFormContainer">
        <form className="formExpense">
          <InputTextWithLabel
            labelText="Descrição da despesa"
            className="inputExpense"
            datatestid="description-input"
            name="expenseDescription"
            onChange={ this.handleChange }
            type="text"
            value={ expenseDescription }
          />
          <SelectWithLabel
            labelText="Categoria da despesa"
            className="selectCategory"
            datatestid="tag-input"
            name="expenseCategory"
            options={ expenseCategories }
            onChange={ this.handleChange }
            type="text"
            value={ expenseCategory }
          />
          <InputTextWithLabel
            labelText="Valor"
            className="inputValue"
            datatestid="value-input"
            name="expenseValue"
            onChange={ this.handleChange }
            type="number"
            value={ expenseValue }
          />
          <SelectWithLabel
            labelText="Método de pagamento"
            className="inputPayment"
            datatestid="method-input"
            name="payment"
            options={ paymentMethods }
            onChange={ this.handleChange }
            type="text"
            value={ payment }
          />
          <SelectWithLabel
            labelText="Moeda"
            className="inputCoin"
            datatestid="currency-input"
            name="coin"
            options={ currencies }
            onChange={ this.handleChange }
            type="text"
            value={ coin }
          />
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.defaultProps = {
  currencies: {},
};

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.shape()),
};

export default connect(mapStateToProps)(WalletForm);
