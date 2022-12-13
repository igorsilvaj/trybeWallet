import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Button extends Component {
  render() {
    const { text, className, datatestid, disabled, onClick } = this.props;
    return (
      <button
        type="button"
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
  onClick: null,
  text: '',
  className: '',
  datatestid: '',
  disabled: true,
};

Button.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
  className: PropTypes.string,
  datatestid: PropTypes.string,
  disabled: PropTypes.bool,
};
