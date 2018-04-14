import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import Qs from 'qs';
import {
	NCLoading as Loading,
	NCCollapse as Collapse,
	NCIcon as Icon,
	NCFormControl as FormControl,
	NCRow as Row,
	NCCol as Col
} from '../../base';
import toast from '../../api/toast';
import ReferTree from './Tree';

class Refer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: props.value, //参照的值
			referVal: props.value.refname || '', //输入框的值
			dropDownList: { pageInfo: { pageIndex: 0, pageSize: 10 }, data: [] },
			dropDownShow: false,
			isShow: false,
			loading: false,
			selectedpks: {},
			selectedKeys: [], // 选择的树节点
			expandedKeys: [], // 展开的树节点
			isFirstShow: true,
			treeData: {
				children: {}
			} // 左树的值
		};
		this.canload = true;
		this.interval = 0;
		this.parentid = '';
		this.typeCode = '';
		this.keyWords = '';
		this.detailcategory = '';
		this.treeParents = [];
	}

	componentDidMount() {
		// this.matchPKRefJSON();
		document.body.addEventListener('click', this.close);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.value.refpk) {
			this.setState({
				referVal: nextProps.value.refname,
				value: nextProps.value,
				selectedpks: {
					[nextProps.value.refpk]: nextProps.value
				}
			});
		} else {
			this.setState({
				referVal: '',
				value: {},
				selectedpks: {}
			});
		}
	}

	//横向滚动条始终在最右侧
	componentDidUpdate() {
		//设置横向滚动时总是到最右侧
		this.referList.childNodes[0].scrollLeft = 10000;
	}

	componentWillUnmount() {
		document.body.removeEventListener('click', this.close);
	}

	select = (item, e) => {
		e && e.stopPropagation();
		// 单选
		let { hotDataSize, columnConfig, onChange } = this.props;
		let { selectedpks, isShow, currentLevel } = this.state;
		typeof onChange === 'function' && onChange(item);
		if (item.refpk) {
			// 存入已选择
			selectedpks = { [item.refpk]: true };
			//存入历史记录localStorage
			let history = localStorage[this.props.refCode + this.props.columnConfig.length]
				? localStorage[this.props.refCode + this.props.columnConfig.length]
						.split('&&&')
						.map((e) => JSON.parse(e))
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
			localStorage[this.props.refCode + this.props.columnConfig.length] = history
				.map((e) => JSON.stringify(e))
				.join('&&&');
		}

		this.setState({
			isShow: false,
			dropDownShow: false,
			selectedpks: {}
		});
	};

	search = () => {
		let that = this;
		this.setState(
			{
				loading: true
			},
			() => {
				let { dropDownList, referVal } = this.state;
				let { queryTreeUrl, queryCondition } = this.props;
				let param = {
					pid: '',
					keyword: referVal,
					queryCondition: typeof queryCondition === 'function' && queryCondition(),
					pageInfo: dropDownList.pageInfo
				};
				//后台请求数据
				axios({
					url: queryTreeUrl,
					method: 'post',
					data: param
				}).then((res) => {
					this.setState({
						loading: false
					});
					res = res.data;
					if (!res.success) {
						toast({ color: 'danger', content: '请求失败' });
						return;
					}
					let data = dropDownList.data.concat(res.data.rows);
					this.setState({
						dropDownList: {
							data,
							pageInfo: { ...dropDownList.pageInfo, ...res.data.rows.page }
						}
					});
					// this.canload = true;
				});
			}
		);
	};

	blur = (e) => {
		e.stopPropagation();
		//如果有搜索结果，失去焦点时取第一条结果，没有结果则置空
		let { dropDownList, dropDownShow, isShow, selectedpks, referVal } = this.state;
		if (isShow && referVal && Object.values(selectedpks)[0]) {
			// 没有选中新的有效值，把之前的值恢复
			this.select(Object.values(selectedpks)[0], e);
		} else if (dropDownShow && referVal && dropDownList.data && dropDownList.data.length) {
			//搜索结果有值
			this.select(this.state.dropDownList.data[0], e);
		} else {
			// 置空
			this.select({}, e);
		}
		// console.log('失去焦点时校验数据的准确性');
	};

	focus = (val) => {
		if (this.props.disabled) {
			return false;
		}
		let { dropDownList } = this.state;
		if (val) {
			//将dropDownList的值设为搜索结果
			this.interval = new Date().getTime();
			let s = setTimeout(() => {
				//停止输入0.5s后执行
				if (new Date().getTime() - this.interval >= 500) {
					if (this.state.referVal) {
						this.state.dropDownList.data = [];
						this.search();
					} else {
						//显示历史记录
					}
				}
				clearTimeout(s);
			}, 500);
		} else {
			//将dropDownList的值设为历史记录
			if (localStorage[this.props.refCode + this.props.columnConfig.length]) {
				dropDownList.data = localStorage[this.props.refCode + this.props.columnConfig.length]
					.split('&&&')
					.map((e) => JSON.parse(e));
			}
			this.setState({
				loading: false
			});
		}
		this.setState({
			referVal: val,
			dropDownShow: true,
			isShow: false,
			dropDownList
		});
	};

	close = (e) => {
		let { isShow, dropDownShow } = this.state;
		if (isShow || dropDownShow) {
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
			this.blur(e);
			this.setState({
				isShow: false,
				dropDownShow: false,
				loading: false,
				cascader: []
			});
		}
	};

	referClick = (e) => {
		e.stopPropagation();
		if (this.props.disabled) {
			return false;
		}
		let { cascader, currentLevel, isFirstShow, treeData } = this.state;
		let { columnConfig, clientParam, isCacheable } = this.props;
		// 查树的数据
		if (isFirstShow || !(isCacheable && Object.keys(treeData.children).length)) {
			this.queryTreeData({ pid: 'root' });
			this.setState({
				selectedKeys: [],
				expandedKeys: []
			});
		}

		this.setState({
			dropDownShow: false,
			isShow: true,
			isFirstShow: false
		});
	};
	// 查树数据的入口方法
	queryTreeData = ({ keyword = '', pid = '', parents = '' }) => {
		let that = this,
			{ queryCondition } = this.props;
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
						pageIndex: -1,
						totalPage: 1,
						pageSize: 10
					},
					queryCondition: typeof queryCondition === 'function' && queryCondition()
				}
			}).then(function(res) {
				that.setState({
					loading: false
				});
				res = res.data;
				if (res.success) {
					let o = {};
					parents = (parents ? parents + '=>' : parents) + (pid === 'root' ? '' : pid);
					res.data.rows.forEach(function(e) {
						e._parents = parents;
						e._display = that.props.treeConfig.code
							.map((item) => e[item] || e.values[item].value)
							.join('/');
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
				} else {
					toast({ color: 'danger', content: res.error.message });
					reject(res.error.message);
					return;
				}
			});
		});
	};
	// 计算参照输入框位置
	calcFixed = (dom, container = this.props.container) => {
		if (dom && dom !== container) {
			var pos = dom.getBoundingClientRect(),
				top = pos.top,
				left = pos.left,
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
	// 左树的点击事件
	onTreeNodeSelect = (selectedKeys, { selected, selectedNodes, node, event }) => {
		// console.log('点击树：', selectedKeys, { selected, selectedNodes, node, event });
		// 选中
		this.select(node.props.treeNodeData);
		if (selected === false) return;
		this.setState({
			selectedKeys
		});
	};
	// 左树的展开事件：异步加载
	onTreeNodeExpand = (expandedKeys, { expanded, node }) => {
		let that = this,
			parents = node.props.treeNodeData._parents || '',
			{ onTreeNodeExpand, isCacheable } = this.props; //所有父节点的refpk
		// console.log('节点展开：', expandedKeys[0], { expanded, node });
		this.setState({
			expandedKeys: expandedKeys
		});
		typeof onTreeNodeExpand === 'function' && onTreeNodeExpand(node);
		// 收缩或已经有子节点时
		if (expanded === false || (node.props.children.length && isCacheable)) {
			return;
		}
		this.queryTreeData({ pid: node.props.eventKey, parents });
	};

	render() {
		let {
			isShow,
			dropDownList,
			dropDownShow,
			referVal,
			loading,
			selectedpks,
			selectedKeys,
			expandedKeys,
			treeData
		} = this.state;
		let {
			value,
			refName,
			refCode,
			disabled,
			refModelUrl,
			columnConfig,
			treeConfig,
			showLabel,
			showHistory,
			ellipsis,
			referClassName,
			className,
			style,
			placeholder,
			container
		} = this.props;
		// let multiMenuWidth = columnConfig.length ? (currentLevel + 1) * fixWidth + currentLevel * 4 : '100%';
		let fixWidth = (this.refer && this.refer.offsetWidth) || 0;
		return (
			<div
				className={`refer clearfix ${referClassName}`}
				ref={(dom) => {
					this.refer = ReactDOM.findDOMNode(dom);
				}}
				style={style}
			>
				<Loading container={this.referList} show={loading} />
				<Loading container={this.searchList} show={loading} />
				{showLabel && (
					<Col
						componentClass="span"
						className="ref-name"
						xs={3}
						style={{ position: 'relative', lineHeight: '28px' }}
					>
						{refName}
					</Col>
				)}
				<Col xs={showLabel ? 9 : 12} style={{ position: 'relative', zIndex: 0, padding: 0, lineHeight: 0 }}>
					<FormControl
						ref={(dom) => {
							this.referInput = dom;
						}}
						className={`refer-input ${className}`}
						disabled={disabled || false}
						value={referVal || ''}
						onFocus={(e) => {
							this.focus(e.target.value);
						}}
						onChange={this.focus}
						placeholder={placeholder}
					/>
					<span
						className="icon-refer"
						style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
						onClick={(e) => {
							this.referClick(e);
						}}
					/>
					{ReactDOM.createPortal(
						<div
							className="refer-container"
							ref={(dom) => {
								this.referContainer = dom;
							}}
						>
							<Collapse
								in={isShow}
								style={{
									overflow: 'hidden',
									width: fixWidth,
									top:
										this.calcFixed(this.refer).top + (this.refer ? this.refer.offsetHeight : 0) + 4,
									left: this.calcFixed(this.refer).left
								}}
							>
								<div
									ref={(dom) => {
										this.referList = dom;
									}}
									className="refer-cascading-list clearfix"
								>
									<div className="scroll-div">
										<p className="list-title">{treeConfig.name.join('/')}</p>
										<div className="refer-scroll">
											<ReferTree
												checkStrictly={true}
												checkable={false}
												data={Object.values(treeData.children)}
												onSelect={this.onTreeNodeSelect}
												onExpand={this.onTreeNodeExpand}
												selectedKeys={selectedKeys}
												expandedKeys={expandedKeys}
												autoExpandParent={false}
											/>
										</div>
									</div>
								</div>
							</Collapse>
							<Collapse
								in={dropDownShow}
								style={{
									overflow: 'hidden',
									width: fixWidth,
									top:
										this.calcFixed(this.refer).top + (this.refer ? this.refer.offsetHeight : 0) + 4,
									left: this.calcFixed(this.refer).left
								}}
							>
								<div
									className="refer-cascading-list"
									ref={(dom) => {
										this.searchList = dom;
									}}
								>
									<div className="scroll-div">
										<p className="list-title">
											{(referVal ? '搜索结果（' : '历史记录（') + treeConfig.name.join('/') + '）'}
										</p>
										<div className="refer-scroll">
											<ul className="refer-cascading-item" style={{ width: '100%' }}>
												{dropDownList.data.map((item, i) => {
													let label = treeConfig.code
														.map((e, i) => {
															return item[e] || item.values[e].value;
														})
														.join('/');
													return (
														<li
															title={label}
															className={
																'clearfix refer-li' +
																(selectedpks[item.refpk] ? ' selected' : '')
															}
															key={i}
															onClick={this.select.bind(this, item)}
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
				</Col>
			</div>
		);
	}
}

Refer.propTypes = {
	value: PropTypes.object.isRequired,
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
	showLabel: PropTypes.bool,
	pageSize: PropTypes.number,
	disabled: PropTypes.bool,
	referClassName: PropTypes.string,
	className: PropTypes.string,
	style: PropTypes.object,
	clientParam: PropTypes.object,
	placeholder: PropTypes.string,
	referFilter: PropTypes.object,
	showHistory: PropTypes.bool,
	queryTreeUrl: PropTypes.string,
	queryCondition: PropTypes.func,
	onTreeNodeExpand: PropTypes.func,
	isCacheable: PropTypes.bool,
	container: PropTypes.object
};

Refer.defaultProps = {
	value: {},
	refName: '', //参照名称
	refCode: '', //参照编码
	pk_val: '', //参照过滤pk
	condition: null, //模糊搜索{name:'111',code:'111'}
	returnField: 'refname', //选中后显示在参照上的字段
	refModelUrl: '', //参照请求地址
	columnConfig: [
		{
			name: [ '名称' ],
			code: [ 'refname' ]
		}
	], //多级菜单
	treeConfig: {
		name: [ '名称' ],
		code: [ 'refname' ]
	}, //树信息配置
	isTreeCanSelect: false, //多级菜单的树是否可选
	hotDataSize: 20,
	showLabel: false, //是否显示label
	pageSize: 20, //分页请求数据时每页条数
	disabled: false, //是否禁用
	referClassName: '', //参照最外层classname
	className: '', //参照input的classname
	style: {}, //参照最外层样式
	clientParam: {}, //自定义条件
	placeholder: '',
	referFilter: {},
	showHistory: true,
	queryTreeUrl: '',
	queryCondition: function() {},
	onTreeNodeExpand: function() {}, // 树节点展开事件
	isCacheable: false, // 是否启用数据缓存
	container: document.body //容器
};

export default Refer;
