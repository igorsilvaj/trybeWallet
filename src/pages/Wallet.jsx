import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    return (
      <div className="walletContainer">
        <Header />
      </div>
    );
  }
}

export default connect()(Wallet);
