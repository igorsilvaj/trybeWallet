import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from './Button';
import { deleteExpense } from '../redux/actions';

class Table extends Component {
  render() {
    const { expenses, dispatch } = this.props;
    console.log(expenses);
    return (
      <div className="expenseTableContainer">
        <table className="expenseTable">
          <thead className="expenseTableHeader">
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
          <tbody>
            {expenses.map((e, index) => {
              const { currency } = e;
              const camb = e.exchangeRates[currency].ask;
              const total = e.value * e.exchangeRates[currency].ask;
              const coinConverted = e.exchangeRates[currency].name;
              return (
                <tr key={ `${currency}-${index}` }>
                  <td>{e.description}</td>
                  <td>{e.tag}</td>
                  <td>{e.method}</td>
                  <td>{(+e.value).toFixed(2)}</td>
                  <td>{coinConverted}</td>
                  <td>{Math.round(camb * 100) / 100}</td>
                  <td>{Math.round(total * 100) / 100}</td>
                  <td>Real</td>
                  {/* <td>{coinConverted.split('/')[1]}</td> */}
                  <td>
                    <Button className="btnEditExpense" />
                    <Button
                      className="btnDeleteExpense"
                      datatestid="delete-btn"
                      disabled={ false }
                      onClick={ () => dispatch(deleteExpense(e.id)) }
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.defaultProps = {
  expenses: [],
};

Table.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape()),
};

export default connect(mapStateToProps)(Table);
