import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import { createPage, ajax, base,high } from 'nc-lightapp-front';
// const { NCButton, NCFromControl } = base;
import { createPage, ajax } from '../../../src';
import { NCFormControl, NCButton, NCModal } from '../../../src/base';
import { initTemplate, afterEvent, buttonClick } from './events';
import { high } from '../../../src';
const { Refer } = high;
import './index.less';
import $ from 'n-zepto';

class OrderCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			materiels: []
		};
	}

	componentDidMount() {
		
		// this.togglePageShow();
		let cardTable = {
			pageinfo: {
				number: 0,
				size: 10,
				totalElements: 3,
				totalPages: 1
			},
			rows: [
				{
					rowId: 0,
					values: {
						sysid: { value: '1', display: null, scale: -1 },
						pk_material: { value: '4354', display: '1111', scale: -1 },
						// specification: { value: '1-1-1', display: '46565676', scale: -1 },
						// model: { value: '3465', display: '北京市海淀区第一仓库', scale: -1 },
						pk_batchcode: { value: '121323', display: '张三', scale: -1 },
						pk_ownorg: { value: '435', display: '用友网络', scale: -1 },
						pk_useorg: { value: '2354', display: '北京市用友产业园中区', scale: -1 },
						nshouldassistnum: { value: '100', display: null, scale: -1 },
						nassistnum: { value: '23', display: null, scale: -1 },
						pk_astunit: { value: '0', display: '箱', scale: -1 }
					}
				}
			]
		};
		// ajax({
		// 	url:'/nccdemo/query.do',
		// 	data: cardTable,
		// 	success: function (data) {
		// 		console.log(data)
		// 	},
		// 	error: function (data) {
		// 		console.log(data)
		// 	}
		// })
		setTimeout(() => {
			// if(this.getStatus()!=='add'){
			//设置表单默认数据

			//this.props.form.setAllFormValue(formDataObj);

			//设置表格数据
			let cardTable = {
				pageinfo: {
					number: 0,
					size: 10,
					totalElements: 3,
					totalPages: 1
				},
				rows: [
					{
						rowId: 0,
						values: {
							sysid: { value: '1', display: null, scale: -1 },
							pk_material: { value: '4354', display: '1111', scale: -1 },
							// specification: { value: '1-1-1', display: '46565676', scale: -1 },
							// model: { value: '3465', display: '北京市海淀区第一仓库', scale: -1 },
							pk_batchcode: { value: '121323', display: '张三', scale: -1 },
							pk_ownorg: { value: '435', display: '用友网络', scale: -1 },
							pk_useorg: { value: '2354', display: '北京市用友产业园中区', scale: -1 },
							nshouldassistnum: { value: '100', display: null, scale: -1 },
							nassistnum: { value: '23', display: null, scale: -1 },
							pk_astunit: { value: '0', display: '箱', scale: -1 }
						}
					}
				]
			};
			//this.props.editTable.setTableData('purchaseOrderCardTable', cardTable);
			//}
		}, 100);

		// window.onbeforeunload = ()=> {
		// 	this.props.modal.show("leave");
		// 	//return false;
		// }
	}

	// componentWillUnmount() {
	// 	alert("关闭页面")
	// 	this.props.modal.show("leave");
	// }
	

	//根据页面状态，修改编辑态表格
	togglePageShow = () => {
		this.props.form.setFormStatus('purchaseOrderCardForm1', this.getStatus());
		this.props.form.setFormStatus('purchaseOrderCardForm2', this.getStatus());
		this.props.form.setFormStatus('purchaseOrderCardForm3', this.getStatus());
		if (this.getStatus() != 'browse') {
			//表格改为编辑态
			this.props.editTable.edit('purchaseOrderCardTable');
			//显示操作列
			this.props.editTable.showColByKey('purchaseOrderCardTable', 'opr');
		} else {
			//表格改为浏览态
			this.props.editTable.setStatus('purchaseOrderCardTable', 'browse');
			//隐藏操作列
			this.props.editTable.hideColByKey('purchaseOrderCardTable', 'opr');
		}
	};

	//获取url的status
	getStatus = () => {
		return window.location.href.split('?')[1].split('&')[0].split('=')[1];
	};

	//获取指定url参数
	getPageParam = (id) => {
		let param = window.location.href.split('&');
		param.shift();
		let result;
		param.find((item) => {
			if (item.indexOf(id) != -1) {
				result = item.split('=')[1];
			}
		});
		return result;
	};

	//物料参照弹窗
	addTableRows = () => {
		// this.setState({
		//     materiels:value
		// })
		// const ll =  this.props.editTable.getAllRows("purchaseOrderCardTable").length;;
		// if(value && value.length){
		//     for(let i=0;i<value.length;i++){
		//         //根据选择的参照，新增表格行
		//         //let data = [{pk_material}]
		//         console.log(value[i])
		//         this.props.editTable.addRow("purchaseOrderCardTable");
		//         //this.props.editTable.addRowValue("purchaseOrderCardTable",data)
		//         //新增完以后设置字段的默认值
		//         //this.props.editTable.setValByKey('purchaseOrderCardTable', ll+i, 'pk_material', value[i].refpk,value[i].refname);
		//         //设置表格某个字段的编辑性
		//     }
		// }
		this.props.editTable.addRow('purchaseOrderCardTable');

		/* 所有组织:
                非空；
                自制，默认为库存组织，可编辑，参照范围受库存组织+仓库的代储组织限制；
                根据来源单据带入，不可编辑；
        */
		//this.props.editTable.setValByKey('purchaseOrderCardTable', index, 'useorgan', value);
	};

	//表格列求和
	addTableCol = (key) => {
		let data = this.props.editTable.getColValue('purchaseOrderCardTable', key);
		if (data) {
			data = data.value;

			if (data && data.length > 0) {
				let sum = 0;
				data.forEach(function(val, idx, arr) {
					if (val) {
						if (val.trim() !== '-') {
							sum += +val;
						}
					}
				}, 0);
				return sum;
			}
		}
		return 0;
	};

	render() {
		const { editTable, form, button, modal } = this.props;
		const { createForm } = form;
		const { createEditTable } = editTable;
		const { createButton } = button;
		const { createModal, show } = modal;

		return (
			<div className="purchaseOrder-card-wrapper">
				<div className="purchaseOrder-card-header">
					<h2>采购入库单</h2>
					{this.getStatus() === 'browse' ? (
						<span>
							{createButton('editButton', {
								name: '修改',
								className: 'card-btn card-edit',
								onButtonClick: buttonClick.bind(this)
							})}
							{createButton('copyButton', {
								name: '复制',
								className: 'card-btn',
								onButtonClick: buttonClick.bind(this)
							})}
							{createButton('deleteButton', {
								name: '删除',
								className: 'card-btn',
								onButtonClick: buttonClick.bind(this)
							})}
						</span>
					) : (
						<span>
							{createButton('saveButton', {
								name: '保存',
								className: 'card-btn card-add',
								onButtonClick: buttonClick.bind(this)
							})}
							{createButton('cancelButton', {
								name: '取消',
								className: 'card-btn',
								onButtonClick: buttonClick.bind(this)
							})}
						</span>
					)}
					{createButton('backButton', {
						name: '返回',
						className: 'card-btn',
						onButtonClick: buttonClick.bind(this)
					})}
				</div>
				<div className="purchaseOrder-card-form">
					{createForm('purchaseOrderCardForm3', {
						onAfterEvent: afterEvent
					})}
				</div>
				<div className="purchaseOrder-card-editTable">
					<div className="editTable-title">
						<div className="title-info">
							<h3>物料列表</h3>
							<NCButton className="table-btn table-add" onClick={this.addTableRows}>
								新增
							</NCButton>
							{/* <MaterielRefer
								value={this.state.materiels}
								onChange={(value) => {
									this.addTableRows(value);
								}}
								placeholder="多选树表"
								refType="gridTree"
								isMultiSelectedEnabled={true}
								clickContainer={<NCButton className="table-btn table-add">新增</NCButton>}
							/>

							{createButton('getNumButton', {
								name: '自动取数',
								className: 'table-btn table-getNum',
								onButtonClick: buttonClick.bind(this)
							})} */}
						</div>
						<div className="sum-info">
							{/* <span>应收数量合计：{this.addTableCol('nshouldassistnum')}</span>
							<span>
								实收数量合计：<span style={{ color: '#F6720F' }}>{this.addTableCol('nassistnum')}</span>
							</span> */}
						</div>
					</div>
					{createEditTable('purchaseOrderCardTable', {
						onAfterEvent: afterEvent
					})}
				</div>

				{createModal('purchase-card-delete', { 
					title:'注意', 
					content:'确定要删除吗?', 
					beSureBtnClick: ()=>{
						alert('删除成功！')
					}
				})}

				{createModal('leave', {
					title: '注意',
					content: '确定要离开吗?',
					beSureBtnClick: () => {
						alert('正在离开！')
					}
				})}
			</div>
		);
	}
}

class MaterielRefer extends Component {
	render() {
		return (
			<Refer
				{...this.props}
				refCode={'materiel'}
				queryGridUrl={'/newdemo-web/demo/matrial/matrialtree'}
				queryTreeUrl={'/newdemo-web/demo/matrialclass/matrialclasstree'}
			/>
		);
	}
}

export default createPage({
	//模板
	initTemplate: initTemplate
	// 编辑后事件
	//onAfterEvent: afterEvent,
	// 按钮点击事件
	//onButtonClick: buttonClick,
})(OrderCard);
