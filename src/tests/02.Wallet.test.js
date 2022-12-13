import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './mocks/mockData';

const loading = 'Carregando...';
const totalField = 'total-field';

const renderFromHomepage = () => {
  const { history } = renderWithRouterAndRedux(<App />);
  const inputEmail = screen.getByPlaceholderText(/e-mail/i);
  const inputPass = screen.getByPlaceholderText(/senha/i);
  const btnLogin = screen.getByRole('button', { name: /entrar/i });

  userEvent.type(inputEmail, 'validMail@mail.com');
  userEvent.type(inputPass, 'validPassword123');
  userEvent.click(btnLogin);
  expect(history.location.pathname).toBe('/carteira');
};

const mockFetch = () => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockData),
  });
};

const addTestExpense = async () => {
  const inputDescription = screen.getByRole('textbox', { name: /descrição da despesa/i });
  const inputValue = screen.getByRole('spinbutton', { name: /valor/i });
  const btnAddExpense = screen.getByRole('button', { name: /adicionar despesa/i });

  await act(async () => {
    userEvent.type(inputDescription, 'Teste');
    userEvent.type(inputValue, '1000');
    userEvent.click(btnAddExpense);
    await waitFor(
      () => expect(screen.queryAllByText(loading)).toHaveLength(0),
      { timeout: 3000 },
    );
  });
};

describe('Testes de rota', () => {
  beforeEach(() => {
    renderFromHomepage();
  });

  it('Renderiza o componente Wallet na rota "/carteira"', async () => {
    await waitFor(
      () => expect(screen.queryAllByText(loading)).toHaveLength(0),
      { timeout: 3000 },
    );
    const test = screen.getByText(/total de despesas:/i);
    expect(test).toBeInTheDocument();
  });
});

describe('Testes de renderização de componentes', () => {
  beforeEach(() => {
    renderFromHomepage();
  });

  it('Renderiza os componentes do "Header"', async () => {
    await waitFor(
      () => expect(screen.queryAllByText(loading)).toHaveLength(0),
      { timeout: 3000 },
    );
    const lblExpenses = screen.getByText(/total de despesas:/i);
    expect(lblExpenses).toBeVisible();
    const totalExpenses = screen.getByTestId('total-field');
    expect(totalExpenses).toBeVisible();
    const email = screen.getByTestId('email-field');
    expect(email).toBeVisible();
  });

  it('Renderiza os componentes do "WalletForm"', async () => {
    await waitFor(
      () => expect(screen.queryAllByText(loading)).toHaveLength(0),
      { timeout: 3000 },
    );
    const inputExpense = screen.getByRole('textbox', { name: /descrição da despesa/i });
    expect(inputExpense).toBeVisible();
    const inputCategory = screen.getByRole('combobox', { name: /categoria da despesa/i });
    expect(inputCategory).toBeVisible();
    const inputValue = screen.getByRole('spinbutton', { name: /valor/i });
    expect(inputValue).toBeVisible();
    const inputPayment = screen.getByRole('combobox', { name: /método de pagamento/i });
    expect(inputPayment).toBeVisible();
    const inputCoin = screen.getByRole('combobox', { name: /moeda/i });
    expect(inputCoin).toBeVisible();
    const btnAddExpense = screen.getByRole('button', { name: /adicionar despesa/i });
    expect(btnAddExpense).toBeVisible();
  });

  it('Renderiza os componentes da tabela de gastos ', async () => {
    await waitFor(
      () => expect(screen.queryAllByText(loading)).toHaveLength(0),
      { timeout: 3000 },
    );
    const table = screen.getByRole('table');
    expect(table).toBeVisible();
  });
});

describe('Testes com interação do usuario-1', () => {
  beforeEach(() => {
    mockFetch();
  });

  it('O total de despesas deve iniciar com valor "0.00"', async () => {
    renderFromHomepage();
    await waitFor(
      () => expect(screen.queryAllByText(loading)).toHaveLength(0),
      { timeout: 3000 },
    );
    const totalExpense = screen.getByTestId(totalField);
    expect(totalExpense.innerHTML).toEqual('0.00');
  });

  it('Deve ser feito o calculo correto para o total de despesas ao adicionar despesa', async () => {
    renderFromHomepage();
    await waitFor(
      () => expect(screen.queryAllByText(loading)).toHaveLength(0),
      { timeout: 3000 },
    );
    const coin = screen.getByRole('combobox', { name: /moeda/i });
    expect(coin.value).toEqual('USD');

    await addTestExpense();

    const totalExpense = screen.getByTestId(totalField);
    expect(totalExpense.innerHTML).toEqual('4753.10');
  });
});

describe('Testes com interação do usuario-2', () => {
  beforeEach(() => {
    mockFetch();
  });

  it('Deve renderizar um botão para editar a despesa, ao clicar deve ser alterado corretamente', async () => {
    renderFromHomepage();
    await waitFor(
      () => expect(screen.queryAllByText(loading)).toHaveLength(0),
      { timeout: 3000 },
    );
    const coin = screen.getByRole('combobox', { name: /moeda/i });
    expect(coin.value).toEqual('USD');

    await addTestExpense();

    const totalExpense = screen.getByTestId(totalField);
    expect(totalExpense.innerHTML).toEqual('4753.10');
    const editExpense = screen.getByTestId('edit-btn');
    expect(editExpense).toBeVisible();
    await act(async () => {
      const newInputValue = screen.getByRole('spinbutton', { name: /valor/i });
      userEvent.click(editExpense);
      userEvent.type(newInputValue, '2000');
      await waitFor(
        () => expect(screen.queryAllByText(loading)).toHaveLength(0),
        { timeout: 3000 },
      );
      const btnEditExpense = screen.getByRole('button', { name: /editar despesa/i });
      expect(btnEditExpense).toBeVisible();
      userEvent.click(btnEditExpense);
    });
    const newTotalExpense = screen.getByTestId(totalField);
    expect(newTotalExpense.innerHTML).toEqual('9506.20');
  });
});

describe('Testes com interação do usuario-3', () => {
  beforeEach(() => {
    mockFetch();
  });

  it('Deve renderizar um botão para excluir a despesa, ao clicar o valor deve ser alterado corretamente', async () => {
    renderFromHomepage();
    await waitFor(
      () => expect(screen.queryAllByText(loading)).toHaveLength(0),
      { timeout: 3000 },
    );
    const coin = screen.getByRole('combobox', { name: /moeda/i });
    expect(coin.value).toEqual('USD');

    await addTestExpense();

    const deleteExpense = screen.getByTestId('delete-btn');
    expect(deleteExpense).toBeVisible();
    await act(async () => {
      userEvent.click(deleteExpense);
      await waitFor(
        () => expect(screen.queryAllByText(loading)).toHaveLength(0),
        { timeout: 3000 },
      );
    });
    const newTotalExpense = screen.getByTestId(totalField);
    expect(newTotalExpense.innerHTML).toEqual('0.00');
    expect(deleteExpense).not.toBeVisible();
  });
});

describe('Tratamento de erros', () => {
  it('Caso a requisição falhe deve retornar erro', async () => {
    renderFromHomepage();
    jest.spyOn(global, 'fetch');
    global.fetch.mockImplementation(() => {
      throw new Error('teste');
    });
    await waitFor(
      () => expect(screen.queryAllByText(loading)).toHaveLength(0),
      { timeout: 3000 },
    );

    await addTestExpense();

    expect(global.fetch).toThrow(new Error('teste'));
  });

  it('ID da despesa deve ser sequencial e unico', async () => {
    mockFetch();
    const { store } = renderWithRouterAndRedux(<App />);
    await act(async () => {
      await waitFor(() => {
        const inputEmail = screen.getByPlaceholderText(/e-mail/i);
        const inputPass = screen.getByPlaceholderText(/senha/i);
        const btnLogin = screen.getByRole('button', { name: /entrar/i });
        userEvent.type(inputEmail, 'validMail@mail.com');
        userEvent.type(inputPass, 'validPassword123');
        userEvent.click(btnLogin);
      });
    });
    const walletStore = (storeParam) => {
      const { wallet } = storeParam.getState();
      return wallet;
    };
    await addTestExpense();
    let updatedWallet = walletStore(store);
    expect(updatedWallet.expenses.length).toBe(1);
    await addTestExpense();
    updatedWallet = walletStore(store);
    expect(updatedWallet.expenses.length).toBe(2);
    expect(updatedWallet.expenses[1].id).toBe(1);
    let deleteExpenseList = await waitFor(() => screen.findAllByTestId('delete-btn'));
    const deleteExpense = deleteExpenseList[0];
    act(() => {
      userEvent.click(deleteExpense);
    });
    deleteExpenseList = await waitFor(() => screen.findAllByTestId('delete-btn'));
    expect(deleteExpenseList.length).toBe(1);
    await addTestExpense();
    updatedWallet = walletStore(store);
    expect(updatedWallet.expenses[1].id).toBe(2);
  });
});
