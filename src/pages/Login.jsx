import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAPI, login } from '../redux/actions';

import Button from '../components/Button';
import InputText from '../components/InputText';

class Login extends React.Component {
  state = {
    isBtnDisabled: true,
    email: '',
    validPassword: false,
  };

  checkValidMail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  checkPasswordLen = (pass) => {
    const minLen = 6;
    if (pass.length >= minLen) {
      return this.setState({ validPassword: true }, () => this.checkValidForm());
    }
    return this.setState({ validPassword: false }, () => this.checkValidForm());
  };

  checkValidForm = () => {
    const { email, validPassword } = this.state;
    const validMail = this.checkValidMail(email);
    if (validMail && validPassword) {
      return this.setState({ isBtnDisabled: false });
    }
    return this.setState({ isBtnDisabled: true });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    if (name !== 'password') {
      this.setState({ [name]: value }, () => this.checkValidForm());
    } else {
      this.checkPasswordLen(value);
    }
  };

  handleClick = () => {
    const { dispatch, history } = this.props;
    const { email } = this.state;
    dispatch(login(email));
    history.push('/carteira');
    dispatch(fetchAPI());
  };

  render() {
    const { isBtnDisabled, email } = this.state;
    return (
      <form className="formLogin">
        <div className="loginContainer">
          <div className="logoTrybeWallet" />
          <InputText
            className="inputEmail"
            datatestid="email-input"
            name="email"
            onChange={ this.handleChange }
            placeholder="E-mail"
            type="text"
            value={ email }
          />
          <input
            autoComplete="on"
            className="inputPassword"
            data-testid="password-input"
            name="password"
            onChange={ this.handleChange }
            placeholder="Senha"
            type="password"
          />
          <Button
            className="btnLogin"
            disabled={ isBtnDisabled }
            onClick={ this.handleClick }
            text="Entrar"
            type="button"
          />
        </div>
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
