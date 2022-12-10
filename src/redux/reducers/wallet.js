import { REQUEST_API, GET_DATA, REQUEST_FAILED,
  SAVE_EXPENSE,
  DELETE_EXPENSE } from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  isFetching: false,
  errorMessage: '',
  expenses: [],
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
  case SAVE_EXPENSE:
    return {
      ...state,
      isFetching: false,
      expenses: [...state.expenses,
        { id: state.expenses.length,
          ...action.data,
          exchangeRates: action.quote,
        }],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses.filter((e) => e.id !== action.id)],
    };
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
