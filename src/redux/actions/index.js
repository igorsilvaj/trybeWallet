export const USER = 'USER';

export const login = (email) => ({
  type: USER,
  email,
});

export const WALLET = 'WALLET';

export const wallet = (wallet1) => ({
  type: WALLET,
  wallet1,
});
