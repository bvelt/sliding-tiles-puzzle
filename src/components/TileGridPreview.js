import React from 'react';
import PropTypes from 'prop-types';
import { Settings, defaultSettings } from '../logic/Settings';
import './TileGridPreview.css';

export default class TileGridPreview extends React.Component {
  static propTypes = {
    settings: PropTypes.instanceOf(Settings),
    tiles: PropTypes.arrayOf(PropTypes.number),
    fromIndex: PropTypes.number
  }
  render() {
    const {
      settings = defaultSettings,
      tiles,
      fromIndex
    } = this.props;
    const rows = [];
    for (let i = 0; i < tiles.length; i += settings.columnCount) {
      const cols = []
      for (let j = i; j < i + settings.columnCount; j++) {
        cols.push(
          <td key={j} className={fromIndex === j ? 'move' : ''}>
            <span className={`tilePreview ${tiles[j] === settings.blankSpace ? 'tilePreview__blank' : ''}`}>
              {tiles[j]}
            </span>
          </td>
        );
      }
      rows.push(cols);
    }
    return (
      <table className="tileGridPreview">
        <tbody>
          {rows.map(row => <tr>{row}</tr>)}
        </tbody>
      </table>
    );
  }
}