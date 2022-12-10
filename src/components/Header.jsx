import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  sumExpenses = () => {
    const { expenses } = this.props;
    const sum = expenses.reduce((acc, curr) => {
      const { currency } = curr;
      return acc + (curr.value * curr.exchangeRates[currency].ask);
    }, 0);
    return (Math.round(sum * 100) / 100).toFixed(2);
  };

  render() {
    const { email } = this.props;
    return (
      <div className="headerContainer">
        <div className="logoTrybeWalletHeader" />
        <div className="expenseContainer">
          <div className="imgTotalExpense" />
          <p className="txtExpense">
            Total de despesas:
            <span className="txtExpenseTotal" data-testid="total-field">
              { this.sumExpenses() }
            </span>
            <span
              className="txtExpenseCurrency"
              data-testid="header-currency-field"
            >
              BRL
            </span>
          </p>
        </div>
        <div className="mailContainer">
          <div className="imgUserProfile" />
          <span className="txtEmail" data-testid="email-field">{email}</span>
        </div>
      </div>
    );
  }
}

Header.defaultProps = {
  email: '',
  expenses: [],
};

Header.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.arrayOf(PropTypes.shape()),
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
