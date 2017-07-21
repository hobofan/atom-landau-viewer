'use babel';

import { CompositeDisposable } from 'atom';
import Delegate from './delegate';
import TreeViewContainer from './container';

class TreeView {
  constructor(onSelectionChanged) {
    this.panel = null;
    this.element = document.createElement('div');
    this.delegate = new Delegate();
    this.onSelectionChanged = onSelectionChanged;
    this.subscriptions = new CompositeDisposable();

    this.treeContents = null;

    this.subscriptions.add(this.delegate);
  }

  async activate() {
    if (this.panel) {
      return;
    }
    this.panel = new TreeViewContainer(this.delegate, this.onSelectionChanged);
    await atom.workspace.open(this.panel, {
      activatePane: false,
      activateItem: false,
      searchAllPanes: true,
    });
    this.update();
    this.refresh();
  }

  update(newTreeContents) {
    // TODO: messages -> Tree structure
    if (newTreeContents) {
      this.treeContents = newTreeContents;
    }
    this.delegate.update(this.treeContents);
    this.refresh();
  }

  async refresh() {
    if (this.panel === null) {
      // TODO
      // if (this.showPanelConfig) {
        await this.activate();
      // }
      return
    }
    const paneContainer = atom.workspace.paneContainerForItem(this.panel);
    if (!paneContainer || paneContainer.location !== 'bottom' || paneContainer.getActivePaneItem() !== this.panel) {
      return
    }
    if (
      // (this.showPanelConfig) &&
      // (!this.hidePanelWhenEmpty || this.showPanelStateMessages)
      true
    ) {
      paneContainer.show();
    } else {
      paneContainer.hide();
    }
  }

  // TODO
  // dispose() {
  //   this.deactivating = true
  //   if (this.panel) {
  //     this.panel.dispose()
  //   }
  //   this.subscriptions.dispose()
  //   window.cancelIdleCallback(this.activationTimer)
  // }
}

module.exports = TreeView
