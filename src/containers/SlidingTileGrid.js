import React from 'react';
import PropTypes from 'prop-types';
import TileGrid from '../components/TileGrid';
import { Settings, defaultSettings } from '../logic/Settings';
import { Search } from '../logic/Search';
import Problem from '../logic/Problem';
import Shuffle from '../logic/Shuffle';
import Solution from '../components/Solution';
import ActionSequence from '../components/ActionSequence';
import './SlidingTileGrid.css';
import '../components/IconButton';
import IconButton from '../components/IconButton';

class SlidingTileGrid extends React.Component {
  static propTypes = {
    settings: PropTypes.instanceOf(Settings)
  }

  constructor(props) {
    super(props);
    const {
      settings = defaultSettings
    } = this.props;

    this.handleMove = this.handleMove.bind(this);
    this.handleRandom = this.handleRandom.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleReset = this.handleReset.bind(this);

    this.problem = new Problem(settings);
    this.shuffle = new Shuffle(settings);
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
      search = {},
      tiles,
      nextMoves,
      prevMoves
    } = this.state;

    let history;
    if (prevMoves.length > 0) {
      history =
        <div className="history">
          <p>History</p>
          <ActionSequence
            settings={this.problem.settings}
            actions={prevMoves}>
          </ActionSequence>
        </div>;
    }

    let solution;
    if (solved) {
      solution = <Solution
        settings={this.problem.settings}
        solved={solved}
        solution={search.solution}
        stats={search.strategy.stats}>
      </Solution>;
    }

    return (
      <div className="slidingTileGrid">
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
        {solution}
        {history}
      </div>
    );
  }
}

export default SlidingTileGrid;