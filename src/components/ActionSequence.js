import React from 'react';
import PropTypes from 'prop-types';
import { Settings, defaultSettings } from '../logic/Settings';
import IconButton from './IconButton';
import TileGridPreview from './TileGridPreview';
import './ActionSequence.css';

export default class ActionSequence extends React.Component {
  static propTypes = {
    settings: PropTypes.instanceOf(Settings),
    actions: PropTypes.array
  }
  constructor(props) {
    super(props);
    this.handleBack = this.handleBack.bind(this);
    this.handleForward = this.handleForward.bind(this);
    this.state = {
      index: 0
    }
  }

  handleBack() {
    const {
      index = 0
    } = this.state;
    if (index > 0) {
      this.setState(Object.assign({}, this.state, {
        index: index - 1
      }));
    }
  }

  handleForward() {
    const {
      index = 0
    } = this.state;
    if (index + 1 < this.props.actions.length) {
      this.setState(Object.assign({}, this.state, {
        index: index + 1
      }));
    }
  }

  render() {
    const {
      index
    } = this.state;
    const {
      settings = defaultSettings,
      actions = []
    } = this.props;
    const action = actions[index];
    return (
      <div className="actionSequence">
        <p className="action">
          <span className="move">{action[0].type}</span>
          <span className="fromTo">, {action[0].fromIndex} to {action[0].toIndex}</span>
        </p>
        <TileGridPreview settings={settings}
          tiles={action[1]}
          fromIndex={action[0].fromIndex}>
        </TileGridPreview>
        <ul className="buttons">
          <li>
            <IconButton icon="arrow_back"
              onClick={this.handleBack}
              isDisabled={index === 0}></IconButton>
          </li>
          <li><span className="index">{index + 1}/{actions.length}</span></li>
          <li>
            <IconButton icon="arrow_forward"
              onClick={this.handleForward}
              isDisabled={index + 1 === actions.length}></IconButton>
          </li>
        </ul>
      </div>
    );
  }

}