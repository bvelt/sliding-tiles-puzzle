import React from 'react';
import PropTypes from 'prop-types';
import Tile from './Tile';
import './TileGrid.css';

class TileGrid extends React.Component {
  static propTypes = {
    columnCount: PropTypes.number,
    rowCount: PropTypes.number,
    tiles: PropTypes.array,
    moves: PropTypes.array,
    onMove: PropTypes.func,
  }
  render() {
    const {
      columnCount,
      rowCount,
      tiles,
      moves = [],
      onMove = () => { }
    } = this.props;

    const blankTile = columnCount * rowCount;

    const rows = [];
    for (let irow = 0; irow < rowCount; irow++) {
      const cols = [];
      for (let icol = 0; icol < columnCount; icol++) {
        const itile = (irow * rowCount) + icol;
        const tileIsMoveable = moves.some(move => move[0].toIndex === itile);
        cols.push(
          <td key={itile}>
            <Tile
              value={tiles[itile]}
              isBlank={tiles[itile] === blankTile}
              isClickable={tileIsMoveable}
              onClick={tileIsMoveable ? () => onMove(itile) : () => { }}></Tile>
          </td>
        );
      }
      rows.push(
        <tr key={irow}>{cols}</tr>
      );
    }

    return (
      <table className="tileGrid">
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
}

export default TileGrid;