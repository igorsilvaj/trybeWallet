import Wallet from '../pages/Wallet';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testes de rota', () => {
  it('Renderiza o componente Wallet na rota "/carteira"', () => {
    renderWithRouterAndRedux(<Wallet />);
  });
});

describe('Testes de renderização de componentes', () => {

});

describe('Testes com interação do usuario', () => {

});
