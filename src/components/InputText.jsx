import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class InputText extends Component {
  render() {
    const { type, name, onChange, value, placeholder,
      className, autoComplete, datatestid } = this.props;
    return (
      <input
        autoComplete={ autoComplete }
        className={ className }
        data-testid={ datatestid }
        id={ name }
        name={ name }
        onChange={ onChange }
        placeholder={ placeholder }
        type={ type }
        value={ value }
      />
    );
  }
}

InputText.defaultProps = {
  autoComplete: 'off',
  className: '',
  datatestid: '',
  name: '',
  onChange: null,
  placeholder: '',
  value: '',
};

InputText.propTypes = {
  autoComplete: PropTypes.string,
  className: PropTypes.string,
  datatestid: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
};
