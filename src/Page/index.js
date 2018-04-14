import React, { Component } from 'react';
import Uitls from './Form/utils';
import deepClone from '../public/deepClone';
import '../public/toFixed';
import{
	createTZDatepicker, setTimeZone
} from './timeZoneDatepicker';
import {
	createForm,
	createItem,
	getAllFormValue,
	setAllFormValue,
	getFormItemsValue,
	setFormItemsValue,
	getFormItemsDisabled,
	setFormItemsDisabled,
	setFormItemsRequired,
	getFormItemsRequired,
	setFormItemsVerify,
	getFormItemsVerify,
	EmptyAllFormValue,
	isCheckNow,
	formShow,
	formHide,
	cancel,
	setFormStatus,
	getFormStatus,
	checkRequired,
	getCacheDataById
} from './Form';
import { createButton, setButtonDisabled, getButtonDisabled, setButtonVisible, setButtonsVisible } from './Button';
import moment from 'moment';
import { createAnchorNav, addListenerScroll, removeListenerScroll } from './AnchorNav';
import {
	createSimpleTable,
	getTablePageInfo,
	setAllTableData,
	setTableRender,
	openModel,
	closeModel,
	getAllTableData,
	setTableValueByKeyAndRecord,
	hideColByKey,
	showColByKey,
	getCheckedRows,
	selectAllRows,
	reverseSelected,
	deleteTableRowsByRowId,
	deleteTableRowsByIndex,
	addTableRow,
	setTableValueBykey,
	setTableValueRequired,
	setTableValueDisabled
} from './Table';
import {
	createEditTable,
	setTableData,
	getCurrentStatus,
	getAllRows,
	setStatus,
	addRow,
	delRow,
	getChangedRows,
	edit,
	cancelEdit,
	save,
	getAllData,
	pasteRow,
	setValByKey,
	getColValue,
	addRowValue,
	setColValue,
	setEditableByKey,
	hideEditTableColByKey,
	showEditTableColByKey,
	setValByKeyAndRowNumber,
	getAllRowsRemoveKeys,
	getNumberOfRows,
	setColValueByData,
	getEditTableCacheDataById,
	filterEmptyRows,
	getTableCheckedRows,
	selectAllTableRows,
	reverseTableSelected,
	deleteRowsByRowId,
	deleteRowsByIndex,
} from './EditTable';

import {
	createTreeTable,
	addHandler,
	editHandler,
	modelConfirm,
	disableHandler,
	enableHandler,
	setTreeNodeValue,
	getTreeNodeValue,
	findTreeNodeById,
	isTreePropertyEqual,
	setModalInitValue,
	openTreeTableModel,
	editTreeNode,
	addTreeNode,
	getHoverNodeId,
	initTreeValue,
	setChildrenByParentId,
	setSelectedNodeById,
	addRootTreeNode,
	findParentById
} from './TreeTable';

import { NCCreateSearch, setSearchValue, setSearchValByField, getAllSearchData } from './CreateSearch';
import { createSimpleSearch, setSimpleSearchValue, getSimpleSearchValue, getAllSearchValue } from './SimpleSearch';
import { createFuzzySearch, getFuzzySearchValue } from './FuzzySearch';
import {
	createInsertTable,
	getInsertTableValue,
	setInsertTableValue,
	setChildTableData,
	getInsertTableSelectedValue
} from './InsertTable';
import Qs from 'qs';
import { createAsyncTree, setTreeData, addTreeData, getAsyncTreeValue, delTreeData, editTreeData , setAsyncNodeDisable} from './AsyncTree';
import { createSyncTree, setSyncTreeData, editNodeSuccess, addNodeSuccess, delNodeSuceess, getSyncTreeValue, setNodeDisable , setTreeEdit} from './SyncTree';
import { createModal, show } from './CreateModal';
import approveDetail from './ApproveDetailCom';
import { TreeTableManyCol, initTreeTableData } from './TreeTableManyCol'
import Uploader from './TmcUploader'


export default ({
	moduleId,
	status = 'browse',
	onAfterEvent,
	onButtonClick,
	searchButtonClick,
	initTemplate
}) => (App) => {
	class Page extends Component {
		constructor(props) {
			super(props);
			this.state = {
				status,
				meta: {},
				form: {},
				formBack: {},
				button: {},
				table: {},
				treeTable: {},
				anchorNav: {},
				insertTable: {}, //嵌套类型表格
				simpleSearch: {},
				renderItem: {},
				treeData: {},
				modal: {},
				tableModeldata: {},
				treeTableCol: {},
				referItems:{},
			};
			this.onAfterEvent = onAfterEvent;
			this.onButtonClick = onButtonClick;
			//简单查询组件查询事件
			this.searchButtonClick = searchButtonClick;

			//以下是提供给业务组的方法
			this.meta = {
				getMeta: () => {
					return this.state.meta;
				},
				setMeta: (meta) => {
					this.setState({
						meta
					});
					
				}
			};

		

			this.refer = {
				getMeta: () => {
					return this.state.referItems;
				},
				setMeta: (referItems) => {
					this.setState({
						referItems
					});
				}
			};

			this.editTableInitValue = {};
			this.formOldValues = {};
			this.copyMetaBeforePkorg = {};
			this.zoneTime ={
				createTZDatepicker: createTZDatepicker.bind(this),
				setTimeZone: setTimeZone.bind(this),
			}
			this.form = {
				
				createForm: createForm.bind(this),
				createItem: createItem.bind(this),
				getAllFormValue: getAllFormValue.bind(this),
				setAllFormValue: setAllFormValue.bind(this),
				getFormItemsValue: getFormItemsValue.bind(this),
				setFormItemsValue: setFormItemsValue.bind(this),
				setFormItemsDisabled: setFormItemsDisabled.bind(this),
				getFormItemsDisabled: getFormItemsDisabled.bind(this),
				setFormItemsRequired: setFormItemsRequired.bind(this),
				getFormItemsRequired: getFormItemsRequired.bind(this),
				setFormItemsVerify: setFormItemsVerify.bind(this),
				getFormItemsVerify: getFormItemsVerify.bind(this),
				EmptyAllFormValue: EmptyAllFormValue.bind(this),
				isCheckNow: isCheckNow.bind(this),
				show: formShow.bind(this),
				hide: formHide.bind(this),
				setFormStatus: setFormStatus.bind(this),
				getFormStatus: getFormStatus.bind(this),
				cancel: cancel.bind(this),
				checkRequired: checkRequired.bind(this),
				getCacheDataById: getCacheDataById.bind(this)
			};
			this.editTable = {
				createEditTable: createEditTable.bind(this),
				setTableData: setTableData.bind(this),
				getCurrentStatus: getCurrentStatus.bind(this),
				addRow: addRow.bind(this),
				setStatus: setStatus.bind(this),
				getAllRows: getAllRows.bind(this),
				delRow: delRow.bind(this),
				getChangedRows: getChangedRows.bind(this),
				cancelEdit: cancelEdit.bind(this),
				edit: edit.bind(this),
				save: save.bind(this),
				pasteRow: pasteRow.bind(this),
				setValByKey: setValByKey.bind(this),
				getColValue: getColValue.bind(this),
				addRowValue: addRowValue.bind(this),
				setColValue: setColValue.bind(this),
				setEditableByKey: setEditableByKey.bind(this),
				hideColByKey: hideEditTableColByKey.bind(this),
				showColByKey: showEditTableColByKey.bind(this),
				setValByKeyAndRowNumber: setValByKeyAndRowNumber.bind(this),
				getAllRowsRemoveKeys: getAllRowsRemoveKeys.bind(this),
				getNumberOfRows: getNumberOfRows.bind(this),
				setColValueByData: setColValueByData.bind(this),
				getAllData: getAllData.bind(this),
				getCacheDataById: getEditTableCacheDataById.bind(this),
				filterEmptyRows: filterEmptyRows.bind(this),
				getCheckedRows: getTableCheckedRows.bind(this),
				selectAllRows: selectAllTableRows.bind(this),
				reverseSelected: reverseTableSelected.bind(this),
				deleteTableRowsByRowId: deleteRowsByRowId.bind(this),
				deleteTableRowsByIndex: deleteRowsByIndex.bind(this),
			};
			this.treeTable = {
				createTreeTable: createTreeTable.bind(this),
				addHandler: addHandler.bind(this),
				editHandler: editHandler.bind(this),
				modelConfirm: modelConfirm.bind(this),
				disableHandler: disableHandler.bind(this),
				enableHandler: enableHandler.bind(this),
				setTreeNodeValue: setTreeNodeValue.bind(this),
				getTreeNodeValue: getTreeNodeValue.bind(this),
				findTreeNodeById: findTreeNodeById.bind(this),
				isTreePropertyEqual: isTreePropertyEqual.bind(this),
				setModalInitValue: setModalInitValue.bind(this),
				openTreeTableModel: openTreeTableModel.bind(this),
				editTreeNode: editTreeNode.bind(this),
				addTreeNode: addTreeNode.bind(this),
				getHoverNodeId: getHoverNodeId.bind(this),
				initTreeValue: initTreeValue.bind(this),
				setChildrenByParentId: setChildrenByParentId.bind(this),
				setSelectedNodeById: setSelectedNodeById.bind(this),
				addRootTreeNode: addRootTreeNode.bind(this),
				findParentById: findParentById.bind(this)
			};

			this.button = {
				createButton: createButton.bind(this),
				setDisabled: setButtonDisabled.bind(this),
				getDisabled: getButtonDisabled.bind(this),
				setButtonVisible: setButtonVisible.bind(this),
				setButtonsVisible: setButtonsVisible.bind(this)
			};
			this.anchorNav = {
				createAnchorNav: createAnchorNav.bind(this),
				addListenerScroll: addListenerScroll.bind(this),
				removeListenerScroll: removeListenerScroll.bind(this)
			};
			this.table = {
				createSimpleTable: createSimpleTable.bind(this),
				getTablePageInfo: getTablePageInfo.bind(this),
				setAllTableData: setAllTableData.bind(this),
				openModel: openModel.bind(this),
				closeModel: closeModel.bind(this),
				setTableRender: setTableRender.bind(this),
				setTableValueByKeyAndRecord: setTableValueByKeyAndRecord.bind(this),
				hideColByKey: hideColByKey.bind(this),
				showColByKey: showColByKey.bind(this),
				getCheckedRows: getCheckedRows.bind(this),
				selectAllRows: selectAllRows.bind(this),
				reverseSelected: reverseSelected.bind(this),
				deleteTableRowsByRowId: deleteTableRowsByRowId.bind(this),
				deleteTableRowsByIndex: deleteTableRowsByIndex.bind(this),
				addRow: addTableRow.bind(this),
				setTableValueBykey: setTableValueBykey.bind(this),
				setTableValueRequired: setTableValueRequired.bind(this),
				setTableValueDisabled: setTableValueDisabled.bind(this)
			};

			// 上传下载
			this.Uploader = Uploader.bind(this);

			//简单搜索
			//内置新增，refer及其他条件查询
			this.simpleSearch = {
				createSimpleSearch: createSimpleSearch.bind(this),
				getSimpleSearchValue: getSimpleSearchValue.bind(this),
				getAllSearchValue: getAllSearchValue.bind(this)
			};

			//无新增按钮的简单搜索
			this.fuzzySearch = {
				createFuzzySearch: createFuzzySearch.bind(this),
				getFuzzySearchValue: getFuzzySearchValue.bind(this)
			};

			//查询区
			this.search = {
				NCCreateSearch: NCCreateSearch.bind(this),
				setSearchValue: setSearchValue.bind(this),
				setSearchValByField: setSearchValByField.bind(this),
				getAllSearchData: getAllSearchData.bind(this)
			};

			//嵌套类型表格
			this.insertTable = {
				createInsertTable: createInsertTable.bind(this), //创建嵌套类型表格
				getInsertTableValue: getInsertTableValue.bind(this), //获取表格数据
				setInsertTableValue: setInsertTableValue.bind(this), //更新表格数据
				setChildTableData: setChildTableData.bind(this), //更新表格数据
				getInsertTableSelectedValue: getInsertTableSelectedValue.bind(this) //获取表格勾选数据
			};

			//创建异步树组件
			this.asyncTree = {
				createAsyncTree: createAsyncTree.bind(this),
				setTreeData: setTreeData.bind(this),
                addTreeData: addTreeData.bind(this),
                getAsyncTreeValue: getAsyncTreeValue.bind(this),
                delTreeData: delTreeData.bind(this),
                editTreeData: editTreeData.bind(this),
                setAsyncNodeDisable: setAsyncNodeDisable.bind(this),
			};

			//创建同步树组件
			this.syncTree = {
				createSyncTree: createSyncTree.bind(this),
				setSyncTreeData: setSyncTreeData.bind(this),
				editNodeSuccess: editNodeSuccess.bind(this),
				addNodeSuccess: addNodeSuccess.bind(this),
				delNodeSuceess: delNodeSuceess.bind(this),
                getSyncTreeValue: getSyncTreeValue.bind(this),
                setNodeDisable: setNodeDisable.bind(this),
                setTreeEdit: setTreeEdit.bind(this),
			};

			// 审批流程图组件
			this.approveDetail = {
				create: approveDetail.bind(this)
			};

			//	树状表组件
			this.treeTableManyCol = {
				treeTableCol: TreeTableManyCol.bind(this),
				initTreeTableData: initTreeTableData.bind(this),
			};

			//简单提示框组件
			this.modal = {
				createModal: createModal.bind(this),
				show: show.bind(this)
			};


			this.getCreateRefer= (meta,props,moduleId)=>{
				return async function requireRefer(meta,props,moduleId) {
					let referNum = 0;
					let referItems = [];
					
					meta[moduleId].items.forEach((item, index) => {
						if (item.itemtype === 'refer') {
							referNum++;
							referItems.push(item);
						}
					})
					let referElems ={
						[moduleId]:{}
					};
					for (let i = 0; i < referNum; i++) {
						let elements = await importRefer(referItems[i], referElems,props,moduleId);
					}
				}

				function importRefer(item, referElems,props,moduleId) {
					 //let pathStr = './refer.js';
					 import(`${item.path}`).then((create) => {
						 create = create.default;
						 let element = create(item.refcode);
						 element.key = item.attrcode;
						 referElems[moduleId][item.attrcode]=element;
						 props.refer.setMeta(referElems);
					 });
				 }
			}

			// 用自定义组件替换表单组件
			this.renderItem = (moduletype, moduleId, id, newItem) => {
				let { renderItem } = this.state; // {}
				this.state.renderItem[moduletype] = this.state.renderItem[moduletype] || {};// {button:{}}
				this.state.renderItem[moduletype][moduleId] = this.state.renderItem[moduletype][moduleId] || {};
				this.state.renderItem[moduletype][moduleId][id] = newItem;
				this.setState({
					renderItem
				});
			};

			//得到页面所有数据
			this.getPageDataByMeta = () => {
				let metaObj = this.meta.getMeta();
				let saveData = {};
				for (let id in metaObj) {
					if (metaObj[id].moduletype && metaObj[id].moduletype === 'form') {
						saveData[id] = this.form.getAllFormValue(id);
					} else if (metaObj[id].moduletype && metaObj[id].moduletype === 'table') {
						saveData[id] = this.editTable.getAllRows(id);
					}
				}
				return saveData;
			}

			//创建主子表数据
			this.createMasterChildData = (pageid, head_code, body_code) => {
				let saveData = {
					pageid: pageid,
					head: {},
					body: {}
				};
				let metaObj = this.meta.getMeta();
				if (metaObj[head_code] && metaObj[head_code].moduletype && metaObj[head_code].moduletype === 'form') {
					saveData.head[head_code] = this.form.getAllFormValue(head_code);
					saveData.head[head_code].areacode = head_code;
				}
				if (metaObj[body_code] && metaObj[body_code].moduletype && metaObj[body_code].moduletype === 'table') {
					saveData.body[body_code] = this.editTable.getAllData(body_code);
					saveData.body[body_code].areacode = body_code;
				}
				return saveData;
			}

			//创建一主多子数据
			this.createExtCardData = (pageid, head_code, bodys_code) => {
				let saveData = {
					pageid: pageid,
					head: {},
					bodys: {}
				};
				let metaObj = this.meta.getMeta();
				for (let id in metaObj) {
					if (metaObj[id].moduletype && metaObj[id].moduletype === 'form') {
						saveData.head[head_code] = this.form.getAllFormValue(id);
						saveData.head[head_code].areacode = head_code;
					} else if (bodys_code && bodys_code instanceof Array && bodys_code.length > 0) {
						if (bodys_code.includes(id) && metaObj[id].moduletype && metaObj[id].moduletype === 'table') {
							saveData.bodys[id] = this.editTable.getAllData(id);
							saveData.bodys[id].areacode = id;
						}
					}
				}
				return saveData;
			}

			//跳转页面
			this.linkTo = (page, params) => {
				if (!page) return;
				let currentUrl = window.location.href;
				let hashVal = '';
				if (params && Object.keys(params).length) {
					let paramsArr = Object.keys(params);
					let len = paramsArr.length;
					for (let i = 0; i < len; i++) {
						let pop = paramsArr[i];
						if (i < len - 1) {
							hashVal += `${pop}=${params[pop]}&`
						} else {
							hashVal += `${pop}=${params[pop]}`
						}
					}
				}

				if (currentUrl.includes(page) && hashVal) {
					window.location.hash = hashVal;
				} else if ((!currentUrl.includes(page)) && hashVal) {
					window.location.href = page + '#' + hashVal;
				} else if (!hashVal) {
					window.location.href = page;
				}
			}

			//获取页面参数
			this.getUrlParam = (pop) => {
				if (!pop) return;
				let result;
				let params = window.location.hash.split('#');
				if (params) {
					params = params[1].split('&');
					params.find((item) => {
						if (item.indexOf(pop) != -1) {
							result = item.split('=')[1];
						}
					})
					return result;
				}
			}


			//得到单个表单的编辑后数据
			this.createFormAfterEventData = (pageid, form_code, moduleId, key, value) => {
				let formData = {
					pageid: pageid
				};
				let metaObj = this.meta.getMeta();
				if (metaObj && metaObj[form_code] && metaObj[form_code].moduletype && metaObj[form_code].moduletype === 'form') {
					formData[form_code] = this.form.getAllFormValue(form_code);
					formData[form_code].areacode = form_code;
				}
				return {
					attrcode: key,
					newvalue: value,
					oldvalue: this.formOldValues[moduleId] ? this.formOldValues[moduleId][key] : { value: null },
					form: formData
				}
			}

			//得到表头编辑后结构:一主一子 和 一主多子
			this.createHeadAfterEventData = (pageid, head_code, body_code, moduleId, key, value) => {
				let cardData = {};
				if (typeof body_code === 'string') {
					cardData = this.createMasterChildData(pageid, head_code, body_code);
				} else if (body_code instanceof Array) {
					cardData = this.createExtCardData(pageid, head_code, body_code)
				}
				return {
					attrcode: key,
					newvalue: value,
					oldvalue: this.formOldValues[moduleId] ? this.formOldValues[moduleId][key] : null,
					card: cardData
				}
			}




			//得到单个表格的编辑后数据
			this.createGridAfterEventData = (pageid, grid_code, moduleId, key, changedrows) => {
				let gridData = {
					pageid: pageid
				};
				let metaObj = this.meta.getMeta();
				if (metaObj && metaObj[grid_code] && metaObj[grid_code].moduletype && metaObj[grid_code].moduletype === 'table') {
					gridData[grid_code] = this.editTable.getAllData(grid_code);
					gridData[grid_code].areacode = grid_code;
				}
				return {
					attrcode: key,
					changedrows: changedrows,
					grid: gridData
				}
			}

			//得到表头编辑后结构:一主一子 和 一主多子
			// pageid, head_code, body_code 自己传入 
			// moduleId 为 moduleId
			// key 为 item.attrcode
			// rowid ? 
			// newvalue 
			this.createBodyAfterEventData = (pageid, head_code, body_code, moduleId, key, changedrows) => {
				let cardData = {};
				if (typeof body_code === 'string') {
					cardData = this.createMasterChildData(pageid, head_code, body_code);
				} else if (body_code instanceof Array) {
					cardData = this.createExtCardData(pageid, head_code, body_code)
				}
				return {
					attrcode: key,
					changedrows: changedrows,
					card: cardData
				}
			}

			//如单据有主组织，新增时,将meta其他字段设置为不可编辑
			this.initMetaByPkorg = () => {
				let metaObj = this.meta.getMeta();
				if (metaObj) {
					this.copyMetaBeforePkorg = deepClone(metaObj);
					for (let id in metaObj) {
						if (metaObj[id].items) {
							metaObj[id].items.map((item, index) => {
								if (item.attrcode && item.attrcode != 'pk_org') {
									item.disabled = true;
								}
								return item;
							})
						}
					}
				}
				this.meta.setMeta(metaObj);
			}

			//选择主组织以后，恢复模板，恢复其他字段的编辑性
			this.resMetaAfterPkorgEdit = () => {
				let meta = this.meta.getMeta();
				if (meta) {
					for (let id in meta) {
						if (meta[id]) {
							meta[id].items = meta[id].items.map((item, index) => {
								if (this.copyMetaBeforePkorg[id] && this.copyMetaBeforePkorg[id].items[index]) {
									if (this.copyMetaBeforePkorg[id].items[index].disabled) {
										item.disabled = this.copyMetaBeforePkorg[id].items[index].disabled;
									} else {
										item.disabled = false;
									}
								}
								return item;
							})
						}
					}
				}
				this.meta.setMeta(meta);
			}

			// 统一输出给业务组使用的api
			this.output = {
				editTable: this.editTable,
				treeTable: this.treeTable,
				form: this.form,
				table: this.table,
				button: this.button,
				setPageStatus: this.setPageStatus,
				getPageStatus: this.getPageStatus,
				meta: this.meta,
				refer: this.refer,
				simpleSearch: this.simpleSearch,
				fuzzySearch: this.fuzzySearch,
				search: this.search,
				insertTable: this.insertTable,
				anchorNav: this.anchorNav,
				asyncTree: this.asyncTree,
				syncTree: this.syncTree,
				modal: this.modal,
				renderItem: this.renderItem,
				getPageDataByMeta: this.getPageDataByMeta,
				createMasterChildData: this.createMasterChildData,
				changeUrl: this.changeUrl,
				createFormAfterEventData: this.createFormAfterEventData,
				createGridAfterEventData: this.createGridAfterEventData,
				createHeadAfterEventData: this.createHeadAfterEventData,
				createBodyAfterEventData: this.createBodyAfterEventData,
				createExtCardData: this.createExtCardData,
				linkTo: this.linkTo,
				getUrlParam: this.getUrlParam,
				approveDetail: this.approveDetail,
				treeTableManyCol: this.treeTableManyCol,
				initMetaByPkorg: this.initMetaByPkorg,
				resMetaAfterPkorgEdit: this.resMetaAfterPkorgEdit,
				Uploader: this.Uploader,
				zoneTime:this.zoneTime,
			};
		}

		componentWillMount() 
		{
			//关闭浏览器时给出提示
			// window.onbeforeunload = function () {
			// 	return '您真的要离开当前页面吗？';//提示内容和交互方式系统默认
			// }

			//select、datepicker、number、input、textarea
			//radio、checkbox、switch,label
			let that = this;
			let meta = {
				investForm: {
					moduleType: 'form',
					templet: null,
					items: [
						{
							key: 'investtype',
							label: '存款类型',
							itemType: 'select',
							disabled: false,
							visible: true,
							col: 6,
							rows: 3,
							leftOffset: 6,
							rightOffset: 6,
							scale: null,
							required: true,
							maxLength: null,
							unit: '%',
							ratio: '0.01',
							formatType: null,
							options: [
								{
									display: '活期',
									value: '0'
								},
								{
									display: '三个月',
									value: '1'
								},
								{
									display: '半年',
									value: '2'
								}
							]
						}
					]
				},
				investSearch: {
					moduleType: 'search',
					items: [
						{
							key: 'bankname',
							label: '银行',
							itemType: 'text',
							initialValue: null
						},
						{
							key: 'investtype',
							label: '存款类型',
							itemType: 'select',
							initialValue: null,
							options: [
								{
									display: '活期',
									value: 0
								},
								{
									display: '三个月',
									value: 1
								},
								{
									display: '一年',
									value: 2
								},
								{
									display: '三年',
									value: 3
								},
								{
									display: '五年',
									value: 4
								}
							]
						},
						{
							key: 'beginmny',
							label: '起始理财金额',
							itemType: 'text',
							initialValue: null
						},
						{
							key: 'endmny',
							label: '截止理财金额',
							itemType: 'text',
							initialValue: null
						},
						{
							key: 'begindate',
							label: '起始购买日期',
							itemType: 'date',
							initialValue: null
						},
						{
							key: 'enddate',
							label: '截止购买日期',
							itemType: 'date',
							initialValue: null
						}
					]
				},
				form3: {
					moduleType: 'form',
					items: [
						{
							label: '用户名',
							key: 'userName',
							config: {},
							initialValue: '张飞',
							required: true,
							col: 4,
							leftSpace: 0,
							rightSpace: 0,
							// "offset": 4,
							rows: 3,
							verify: true,
							reg: /^[0-9|,]*(\.\d{0,4})?$/i,
							itemType: 'input'
						},
						{
							label: '出生日期',
							key: 'birthday',
							config: {
								// disabled: true
							},
							col: 4,
							leftSpace: 0,
							rightSpace: 4,
							rows: 3,
							// "offset": 4,
							initialValue: moment().format('YYYY-MM-DD'),
							required: true,
							verify: true,
							type: 'datepicker',
							itemType: 'datepicker'
						},
						{
							label: '备注',
							key: 'note',
							config: {},
							initialValue: '',
							col: 4,
							leftSpace: 0,
							rightSpace: 8,
							rows: 3,
							cols: 160,
							rows: 2,
							// "offset": 4,
							required: true,
							verify: true,
							type: 'textarea',
							itemType: 'textarea'
						},
						{
							label: '参照',
							key: 'myrefer',
							config: {
								refcode: 'bank'
								// disabled: true
							},
							initialValue: '',
							cols: 50,
							rows: 6,
							required: true,
							initialValue: '',
							col: 4,
							leftSpace: 0,
							rightSpace: 8,
							rows: 3,
							required: true,
							verify: true,
							type: 'refer',
							itemType: 'refer'
						},
						{
							label: '总金额',
							key: 'allMoney',
							config: {
								// disabled: true
							},
							col: 4,
							leftSpace: 0,
							rightSpace: 8,
							rows: 3,
							initialValue: '',
							required: true,
							verify: true,
							type: 'number',
							itemType: 'number'
						},
						{
							key: 'interstrate',
							label: '年化收益率%',
							itemType: 'number',
							suffix: '%',
							col: 4,
							leftSpace: 0,
							rightSpace: 0,
							rows: 3,
							scale: 4,
							verify: true,
							required: true
						},
						{
							key: 'iinterstrate',
							label: '第一收益率%',
							itemType: 'label',
							suffix: '%',
							col: 4,
							leftSpace: 0,
							rightSpace: 0,
							rows: 3,
							initialValue: 0.00100003,
							scale: 4,
							verify: true,
							required: true
						},
						{
							key: 'investmny',
							label: '投资金额',
							itemType: 'number',
							col: 4,
							leftSpace: 0,
							rightSpace: 0,
							rows: 3,
							scale: 2,
							verify: true,
							required: true
						},
						{
							label: '水果',
							key: 'fruit',
							type: 'radio',
							required: true,
							verify: true,
							config: {
								// disabled: true
							},
							col: 4,
							leftSpace: 0,
							rightSpace: 0,
							rows: 3,
							initialValue: 'apple',
							itemType: 'radio',
							options: [
								{
									display: '苹果',
									value: 'apple'
								},
								{
									display: '橘子',
									value: 'orange'
								},
								{
									display: '梨',
									value: 'pear'
								},
								{
									display: '香蕉',
									value: 'banana'
								}
							]
						},
						{
							label: '蔬菜',
							key: 'vegetabless',
							itemType: 'select',
							required: true,
							verify: true,
							config: {
								// disabled: true
							},
							col: 4,
							leftSpace: 0,
							rightSpace: 0,
							rows: 3,
							initialValue: 'cucumber',
							options: [
								{
									display: '茄子',
									value: 'eggplant'
								},
								{
									display: '黄瓜',
									value: 'cucumber'
								},
								{
									display: '冬瓜',
									value: ' waxgourd'
								},
								{
									display: '白菜',
									value: 'chinesecabbage'
								}
							]
						},
						{
							label: '蔬菜',
							key: 'vegetables',
							itemType: 'checkbox',
							required: true,
							verify: true,
							config: {
								// disabled: true
							},
							col: 4,
							leftSpace: 0,
							rightSpace: 0,
							rows: 3,
							initialValue: 'eggplant',
							options: [
								{
									display: '茄子',
									value: 'eggplant'
								},
								{
									display: '黄瓜',
									value: 'cucumber'
								},
								{
									display: '冬瓜',
									value: ' waxgourd'
								},
								{
									display: '白菜',
									value: 'chinesecabbage'
								}
							]
						}
					]
				},
				form7: {
					moduleType: 'form',
					items: [
						{
							label: '选择仓库',
							key: 'chooseRepo',
							config: {
								refcode: 'bank'
								// disabled: true
							},

							initialValue: '',
							col: 3,
							leftSpace: 0,
							rightSpace: 0,
							rows: 3,
							required: true,
							itemType: 'refer'
						},
						{
							label: '选择库管员',
							key: 'chooseRepoM',
							config: {
								refcode: 'bank'
								// disabled: true
							},

							initialValue: '',
							col: 3,
							leftSpace: 0,
							rightSpace: 0,
							rows: 3,
							required: true,
							itemType: 'refer'
						}
					]
				},
				form6: {
					moduleType: 'form',
					items: [
						{
							label: '选择采购组织',
							key: 'chooseBuyerOrg',
							config: {
								refcode: 'bank'
								// disabled: true
							},

							initialValue: '',
							col: 3,
							leftSpace: 0,
							rightSpace: 0,
							rows: 3,
							required: true,
							itemType: 'refer'
						},
						{
							label: '选择采购员',
							key: 'chooseBuyer',
							config: {
								refcode: 'bank'
								// disabled: true
							},

							initialValue: '',
							col: 3,
							leftSpace: 0,
							rightSpace: 0,
							rows: 3,
							required: true,
							itemType: 'refer'
						},
						{
							label: '选择采购部门',
							key: 'chooseBuyerDepart',
							config: {
								refcode: 'bank'
								// disabled: true
							},

							initialValue: '',
							col: 3,
							leftSpace: 0,
							rightSpace: 0,
							rows: 3,
							required: true,
							itemType: 'refer'
						},
						{
							label: '选择供应商',
							key: 'chooseSupply',
							config: {
								refcode: 'bank'
								// disabled: true
							},

							initialValue: '',
							col: 3,
							leftSpace: 0,
							rightSpace: 0,
							rows: 3,
							required: true,
							itemType: 'refer'
						}
					]
				},
				form4: {
					moduleType: 'form',
					items: [
						{
							label: '邮箱',
							key: 'email',
							config: {
								// disabled: true
							},

							initialValue: 'email@yonyou.com',
							verify: true,
							required: true,
							itemType: 'input'
						},
						{
							label: '手机',
							key: 'teliphone',
							required: true,
							verify: true,
							config: {
								// disabled: true
							},
							initialValue: '11111000',
							itemType: 'input'
						}
					]
				},
				form5: {
					moduleType: 'form',
					required: true,
					items: [
						{
							key: 'name',
							label: '公司名称',
							itemType: 'input',
							initialValue: 'today',
							disabled: true,
							required: true,
							verify: true
						},
						{
							key: 'investDate',
							label: '投资日期',
							itemType: 'datepicker',
							initialValue: 'today',
							disabled: true,
							required: true,
							verify: true
						},
						{
							key: 'investInterval',
							label: '投资间隔',
							itemType: 'radio',
							initialValue: 'today',
							disabled: true,
							required: false,
							verify: true,
							options: [
								{
									display: '活期',
									value: '0'
								},
								{
									display: '三个月',
									value: '1'
								},
								{
									display: '半年',
									value: '2'
								}
							]
						}
					]
				}
			};

			// 初始化模板，调用业务组初始化模板的方法
			if (initTemplate && typeof initTemplate === 'function') {
				initTemplate({ ...this.props, ...this.output });
			}
		}

		// componentWillUnmount() {
		// 	alert("关闭页面")
		// 	//后面的代码不会执行到
		// }

		// 改变页面状态
		setPageStatus = (type, id) => {
			if (['edit', 'add', 'browse'].includes(type)) {
				//改变页面url
				let hash = window.location.hash.split('?'),
					query = Qs.parse(hash[1]);
				query = { ...query, type, id };
				hash[1] = Qs.stringify(query);
				window.location.hash = hash.join('?');

				// 改变页面状态
				this.setState(
					{
						status: type
					},
					() => {
						console.log(this.state.status);
					}
				);
			}
		};
		// 获取页面状态
		getPageStatus = () => {
			return this.state.status;
		};

		render() {
			return <App {...this.props} {...this.output} />;
		}
	}
	return Page;
};
