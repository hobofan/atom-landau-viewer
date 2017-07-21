'use babel';

import { CompositeDisposable } from 'atom';
import { WORKSPACE_URI } from '../helpers';

let React;
let ReactDOM;
let Component;

class TreeViewContainer {
  constructor(delegate, onSelectionChanged) {
    this.element = document.createElement('div');
    this.subscriptions = new CompositeDisposable();

    if (!React) {
      React = require('react');
    }
    if (!ReactDOM) {
      ReactDOM = require('react-dom');
    }
    if (!Component) {
      Component = require('./component');
    }

    ReactDOM.render(<Component delegate={delegate} onSelectionChanged={onSelectionChanged} />, this.element);
  }

  getURI() {
    return WORKSPACE_URI;
  }

  getTitle() {
    return 'TreeView';
  }

  getDefaultLocation() {
    return 'bottom';
  }

  getAllowedLocations() {
    return ['center', 'bottom', 'top'];
  }
}

module.exports = TreeViewContainer;
