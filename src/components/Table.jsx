import React, { Component } from 'react';
import { connect } from 'react-redux';

class Table extends Component {
  render() {
    return (
      <div className="expenseTableContainer">
        <table className="expenseTable">
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody />
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.wallet.isFetching,
});

export default connect(mapStateToProps)(Table);
