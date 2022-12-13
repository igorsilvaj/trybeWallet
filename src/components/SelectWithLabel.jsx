import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class selectTextWithLabel extends Component {
  render() {
    const { type, name, onChange, value, placeholder,
      className, autoComplete, datatestid, labelText, options } = this.props;
    return (
      <div className={ `${name}Container` }>
        <label htmlFor={ name }>
          {labelText}
          <select
            autoComplete={ autoComplete }
            className={ className }
            data-testid={ datatestid }
            id={ name }
            name={ name }
            onChange={ onChange }
            placeholder={ placeholder }
            type={ type }
            value={ value }
          >
            {options.map((e, index) => (
              <option key={ `${e}-${index}` } value={ e }>{e}</option>))}
          </select>
        </label>
      </div>
    );
  }
}

selectTextWithLabel.defaultProps = {
  autoComplete: 'off',
  className: '',
  datatestid: '',
  labelText: '',
  name: '',
  onChange: null,
  options: ['NotDefined', 'b'],
  placeholder: '',
  value: '',
};

selectTextWithLabel.propTypes = {
  autoComplete: PropTypes.string,
  className: PropTypes.string,
  datatestid: PropTypes.string,
  labelText: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.string),
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
};
