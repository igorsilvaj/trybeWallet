export const USER = 'USER';
export const REQUEST_API = 'REQUEST_API';
export const GET_DATA = 'GET_DATA';
export const UPDATE_DATA = 'UPDATE_DATA';
export const REQUEST_FAILED = 'REQUEST_FAILED';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const INIT_EDIT_EXPENSE = 'INIT_EDIT_EXPENSE';
export const SAVE_FORM = 'SAVE_FORM';

export const login = (email) => ({ type: USER, email });
export const requestAPI = () => ({ type: REQUEST_API });
export const getData = (data) => ({ type: GET_DATA, data });
export const requestFailed = (error) => ({ type: REQUEST_FAILED, error });
export const saveExpense = (data, quote) => ({ type: SAVE_EXPENSE, data, quote });
export const deleteExpense = (id) => ({ type: DELETE_EXPENSE, id });
export const initEditExpense = (id) => ({ type: INIT_EDIT_EXPENSE, id });
export const editExpense = (id, data) => ({ type: EDIT_EXPENSE, id, data });
export const saveForm = (data) => ({ type: SAVE_FORM, data });

export function fetchAPI() {
  return async (dispatch) => {
    dispatch(requestAPI());
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      dispatch(getData(data));
    } catch (error) {
      dispatch(requestFailed(error));
    }
  };
}

export function handleUserAddExpense(data) {
  return async (dispatch) => {
    dispatch(requestAPI());
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const quote = await response.json();
      dispatch(saveExpense(data, quote));
    } catch (error) {
      dispatch(requestFailed(error));
    }
  };
}
