import { REQUEST_API, GET_DATA, REQUEST_FAILED } from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  isFetching: false,
  errorMessage: '',
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_API:
    return {
      ...state,
      isFetching: true,
      errorMessage: '',
    };
  case GET_DATA:
    return {
      ...state,
      isFetching: false,
      currencies: Object.keys(action.data).filter((e) => e !== 'USDT'),
      errorMessage: '',
    };
    // Object.values(action.data).filter((e) => e.codein !== 'BRLT'),
  case REQUEST_FAILED:
    return {
      ...state,
      isFetching: false,
      errorMessage: action.payload,
    };
  default:
    return state;
  }
};

export default wallet;
// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
