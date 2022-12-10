import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InputTextWithLabel from './InputTextWithLabel';
import SelectWithLabel from './SelectWithLabel';
import { editExpense, handleUserAddExpense, saveForm } from '../redux/actions';

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
    const { currencies, dispatch } = this.props;
    this.setState({
      currency: currencies[0],
      tag: expenseCategories[0],
      method: paymentMethods[0] }, () => {
      dispatch(saveForm(this.state));
    });
  }

  componentDidUpdate() {
    const { getState, dispatch, form } = this.props;
    if (getState) this.setState({ ...form }, () => dispatch(saveForm(this.state)));
  }

  handleChange = ({ target }) => {
    const { dispatch } = this.props;
    const { name, value } = target;
    this.setState({ [name]: value }, () => dispatch(saveForm(this.state)));
  };

  addExpense = () => {
    const { dispatch } = this.props;
    const { currency } = this.state;
    dispatch(handleUserAddExpense(this.state, currency));
    this.setState({ description: '', value: '' });
  };

  editExpense = () => {
    const { dispatch, editingId } = this.props;
    dispatch(editExpense(editingId, this.state));
    this.setState({ description: '', value: '' }, () => dispatch(saveForm(this.state)));
  };

  render() {
    const { currencies, description, tag,
      value, method, currency, editingId } = this.props;
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
          {/* criar outra forma de renderizar condicional */}
          {editingId !== null
            ? (
              <button
                className="btnAddExpense"
                type="submit"
                onClick={ this.editExpense }
              >
                Editar despesa
              </button>)
            : (
              <button
                className="btnAddExpense"
                type="submit"
                onClick={ this.addExpense }
              >
                Adicionar despesa
              </button>)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  form: state.wallet.form,
  description: state.wallet.form.description,
  tag: state.wallet.form.tag,
  value: state.wallet.form.value,
  method: state.wallet.form.method,
  currency: state.wallet.form.currency,
  editingId: state.wallet.editingId,
  getState: state.wallet.getState,
});

WalletForm.defaultProps = {
  currencies: [''],
  description: '',
  tag: '',
  value: '',
  method: '',
  currency: '',
  form: {},
  editingId: null,
  getState: false,
};

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string),
  dispatch: PropTypes.func.isRequired,
  description: PropTypes.string,
  tag: PropTypes.string,
  value: PropTypes.string,
  method: PropTypes.string,
  currency: PropTypes.string,
  form: PropTypes.shape(),
  editingId: PropTypes.number,
  getState: PropTypes.bool,
};

export default connect(mapStateToProps)(WalletForm);
