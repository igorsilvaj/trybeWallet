import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  render() {
    return (
      <div className="walletContainer">
        <Header />
        <WalletForm />
        <button className="btnAddExpense" type="submit">Adicionar despesa</button>
      </div>
    );
  }
}

export default connect()(Wallet);
