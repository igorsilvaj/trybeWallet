import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  render() {
    const { isFetching } = this.props;

    if (isFetching) return <p>Carregando...</p>;

    return (
      <div className="walletContainer">
        <Header />
        <WalletForm />
        <div className="btnAddExpenseContainer">
          <button className="btnAddExpense" type="submit">Adicionar despesa</button>
        </div>
        <Table />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.wallet.isFetching,
});

Wallet.propTypes = {
  isFetching: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Wallet);
