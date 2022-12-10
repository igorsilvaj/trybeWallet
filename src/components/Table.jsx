import React, { Component } from 'react';
import { connect } from 'react-redux';

class Table extends Component {
  render() {
    return (
      <div className="expenseTableContainer">
        <table className="expenseTable" />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.wallet.isFetching,
});

export default connect(mapStateToProps)(Table);
