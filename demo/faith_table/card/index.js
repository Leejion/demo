import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createPage } from '../../../src';
import { NCFormControl, NCButton } from '../../../src/base';
import { initTemplate, afterEvent, buttonClick } from './events';
import './index.less';
import { high } from '../../../src';
const { Refer } = high;
import { base } from '../../../src';
const NCTree = base.NCTree;

const ReferDemo = (props) => {
	return (
		<Refer
			{...props}
			refCode={'materiel'}
			queryGridUrl={'/newdemo-web/demo/matrial/matrialtree'}
			queryTreeUrl={'/newdemo-web/demo/matrialclass/matrialclasstree'}
		/>
	);

	// return <Refer url={`/demo-web/demo/${refCode}Ref/${refCode}page`} {...this.props} />;
};

class EditableTable extends Component {
	constructor(props) {
		super(props);
		this.status = 'edit';
		this.id = null;
		this.state = {
			currency: {}
		};
	}

	componentWillMount() {
		this.props.setPageStatus(this.status, this.id);
	}

	// componentWillReceiveProps(nextProps) {
	//     let newStatus = window.location.href.split('?')[1].split("=")[1].replace("#","");
	// 	if(newStatus != this.status){
	// 		this.props.setPageStatus(this.status, this.id);
	//      this.status = newStatus;
	// 	}
	// }

	hide = () => {
		//console.log(this.props.editTable)
		//this.props.editTable.hideColByKey("purchaseOrderCardTable", ['materiel', 'specification','model']);
		this.props.editTable.setEditableByKey('purchaseOrderCardTable', 0, 'huoquan', false);
	};

	addRow = () => {
		this.props.editTable.addRow('purchaseOrderCardTable', 0);
	};

	delRow = () => {
		this.props.editTable.delRow('purchaseOrderCardTable', 2);
	};

	setValue = () => {
		this.props.editTable.setValByKeyAndRowNumber('purchaseOrderCardTable', '2', 'specification', '3434', 'hgf');
	};

	getAllData = () => {
		let d = this.props.editTable.getAllRowsRemoveKeys('purchaseOrderCardTable', 'huoquan');
		console.log(d);
	};

	onSelectTree = (d) => {
		console.log(d);
	};

	componentDidMount() {
		setTimeout(() => {
			let cardTable = {
				pageinfo: {
					number: 0,
					size: 10,
					totalElements: 3,
					totalPages: 1
				},
				rows: [
					{
						rowId: 'eggf-34-v-343-43-4gg3g3',
						values: {
							id: { value: '1' },
							pk_org: { value: '0222333' },
							code: { value: '2018-2-10' },
							name: { value: 'ererereregfefef', display: '北京市海淀区第一仓库' },
							currtypesign: { value: '张三', edit: false },
							isdefault: { value: '用友网络' },
							currdigit: { value: '北京市用友产业园中区' },
							roundtype: { value: '200' },
							unitcurrdigit: { value: '23' },
							unitroundtype: { value: '四舍五入' },
							creationtime: { value: '2013-01-16' },
							modifier: { value: 's1' },
							modifiedtime: { value: '2018-03-07' }
						}
					},
					{
						rowId: 'e33456yy-34-v-343-43-4gg3g3',
						values: {
							id: { value: '2' },
							pk_org: { value: '0ff33' },
							code: { value: '2018-12-10' },
							name: { value: 'ererereregfefef', display: '北京市海淀区第一仓库' },
							currtypesign: { value: '张三', edit: false },
							isdefault: { value: '用友网络' },
							currdigit: { value: '北京市用友产业园中区' },
							roundtype: { value: '200' },
							unitcurrdigit: { value: '23' },
							unitroundtype: { value: '四舍五入' },
							creationtime: { value: '2013-01-16' },
							modifier: { value: 's1' },
							modifiedtime: { value: '2018-03-07' }
						}
					},
					{
						rowId: 'eeee34-v-343-43-4gg3g3',
						values: {
							id: { value: '3' },
							pk_org: { value: 'erter44443' },
							code: { value: '2018-2-10' },
							name: { value: 'ererereregfefef', display: '北京市海淀区第一仓库' },
							currtypesign: { value: '张三', edit: false },
							isdefault: { value: '用友网络' },
							currdigit: { value: '北京市用友产业园中区' },
							roundtype: { value: '200' },
							unitcurrdigit: { value: '23' },
							unitroundtype: { value: '四舍五入' },
							creationtime: { value: '2013-01-16' },
							modifier: { value: 's1' },
							modifiedtime: { value: '2018-03-07' }
						}
					}
				]
			};
			this.props.editTable.setTableData('currency', cardTable);
			this.props.editTable.edit('currency');
		}, 500);
	}

	render() {
		let treeData = [
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
		];

		const { editTable, form, button } = this.props;
		// const { createForm } = form;
		const { createEditTable } = editTable;
		// const { createButton } = button;

		return (
			<div className="purchaseOrder-card-wrapper">
				<button onClick={this.hide}>隐藏列</button>
				<button onClick={this.addRow}>新增行</button>
				<button onClick={this.delRow}>删除行</button>
				<button onClick={this.setValue}>修改序号为3的值</button>
				<button onClick={this.getAllData}>获取表格所有数据</button>
				<ReferDemo
					value={this.state.currency}
					onChange={(value) => {
						this.setState({
							currency: value
						});
					}}
					placeholder="单选表"
					refType="grid"
				/>
				<NCTree data={treeData} showLine={true} onSelect={this.onSelectTree} />

				<div className="purchaseOrder-card-editTable">
					{createEditTable('purchaseOrderCardTable', {
						onAfterEvent: afterEvent
					})}
				</div>
			</div>
		);
	}
}

export default createPage({
	//模板
	initTemplate: initTemplate,
	// 编辑后事件
	onAfterEvent: afterEvent,
	// 按钮点击事件
	onButtonClick: buttonClick
})(EditableTable);
