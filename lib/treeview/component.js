'use babel';

import React from 'react';

class TreeView extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      treeContents: this.props.delegate.treeContents,
    };
  }

  state: {
    treeContents: null,
  };

  componentDidMount() {
    this.props.delegate.onDidChangeTreeContents((treeContents) => {
      this.setState({ treeContents });
    });
  }

  onClick = (pos) => {
    this.props.onSelectionChanged(pos);
  };

  props: {
    delegate: null,
    onSelectionChanged: null,
  };

  render() {
    // const treeRoot = (
    //   <div id="tree-view-panel" tabIndex="-1" />
    // );
    const treeSize = {};
    const children = [];
    const onClick = this.onClick;

    function addElement(children, name, pos) {
      // var tr = document.createElement('tr');
      // var td = document.createElement('td');
      // td.innerHTML = name;
      // td.addEventListener('click', function(e) {
      //   this.onClick(pos);
      // });
      //
      // treeRoot.appendChild(tr);
      // tr.appendChild(td);
      const child = (
        <tr>
          <td onClick={() => onClick(pos)}>{name}</td>
        </tr>
      );
      children.push(child);
    }

    function traverse(tree, pos) {
      addElement(children, Array(pos.length).join('-') + tree.elementName, pos);
      if (tree.children) {
        treeSize[pos] = tree.children.length;
        tree.children.forEach(function(val, i) {
          traverse(val, pos.concat([i]));
        });
      }
    }

    if (this.state.treeContents) {
      traverse(this.state.treeContents, []);
    }
    return (
      <div id="tree-view-panel" tabIndex="-1" children={children} />
    );
  }
}

module.exports = TreeView;
