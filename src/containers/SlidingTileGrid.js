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
      tiles
    } = this.state;
    const nextTiles = this.shuffle.shuffle(tiles, 5);
    this.setState((prevState, props) => Object.assign({}, this.state, {
      tiles: nextTiles,
      nextMoves: this.problem.successor.successors(nextTiles)
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
      nextMoves
    } = this.state;

    const steps = [];
    if (solved) {
      let key = 0;
      let node = search.solution;
      while (node.action) {
        steps.unshift(
          <li key={key++}>{`${node.action.type} from ${node.action.fromIndex + 1} to ${node.action.toIndex + 1}`}</li>
        )
        node = node.parent;
      }
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
          <p>Solved: {solved === true ?
            `depth=${search.solution.depth},cost=${search.strategy.stats.nodeCount},bf=${search.strategy.stats.branchingFactor()}`
            : 'false'}</p>
          <ol>
            {steps}
          </ol>
        </div>
      </div>
    );
  }
}

export default SlidingTileGrid;