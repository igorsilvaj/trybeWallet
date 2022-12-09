import { WALLET } from '../actions/index';

const INITIAL_STATE = {
  temp: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case WALLET:
    return { ...state, temp: { ...action.wallet1 } };
  default:
    return state;
  }
};

export default user;
// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
