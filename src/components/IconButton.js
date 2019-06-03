import React from 'react';
import PropTypes from 'prop-types';
import './IconButton.css';

class IconButton extends React.Component {

  static ICONS = ['check', 'delete', 'random', 'reset', 'close', 'info'];

  static propTypes = {
    icon: PropTypes.string.isRequired,
    isDisabled: PropTypes.bool,
    onClick: PropTypes.func
  };

  render() {
    const {
      icon,
      isDisabled = false,
      onClick = () => false
    } = this.props;
    const style = {
      backgroundImage: `url(assets/${icon}.png)`
    };
    return (
      <button type={'button'}
        title={icon}
        className={`iconButton ${icon} ${isDisabled ? 'iconButton__disabled' : ''}`}
        disabled={isDisabled}
        onClick={!isDisabled ? onClick : () => false}
        style={style}>
      </button>
    );
  }
}

export default IconButton;