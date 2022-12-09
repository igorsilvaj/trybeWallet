import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <div className="headerContainer">
        <div className="logoTrybeWalletHeader" />
        <div className="expenseContainer">
          <div className="imgTotalExpense" />
          <p className="txtExpense">
            Total de despesas:
            <span className="txtExpenseTotal" data-testid="total-field">0</span>
            <span data-testid="header-currency-field">BRL</span>
          </p>
        </div>
        <div className="mailContainer">
          <div className="imgUserProfile" />
          <span data-testid="email-field">{email}</span>
        </div>
      </div>
    );
  }
}

Header.defaultProps = {
  email: '',
};

Header.propTypes = {
  email: PropTypes.string,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Header);
