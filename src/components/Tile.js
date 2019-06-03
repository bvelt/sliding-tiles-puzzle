import * as React from 'react';
import PropTypes from 'prop-types';
import './Tile.css';

const noop = () => { };

class Tile extends React.Component {
  static propTypes = {
    value: PropTypes.number,
    isBlank: PropTypes.bool,
    isClickable: PropTypes.bool,
    onClick: PropTypes.func
  }
  render() {
    const {
      value = -1,
      isBlank = false,
      isClickable = false,
      onClick = noop
    } = this.props;
    return (
      <span
        className={`tile ${isClickable ? 'tile__clickable' : ''} ${isBlank ? 'tile__blank' : ''}`}
        onClick={isClickable ? onClick : noop} >{value}</span>
    );
  }
}

export default Tile;