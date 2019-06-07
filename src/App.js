import React from 'react';
import logo from './logo.svg';
import { defaultSettings } from './logic/Settings';
import SlidingTileGrid from './containers/SlidingTileGrid';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        {(defaultSettings.columnCount * defaultSettings.columnCount) - 1} Puzzle
      </header>
      <SlidingTileGrid settings={defaultSettings}></SlidingTileGrid>
    </div>
  );
}

export default App;
