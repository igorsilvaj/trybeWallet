export const USER = 'USER';
export const REQUEST_API = 'REQUEST_API';
export const GET_DATA = 'GET_DATA';
export const REQUEST_FAILED = 'REQUEST_FAILED';

export const login = (email) => ({
  type: USER,
  email,
});

export const WALLET = 'WALLET';

export const wallet = (wallet1) => ({
  type: WALLET,
  wallet1,
});

export const requestAPI = () => ({ type: REQUEST_API });
export const getData = (data) => ({ type: GET_DATA, data });
export const requestFailed = (error) => ({ type: REQUEST_FAILED, error });

export function fetchAPI() {
  return (dispatch) => {
    dispatch(requestAPI());
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => dispatch(getData(data)))
      .catch((error) => dispatch(requestFailed(error)));
  };
}
