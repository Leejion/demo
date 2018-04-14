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

class Refer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: props.value, //参照的值
			referVal: props.value ? props.value.refname : null, //输入框的值
			cascader: [
				{
					root: {
						data: [],
						pageInfo: {
							pageIndex: 0,
							pageSize: props.pageSize
						}
					}
				}
			], //参照下拉列表的数据
			currentLevel: 0, //
			dropDownList: { pageInfo: { pageIndex: 0 }, data: [] },
			dropDownShow: false,
			isShow: false,
			loading: false,
			selectedpks: {}
		};
		this.canload = true;
		this.interval = 0;
		this.detailcategory = '';
	}

	componentDidMount() {
		// this.matchPKRefJSON();
		document.body.addEventListener('click', this.close);
	}

	componentWillReceiveProps(nextProps) {
		// 保证外部输入的value和内部统一
		if (nextProps.value && nextProps.value.refpk) {
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

	//请求数据
	loadData = async (level, _pid) => {
		await new Promise((resolve) => {
			this.setState(
				{
					loading: true
				},
				() => {
					let { cascader, currentLevel, referVal } = this.state;
					let {
						columnConfig,
						refModelUrl,
						refCode,
						refClientPageInfo,
						pageSize,
						clientParam,
						referFilter,
						queryGridUrl,
						queryCondition
					} = this.props;
					//请求参数
					let param = {
						pid: _pid === 'root' ? '' : _pid,
						keyword: '',
						queryCondition: typeof queryCondition === 'function' && queryCondition(),
						pageInfo: cascader[level][_pid].pageInfo
					};
					//后台请求数据
					axios({
						url: queryGridUrl,
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
						cascader[level][_pid] = {
							pageInfo: { ...cascader[level][_pid].pageInfo, totalPage: res.data.page.totalPage },
							data: cascader[level][_pid].data.concat(res.data.rows)
						};
						this.setState({
							cascader
						});
						this.canload = true;
						resolve();
					});
				}
			);
		});
	};
	// 查询下级分类
	getOptions = async (item, level, e) => {
		let { cascader, currentLevel } = this.state;
		let { columnConfig, hotDataSize, isTreeCanSelect, pageSize, isCacheable } = this.props;
		if (typeof columnConfig === 'object' && columnConfig.length) {
			//点击的是分类
			if (columnConfig.length > level) {
				//如果没到最后一级分类，则查询下级分类
				// cascader.length = level + 1;
				if (isTreeCanSelect) {
					this.select(item, e);
				}
				cascader[level - 1].selectedData = item;
				cascader[level] = cascader[level] || {};
				cascader[level][item.refpk] = cascader[level][item.refpk] || {
					data: [],
					pageInfo: {
						pageIndex: 0,
						pageSize: pageSize
					}
				};
				if (!(cascader[level][item.refpk].data.length && isCacheable)) {
					await this.loadData(level, item.refpk);
				}
				this.setState({
					cascader,
					currentLevel: level
				});
			} else {
				//否则选中数据
				this.select(item, e);
			}
		} else {
			//点击的是数据列，选中数据
			this.select(item, e);
		}
	};
	// 选中参照的方法
	select = (item, e) => {
		e && e.stopPropagation();
		// 单选
		let { hotDataSize, columnConfig, onChange, refCode } = this.props;
		let { selectedpks, isShow, currentLevel } = this.state;
		typeof onChange === 'function' && onChange(item);
		if (item.refpk) {
			// 存入已选择
			selectedpks = { [item.refpk]: true };
			//存入历史记录localStorage
			let history = localStorage[refCode + columnConfig.length]
				? localStorage[refCode + columnConfig.length].split('&&&').map((e) => JSON.parse(e))
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
			localStorage[refCode + columnConfig.length] = history.map((e) => JSON.stringify(e)).join('&&&');
		}

		this.setState({
			isShow: false,
			dropDownShow: false,
			selectedpks: {}
		});
	};
	// 搜索的请求
	search = () => {
		this.setState(
			{
				loading: true
			},
			() => {
				let { dropDownList, referVal } = this.state;
				let { queryGridUrl, queryCondition } = this.props;
				let param = {
					pid: '',
					keyword: referVal,
					queryCondition: typeof queryCondition === 'function' && queryCondition(),
					pageInfo: {
						pageIndex: 0,
						totalPage: 1,
						pageSize: 10
					}
				};
				//后台请求数据
				axios({
					url: queryGridUrl,
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
							data
							// pageInfo: { ...dropDownList.pageInfo, totalPage: res.data.page.totalPage }
						}
					});
				});
			}
		);
	};
	// 加载下一页的请求
	getMoreOptions = (index) => {
		let { cascader, isShow, dropDownList, dropDownShow } = this.state;
		if (isShow) {
			let pid = index ? cascader[index - 1].selectedData.refpk : 'root';
			cascader[index][pid].pageInfo.pageIndex++;
			// console.log('第', index + 1, '级菜单加载下一页，现在第', cascader[index].pageInfo.pageIndex, '页');
			this.loadData(index, pid);
		} else if (searchShow) {
			dropDownList.pageInfo.pageIndex++;
			// console.log('搜索结果加载下一页，现在第', dropDownList.pageInfo.pageIndex, '页');
			this.search();
		}
	};
	// 失去焦点的事件
	blur = (e) => {
		e.stopPropagation();
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
	// 输入框输入事件
	onChange = (val) => {
		let { disabled, refCode, columnConfig } = this.props;
		if (disabled) {
			return false;
		}
		let { dropDownList } = this.state;
		if (val) {
			// 有值搜索
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
			// 没值历史记录
			if (localStorage[refCode + columnConfig.length]) {
				dropDownList.data = localStorage[refCode + columnConfig.length].split('&&&').map((e) => JSON.parse(e));
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

	//分页加载
	ulScroll = (level, e) => {
		let { cascader, isShow } = this.state;
		if (!isShow) {
			return;
		}
		if (e.target.scrollTop > e.target.firstChild.clientHeight - e.target.clientHeight - 5) {
			// 滚动到底部
			let pid = level ? cascader[level - 1].selectedData.refpk : 'root';
			if (cascader[level][pid].pageInfo.pageIndex < cascader[level][pid].pageInfo.totalPage - 1) {
				this.canload && this.getMoreOptions(level);
				// 防止多次请求
				this.canload = false;
			}
		}
	};
	// 点击参照以外的区域收起下拉
	close = (e) => {
		let { isShow, dropDownShow } = this.state;
		if (isShow || dropDownShow) {
			let { target } = e,
				dropDownShow = false;
			while (target) {
				// 一直向上寻找点击的元素是否是参照
				if (target && (target === this.refer || target === this.referContainer)) {
					dropDownShow = true;
					break;
				} else {
					target = target.parentNode;
				}
			}
			if (dropDownShow) {
				// 点击的是参照
				return;
			}
			// 失去焦点校验
			this.blur(e);
			this.setState({
				isShow: false,
				dropDownShow: false,
				loading: false
			});
		}
	};
	// 点击参照三个点的事件
	referClick = (e) => {
		let { columnConfig, clientParam, disabled, isCacheable } = this.props;
		if (disabled) {
			return false;
		}
		let { cascader, currentLevel } = this.state;
		currentLevel = 0;

		this.setState(
			{
				currentLevel,
				dropDownShow: false,
				isShow: true
			},
			() => {
				if (!(cascader[0]['root'].data.length && isCacheable)) {
					if (typeof columnConfig === 'object' && columnConfig.length > 1) {
						// 多级菜单型
						cascader[0]['root'].data = [];
						cascader.length = 1;
						this.asyncLoad(e);
					} else {
						// 列表型
						cascader[0]['root'].data = [];
						this.loadData(0, 'root');
					}
				}
			}
		);
	};
	// 第一次查询的时候把多列的每一列数据都查出来
	asyncLoad = async function(e) {
		await this.loadData(0, 'root');
		let length = this.props.columnConfig.length;
		let { cascader } = this.state;
		for (let i = 0; i < length - 1; i++) {
			let pid = i ? cascader[i - 1].selectedData.refpk : 'root';
			cascader[i][pid].data[0] && (await this.getOptions(cascader[i][pid].data[0], i + 1, e));
		}
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

	render() {
		let { cascader, isShow, currentLevel, referVal, loading, dropDownList, dropDownShow, selectedpks } = this.state;
		let { fixTop, fixLeft } = this;
		let length = Object.keys(cascader).length;
		let {
			value,
			refName,
			refCode,
			disabled,
			refModelUrl,
			isFixed,
			columnConfig,
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
		let multiMenuWidth = columnConfig.length
			? columnConfig.length * fixWidth + (columnConfig.length - 1) * 4
			: fixWidth;
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
							this.onChange(e.target.value);
						}}
						onChange={this.onChange}
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
									width: multiMenuWidth,
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
									<div style={{ width: '100%', height: '100%', overflow: 'auto' }}>
										<div
											style={{
												width: multiMenuWidth,
												height: '100%',
												backgroundColor: '#eee',
												overflowY: 'hidden'
											}}
										>
											{cascader.map((list, level) => {
												if (currentLevel >= level) {
													return (
														<div
															className={'scroll-div'}
															key={level}
															style={{
																width:
																	(multiMenuWidth - currentLevel * 4) /
																	columnConfig.length
															}}
														>
															<p className="list-title">
																{columnConfig[level].name.join('/')}
															</p>
															<div
																className="refer-scroll"
																onScroll={(e) => {
																	this.ulScroll(level, e);
																}}
															>
																<ul
																	className="refer-cascading-item"
																	key={level}
																	style={{
																		width: columnConfig.length ? 'auto' : '100%'
																	}}
																>
																	{list[
																		level
																			? cascader[level - 1].selectedData.refpk
																			: 'root'
																	].data.map((item, i) => {
																		let label = columnConfig[level].code
																			.map((e, i) => {
																				return item[e] || item.values[e].value;
																			})
																			.join('/');
																		return (
																			<li
																				title={label}
																				className={
																					'clearfix refer-li' +
																					(selectedpks[item.refpk]
																						? ' selected'
																						: '') +
																					(list.selectedData &&
																					list.selectedData.refpk ===
																						item.refpk
																						? ' active'
																						: '')
																				}
																				key={i}
																				onClick={this.getOptions.bind(
																					this,
																					item,
																					Number(level) + 1
																				)}
																			>
																				{ellipsis &&
																				level > 0 &&
																				level === columnConfig.length - 1 ? (
																					label.replace(
																						cascader[level - 1].selectedData
																							.refname,
																						'...'
																					)
																				) : (
																					label
																				)}
																				{level < columnConfig.length - 1 && (
																					<Icon
																						type="uf-anglearrowpointingtoright"
																						style={{
																							position: 'absolute',
																							right: '-4px',
																							top: '50%',
																							marginTop: ' -9px'
																						}}
																					/>
																				)}
																			</li>
																		);
																	})}
																</ul>
															</div>
														</div>
													);
												} else {
													return null;
												}
											})}
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
											{(referVal ? '搜索结果（' : '历史记录（') +
												columnConfig[columnConfig.length - 1].name.join('/') +
												'）'}
										</p>
										<div className="refer-scroll">
											<ul className="refer-cascading-item" style={{ width: '100%' }}>
												{dropDownList.data.map((item, i) => {
													let label = columnConfig[columnConfig.length - 1].code
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
	queryGridUrl: PropTypes.string,
	queryTreeUrl: PropTypes.string,
	queryCondition: PropTypes.func,
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
	isTreeCanSelect: false, //多级菜单的树是否可选
	hotDataSize: 20,
	showLabel: false, //是否显示label
	pageSize: 10, //分页请求数据时每页条数
	disabled: false, //是否禁用
	referClassName: '', //参照最外层classname
	className: '', //参照input的classname
	style: {}, //参照最外层样式
	clientParam: {}, //自定义条件
	placeholder: '',
	referFilter: {},
	showHistory: true,
	queryGridUrl: '',
	queryTreeUrl: '',
	queryCondition: function() {},
	isCacheable: false, // 是否启用数据缓存
	container: document.body //容器
};

export default Refer;
