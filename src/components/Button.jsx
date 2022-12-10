import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Button extends Component {
  render() {
    const { type, text, className, datatestid, disabled, onClick } = this.props;
    return (
      <button
        type={ type === 'submit' ? 'submit' : 'button' }
        className={ className }
        data-testid={ datatestid }
        disabled={ disabled }
        onClick={ onClick }
      >
        {text}
      </button>
    );
  }
}

Button.defaultProps = {
  onClick: () => {},
  type: 'button',
  text: '',
  className: '',
  datatestid: '',
  disabled: true,
};

Button.propTypes = {
  onClick: PropTypes.func,
  type: PropTypes.string,
  text: PropTypes.string,
  className: PropTypes.string,
  datatestid: PropTypes.string,
  disabled: PropTypes.bool,
};
