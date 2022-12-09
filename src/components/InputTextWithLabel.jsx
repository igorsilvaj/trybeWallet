import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class InputTextWithLabel extends Component {
  render() {
    const { type, name, onChange, value, placeholder,
      className, autoComplete, datatestid, labelText } = this.props;
    return (
      <div className={ `${name}Container` }>
        <label htmlFor={ name }>
          {labelText}
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
        </label>
      </div>
    );
  }
}

InputTextWithLabel.defaultProps = {
  autoComplete: 'off',
  className: '',
  datatestid: '',
  labelText: '',
  name: '',
  onChange: null,
  placeholder: '',
  value: '',
};

InputTextWithLabel.propTypes = {
  autoComplete: PropTypes.string,
  className: PropTypes.string,
  datatestid: PropTypes.string,
  labelText: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
};
