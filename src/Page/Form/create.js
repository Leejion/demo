import React, { Component } from 'react';
//import { Form } from 'tinper-bee';
import Form from 'bee-form';
import moment from 'moment';
import 'tinper-bee/build/index.css';
import './nc_form.less';
// const FormItem = Form.FormItem;
import FormItem from './FormItem';
import Uitls from './utils';
import Settings from './settings';

import Input from '../../base/nc_FormControl';
import Radio from '../../base/nc_Radio';
import Checkbox from '../../base/nc_Checkbox';
import Select from '../../base/nc_Select';
import Switch from '../../base/nc_Switch';
import DatePicker from '../../base/nc_DatePicker';
import TextArea from '../../base/nc_TextArea';
//import Refer from '../../containers/Refer';
import refer from '../../containers/ReferDemo';
import NumberInput from '../../base/nc_Number';
const Option = Select.NCOption;
const RadioGroup = Radio.NCRadioGroup;

let changeTypes = ['datepicker', 'rangepicker', 'switch', 'select', 'checkbox', 'radio', 'refer'];
let blurTypes = ['input', 'number', 'textarea'];

/**
 * 创建表单域-支持1列，2列，3列，4列布局，有label
 * @param meta 模板json数据
 */
//let referElems =[];


export function createForm(moduleId, events, hasLabel = true) {
	//初始化state
	if (!this.state.form.hasOwnProperty(moduleId)) {
		this.state.form[moduleId] = {};
		this.state.formBack[moduleId] = {};
		this.formOldValues[moduleId] = {};

	}

	let meta = this.state.meta[moduleId];

	if (!(meta && meta.moduletype === 'form')) return;


	//当前页面状态-浏览态或编辑态
	let { renderItem } = this.state,
		status = meta.status;

	//获取所有字段的meta
	let metaItems = meta.items;

	const _this = this;


	//获取所有字段的meta
	metaItems = meta.items.filter((item) => item.visible == true);
	//metaItems = meta.items.filter((item) => item);

	return (metaItems && metaItems.length > 0  ) ? (//&&this.state.referItems[moduleId]) ? (
		<Form
			showSubmit={false}
			checkFormNow={false}
			useRow={true}
			className="lightapp-component-form"
			submitCallBack={() => {
				console.log('submitCallBack');
			}}
		>
			{metaItems.map((item, i) => {
				//设置默认值
				if (_this.state.form[moduleId]) {
					if (!_this.state.form[moduleId].hasOwnProperty(item.attrcode)) {
						item.initialvalue = item.initialvalue || {};
						_this.state.form[moduleId][item.attrcode] = {
							display: null,
							value: null,
							...item.initialvalue
						};
						this.formOldValues[moduleId][item.attrcode] = item.initialvalue.value
							? { value: item.initialvalue.value }
							: { value: null };
						_this.state.formBack[moduleId][item.attrcode] = {
							display: null,
							value: null,
							...item.initialvalue
						};
					}
				}

				//布局模板信息处理
				//支持2列，3列，4列布局
				let Layout = hasLabel ? Settings.Layout[item.col || 6] : Settings.Layout4[item.col || 3],
					LayoutOpts = {
						labelXs: Layout.label,
						xs: Number(Layout.control),
						leftspace: Number(item.leftspace || 0),
						rightspace: Number(item.rightspace || 0)
					},
					formitem;
				if (renderItem.form && renderItem.form[moduleId] && renderItem.form[moduleId][item.attrcode]) {
					formitem = renderItem.form[moduleId][item.attrcode];
				} else {
					//根据字段类型，渲染不同的组件
					switch (item.itemtype) {
						case 'input':
							formitem = <Input disabled={!!item.disabled} placeholder={item.placeholder} />;
							break;
						case 'label':
							formitem = <Input disabled={!!item.disabled} isViewMode={true} />;
							break;
						case 'number':
							formitem = (
								<NumberInput
									disabled={!!item.disabled}
									suffix={item.suffix}
									scale={item.scale}
									placeholder={item.placeholder}
								/>
							);
							break;
						case 'textarea':
							formitem = (
								<TextArea
									disabled={!!item.disabled}
									rows={item.rows || 1}
									placeholder={item.placeholder}
								/>
							);
							break;
						case 'radio':
							item.config = item.config || {};
							item.config.valuePropName = 'selectedValue';
							formitem = (
								<RadioGroup selectedValue>
									{item.options && item.options.map((e, i) => {
										return (
											<Radio
												color="info"
												disabled={!!e.disabled || !!item.disabled}
												value={e.value}
												key={i}
											>
												{e.display}
											</Radio>
										);
									})}
								</RadioGroup>
							);
							break;
						case 'checkbox':
							formitem = item.options && item.options.map((e, i) => (
								<Checkbox disabled={!!item.disabled} colors="info" checked={e.checked} key={i}>
									{e.display}
								</Checkbox>
							));
							break;
						case 'select':
							formitem = (
								<Select labelInValue={true} disabled={!!item.disabled} placeholder={item.placeholder}>
									{item.options && item.options.map((e, i) => (
										<Option value={String(e.value)} key={i}>
											{e.display}
										</Option>
									))}
								</Select>
							);
							break;
						case 'datepicker':
							formitem = (
								<DatePicker
									disabled={!!item.disabled}
									format={item.format || 'YYYY-MM-DD hh:mm:ss'}
									placeholder={item.placeholder || '请选择合适的日期'}
								/>
							);
							break;
						case 'createTZDatepicker':
							formitem = this.zoneTime.createTZDatepicker(item);
							break;
						case 'switch':
							item.config = item.config || {};
							item.config.valuePropName = 'checked';
							formitem = <Switch disabled={!!item.disabled} />;
							break;
						case 'refer':
							formitem = refer(item.refcode, {
								disabled: !!item.disabled,
								placeholder: item.placeholder,
								queryCondition: item.queryCondition
							});
							//console.log(this.state.referItems[moduleId])
							//formitem = this.state.referItems[moduleId][item.attrcode];
							//console.log(formitem)
							break;
						// default:
						// 	break;
					}
				}
				return createFormItem.call(this, moduleId, i, item, formitem, LayoutOpts, events);
			})}
		</Form>
	) : null;
}





function createFormItem(moduleId, i, item, formitem, LayoutOpts, events) {
	let value = this.state.form[moduleId][item.attrcode];

	let scale = value.scale;

	value = value.display || value.value || null;

	if (status === 'browse' && (scale || scale === 0) && item.itemtype === 'number') {
		value = commafy(addZero(formatDot(value, scale), scale))
	}

	return (
		<FormItem
			key={i}
			inline={true}
			{...LayoutOpts}
			showMast={item.required}
			labelName={item.label}
			name={item.attrcode}
			disabled={item.disabled}
			pagestatus={status}
			verify={item.verify}
			isrequired={item.required || false}
			reg={item.reg}
			errormessage={item.errorMessage || ''}
			itemtype={item.itemtype}
			{...item.config}
			cols={item.cols} // textarea
		>

			{status === 'browse' ? (
				value
			) : (
					createItem.bind(this)(moduleId, item.attrcode, item.config, events)(formitem)
				)}
		</FormItem>);
}
const addZero = (num, scale) => {
	if (isNaN(Number(num))) {
		return null
	}
	if (scale > 0) {
		let start = num.split('.')[0];
		let end = num.split('.')[1];
		if (!end) {
			end = ''
		}
		let len = end.length;
		if (len < scale) {
			end = end.padEnd(scale, '0')
		}
		return start + '.' + end
	} else {
		return num
	}

};

//	精度处理
const formatDot = (value, len = 6) => {
	let formatVal, dotSplit, val;

	val = (value || 0).toString();

	dotSplit = val.split('.');

	if (dotSplit.length > 2 || !value) {
		return value;
	}

	if (val.indexOf('.') > -1) {
		formatVal = val.substring(0, val.indexOf('.') + len + 1);
	} else {
		formatVal = val;
	}

	return formatVal;
};

// 千分位处理
const commafy = (num) => {
	let pointIndex, intPart, pointPart;
	if (num === '-') {
		return '-'
	}
	if (isNaN(num)) {
		return '';
	}

	num = num + '';
	if (/^.*\..*$/.test(num)) {
		pointIndex = num.lastIndexOf('.');
		intPart = num.substring(0, pointIndex);
		pointPart = num.substring(pointIndex + 1, num.length);
		intPart = intPart + '';
		let re = /(-?\d+)(\d{3})/;
		while (re.test(intPart)) {
			intPart = intPart.replace(re, '$1,$2');
		}
		num = intPart + '.' + pointPart;
	} else {
		num = num + '';
		let re = /(-?\d+)(\d{3})/;
		while (re.test(num)) {
			num = num.replace(re, '$1,$2');
		}
	}
	return num;
};

/**
 * 创建表单项
 * @param attrcode 控件的唯一标识
 * @param initialvalue 初始值
 * @param valuePropName 代表组件值的属性，如Switch的是'checked'
 * @param trigger 收集子节点值的方法
 */
export function createItem(moduleId = '', itemId = '', config = {}, events) {
	//alert(2)
	let {
		initialvalue = {},
		valuePropName = 'value',
		changeTrigger = 'onChange',
		focusTrigger = 'onFocus',
		blurTrigger = 'onBlur',
		disabled = false
	} = config;

	let { form, meta } = this.state;

	//字段模板
	let curMetaItem = meta[moduleId]['items'].find((e) => e.attrcode === itemId);
	return (Item) => {
		if (Item) {
			let value;
			switch (curMetaItem.itemtype) {
				case 'refer':
					if (Item.props.isMultiSelectedEnabled) {
						// 多选
						let names = this.state.form[moduleId][itemId].display
							? this.state.form[moduleId][itemId].display.split(',')
							: [],
							pks = this.state.form[moduleId][itemId].value
								? this.state.form[moduleId][itemId].value.split(',')
								: [];
						value = pks.map((e, i) => {
							return {
								refpk: e,
								refname: names[i]
							};
						});
					} else {
						// 单选
						value = this.state.form[moduleId][itemId].value
							? {
								refpk: this.state.form[moduleId][itemId].value,
								refname: this.state.form[moduleId][itemId].display
							}
							: {};
					}
					break;
				case 'select':
					value = {
						key: String(this.state.form[moduleId][itemId].value),
						label: this.state.form[moduleId][itemId].display
					};
					break;
				default:
					value = this.state.form[moduleId][itemId].value;
			}
			let wrap = function (Item) {
				Item = {
					...Item,
					props: {
						...Item.props,
						[valuePropName]: value,
						[changeTrigger]: (val) => {
							curMetaItem.verify = true;
							let finalValue;
							if (typeof val === 'boolean') {
								finalValue = {
									display: null,
									value: val
								};
								if (curMetaItem.itemtype === 'checkbox') {
									curMetaItem.options[Item.key].checked = val;
									this.state.form[moduleId][itemId] = curMetaItem.options
										.filter((e) => e.checked)
										.map((e) => e.value)
										.join(',');
								}
							} else if (val instanceof Array) {
								// 多选参照
								finalValue = {
									display: val.map((e) => e.refname).join(','),
									value: val.map((e) => e.refpk).join(',')
								};
							} else if (val instanceof Object) {
								// 单选参照和select
								finalValue = {
									display: val.refname || val.label,
									value: val.refpk || val.key
								};
							} else {
								// 其他
								finalValue = {
									display: null,
									value: val
								};
							}
							this.state.form[moduleId][itemId] = finalValue;

							if (curMetaItem.reg && !curMetaItem.reg.test(finalValue.value)) {
								curMetaItem.verify = false;
							}

							if (curMetaItem.required && !finalValue.value && finalValue.value !== 0) {
								curMetaItem.verify = false;
							}

							this.setState(
								{
									form: this.state.form,
									meta: meta
								}
								// () => {
								// 	events.onAfterEvent({ ...this.props, ...this.output }, moduleId, itemId, val);
								// }
							);

							if (changeTypes.includes(curMetaItem.itemtype)) {
								if (val != this.formOldValues[moduleId][itemId]) { 
									events &&
										typeof events.onAfterEvent == 'function' &&
										events.onAfterEvent({ ...this.props, ...this.output }, moduleId, itemId, { value: finalValue.value });
									this.formOldValues[moduleId][itemId] = { value: finalValue.value };
								}
							}
						},
						[blurTrigger]: (val) => {
							val = { value: val };
							if (blurTypes.includes(curMetaItem.itemtype)) {
								if (val != this.formOldValues[moduleId][itemId]) {
									events &&
										typeof events.onAfterEvent == 'function' &&
										events.onAfterEvent({ ...this.props, ...this.output }, moduleId, itemId, val);
									this.formOldValues[moduleId][itemId] = val;
								}
							}
						}
					}
				};
				// Object.defineProperty(Item, 'props', {
				// 	writable: false,
				// 	configurable: false,
				// 	value: Item.props,
				// 	enumerable: true
				// });
				return Item;
			};
			if (Item instanceof Array) {
				return Item.map((e, i) => {
					return wrap.call(this, e);
				});
			} else {
				return wrap.call(this, Item);
			}
		}
	};
}
