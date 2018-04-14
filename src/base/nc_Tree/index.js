import React, { Component } from 'react';
import { Tree } from 'tinper-bee';
const TreeNode = Tree.TreeNode;
class NCTree extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return <Tree {...this.props} />;
	}
}
NCTree.NCTreeNode = TreeNode;
export default NCTree;
