/**
 * Table组件的封装
 * yanggqm
 * 2018/01/10
 * 备注：
 * 		1、表格分为三类( 展示类简单表格  编辑性表格)
 * 		   createSimpleTable    展示类简单表格
 * 		   createEditableTable  编辑性表格
 */

// 引入react以及所需的NC组件
import React, { Component } from 'react';
import Table from '../../base/nc_Table';
import Pagination from '../../base/nc_Pagination';
import Select from '../../base/nc_Select';
import Checkbox from '../../base/nc_Checkbox';
// ModelForm组件
import ModelForm from './modelForm';
// 表格无数据的展示
import NoData from './noData';
// 工具函数
import clone from '../../public/deepClone';
import { isObj, isWrong, isDisplay, undefinedOrTrue, undefinedOrfalse, formatAcuracy } from '../../public';
import { checkHasIndex, scaleFormat } from './util';
import CONFIG from '../../public/config';

const Option = Select.NCOption;

import './index.less';

// 最大页码数
const MAX_BUTTONS = 5;

function onCheckboxChange(moduleId, text, record, index) {
	// console.log(moduleId, text, record, index)
	this.state.table[moduleId].rows[index].selected = !this.state.table[moduleId].rows[index].selected;
	let len = this.state.table[moduleId].rows.length;
	// 如果有一个备选 哪个开关为开，同时看是否全选，
	while (len--) {
		if (!!this.state.table[moduleId].rows[len].selected) {
			this.state.table[moduleId].indeterminate = true;
			break;
		} else {
			this.state.table[moduleId].indeterminate = false;
		}
	}
	this.state.table[moduleId].checkedAll = this.state.table[moduleId].rows.every(item => !!item.selected)

	this.setState({
		table: this.state.table
	})
}

function onAllCheckChange(moduleId, checked) {
	// console.log(this.state.table[moduleId], moduleId, checked)
	this.state.table[moduleId].checkedAll = !this.state.table[moduleId].checkedAll
	if (!this.state.table[moduleId].checkedAll) {
		this.state.table[moduleId].indeterminate = false
	}
	let len = this.state.table[moduleId].rows.length;
	for (let i = 0; i < len; i++) {
		this.state.table[moduleId].rows[i].selected = checked
	}
	this.setState({
		table: this.state.table
	})
}

export function createSimpleTable(moduleId, config) {
	// 获取table的meta信息 注意异步时候 meta中没有此id 为undefined
	var meta = this.state.meta[moduleId],
		{ renderItem } = this.state,
		columns;

	if (!meta) return;

	if (!this.state.table.hasOwnProperty(moduleId)) {
		// 做一步缓冲 保证moduleId写入table，并保证格式一致性
		this.state.table[moduleId] = {
			pageInfo: {},
			rows: [],
			model: null,
			origin: null,
			operType: null,
			checkedAll: false,
		};
	}
	// 如果moduletype 不是table 那么 提示并退出
	if (meta.moduletype !== 'table') {
		// TODO 警告提示
		alert(`此${moduleId}和所对应的类型不匹配`);
		return false;
	}

	// 序号开关 默认始终显示序号
	if (meta.showindex && !checkHasIndex(meta.items)) {
		meta.items.unshift({
			label: '序号',
			attrcode: 'numberindex',
			className: 'table-index',
			visible: true,
			itemtype: 'customer',
			width: '50px'
		});
	}

	let originColumns = clone(meta.items)
	const shouldFormatNumber = [];
	columns = meta.items.filter(item => item.visible == true).map((item) => {
		let renderType = CONFIG.displayTypes.includes(item.itemtype) ? '.display' : '.value';
		if (item.itemtype == 'number') {
			shouldFormatNumber.push(item.attrcode);
		}
		return { ...item, title: item.label, key: item.attrcode, dataIndex: item.attrcode + renderType };
	});

	let { pageInfo = {}, rows = [], model = false, origin = null, operType = 'add', rowIndex = null, checkedAll = false, indeterminate = false } = this.state.table[moduleId];
	let tableModeldata = this.state.tableModeldata[moduleId] || {};
	let { pageSize = 10, total = 0, pageIndex = 0, totalPage = 1 } = pageInfo;
	let showPagination = !!(meta.pagination)

	let dataRows = rows.map((item, index) => {

		let values = item.values,
			obj = {};

		obj.numberindex = {
			display: null,
			scale: 0,
			value: index + 1
		};

		// TODO 根据id来赋值key  obj.key = index.toString();
		obj.key = item.rowId || String(new Date().getTime()).slice(-5) + Math.random().toString(12);

		for (let key in values) {
			obj[key] = shouldFormatNumber.includes(key) ? scaleFormat(values[key]) : values[key];
		}
		return obj;
	});
	// console.log(origin)
	let modelColumn = originColumns.map(item => {
		return { ...item, key: item.attrcode }
	})

	let formMeta = {
		modelColumn,
		record: origin,
		index: rowIndex,
		rowId: origin ? origin.key : String(new Date().getTime()).slice(-5) + Math.random().toString(12)
	}
	// console.log(indeterminate, checkedAll)
	let defaultColumns = [
		{
			title: (
				<Checkbox
					className="table-checkbox"
					checked={checkedAll}
					indeterminate={indeterminate && !checkedAll}
					onChange={onAllCheckChange.bind(this, moduleId)}
				/>
			),
			key: "checkbox",
			dataIndex: "checkbox",
			className: 'table-checkbox-class',
			visible: true,
			itemtype: 'customer',
			width: "50px",
			render: (text, record, index) => {
				return (
					<Checkbox
						className="table-checkbox"
						checked={!!rows[index].selected}
						onChange={() => {
							onCheckboxChange.call(this, moduleId, text, record, index)
						}}
					/>
				);
			}
		}
	];

	columns = defaultColumns.concat(columns);

	// // console.log(formMeta , renderItem)
	return (
		<div className="lightapp-component-simpleTable">

			<div className="simpleTable-component-wrapper">
				<Table
					columns={columns}
					data={dataRows}
					emptyText={NoData} />
			</div>
			{showPagination && (
				<div className="simpleTable-component-paginationDiv">
					<div className="page-size">
						<Select
							value={String(pageSize)}
							style={{ width: 85, marginRight: 10 }}
							onSelect={(val) => {
								this.state.table[moduleId].pageInfo.pageSize = +val;
								this.state.table[moduleId].pageInfo.pageIndex = 1;
								if (config && config.handlePageInfoChange) {
									config.handlePageInfoChange({ ...this.props, ...this.output }, config);
								}
							}}
							className="fl">
							<Option value={'10'}>10条/页</Option>
							<Option value={'20'}>20条/页</Option>
							<Option value={'50'}>50条/页</Option>
							<Option value={'100'}>100条/页</Option>
						</Select>
						{!!(+total) && <span className="fl"> 共 {total} 条 </span>}
					</div>
					<div className="table-pagination">
						<Pagination
							prev
							next
							boundaryLinks
							items={+totalPage}
							maxButtons={MAX_BUTTONS}
							activePage={+pageIndex + 1}
							onSelect={(val) => {
								this.state.table[moduleId].pageInfo.pageIndex = val;
								if (config && config.handlePageInfoChange) {
									config.handlePageInfoChange({ ...this.props, ...this.output }, config);
								}
							}}
						/>
					</div>
				</div>
			)}
			<ModelForm
				showModal={!!model}
				type={operType}
				output={this.output}
				renderItem={renderItem.table && renderItem.table[moduleId]}
				modelDatas={formMeta}
				tableModeldata={tableModeldata}
				moduleId={moduleId}
				afterEvent={(config && config.onAfterEvent && typeof config.onAfterEvent == 'function') ? config.onAfterEvent.bind(this, { ...this.output }) : function () { }}
				closeModel={this.table.closeModel}
				tableModelConfirm={config && config.tableModelConfirm && typeof config.tableModelConfirm == 'function' ? config.tableModelConfirm.bind(this, { ...this.output }) : function () { }}
			/>
		</div>
	);
}
