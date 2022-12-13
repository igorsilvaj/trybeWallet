import {
  REQUEST_API, GET_DATA, REQUEST_FAILED, SAVE_EXPENSE,
  DELETE_EXPENSE, INIT_EDIT_EXPENSE, EDIT_EXPENSE, SAVE_FORM,
} from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  isFetching: false,
  editingId: null,
  errorMessage: '',
  getState: false,
  expenses: [],
  form: {
    description: '',
    tag: '',
    value: '',
    method: '',
    currency: '',
  },
};

const aux1 = (action) => ({
  description: action.data.description,
  tag: action.data.tag,
  value: action.data.value,
  method: action.data.method,
  currency: action.data.currency,
});

const aux2 = (state, action) => ({
  description: state.expenses.find((e) => e.id === action.id).description,
  tag: state.expenses.find((e) => e.id === action.id).tag,
  value: state.expenses.find((e) => e.id === action.id).value,
  method: state.expenses.find((e) => e.id === action.id).method,
  currency: state.expenses.find((e) => e.id === action.id).currency,
  exchangeRates: state.expenses.find((e) => e.id === action.id).exchangeRates,
});

const generateUniqueId = (state, id) => {
  if (id === undefined) id = 0;
  if (state.expenses.length > 0) {
    const test = state.expenses.find((e) => e.id === (state.expenses.length + id));
    if (test !== undefined) {
      const newId = id + 1;
      return generateUniqueId(state, newId);
    }
    return state.expenses.length + id;
  }
  return state.expenses.length;
};

const aux3 = (state, action) => ({
  ...state,
  isFetching: false,
  expenses: [...state.expenses,
    {
      id: generateUniqueId(state),
      ...action.data,
      exchangeRates: action.quote,
    }],
});

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_API:
    return {
      ...state,
      isFetching: true };
  case GET_DATA:
    return {
      ...state,
      isFetching: false,
      currencies: Object.keys(action.data).filter((e) => e !== 'USDT'),
      errorMessage: '' };
  case SAVE_EXPENSE:
    return { ...aux3(state, action) };
  case SAVE_FORM:
    return {
      ...state,
      getState: false,
      form: { ...aux1(action) } };
  case INIT_EDIT_EXPENSE:
    return {
      ...state,
      editingId: action.id,
      getState: true,
      form: { ...aux2(state, action) },
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      editingId: null,
      getState: false,
      expenses: [...state.expenses.filter(
        (e) => e.id !== action.id,
      ), { id: action.id, ...action.data }].reverse(),
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      getState: false,
      expenses: [...state.expenses.filter((e) => e.id !== action.id)] };
  case REQUEST_FAILED:
    return {
      ...state,
      isFetching: false,
      errorMessage: action.payload };
  default:
    return state;
  }
};

export default wallet;
