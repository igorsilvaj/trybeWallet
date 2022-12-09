export const USER = 'USER';
export const REQUEST_API = 'REQUEST_API';
export const GET_DATA = 'GET_DATA';
export const UPDATE_DATA = 'UPDATE_DATA';
export const REQUEST_FAILED = 'REQUEST_FAILED';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';

export const login = (email) => ({ type: USER, email });

export const requestAPI = () => ({ type: REQUEST_API });
export const getData = (data) => ({ type: GET_DATA, data });
export const requestFailed = (error) => ({ type: REQUEST_FAILED, error });

export const saveExpense = (data, quote) => ({ type: SAVE_EXPENSE, data, quote });

export function fetchAPI() {
  return (dispatch) => {
    dispatch(requestAPI());
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => dispatch(getData(data)))
      .catch((error) => dispatch(requestFailed(error)));
  };
}

export function handleUserAddExpense(data) {
  return (dispatch) => {
    dispatch(requestAPI());
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((quote) => dispatch(saveExpense(data, quote)))
      .catch((error) => dispatch(requestFailed(error)));
  };
}
