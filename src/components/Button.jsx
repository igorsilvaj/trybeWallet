import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Button extends Component {
  render() {
    const { type, text, className, disabled, onClick } = this.props;
    return (
      <button
        type={ type === 'submit' ? 'submit' : 'button' }
        className={ className }
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
  disabled: true,
};

Button.propTypes = {
  onClick: PropTypes.func,
  type: PropTypes.string,
  text: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};
