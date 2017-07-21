'use babel';

import { CompositeDisposable, Emitter } from 'atom';

class TreeViewDelegate {
  constructor() {
    this.emitter = new Emitter();
    this.subscriptions = new CompositeDisposable();

    this.treeContents = null;
  }

  update(treeContents) {
    // if (Array.isArray(messages)) {
    //   this.messages = messages
    // }
    this.treeContents = treeContents;
    this.emitter.emit('observe-tree-contents', this.treeContents);
  }

  onDidChangeTreeContents(callback) {
    return this.emitter.on('observe-tree-contents', callback);
  }

  dispose() {
    this.subscriptions.dispose();
  }
}

module.exports = TreeViewDelegate;
