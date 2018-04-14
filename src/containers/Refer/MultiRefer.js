import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Table, Checkbox, Button } from 'tinper-bee';
import PropTypes from 'prop-types';
import {
	NCLoading as Loading,
	NCCollapse as Collapse,
	NCIcon as Icon,
	NCFormControl as FormControl,
	NCRow as Row,
	NCCol as Col,
	NCPagination as Pagination,
	NCSelect as Select
} from '../../base';
import ReferTree from './Tree';
import axios from 'axios';
import toast from '../../api/toast';

export default class Refer extends Component {
	constructor(props) {
		super(props);
		let selectedData;
		if (props.isMultiSelectedEnabled) {
			// 多选
			let o = {};
			props.value.forEach((e) => {
				o[e.refpk] = e;
			});
			selectedData = { ...o };
		} else {
			// 单选
			selectedData = props.value.refpk
				? {
						[props.value.refpk]: props.value
					}
				: {};
		}
		this.state = {
			referVal: '', // input的value
			searchVal: '', // 搜索框的value
			treeData: {
				children: {}
			}, // 左树的值
			tableData: {
				'': {
					rows: [ [] ],
					page: {
						pageIndex: 0,
						totalPage: 1,
						pageSize: 10
					}
				}
			}, // 右表的值
			searchData: {
				rows: [],
				page: {
					pageIndex: 0,
					totalPage: 1,
					pageSize: 10
				}
			},
			selectedData, // 已选择的数据
			show: false, // 模态框是否显示
			isFirstShow: true, // 模态框是否是第一次显示
			selectedShow: false, // 已选择是否显示
			selectedKeys: [], // 选择的树节点
			expandedKeys: [], // 展开的树节点
			dropDownShow: false, // 历史记录下拉和搜索下拉是否显示
			dropDownList: [], // 下拉列表的数据
			dropDownPage: {
				pageIndex: 0,
				totalPage: 1,
				pageSize: 10
			}, // 下拉列表分页信息
			loading: false,
			isSearch: false
		};
		this.left = 0;
		this.top = 0;
		this.treeParents = [];
		if (props.clickContainer) {
			this.clickContainer = {
				...props.clickContainer,
				props: {
					...props.clickContainer.props,
					onClick: this.onReferClick
				}
			};
			Object.defineProperty(this.clickContainer, 'props', {
				writable: false,
				configurable: false,
				value: this.clickContainer.props,
				enumerable: true
			});
		}
	}
	//点击界面其他地方关闭下拉
	componentDidMount() {
		document.addEventListener('click', this.closeDropDown);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.isMultiSelectedEnabled) {
			// 多选
			let o = {};
			nextProps.value.forEach((e) => {
				o[e.refpk] = e;
			});
			this.state.selectedData = { ...this.state.selectedData, ...o };
		} else {
			// 单选
			this.state.selectedData = {
				[nextProps.value.refpk]: nextProps.value
			};
		}
		this.setState({
			selectedData: this.state.selectedData
		});
	}

	componentWillUnmount() {
		document.removeEventListener('click', this.closeDropDown);
	}
	// 查表格数据的入口方法
	queryTableData = ({ keyword = '', pid = '', page }) => {
		let that = this;
		return new Promise((resolve, reject) => {
			that.setState({
				loading: true
			});
			axios({
				method: 'post',
				url: that.props.queryGridUrl,
				data: {
					keyword,
					pageInfo: page || this.state.tableData[pid].page,
					queryCondition: typeof that.props.queryCondition === 'function' && that.props.queryCondition(),
					pid
				}
			}).then(function(res) {
				that.setState({
					loading: false
				});
				res = res.data;
				if (res.success) {
					resolve(
						res.data || {
							rows: [],
							page: {
								pageIndex: 0,
								totalPage: 1,
								pageSize: 10
							}
						}
					);
				} else {
					toast({ color: 'danger', content: res.error.message });
					reject(res.error.message);
					return;
				}
			});
		});
	};
	// 查树数据的入口方法
	queryTreeData = ({ keyword = '', pid = '', parents = '' }) => {
		let that = this,
			{ refType } = this.props,
			{ searchData, isSearch } = this.state;
		return new Promise((resolve, reject) => {
			that.setState({
				loading: true
			});
			axios({
				method: 'post',
				url: that.props.queryTreeUrl,
				data: {
					pid,
					keyword,
					pageInfo: {
						...searchData.page,
						pageIndex: refType === 'tree' && !isSearch ? -1 : searchData.page.pageIndex
					},
					queryCondition: typeof that.props.queryCondition === 'function' && that.props.queryCondition()
				}
			}).then(function(res) {
				that.setState({
					loading: false
				});
				res = res.data;
				if (res.success) {
					if (keyword) {
						resolve(
							res.data || {
								children: {}
							}
						);
					} else {
						let o = {};
						that.state.treeData = that.state.treeData || {
							children: {}
						};
						parents = (parents ? parents + '=>' : parents) + (pid === 'root' ? '' : pid);
						res.data &&
							res.data.rows &&
							res.data.rows.forEach(function(e) {
								// 每一个节点存有一个_parents属性，用来表示改节点的所有上级路径
								e._parents = parents;
								e._display = that.props.treeConfig.code
									.map((item) => e[item] || e.values[item].value)
									.join(' ');
								o[e.refpk] = e;
							});
						if (parents) {
							parents.split('=>').reduce(function(total, curVal) {
								total.children[curVal] = total.children[curVal] || {};
								return total.children[curVal];
							}, that.state.treeData).children = o;
						} else {
							that.state.treeData.children = o;
						}
						that.setState(
							{
								treeData: that.state.treeData
							},
							() => {
								resolve(res.data);
							}
						);
					}
				} else {
					toast({ color: 'danger', content: res.error.message });
					reject(res.error.message);
					return;
				}
			});
		});
	};
	//收起下拉的方法
	closeDropDown = (e) => {
		if (this.state.dropDownShow === true) {
			let { target } = e,
				dropDownShow = false;
			while (target) {
				if (target && (target === this.refer || target === this.referContainer)) {
					dropDownShow = true;
					break;
				} else {
					target = target.parentNode;
				}
			}
			if (dropDownShow) {
				return;
			}
			this.onReferBlur(e);
			this.setState({
				dropDownShow: false
			});
		}
	};
	//左树的点击事件：左树右表时查右表数据, 树时选中节点
	onTreeNodeSelect = (selectedKeys, { selected, selectedNodes, node, event }) => {
		// console.log('点击树：', selectedKeys, { selected, selectedNodes, node, event });
		let that = this,
			pid = selectedKeys[0];
		const { refType, isCacheable } = this.props,
			{ tableData, selectedData } = this.state;
		if (refType === 'gridTree') {
			if (!selected) return;
			if (tableData[pid] && isCacheable) {
				tableData[pid].page.pageIndex = 0;
			} else {
				tableData[pid] = tableData[pid] || {
					rows: [ [] ],
					page: {
						pageIndex: 0,
						totalPage: 1,
						pageSize: 10
					}
				};
				tableData[pid].page.pageIndex = 0;
				this.queryTableData({ pid }).then((data) => {
					tableData[pid].rows[data.page.pageIndex] = data.rows;
					tableData[pid].page = data.page;
					that.setState({
						tableData
					});
				});
			}
			this.setState({
				selectedKeys,
				searchVal: '',
				isSearch: false
			});
		} else if (refType === 'tree') {
			if (selectedData[pid]) {
				delete selectedData[pid];
			} else {
				selectedData[pid] = node.props.treeNodeData;
			}
			this.setState({
				selectedData
			});
		}
	};
	//左树的勾选事件：树时
	onTreeNodeCheck = (checkedKeys, { checked, checkedNodes, node, event }) => {
		this.state.selectedData = {};
		checkedNodes.map((e, i) => {
			this.state.selectedData[e.props.treeNodeData.refpk] = e.props.treeNodeData;
		});
		this.setState({
			selectedData: this.state.selectedData
		});
	};
	// 左树的展开事件
	onTreeNodeExpand = (expandedKeys, { expanded, node }) => {
		let that = this,
			parents = node.props.treeNodeData._parents || '',
			{ refType, onTreeNodeExpand, isCacheable } = this.props; //所有父节点的refpk
		// console.log('节点展开：', expandedKeys[0], { expanded, node });
		this.setState({
			expandedKeys: expandedKeys
		});
		typeof onTreeNodeExpand === 'function' && onTreeNodeExpand(node);
		// 收缩或已经有子节点时
		if (expanded === false || (node.props.children.length && isCacheable)) {
			return;
		}
		this.queryTreeData({
			keyword: refType === 'tree' ? this.state.searchVal : '',
			pid: node.props.eventKey,
			parents
		});
	};
	// 获取已选择的数据
	getSelections = () => {
		return Object.values(this.state.selectedData);
	};
	// 全部页签中表格的点击事件
	onSelect = (row, index) => {
		let { isMultiSelectedEnabled } = this.props;
		if (isMultiSelectedEnabled) {
			if (this.state.selectedData[row.refpk]) {
				delete this.state.selectedData[row.refpk];
			} else {
				this.state.selectedData[row.refpk] = row;
			}
			if (index === -1) {
				this.btnOkClick();
			}
		} else {
			this.state.selectedData = {
				[row.refpk]: row
			};
			this.btnOkClick();
		}

		this.setState({
			selectedData: this.state.selectedData
		});
	};
	pushToHistory = (item) => {
		let { refCode, columnConfig, refType, hotDataSize } = this.props;
		let history = localStorage[refCode + columnConfig.length + refType]
			? localStorage[refCode + columnConfig.length + refType].split('&&&').map((e) => JSON.parse(e))
			: [];
		let index = history.findIndex((e) => e.refpk === item.refpk);
		if (index === -1) {
			history.unshift(item);
			if (history.length > hotDataSize) {
				history = history.slice(0, hotDataSize);
			}
		} else {
			let t = history.splice(index, 1);
			history.unshift(t[0]);
		}
		localStorage[refCode + columnConfig.length + refType] = history.map((e) => JSON.stringify(e)).join('&&&');
	};
	// 已选择页签中的删除事件
	onSelectedRowClick = (row, index) => {
		let { selectedData } = this.state;
		delete selectedData[row.refpk];
		this.setState({
			selectedData
		});
	};
	// 点击参照显示弹出框
	onReferClick = () => {
		let that = this,
			{ refType, isCacheable } = this.props,
			{ selectedData, tableData, isFirstShow } = this.state;
		//缓存旧数据，做取消用
		this._value = JSON.parse(JSON.stringify(selectedData));
		if (isFirstShow || !(isCacheable && tableData[''].rows[0])) {
			if (refType === 'grid') {
				// 查第一页表格数据
				tableData[''].page.pageIndex = 0;
				this.queryTableData({}).then((data) => {
					tableData[''].rows[data.page.pageIndex] = data.rows;
					tableData[''].page = data.page;
					that.setState({
						tableData
					});
				});
			} else {
				// 查第一级树数据
				this.queryTreeData({ pid: 'root' });
			}
		}
		this.setState({
			isFirstShow: false,
			dropDownShow: false,
			show: true
		});
	};
	// 弹出框中的搜索事件
	onSearch = () => {
		let that = this,
			{ searchData, searchVal, selectedKeys } = this.state;
		// 搜索
		this.state.expandedKeys = [];
		if (this.props.refType === 'tree') {
			this.state.treeData = {
				children: {}
			};
			if (this.state.isSearch !== !!searchVal) {
				searchData.page.pageIndex = 0;
				this.state.isSearch = !!searchVal;
			}
			this.queryTreeData({
				keyword: searchVal || '',
				pid: searchVal ? '' : 'root'
			}).then((data) => {
				searchVal &&
					that.setState({
						searchData: data
					});
			});
		} else {
			// 左树右表时：取消树节点的选中状态
			selectedKeys = [];
			searchData.page.pageIndex = 0;
			this.queryTableData({ keyword: searchVal, page: searchData.page }).then((data) => {
				that.setState({
					searchData: data,
					isSearch: !!that.state.searchVal,
					selectedKeys
				});
			});
		}
	};
	// 参照框的获取焦点事件
	onReferFocus = (val) => {
		let that = this,
			{ refType, refCode, columnConfig } = this.props,
			{ dropDownList } = this.state;
		if (val) {
			dropDownList = [];
			//将dropDownList的值设为搜索结果
			this.interval = new Date().getTime();
			let s = setTimeout(() => {
				//停止输入0.5s后执行
				if (new Date().getTime() - this.interval >= 500) {
					if (val) {
						if (refType === 'tree') {
							this.queryTreeData({ keyword: val, page: this.state.dropDownPage }).then(function(data) {
								that.setState({
									dropDownList: data.rows
								});
							});
						} else {
							this.queryTableData({ keyword: val, page: this.state.dropDownPage }).then(function(data) {
								that.setState({
									dropDownList: data.rows
								});
							});
						}
					} else {
						//显示历史记录
					}
				}
				clearTimeout(s);
			}, 500);
		} else {
			//将dropDownList的值设为历史记录
			if (localStorage[refCode + columnConfig.length]) {
				dropDownList = localStorage[refCode + columnConfig.length].split('&&&').map((e) => JSON.parse(e));
			}
			this.setState({
				loading: false
			});
		}
		this.setState({
			referVal: val,
			dropDownList,
			dropDownShow: true
		});
	};
	// 参照框失去焦点事件
	onReferBlur = (e) => {
		e.stopPropagation();
		let { dropDownList, dropDownShow, referVal } = this.state;
		// if (dropDownShow && referVal && dropDownList.length) {
		// 	//搜索结果有值
		// 	this.onSelect(this.state.dropDownList[0]);
		// }
		this.setState({
			referVal: ''
		});
		// console.log('失去焦点校验数据准确性');
	};
	// 模态框的确定事件
	btnOkClick = () => {
		let selections = this.getSelections(),
			{ onChange } = this.props,
			that = this;
		if (selections.length > 30) {
			alert('最多选择30条数据');
		} else {
			selections.forEach((e) => {
				that.pushToHistory(e);
			});
			this.setState(
				{
					referVal: '',
					show: false
				},
				() => {
					onChange && onChange(selections);
					delete this._value;
				}
			);
		}
	};
	//取消按钮事件
	cancel = (e) => {
		if (e.target === e.currentTarget) {
			let selections = Object.values(this._value);
			this.setState(
				{
					selectedData: this._value,
					referVal: '',
					show: false
				},
				() => {
					delete this._value;
				}
			);
		}
	};
	// 在参照输入框中删除
	delItem = (refpk) => {
		let { selectedData } = this.state;
		delete selectedData[refpk];
		this.setState({
			selectedData
		});
		this.btnOkClick();
	};
	// 计算参照输入框位置
	calcFixed = (dom, container = this.props.container) => {
		if (dom && dom !== container) {
			var pos = dom.getBoundingClientRect(),
				top = pos.top + container.scrollTop,
				left = pos.left + container.scrollLeft,
				referHeight = this.refer.offsetHeight,
				dropDownWidth = this.refer.offsetWidth * this.props.columnConfig.length;
			if (top + referHeight + 204 > document.body.clientHeight) {
				top = top - referHeight - 208;
			}
			if (left + dropDownWidth > document.body.clientWidth) {
				left = pos.right - dropDownWidth;
			}
			return {
				top,
				left
			};
		} else {
			return {
				top: 0,
				left: 0
			};
		}
	};
	// 表格部分的全选
	checkAll = (val) => {
		let { tableData, selectedData, selectedKeys } = this.state,
			pid = selectedKeys[0];
		if (val) {
			tableData[pid].rows[tableData[pid].page.pageIndex].forEach((e, i) => {
				selectedData[e.refpk] = e;
			});
		} else {
			tableData[pid].rows[tableData[pid].page.pageIndex].forEach((e, i) => {
				delete selectedData[e.refpk];
			});
		}
		this.setState({
			selectedData
		});
	};
	render() {
		let {
				referVal,
				searchVal,
				treeData,
				tableData,
				searchData,
				show,
				isFirstShow,
				selectedShow,
				selectedKeys,
				expandedKeys,
				dropDownShow,
				dropDownList,
				selectedData,
				loading,
				isSearch
			} = this.state,
			{
				className,
				referClassName,
				style,
				refType,
				columnConfig,
				treeConfig,
				placeholder,
				isMultiSelectedEnabled,
				refName,
				disabled,
				isCacheable,
				container
			} = this.props,
			pid = selectedKeys[0] || '',
			{ pageIndex, totalPage, pageSize } = isSearch ? searchData.page : tableData[pid].page,
			{ fixWidth, fixTop, fixLeft, suffix } = this;
		//全部页签中的列
		const columns = [
				{
					title: isMultiSelectedEnabled ? (
						<Checkbox
							onChange={this.checkAll}
							checked={
								Object.keys(selectedData).length &&
								tableData[pid].rows[pageIndex] &&
								tableData[pid].rows[pageIndex].every((e) => selectedData[e.refpk])
							}
						/>
					) : (
						''
					), // 全选效果
					key: '',
					width: 50,
					render: (text, row, index) => {
						return <Checkbox checked={!!selectedData[row.refpk]} />;
					}
				}
			],
			// 已选择页签中的列
			selectColumns = [
				{
					title: '操作',
					key: 'operate',
					width: 50,
					render: (text, row, index) => {
						return (
							<span className="refer-del" style={{ cursor: 'pointer' }} onClick={this.onSelectedRowClick}>
								删除
							</span>
						);
					}
				}
			];
		if (refType === 'tree') {
			treeConfig.name.forEach((e, i) => {
				var o = {
					title: e,
					key: treeConfig.code[i],
					render: (text, row, index) => {
						return (
							<div>
								{row[treeConfig.code[i]] ||
									(row.values &&
										row.values[treeConfig.code[i]] &&
										row.values[treeConfig.code[i]].value) ||
									''}
							</div>
						);
					}
				};
				columns.push(o);
				selectColumns.splice(i, 0, o);
			});
		} else {
			columnConfig[0].name.forEach((e, i) => {
				var o = {
					title: e,
					key: columnConfig[0].code[i],
					render: (text, row, index) => {
						return (
							<div>
								{row[columnConfig[0].code[i]] ||
									(row.values &&
										row.values[columnConfig[0].code[i]] &&
										row.values[columnConfig[0].code[i]].value) ||
									''}
							</div>
						);
					}
				};
				columns.push(o);
				selectColumns.splice(i, 0, o);
			});
		}
		return (
			<div
				className={`refer clearfix ${referClassName}`}
				style={style}
				ref={(dom) => {
					this.refer = ReactDOM.findDOMNode(dom);
				}}
			>
				<Loading container={this.popover} show={loading} />
				<Loading container={this.dropDown} show={loading} />
				{this.clickContainer ? (
					this.clickContainer
				) : (
					<Col xs={12}>
						<div
							className={`refer-area u-form-control ${className}`}
							ref={(dom) => {
								this.referArea = dom;
							}}
						>
							<ul>
								{(show ? Object.values(this._value) : this.getSelections()).map((e, i) => {
									return (
										<li key={i} className="selected-item">
											{e.refname}
											<i className="refer-del-i" onClick={this.delItem.bind(this, e.refpk)}>
												×
											</i>
										</li>
									);
								})}
								<li>
									<FormControl
										className="refer-input"
										value={referVal}
										onChange={(val, e) => {
											e.preventDefault();
											e.stopPropagation();
											this.onReferFocus(val);
										}}
										onFocus={(e) => {
											e.preventDefault();
											e.stopPropagation();
											this.onReferFocus(e.target.value);
										}}
										placeholder={
											(show ? Object.values(this._value) : this.getSelections()).length ? (
												''
											) : (
												placeholder
											)
										}
									/>
								</li>
							</ul>
						</div>
						<span
							className="icon-refer"
							style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
							onClick={(e) => {
								this.onReferClick();
							}}
						/>
					</Col>
				)}
				{ReactDOM.createPortal(
					<div className="refer-pop-window" style={{ display: show ? 'flex' : 'none' }} onClick={this.cancel}>
						<div
							className="refer-popover clearfix"
							ref={(dom) => {
								this.popover = dom;
							}}
						>
							{isFirstShow ? (
								''
							) : (
								[
									<div className="refer-header" key="1">
										<div className="refer-title">{refName}</div>
										<div className="buttons">
											{isMultiSelectedEnabled && (
												<Button
													style={{
														backgroundColor: '#E14C46',
														color: '#fff',
														marginLeft: '20px'
													}}
													onClick={this.btnOkClick}
												>
													选中确认
												</Button>
											)}
											{isMultiSelectedEnabled && (
												<Button
													style={{
														backgroundColor: '#eee',
														color: '#666',
														marginLeft: '10px'
													}}
													onClick={this.cancel}
												>
													取消
												</Button>
											)}
										</div>
										<div className="refer-search">
											<FormControl
												placeholder="搜索"
												value={searchVal}
												onChange={(val) => {
													this.setState({
														searchVal: val
													});
												}}
												onKeyPress={(e) => {
													let keyCode = e.which || e.keyCode || e.charCode,
														val = e.target.value;
													if (keyCode === 13) {
														this.onSearch();
													}
													this.setState({
														searchVal: val
													});
												}}
											/>
											<i className="refer-search-i" onClick={this.onSearch} />
										</div>
										<div className="refer-close" onClick={this.cancel} />
									</div>,
									<Row className="refer-content-area" key="2">
										{refType !== 'grid' && (
											<Col
												xs={refType === 'gridTree' ? 4 : isSearch ? 0 : 12}
												className="refer-tree"
											>
												<ReferTree
													checkStrictly={true}
													checkable={refType === 'tree'}
													data={Object.values(treeData.children)}
													onSelect={this.onTreeNodeSelect}
													onExpand={this.onTreeNodeExpand}
													onCheck={this.onTreeNodeCheck}
													checkedKeys={Object.keys(selectedData)}
													selectedKeys={selectedKeys}
													expandedKeys={expandedKeys}
													autoExpandParent={false}
												/>
											</Col>
										)}
										{(refType !== 'tree' || isSearch) && (
											<Col xs={refType === 'gridTree' ? 8 : 12}>
												<Table
													onRowClick={this.onSelect}
													rowKey="refpk"
													columns={columns}
													data={isSearch ? searchData.rows : tableData[pid].rows[pageIndex]}
													emptyText={() => '没有数据'}
												/>
											</Col>
										)}
									</Row>,
									<Row key="3">
										<div className="refer-footer">
											<Col xs={4}>
												{isMultiSelectedEnabled && (
													<div className="refer-selected">
														<Button
															onClick={() => {
																this.setState({
																	selectedShow: !this.state.selectedShow
																});
															}}
														>
															已选择{this.getSelections().length ? (
																'(' + this.getSelections().length + ')'
															) : (
																''
															)}
														</Button>
														<Collapse in={selectedShow} className="refer-collapse">
															<Table
																onRowClick={this.onSelectedRowClick}
																rowKey="refpk"
																scroll={{ x: true, y: '401px' }}
																columns={selectColumns}
																data={this.getSelections()}
																emptyText={() => '没有数据'}
															/>
														</Collapse>
													</div>
												)}
											</Col>
											<Col xs={8} className="clearfix">
												{(refType !== 'tree' || isSearch) && (
													<div className="refer-page">
														<Pagination
															prev
															next
															boundaryLinks
															items={Number(totalPage) || 1}
															maxButtons={5}
															gap={true}
															activePage={Number(pageIndex) + 1}
															onSelect={(val) => {
																//根据页码重新查数据
																let that = this;
																if (isSearch) {
																	searchData.page.pageIndex = val - 1;
																	this.onSearch();
																} else {
																	tableData[pid].page.pageIndex = val - 1;
																	if (tableData[pid].rows[val - 1] && isCacheable) {
																		this.setState({
																			tableData
																		});
																	} else {
																		this.queryTableData({
																			pid
																		}).then((data) => {
																			tableData[pid].rows[data.page.pageIndex] =
																				data.rows;
																			tableData[pid].page = data.page;
																			that.setState({
																				tableData
																			});
																		});
																	}
																}
															}}
														/>
													</div>
												)}
											</Col>
										</div>
									</Row>
								]
							)}
						</div>
					</div>,
					container
				)}
				{ReactDOM.createPortal(
					<div
						className="refer-container"
						ref={(dom) => {
							this.referContainer = dom;
						}}
					>
						<Collapse
							in={dropDownShow}
							style={{
								overflow: 'hidden',
								width: this.referArea ? this.referArea.offsetWidth : 0,
								top:
									this.calcFixed(this.referArea).top +
									(this.referArea ? this.referArea.offsetHeight : 0) +
									4,
								left: this.calcFixed(this.referArea).left
							}}
							ref={(dom) => {
								this.dropDown = ReactDOM.findDOMNode(dom);
							}}
						>
							<div className="refer-cascading-list refer-search">
								<div className="scroll-div">
									<p className="list-title">
										{(referVal ? '搜索结果（' : '历史记录（') +
											(refType === 'tree'
												? treeConfig.name.join('/')
												: columnConfig[columnConfig.length - 1].name.join('/')) +
											'）'}
									</p>
									<div className="refer-scroll" onScroll={this.ulScroll}>
										<ul className="refer-cascading-item" style={{ width: '100%' }}>
											{dropDownList.map((item, i) => {
												let label =
													refType === 'tree'
														? treeConfig.code
																.map((e, i) => {
																	return item[e] || item.values[e].value;
																})
																.join('/')
														: columnConfig[columnConfig.length - 1].code
																.map((e, i) => {
																	return item[e] || item.values[e].value;
																})
																.join('/');
												return (
													<li
														title={label}
														key={i}
														onClick={this.onSelect.bind(this, item, -1)}
														className={
															'clearfix refer-li' +
															(selectedData[item.refpk] ? ' selected' : '')
														}
													>
														{label}
													</li>
												);
											})}
										</ul>
									</div>
								</div>
							</div>
						</Collapse>
					</div>,
					container
				)}
			</div>
		);
	}
}

Refer.propTypes = {
	value: PropTypes.oneOfType([ PropTypes.object, PropTypes.func ]).isRequired,
	onChange: PropTypes.func.isRequired,
	refName: PropTypes.string,
	refCode: PropTypes.string,
	condition: PropTypes.object,
	returnField: PropTypes.string,
	refModelUrl: PropTypes.string,
	columnConfig: PropTypes.array,
	treeConfig: PropTypes.object,
	isTreeCanSelect: PropTypes.bool,
	hotDataSize: PropTypes.number,
	pageSize: PropTypes.number,
	disabled: PropTypes.bool,
	referClassName: PropTypes.string,
	className: PropTypes.string,
	style: PropTypes.object,
	clientParam: PropTypes.object,
	placeholder: PropTypes.string,
	showHistory: PropTypes.bool,
	queryGridUrl: PropTypes.string,
	queryTreeUrl: PropTypes.string,
	clickContainer: PropTypes.oneOfType([ PropTypes.object, PropTypes.func ]),
	queryCondition: PropTypes.func,
	isMultiSelectedEnabled: PropTypes.bool,
	onTreeNodeExpand: PropTypes.func,
	isCacheable: PropTypes.bool,
	container: PropTypes.object
};

Refer.defaultProps = {
	value: [],
	refName: '', //参照名称
	refCode: '', //参照编码
	refType: 'grid', //参照类型
	returnField: 'refname', //选中后显示在参照上的字段
	refModelUrl: '', //参照请求地址
	columnConfig: [
		{
			name: [ '编码', '名称' ],
			code: [ 'refcode', 'refname' ]
		}
	], //列信息配置
	treeConfig: {
		name: [ '名称' ],
		code: [ 'refname' ]
	}, //树信息配置
	isTreeCanSelect: false, //多级菜单的树是否可选
	hotDataSize: 20,
	pageSize: 20, //分页请求数据时每页条数
	disabled: false, //是否禁用
	referClassName: '', //参照最外层classname
	className: '', //参照input的classname
	style: {}, //参照最外层样式
	clientParam: {}, //自定义条件
	placeholder: '',
	showHistory: true,
	queryGridUrl: '', // 查询表格数据的url
	queryTreeUrl: '', // 查询树数据的url
	clickContainer: null, // 可以触发参照弹窗事件的容器
	queryCondition: function() {}, // return一个对象，传到后台
	isMultiSelectedEnabled: true, // 是否多选
	onTreeNodeExpand: function() {}, // 树节点展开事件
	isCacheable: false, // 是否启用数据缓存
	container: document.body //容器
};
