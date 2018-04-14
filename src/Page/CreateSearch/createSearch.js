/**
 * Created by wangshhj on 2018/1/11.
 */
import React, { Component } from 'react';
import NCSelect from '../../base/nc_Select';
import { FormControl, Con, Row, Col, Select } from 'tinper-bee';
import NCIcon from '../../base/nc_Icon';
import { NCCheckbox, NCSwitch, NCNumber, NCInput, NCMessage } from '../../base';
import  NCRadio  from '../../base/nc_Radio';
import DatePicker from "tinper-bee/lib/Datepicker";
import NCDatePicker from '../../base/nc_DatePicker';
// import { DatePicker } from 'tinper-bee';
import './createSearch.less';
import moment from 'moment';
import getAllSearchData from './getAllSearchData';
import refer from '../../containers/ReferDemo';
import setSearchValue from './setSearchValue';

const NCOption = NCSelect.NCOption;
// console.log(DatePicker)
const { RangePicker } = DatePicker;

let ConstSearchInfo = {};

export default function NCCreateSearch(id, { clickSearchBtn, maxNum, saveSearchPlan }) {
	if (!this.state.meta) {
		return false;
	}
	if (!(this.state.meta[id] && JSON.stringify(this.state.meta[id]) !== '{}')) {
		return false;
	}
	let searchInfo = this.state.meta[id];


	//参照替换
	let renderItem = this.state.renderItem.search ? this.state.renderItem.search[id] : {};

	//是否需要默认查询条件，若需要，第一行默认查询条件有几个
	let defaultConditionsNum = searchInfo.defaultConditionsNum;

	let maxNums = maxNum ? maxNum : 6; //一行最多几个控件，默认5个
	if (!ConstSearchInfo.hasOwnProperty(id)) {
		if (defaultConditionsNum) {
			searchInfo.hideSearch = searchInfo.items.length > defaultConditionsNum; //查询区大于一行，隐藏多余行
			searchInfo.isShowSearchBtn = searchInfo.items.length > defaultConditionsNum; //是否显示三角按钮
		}
		//  默认隐藏查询方案
		searchInfo.showSearchPlan = false;
		searchInfo.searchName = '';
		ConstSearchInfo[id] = JSON.stringify(searchInfo);
	}
	if (!localStorage.hasOwnProperty(id)) {
		localStorage.setItem(id, JSON.stringify({ value: [] }));
	}

	//更新查询区数据
	let setStateEve = (callBack) => {
		this.state.meta[id] = searchInfo;
		this.setState(
			{
				meta: this.state.meta
			},
			function () {
				if (typeof callBack === 'function') {
					callBack();
				}
			}
		);
	};

	//input输入改变,更新state
	let onInputChange = (index, val) => {
		searchInfo.items[index].initialvalue.value = val;
		setStateEve();
	};

	//select改变，更新state
	let onSelectedChange = (index, val) => {
		if (val == '-1') {
			searchInfo.items[index].initialvalue.value = undefined;
		} else {
			searchInfo.items[index].initialvalue.value = val;
		}
		setStateEve();
	};

	//查询按钮事件
	let clickSearch = () => {
		let data = getAllSearchData.call(this, id);
		if (clickSearchBtn && typeof clickSearchBtn == 'function') {
			clickSearchBtn(this, data);
		}
	};

	//重置按钮事件
	let resetEvent = () => {
		searchInfo = JSON.parse(ConstSearchInfo[id]);
		searchInfo.items.find((val) => {
			if (val.field == 'RangDate' && !val.value) {
				val.value = '';
			}
		});
		this.state.meta[id] = searchInfo;
		setStateEve();
	};

	//日期选择事件
	let onDateChange = (index, date) => {
		searchInfo.items[index].initialvalue.value = date;
		setStateEve();
	};

	//区间类型日期事件
	let onRangDateChange = (index, date) => {
		searchInfo.items[index].initialvalue.value = date;
		setStateEve();
	};

	let onDateSelect = (data) => { };

	//参照更改事件
	let referChangeEve = (index, val) => {
		if (val instanceof Array) {
			// 多选参照
			searchInfo.items[index].initialvalue = {
				display: val.map((e) => e.refname).join(','),
				value: val.map((e) => e.refpk).join(',')
			};
		} else if (val instanceof Object) {
			// 单选参照和select
			searchInfo.items[index].initialvalue = {
				display: val.refname || val.label,
				value: val.refpk || val.key
				// display: "jjjaa",
				// value: "swe"
			};
		}

		setStateEve();
	};

	//单选change事件
	let radioChange = (index, val) => {
		searchInfo.items[index].initialvalue.value = val;
		setStateEve();
	};

	//查询区多于一行，隐藏
	let showMoreSearch = (props) => {
		if (!props) {
			return false;
		}
		return (
			<span className="showMoreSearch" onClick={showSearchArea.bind(this)}>
				高级
				{/*<NCIcon*/}
				{/*className=""*/}
				{/*type={searchInfo.hideSearch ? 'angle-arrow-down uf-arrow-down' : 'angle-arrow-down uf-arrow-up'}*/}
				{/*onClick={showSearchArea.bind(this)}*/}
				{/*/>*/}
			</span>
		);
	};

	//显示查询区隐藏行
	let showSearchArea = () => {
		searchInfo.hideSearch = !searchInfo.hideSearch;
		setStateEve();
	};

	//生成查询、重置按钮
	let createButton = () => {
		return (
			<Col
				md={2}
				sm={4}
				xs={6}
				className={['search-component-rowArea', defaultConditionsNum ? '' : 'search-component-rowArea_right'].join(' ')}
			>
				<div className="search-component-btnDiv">
					<span className="search-component-searchBtn" onClick={clickSearch.bind(this)}>
						查询
					</span>
					{saveSearchPlan ? (
						<span className="saveSearchPlan" onClick={showSearchPlan.bind(this)}>
							<i
								className={`iconfont ${!searchInfo.showSearchPlan ? 'icon-sanjiao1' : 'icon-sanjiao'}`}
							/>
							{createSearchPlan.call(this)}
						</span>
					) : null}
				</div>

				<span className="search-component-resetSearchBtn" onClick={resetEvent.bind(this)}>
					清空
				</span>

				{saveSearchPlan ? (
					<span className="search-component-saveSearchPlanBtn" onClick={saveSearchPlanEve.bind(this)}>
						保存方案
					</span>
				) : null}

				{showMoreSearch(searchInfo.isShowSearchBtn)}
			</Col>
		);
	};

	//复选框事件
	let onChangeCheckbox = (index, optionIndex) => {
		searchInfo.items[index].initialvalue.value = '';
		searchInfo.items[index].options[optionIndex].checked = !searchInfo.items[index].options[optionIndex].checked;

		setStateEve();
	};

	//开关事件
	let switchChange = (index) => {
		searchInfo.items[index].initialvalue.value = !searchInfo.items[index].initialvalue.value;
		setStateEve();
	};

	// 数字类型事件
	let changeNumber = (index, data) => {
		searchInfo.items[index].initialvalue.value = data;
		setStateEve();
	};

	//生成查询条件
	let createDom = (value, order) => {
		if (value.length == 0) {
			return;
		}
		let md = Math.ceil(12 / maxNums);
		return value.map((data, ind) => {
			if(!data.visible){
				return null
			}
			let type = data.itemtype;
			// let md = 2;
			let sm = md + 1;
			let xs = 6;
			let index = ind;
			if (order && order == 'other') {
				index = defaultConditionsNum + index;
			}

			let initialvalue = data.initialvalue;
			let val = initialvalue ? initialvalue.value : '';
			if (initialvalue && initialvalue.display) {
				val = initialvalue.display;
			}

			//  必输项标识
			let mustFillIn = null;
			if (data.required) {
				mustFillIn = <span className="mustFillIn">*</span>;
			}

			switch (type) {
				case 'refer':
					let referDom = null;
					let refData = {};
					if (data.initialvalue) {
						refData = {
							refpk: data.initialvalue.value,
							refname: data.initialvalue.display
						};
					}
					if (renderItem.hasOwnProperty(data.attrcode)) {
						referDom = {
							...renderItem[data.attrcode],
							props: {
								...renderItem[data.attrcode].props,
								placeholder: data.label,
								value: refData,
								onChange: referChangeEve.bind(this, index)
							}
						};
					} else {
						referDom = refer(data.refcode, {
							onChange: referChangeEve.bind(this, index),
							value: refData
						});
					}
					return (
						<Col md={md} xs={xs} sm={sm} key={index} className={['searchChild', data.attrcode]}>
							{mustFillIn}
							{referDom}
						</Col>
					);
				case 'input':
					return (
						<Col md={md} xs={xs} sm={sm} key={index} className={['searchChild', data.attrcode]}>
							{mustFillIn}
							<FormControl
								value={val}
								placeholder={data.label}
								onChange={onInputChange.bind(this, index)}
							/>
						</Col>
					);
					break;
				case 'select':
					if (val === '') {
						val = undefined;
					}
					return (
						<Col md={md} xs={xs} sm={sm} key={index} className={['searchChild', data.attrcode]}>
							{mustFillIn}
							<NCSelect
								showSearch
								style={{ marginRight: 6 }}
								placeholder={data.label}
								value={val}
								optionFilterProp="children"
								onChange={onSelectedChange.bind(this, index)}
							>
								<NCOption key={-1} value={'-1'} style={{ color: '#00b39e' }}>
									清空
								</NCOption>
								{data.options.map((val, index) => {
									return (
										<NCOption key={index} value={String(val.value)}>
											{val.display}
										</NCOption>
									);
								})}
							</NCSelect>
						</Col>
					);
					break;
				case 'datepicker':
					const format = 'YYYY-MM-DD';
					return (
						<Col md={md} xs={xs} sm={sm} key={index} className={['searchChild', data.attrcode]}>
							{mustFillIn}
							<NCDatePicker
								format={format}
								onSelect={onDateSelect}
								onChange={onDateChange.bind(this, index)}
								// locale={zhCN}
								value={val}
								placeholder={data.label}
							/>
						</Col>
					);
					break;
				case 'rangepicker':
					const Rangformat = 'YYYY-MM-DD';
					let date = val;
					let newDate = [];
					if (date && Object.prototype.toString.call(date) == '[object Array]') {
						if (date.length > 1) {
							date.map((val) => {
								newDate.push(moment(val));
							});
						}
					}
					newDate.length == 0 ? (newDate = '') : newDate;

					return (
						<Col md={md} xs={xs} sm={sm} key={index} className={['searchChild', data.attrcode]}>
							{mustFillIn}
							{<RangePicker
								format={Rangformat}
								onSelect={onDateSelect}
								onChange={onRangDateChange.bind(this, index)}
								showClear={true}
								defaultValue={newDate}
								placeholder={data.label}
							/>}
						</Col>
					);
					break;
				case 'radio':
					return (
						<Col
							md={md}
							xs={xs}
							sm={sm}
							key={index}
							className={['searchChild', data.attrcode, 'radioStyle']}
						>
							{mustFillIn}
							<span className="radioName">{data.label}:&nbsp;</span>
							<NCRadio.NCRadioGroup
								name={data.label}
								selectedValue={String(val)}
								onChange={radioChange.bind(this, index)}
							>
								{data.options.map((val, index) => {
									return (
										<NCRadio key={index} value={String(val.value)}>
											{val.display}
										</NCRadio>
									);
								})}
							</NCRadio.NCRadioGroup>
						</Col>
					);
					break;
				case 'number':
					return (
						<Col md={md} xs={xs} sm={sm} key={index} className={['searchChild', data.attrcode]}>
							{mustFillIn}
							<NCNumber
								scale={data.scale}
								value={val}
								placeholder={data.label}
								onChange={changeNumber.bind(this, index)}
							/>
						</Col>
					);
					break;
				case 'checkbox':
					if (initialvalue.value || initialvalue.value == 0) {
						data.options.forEach((option) => {
							if (option.value === initialvalue.value) {
								option.checked = true;
							}
						});
					}
					return (
						<Col
							md={md}
							xs={xs}
							sm={sm}
							key={index}
							className={['searchChild', 'checkbox', data.attrcode]}
						>
							{mustFillIn}
							<span>{data.label} ： </span>
							{data.options.map((item, indexs) => {
								return (
									<NCCheckbox
										key={indexs}
										ref="test"
										checked={item.checked}
										onChange={onChangeCheckbox.bind(this, index, indexs)}
									>
										{item.display}
									</NCCheckbox>
								);
							})}
						</Col>
					);
					break;
				case 'switch':
					return (
						<Col md={md} xs={xs} sm={sm} key={index} className={['searchChild', 'switch', data.attrcode]}>
							{mustFillIn}
							<span className="switchSpan">{data.label}：</span>
							<NCSwitch checked={val} onChange={switchChange.bind(this, index)} />
						</Col>
					);
					break;
			}
		});
	};

	//查询区目前两种展示方式
	let createSearchDom = () => {
		//  判断是否需要隐藏剩余行
		if (defaultConditionsNum) {
			if (searchInfo.isShowSearchBtn) {
				let items1 = [];
				let items2 = [];
				searchInfo.items.map((val, index) => {
					if (!val.hasOwnProperty('initialvalue')) {
						val.initialvalue = {
							value: '',
							display: ''
						};
					}
					if (index < defaultConditionsNum) {
						items1.push(val);
					} else {
						items2.push(val);
					}
				});

				return (
					<div className="lightapp-component-search">
						<Col md={12} sm={12} xs={12}>
							{createDom(items1, 'first')}
							{createButton()}
						</Col>
						<Col md={12} sm={12} xs={12} className={searchInfo.hideSearch ? 'hideMore' : ''}>
							{createDom(items2, 'other')}
						</Col>
					</div>
				);
			} else {
				return (
					<div>
						<Col md={10} sm={8} xs={6}>
							{createDom(searchInfo.items)}
						</Col>
						{createButton()}
					</div>
				);
			}
		} else {
			searchInfo.items.map((val, index) => {
				if (!val.hasOwnProperty('initialvalue')) {
					val.initialvalue = {
						value: '',
						display: ''
					};
				}
			});
			return (
				<Col md={12} sm={12} xs={12} className="lightapp-component-search" >
					{createDom(searchInfo.items)}
					{createButton()}
				</Col>
			);
		}
	};

	// 显示查询方案
	let showSearchPlan = () => {
		searchInfo.showSearchPlan = !searchInfo.showSearchPlan;
		setStateEve();
	};

	// 选择查询方案
	let chooseSerachPlan = (key) => {
		let searchPlan = JSON.parse(localStorage[id]).value;
		searchPlan.map((item) => {
			if (item.name == key) {
				setSearchValue.call(this, id, item.data);
				clickSearch.call(this);
			}
		});
	};

	// 创建查询方案
	let createSearchPlan = () => {
		let searchPlan = JSON.parse(localStorage.getItem(id)).value;
		let dom = null;
		if (JSON.stringify(searchPlan) == '[]') {
			dom = (
				<p className="searchPlanList">
					<span className="searchPlanName">暂无方案</span>
				</p>
			);
		} else {
			dom = searchPlan.map((key) => (
				<p key={key.name} className="searchPlanList" onClick={chooseSerachPlan.bind(this, key.name)}>
					<span className="searchPlanName">{key.name}</span>
					<span onClick={delSearchPlan.bind(this, key.name)} className="iconSpan">
						<i className="iconfont icon-close" />
					</span>
				</p>
			));
		}
		return <div className={`searchPlanBox  ${!searchInfo.showSearchPlan ? 'hideMore' : null}`}>{dom}</div>;
	};

	// 删除查询方案
	let delSearchPlan = (key, e) => {
		e.preventDefault();
		e.stopPropagation();
		localStorageChange.call(this, 'del', key);
	};

	// 保存查询方案按钮事件
	let saveSearchPlanEve = () => {
		this.modal.show('saveSearchPlan');
	};

	// 查询方案弹出框内容
	let modalContent = () => {
		return (
			<div className="modalContent">
				<span>方案名称: </span>
				<NCInput
					className="searchNameInput"
					value={searchInfo.searchName}
					onChange={searchNameChange.bind(this)}
				/>
			</div>
		);
	};

	// 查询方案名称输入
	let searchNameChange = (val) => {
		searchInfo.searchName = val;
		setStateEve();
	};

	// 查询方案保存事件
	let saveSearchBtn = () => {
		if (searchInfo.searchName == '') {
			{
				NCMessage.create({ content: '方案名称不能为空', color: 'warning' });
			}
			return false;
		}
		localStorageChange.call(this, 'save', searchInfo.searchName);
	};

	//  处理localstorage 查询方案(保存、删除)
	let localStorageChange = (type, key) => {
		let searchPlan = JSON.parse(localStorage.getItem(id)).value;
		if (type == 'save') {
			let searchData = getAllSearchData.call(this, id);
			if (searchPlan.length == 5) {
				searchPlan.pop();
			}
			searchPlan.unshift({
				name: key,
				data: searchData
			});
			searchInfo.searchName = '';
		} else if (type == 'del') {
			for (let i = 0; i < searchPlan.length; i++) {
				if (searchPlan[i].name == key) {
					searchPlan.splice(i, 1);
				}
			}
		}
		localStorage.setItem(id, JSON.stringify({ value: searchPlan }));

		setStateEve();
	};

	return (
		<Row id={id} className="NC_CreateSearch">
			{ createSearchDom() }
			{this.modal.createModal('saveSearchPlan', {
				title: '保存查询方案',
				content: modalContent.call(this),
				beSureBtnClick: saveSearchBtn.bind(this)
			})}
		</Row>
	);
}
