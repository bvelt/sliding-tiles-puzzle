import React from 'react';
import PropTypes from 'prop-types';
import TileGrid from '../components/TileGrid';
import { Search } from '../logic/Search';
import Problem from '../logic/Problem';
import Shuffle from '../logic/Shuffle';
import './SlidingTileGrid.css';
import '../components/IconButton';
import IconButton from '../components/IconButton';

class SlidingTileGrid extends React.Component {
  constructor(props) {
    super(props);

    this.handleMove = this.handleMove.bind(this);
    this.handleRandom = this.handleRandom.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleReset = this.handleReset.bind(this);

    this.problem = new Problem();
    this.shuffle = new Shuffle();
    const tiles = this.problem.createTiles();
    this.state = {
      tiles: tiles,
      nextMoves: this.problem.successor.successors(tiles),
      prevMoves: []
    };
  }

  handleReset() {
    const tiles = this.problem.createTiles();
    this.setState((prevState, props) => Object.assign({}, this.state, {
      tiles: tiles,
      nextMoves: this.problem.successor.successors(tiles),
      prevMoves: [],
      solved: false,
      search: null
    }));
  }

  handleMove(toIndex) {
    const {
      nextMoves
    } = this.state;
    for (let [move, nextTiles] of nextMoves) {
      if (move.toIndex === toIndex) {
        this.setState((prevState, props) => Object.assign({}, this.state, {
          tiles: nextTiles,
          nextMoves: this.problem.successor.successors(nextTiles),
          prevMoves: prevState.prevMoves.concat([[move, nextTiles]])
        }));
        break;
      }
    }
  }

  handleRandom() {
    const {
      tiles,
      prevMoves
    } = this.state;

    const shuffled = this.shuffle.shuffle(tiles, 15);

    const randomMoves = [];
    for (let node = shuffled; node.action; node = node.parent) {
      randomMoves.unshift([node.action, node.state]);
    }

    const nextTiles = shuffled.state;
    this.setState((prevState, props) => Object.assign({}, this.state, {
      tiles: nextTiles,
      nextMoves: this.problem.successor.successors(nextTiles),
      prevMoves: prevMoves.concat(randomMoves)
    }));
  }

  handleSearch() {
    const {
      tiles
    } = this.state;
    this.problem.initialState = tiles;
    const search = new Search(this.problem);
    const solved = search.search();
    this.setState((prevState, props) => Object.assign({}, this.state, {
      solved: solved,
      search: search
    }));
  }

  render() {
    const {
      solved = false,
      search,
      tiles,
      nextMoves,
      prevMoves
    } = this.state;

    const solutionSteps = [];
    if (solved) {
      let key = 0;
      let node = search.solution;
      const length = node.depth;
      while (node.action) {
        solutionSteps.unshift(
          <tr key={key}>
            <td>{length - key++}</td>
            <td>{node.action.type}</td>
            <td>[{node.action.fromIndex},{node.action.toIndex}]</td>
            <td>{`[${node.parent.state}]`}</td>
            <td>{`[${node.state}]`}</td>
          </tr>);
        node = node.parent;
      }
    }

    const prevSteps = [];
    let key = 0;
    for (let prevStep of prevMoves) {
      prevSteps.push(
        <tr key={key++}>
          <td>{key}</td>
          <td>{prevStep[0].type}</td>
          <td>[{prevStep[0].fromIndex},{prevStep[0].toIndex}]</td>
          <td>{`[${prevStep[1]}]`}</td>
        </tr>
      );
    }

    return (
      <div className="slidingTiles">
        <TileGrid
          columnCount={this.problem.settings.columnCount}
          rowCount={this.problem.settings.rowCount}
          tiles={tiles}
          moves={nextMoves}
          onMove={this.handleMove}>
        </TileGrid>
        <ul className="buttons">
          <li>
            <IconButton icon="random" onClick={this.handleRandom}></IconButton>
          </li>
          <li>
            <IconButton icon="info" onClick={this.handleSearch}></IconButton>
          </li>
          <li>
            <IconButton icon="reset" onClick={this.handleReset}></IconButton>
          </li>
        </ul>
        <div className="solution">
          <p>Solved: {solved === true ? 'true' : 'false'}
            {search ? `, depth: ${solutionSteps.length}, cost: ${search.strategy.stats.nodeCount}, bf: ${search.strategy.stats.branchingFactor()}` : ''}</p>
          <table>
            <tbody>
              {solutionSteps}
            </tbody>
          </table>
        </div>
        <div className="prevMoves">
          <p>Previous</p>
          <table>
            <tbody>
              {prevSteps}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default SlidingTileGrid;