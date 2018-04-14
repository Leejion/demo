import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Tree } from 'tinper-bee';

const TreeNode = Tree.TreeNode;

export default class ReferTree extends Component {
	static defaultProps = {
		defaultExpandAll: false
	};
	constructor(props) {
		super(props);
	}
	makeDom = (a) => {
		if (a === undefined) return;
		if (typeof a === 'boolean') {
			return a ? '' : [];
		}
		return a.map((e, i) => {
			let { refpk, _display, ...otherProps } = e;
			return (
				<TreeNode key={refpk} title={_display} treeNodeData={e}>
					{this.makeDom(e.children ? Object.values(e.children) : e.isleaf)}
				</TreeNode>
			);
		});
	};
	render() {
		const { data, ...otherProps } = this.props;
		return <Tree {...otherProps}>{this.makeDom(Object.values(data))}</Tree>;
	}
}
