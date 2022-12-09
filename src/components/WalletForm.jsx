import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InputTextWithLabel from './InputTextWithLabel';
import SelectWithLabel from './SelectWithLabel';
import { handleUserAddExpense } from '../redux/actions';

const expenseCategories = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
const paymentMethods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];

class WalletForm extends Component {
  state = {
    description: '',
    tag: '',
    value: '',
    method: '',
    currency: '',
  };

  componentDidMount() {
    const { currencies } = this.props;
    this.setState({ currency: currencies[0],
      tag: expenseCategories[0],
      method: paymentMethods[0] });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleClick = () => {
    const { dispatch } = this.props;
    const { currency } = this.state;
    dispatch(handleUserAddExpense(this.state, currency));
    this.setState({ description: '', value: '' });
  };

  render() {
    const { currencies } = this.props;
    const { description, tag,
      value, method, currency } = this.state;
    return (
      <div className="walletFormContainer">
        <form className="formExpense">
          <InputTextWithLabel
            labelText="Descrição da despesa"
            className="inputExpense"
            datatestid="description-input"
            name="description"
            onChange={ this.handleChange }
            type="text"
            value={ description }
          />
          <SelectWithLabel
            labelText="Categoria da despesa"
            className="selectCategory"
            datatestid="tag-input"
            name="tag"
            options={ expenseCategories }
            onChange={ this.handleChange }
            type="text"
            value={ tag }
          />
          <InputTextWithLabel
            labelText="Valor"
            className="inputValue"
            datatestid="value-input"
            name="value"
            onChange={ this.handleChange }
            type="number"
            value={ value }
          />
          <SelectWithLabel
            labelText="Método de pagamento"
            className="inputPayment"
            datatestid="method-input"
            name="method"
            options={ paymentMethods }
            onChange={ this.handleChange }
            type="text"
            value={ method }
          />
          <SelectWithLabel
            labelText="Moeda"
            className="inputCoin"
            datatestid="currency-input"
            name="currency"
            options={ currencies }
            onChange={ this.handleChange }
            type="text"
            value={ currency }
          />
        </form>
        <div className="btnAddExpenseContainer">
          <button
            className="btnAddExpense"
            type="submit"
            onClick={ this.handleClick }
          >
            Adicionar despesa
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.defaultProps = {
  currencies: [''],
};

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string),
};

export default connect(mapStateToProps)(WalletForm);
