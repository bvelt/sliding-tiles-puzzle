import React from 'react';
import PropTypes from 'prop-types';
import ActionSequence from './ActionSequence';
import { Settings, defaultSettings } from '../logic/Settings';
import './Solution.css';

export default class Solution extends React.Component {
  static propTypes = {
    settings: PropTypes.instanceOf(Settings),
    solved: PropTypes.bool,
    solution: PropTypes.object,
    stats: PropTypes.object
  }

  render() {
    const {
      settings = defaultSettings,
      solved = false,
      solution = {},
      stats = {}
    } = this.props;

    const actions = [];
    let node = solution;
    while (node.action) {
      actions.unshift([node.action, node.state]);
      node = node.parent;
    }
    let actionSequence;
    if (actions.length > 0) {
      actionSequence = <ActionSequence settings={settings} actions={actions}></ActionSequence>
    }

    return (
      <div className="solution">
        <p>Solved: {solved === true ? 'true' : 'false'}
          {solution ? `, Depth: ${actions.length}, Cost: ${stats.nodeCount}, BF: ${stats.branchingFactor()}` : ''}</p>
        {actionSequence}
      </div>
    );
  }
}