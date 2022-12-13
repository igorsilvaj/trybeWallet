import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';
// import { fetchAPI } from '../redux/actions';

class Wallet extends React.Component {
  componentDidMount() {
    // const { dispatch, currencies } = this.props;
    // if (currencies.length < 1) dispatch(fetchAPI());
  }

  render() {
    const { isFetching } = this.props;
    if (isFetching) return <p>Carregando...</p>;
    return (
      <div className="walletContainer">
        <Header />
        <WalletForm />
        <div className="tableContainer">
          <Table />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.wallet.isFetching,
  currencies: state.wallet.currencies,
});

Wallet.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  // currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  isFetching: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Wallet);
