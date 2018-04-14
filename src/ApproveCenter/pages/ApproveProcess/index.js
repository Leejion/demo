/**
 *  启用规则： 不显示停用规则下，当数据列表的某条从启用变为停用，此时这条数据还会在界面中显示，下次进入时候重新加载列表
 */

import React, { Component } from 'react';
import { Button, Table, FormControl, Pagination, Select, Icon, Checkbox, Tree, Switch } from 'tinper-bee';
import classnames from 'classnames';

import ajax from '../../../api/ajax';
import { createPage } from '../../../../src';
import { initTemplate } from './events';
import NCBreadcrumb from '../../../base/nc_Breadcrumb';
const NCBreadcrumbItem = NCBreadcrumb.NCBreadcrumbItem;
const TreeNode = Tree.TreeNode;
import ModelForm from '../../../Page/Table/modelForm';

import './index.less';

const dataSource = {
	datas: {
		data: [
			{
				key: '1',
				index: '1',
				id: '234-gfgf-3435-434343hnb',
				approveId: 'xxxxxxxx-xxxx-xxxx-xxxx',
				approveName: '审批流1',
				initRoleId: 'xxxxxxxx-xxxx-xxxx-xxxx',
				initRoleName: '角色1',
				isOpen: true
			},
			{
				key: '2',
				index: '2',
				id: 'dsds-gfgf-3435-434343hnb',
				approveId: 'xxxxxxxx-xxxx-xxxx-xxxx',
				initRoleId: 'xxxxxxxx-xxxx-xxxx-xxxx',
				approveName: '辅料部审批流程',
				initRoleName: '综合采购员',
				isOpen: false
			},
			{
				key: '3',
				index: '3',
				id: 'fd33-gfgf-3435-434343hnb',
				approveName: '辅料部审批流程',
				initRoleName: '综合采购员',
				isOpen: false
			},
			{
				key: '4',
				index: '4',
				id: 'fgg44-gfgf-3435-434343hnb',
				approveName: '辅料部审批流程',
				initRoleName: '综合采购员',
				isOpen: false
			},
			{
				key: '5',
				index: '5',
				id: 'fd334-gfgf-3435-434343hnb',
				approveName: '辅料部审批流程',
				initRoleName: '综合采购员',
				isOpen: false
			},
			{
				key: '6',
				index: '6',
				id: 'fddw4-gfgf-3435-434343hnb',
				approveName: '辅料部审批流程',
				initRoleName: '综合采购员',
				isOpen: false
			},
			{
				key: '11',
				index: '7',
				id: 'rr33-gfgf-3435-434343hnb',
				approveName: '辅料部审批流程',
				initRoleName: '综合采购员',
				isOpen: false
			},
			{
				key: '12',
				index: '8',
				id: 'rr3443-gfgf-3435-434343hnb',
				approveName: '辅料部审批流程',
				initRoleName: '综合采购员',
				isOpen: false
			},
			{
				key: '13',
				index: '9',
				id: 'rdddw-gfgf-3435-434343hnb',
				approveName: '辅料部审批流程',
				initRoleName: '综合采购员',
				isOpen: false
			},
			{
				key: '14',
				index: '10',
				id: '3gggd-gfgf-3435-434343hnb',
				approveName: '辅料部审批流程',
				initRoleName: '综合采购员',
				isOpen: false
			}
		],
		totalNum: 10,
		pageSize: 10,
		pageIndex: 1
	},
	success: true,
	message: ''
};

export default class ApproveProcess extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentRowIndex: 0,
			stopFlag: false, // 显示停用 开关
			dataSource: [],
			treeData: [],
			isOpen: false,
			isHover: '',
			editKey: '',
			activeKey: '',
			model: false,
			operType: 'add',
			size: '10',
			totalNums: '12',
			pageIndex: 1,
			pageSize: 10,
			formMeta: {
				moduleId: 'noModule',
				renderCol: [],
				id: ''
			}
		};

		this.columns = [
			{
				title: '序号',
				dataIndex: 'index',
				key: 'index',
				width: '80px'
			},
			{
				title: '审批流名称',
				dataIndex: 'approveName',
				key: 'approveName',
				width: '20%'
			},
			{
				title: '发起角色',
				dataIndex: 'initRoleName',
				key: 'initRoleName',
				width: '20%'
			},
			{
				title: '启用',
				dataIndex: 'isOpen',
				key: 'isOpen',
				render: (text, record, index) => (
					<Switch
						checkedChildren={'√'}
						unCheckedChildren={'X'}
						checked={text}
						onChange={this.onOpenChange.bind(this, text, record, index)}
					/>
				),
				width: '20%'
			},
			{
				title: '操作',
				dataIndex: 'opre',
				key: 'opre',
				render: (text, record, index) => (
					<div className="process-table-opre">
						<a onClick={this.editItem.bind(this, 'edit', record, index)}>修改</a>&nbsp;&nbsp;| &nbsp;&nbsp;
						<a onClick={this.copyProcess.bind(this, record, index)}>流程复制</a>&nbsp;&nbsp;| &nbsp;&nbsp;
						<a>流程定义</a>
					</div>
				),
				width: '30%'
			}
		];

		this.modelData = this.columns.filter((item, index) => index > 0 && index < 3);
	}

	componentWillMount() {
		// ajax({
		// 	url: this.props.queryTreeUrl,
		// 	data: {
		// 		approveType: +this.props.approveType
		// 	},
		// 	success: (res) => {
		// 		console.log(res);
		// 	},
		// })
		//左边分类
		let res = {
			success: true,
			message: '成功',
			data: [
				{
					moduleName: '采购管理',
					moduleCode: 'fm001',
					moduleId: 'a56c6254-f1f3-11e7-ae08',
					children: [
						{
							billtypeName: '采购订单',
							billtypeCode: 'fm001-001',
							billtypeId: 'a56c6254-f1f3-11e7-ae08'
						},
						{
							billtypeName: '到货单',
							billtypeCode: 'fm001-002',
							billtypeId: 'a56c6254-f1f3-13f7-ae08'
						}
					]
				},
				{
					moduleName: '出库管理',
					moduleCode: 'fm002',
					moduleId: 'a56c6254-f1f6-1ef7-ae5d',
					children: [
						{
							billtypeName: '出货统计',
							billtypeCode: 'fm002-001',
							billtypeId: 'a56c6254-f1f3-11e7-ae43'
						},
						{
							billtypeName: '待备货',
							billtypeCode: 'fm002-002',
							billtypeId: 'a56c6254-f1f3-11e7-aef3'
						}
					]
				}
			]
		};

		let treeData = res.data.map((item) => {
			if (item.children) {
				let children = item.children,
					tempArr = [];
				children.forEach((one) => {
					tempArr.push({
						name: one.billtypeName,
						key: one.billtypeId,
						code: one.billtypeCode,
						type: 'child'
					});
				});
				item.children = tempArr;
			}
			return {
				name: item.moduleName,
				key: item.moduleId,
				code: item.moduleCode,
				type: 'parent',
				children: item.children
			};
		});

		this.setState({
			treeData,
			dataSource: dataSource.datas.data,
			totalNums: dataSource.datas.totalNum,
			pageIndex: dataSource.datas.pageIndex,
			pageSize: dataSource.datas.pageSize
		});
	}

	//新增、修改事件
	editItem = (opr, record, index) => {
		this.state.formMeta.renderCol = this.modelData.map((item) => {
			let value = opr == 'add' ? '' : record[item.key];
			return { ...item, label: item.title, value, itemType: 'input' };
		});
		this.state.formMeta.id = (record && record['id']) || '';
		this.setState({
			currentRowIndex: index,
			model: true,
			operType: opr,
			formMeta: this.state.formMeta
		});
	};

	//关闭弹出框
	closeModel = (item) => {
		this.setState({
			model: false
		});
	};

	// 流程复制事件
	copyProcess = (record, index) => {
		console.log(record);
		console.log(index);
		this.currentRowIndex = index;
		this.state.formMeta.renderCol = this.modelData.map((item) => {
			let value = '';
			return { ...item, label: item.title, value, itemType: 'input' };
		});
		this.state.formMeta.id = (record && record['id']) || '';
		this.setState({
			currentRowIndex: index,
			model: true,
			operType: 'copy',
			formMeta: this.state.formMeta
		});
	};

	// 显示停用 过滤条件
	onSearchApprove = () => {
		this.setState(
			{
				stopFlag: !this.state.stopFlag
			},
			() => {
				this.getTableData();
			}
		);
	};

	// 启用开关
	onOpenChange = (text, record, index) => {
		this.state.dataSource[index].isOpen = !text;
		this.setState({
			dataSource: this.state.dataSource
		});
	};

	pageSizeChange = (val) => {
		this.setState(
			{
				pageSize: +val
			},
			() => {
				this.getTableData();
			}
		);
	};

	pageIndexChange = (val) => {
		this.setState(
			{
				pageIndex: +val
			},
			() => {
				this.getTableData();
			}
		);
	};

	onMouseEnter = (e) => {
		this.setState(
			{
				isHover: e.node.props.eventKey
			},
			() => {
				// console.log(this.state.isHover);
			}
		);
	};

	onMouseLeave = (e, treenode) => {
		this.setState({
			isHover: '',
			editKey: ''
		});
	};

	onSelect = (info) => {
		let activeKey = info[0];
		if (activeKey) {
			this.setState(
				{
					activeKey
				},
				() => {
					this.getTableData();
				}
			);
		}
	};

	//获取表格数据
	getTableData = () => {
		console.log('加载table数据');
		// ajax({
		// 	url: this.props.queryDatasUrl,
		// 	data: {
		// 		moduleCode: "fm001",
		// 		billtypeCode: "fm001-001",
		// 		disabledDisplay: this.state.stopFlag,
		// 		pageSize: this.state.pageSize,
		// 		pageIndex: this.state.pageIndex - 1
		// 	},
		// 	success: (res) => {
		// 		console.log(res);
		// 	},
		// })
		//
		this.setState({
			dataSource: dataSource.datas.data
		});
	};

	//模态框确定事件
	tableModelConfirm = (dist, type) => {
		//根据type类型，分别操作
		console.log(dist, type);
		console.log(this.state.dataSource);
		switch (type) {
			case 'add':
				this.addAjax(dist);
				break;
			case 'edit':
				this.editAjax(dist);
				break;
			case 'copy':
				this.copyAjax(dist);
				break;
		}
	};

	//修改请求
	editAjax = (dist) => {
		this.state.dataSource[this.state.currentRowIndex].approveName =
			dist.data.noModule.rows[0].values.approveName.value;
		this.state.dataSource[this.state.currentRowIndex].initRoleName =
			dist.data.noModule.rows[0].values.initRoleName.value;
		this.setState({
			dataSource: this.state.dataSource
		});
	};

	//新增请求
	addAjax = (dist) => {
		let newData = {
			key: '1',
			index: '1',
			id: '234-gfgf-3435-434343hnb',
			approveId: 'xxxxxxxx-xxxx-xxxx-xxxx',
			approveName: '审批流1333',
			initRoleId: 'xxxxxxxx-xxxx-xxxx-xxxx',
			initRoleName: '角色1333333',
			isOpen: true
		};

		this.state.dataSource.map((val, index) => {
			val.index = Number(val.index) + 1;
			val.key = Number(val.key) + 1;
		});
		this.state.dataSource.unshift(newData);
		this.setState({
			dataSource: this.state.dataSource
		});
	};

	//复制请求
	copyAjax = (dist) => {
		let newData = {
			key: '1',
			index: '1',
			id: '234-gfgf-3435-434343hnb',
			approveId: 'xxxxxxxx-xxxx-xxxx-xxxx',
			approveName: '审批流1333',
			initRoleId: 'xxxxxxxx-xxxx-xxxx-xxxx',
			initRoleName: '角色1333333',
			isOpen: true
		};
		this.state.dataSource.splice(this.state.currentRowIndex + 1, 0, newData);
		this.state.dataSource.map((val, index) => {
			val.index = index + 1;
			val.key = index + 1;
		});
		this.setState({
			dataSource: this.state.dataSource
		});
	};

	onCheck = (checkedKeys) => {
		let self = this;
		const cks = {
			checked: checkedKeys.checked || checkedKeys
		};
	};

	renderTreeTitle = (item) => {
		let titleIcon, titleInfo;
		//编辑时input框
		titleInfo = <span className="title-middle">{item.name}</span>;

		//编辑图标
		if (this.state.isHover == item.key && item.type == 'child') {
			titleIcon = (
				<Icon className="title-middle edit-icon" type="uf-add-c-o" onClick={(e) => this.editItem('add')} />
			);
		}
		return (
			<div className="title-con">
				{titleInfo}
				{titleIcon}
			</div>
		);
	};

	render() {
		// 加入外层的 className 和 style
		let {
			showStop,
			dataSource,
			stopFlag,
			activeKey,
			model,
			operType,
			totalNums,
			pageIndex,
			pageSize,
			formMeta
		} = this.state;
		let totalPage = Math.ceil(totalNums / pageSize);

		let { className = '', style = {}, approveType } = this.props;

		let approveTitle = approveType == 0 ? '企业' : '组织';

		// 外部传入className
		const wrapsClass = classnames('nc-approve-process-wrap', { className: true });

		const loop = (data) =>
			data.map((item) => {
				if (item.children) {
					return (
						<TreeNode className="u-process-tree" title={this.renderTreeTitle(item)} key={item.key}>
							{loop(item.children)}
						</TreeNode>
					);
				}
				return (
					<TreeNode
						className={classnames('u-process-tree-child', { 'tree-active': activeKey == item.key })}
						title={this.renderTreeTitle(item)}
						key={item.key}
						isLeaf={item.isLeaf}
					/>
				);
			});

		const treeNodes = loop(this.state.treeData);

		return (
			<section id="js_approve_process" className={wrapsClass} style={style}>
				<header className="approve-process-hearder cf">
					<h2 className="approve-process-title fl">审批流-{approveTitle}</h2>
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
							onSelect={this.onSelect}
							onCheck={this.onCheck}
							onExpand={this.onExpandTree}
							onMouseLeave={this.onMouseLeave}
							onMouseEnter={this.onMouseEnter}
						>
							{treeNodes}
						</Tree>
					</div>
					<div className="approve-process-table">
						<Table
							columns={this.columns}
							data={dataSource}
							emptyText={() => '请选择左侧树查询数据'}
							className="process-table"
						/>
						<div className="approve-process-pagination-group">
							<div className="approve-process-page">
								<Select
									value={pageSize && pageSize.toString()}
									style={{ width: '85px', marginRight: 10 }}
									onSelect={(val) => {
										this.pageSizeChange(val);
									}}
									className="fl"
								>
									<Option value={'10'}>10条/页</Option>
									<Option value={'20'}>20条/页</Option>
									<Option value={'50'}>50条/页</Option>
									<Option value={'100'}>100条/页</Option>
								</Select>
								<span className="fl"> 共 {totalNums} 条 </span>
							</div>
							<div className="process-table-pagination fr">
								<Pagination
									prev
									next
									size="sm"
									gap={true}
									items={totalPage}
									maxButtons={5}
									activePage={pageIndex}
									onSelect={this.pageIndexChange}
								/>
							</div>
						</div>
					</div>
				</section>
				<ModelForm
					showModal={!!model}
					type={operType}
					meta={formMeta}
					closeModel={this.closeModel}
					tableModelConfirm={this.tableModelConfirm.bind(this)}
				/>
			</section>
		);
	}
}
