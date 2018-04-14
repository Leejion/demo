import React, { Component } from 'react';
import { Button, Table, FormControl, Pagination, Select, Checkbox, Tree } from 'tinper-bee';
import classnames from 'classnames';

import ajax from '../../../api/ajax';
import { createPage } from '../../../../src';
import { initTemplate } from './events';
import NCBreadcrumb from '../../../base/nc_Breadcrumb';
const NCBreadcrumbItem = NCBreadcrumb.NCBreadcrumbItem;
const TreeNode = Tree.TreeNode;

import './index.less';

export default class ApproveProcess extends Component {
	constructor(props) {
		super(props);
		this.state = {
			stopFlag: false, // 显示停用 开关
			columns: [],
			dataSource: [],
			activePage: 1,
			treeData: []
		};
	}

	componentWillMount() {}

	componentDidMount() {
		setTimeout(() => {
			this.setState({
				treeData: [
					{
						name: 'pNode 01',
						key: '0-0',
						children: [
							{
								name: 'leaf 0-0-0',
								key: '0-0-0'
							},
							{
								name: 'leaf 0-0-1',
								key: '0-0-1'
							}
						]
					},
					{
						name: 'pNode 02',
						key: '0-1',
						children: [
							{
								name: 'leaf 0-1-0',
								key: '0-1-0'
							},
							{
								name: 'leaf 0-1-1',
								key: '0-1-1'
							}
						]
					},
					{
						name: 'pNode 03',
						key: '0-2',
						isLeaf: true
					}
				]
			});
		}, 100);
	}

	onSearchApprove = () => {
		this.setState({
			stopFlag: !this.state.stopFlag
		});
	};

	// 展开树事件
	onExpandTree = () => {};

	onSelectPage = () => {};

	render() {
		// 加入外层的 className 和 style
		let { showStop, columns, dataSource, activePage, stopFlag } = this.state;
		let { className = '', style = {} } = this.props;

		// 外部传入className
		const wrapsClass = classnames('nc-approve-process-wrap', { className: true });

		const loop = (data) =>
			data.map((item) => {
				if (item.children) {
					return (
						<TreeNode className="u-process-tree-child" title={item.name} key={item.key}>
							{loop(item.children)}
						</TreeNode>
					);
				}
				return <TreeNode className="u-process-tree" title={item.name} key={item.key} isLeaf={item.isLeaf} />;
			});
		const treeNodes = loop(this.state.treeData);

		return (
			<section id="js_approve_process" className={wrapsClass} style={style}>
				<header className="approve-process-hearder cf">
					<h2 className="approve-process-title fl">审批流</h2>
					<div className="process-hearder-filter fl">
						<Checkbox className="" checked={stopFlag} onChange={this.onSearchApprove}>
							显示停运
						</Checkbox>
					</div>
				</header>
				<section className="approve-process-main">
					<div className="approve-process-tree">
						<Tree
							className="u-process-trees"
							defaultExpandAll={false}
							onExpand={this.onExpandTree}
							// expandedKeys={expandedKeys}
							// autoExpandParent={autoExpandParent}
						>
							{treeNodes}
						</Tree>
					</div>
					<div className="approve-process-table">
						<Table columns={columns} data={dataSource} className="process-table" />
						<div className="process-table-pagination fr">
							<Pagination
								prev
								next
								size="sm"
								gap={true}
								items={5}
								maxButtons={5}
								activePage={activePage}
								onSelect={this.onSelectPage}
							/>
						</div>
					</div>
				</section>
			</section>
		);
	}
}
