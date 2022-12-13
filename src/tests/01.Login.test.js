import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './mocks/mockData';

const validMail = 'validMail@mail.com';

describe('Testes de rota', () => {
  it('Renderiza o componente Login na rota "/"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => history.push('/'));
    const inputEmail = screen.getByPlaceholderText(/e-mail/i);
    const inputPass = screen.getByPlaceholderText(/senha/i);
    const btnLogin = screen.getByRole('button', { name: /entrar/i });
    expect(inputEmail).toBeInTheDocument();
    expect(inputPass).toBeInTheDocument();
    expect(btnLogin).toBeInTheDocument();
  });
  it('Renderiza o componente Error caso seja passada uma rota incorreta', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => history.push('/rotaErrada'));
    const errorMsg = screen.getByText(/página não encontrada!/i);
    expect(history.location.pathname).toBe('/rotaErrada');
    expect(errorMsg).toBeInTheDocument();
  });
});

describe('Testes de renderização de componentes', () => {
  beforeEach(() => {
    renderWithRouterAndRedux(<App />);
  });

  it('Ao renderizar o componente o botão está desabilitado', () => {
    const btnLogin = screen.getByRole('button', { name: /entrar/i });
    expect(btnLogin).toBeDisabled();
  });

  it('É renderizado um input de email', () => {
    const inputEmail = screen.getByPlaceholderText(/e-mail/i);
    expect(inputEmail).toBeInTheDocument();
  });

  it('É renderizado um input de senha', () => {
    const inputPass = screen.getByPlaceholderText(/senha/i);
    expect(inputPass).toBeInTheDocument();
  });

  it('É renderizado um botão para efetuar login', () => {
    const btnLogin = screen.getByRole('button', { name: /entrar/i });
    expect(btnLogin).toBeInTheDocument();
    expect(btnLogin).toHaveProperty('type', 'button');
  });
});

describe('Testes com interação do usuario', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
  });
  it('Ao digitar e-mail e senha ínvalidos o botão está desabilitado', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByPlaceholderText(/e-mail/i);
    const inputPass = screen.getByPlaceholderText(/senha/i);
    const btnLogin = screen.getByRole('button', { name: /entrar/i });
    act(() => {
      userEvent.type(inputEmail, 'invalidMailmail.com');
      userEvent.type(inputPass, 'inva');
    });
    expect(btnLogin).toBeDisabled();
  });

  it('Ao digitar e-mail ínvalido o botão está desabilitado', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByPlaceholderText(/e-mail/i);
    const inputPass = screen.getByPlaceholderText(/senha/i);
    const btnLogin = screen.getByRole('button', { name: /entrar/i });
    act(() => {
      userEvent.type(inputEmail, 'invalidMailmail.com');
      userEvent.type(inputPass, 'validPassword123');
    });
    expect(btnLogin).toBeDisabled();
  });

  it('Ao digitar senha ínvalida o botão está desabilitado', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByPlaceholderText(/e-mail/i);
    const inputPass = screen.getByPlaceholderText(/senha/i);
    const btnLogin = screen.getByRole('button', { name: /entrar/i });
    act(() => {
      userEvent.type(inputEmail, validMail);
      userEvent.type(inputPass, 'inva');
    });
    expect(btnLogin).toBeDisabled();
  });

  it('Ao digitar e-mail e senha validos o botão está habilitado', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByPlaceholderText(/e-mail/i);
    const inputPass = screen.getByPlaceholderText(/senha/i);
    const btnLogin = screen.getByRole('button', { name: /entrar/i });
    act(() => {
      userEvent.type(inputEmail, validMail);
      userEvent.type(inputPass, 'validPassword123');
    });
    expect(btnLogin).not.toBeDisabled();
  });

  it('Ao clicar em "Entrar" o email é salvo no estado global', async () => {
    const { store } = renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByPlaceholderText(/e-mail/i);
    const inputPass = screen.getByPlaceholderText(/senha/i);
    const btnLogin = screen.getByRole('button', { name: /entrar/i });
    await act(async () => {
      userEvent.type(inputEmail, validMail);
      userEvent.type(inputPass, 'validPassword123');
      userEvent.click(btnLogin);
      expect(global.fetch).toBeCalledTimes(1);
      await waitFor(() => {
        const { user } = store.getState();
        expect(user.email).toBe('validMail@mail.com');
      });
    });
  });
});

describe('Tratamento de erros', () => {
  beforeEach(() => {
    renderWithRouterAndRedux(<App />);
    jest.spyOn(global, 'fetch');
    global.fetch.mockImplementation(() => {
      throw new Error('teste');
    });
  });
  it('', () => {
    const inputEmail = screen.getByPlaceholderText(/e-mail/i);
    const inputPass = screen.getByPlaceholderText(/senha/i);
    const btnLogin = screen.getByRole('button', { name: /entrar/i });
    act(() => {
      userEvent.type(inputEmail, validMail);
      userEvent.type(inputPass, 'validPassword123');
      userEvent.click(btnLogin);
    });
    expect(global.fetch).toBeCalledTimes(1);
    expect(global.fetch).toThrow(new Error('teste'));
  });
});
