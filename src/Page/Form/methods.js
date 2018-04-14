import { NCMessage } from '../../base';
import { toast } from '../../../src';
import Uitls from './utils';
import deepClone from '../../public/deepClone';

// 获取表单所有数据
export function getAllFormValue(moduleIds) {
	if (typeof moduleIds === 'string') {
		let formData = this.state.form[moduleIds];
		let data = {
			values: formData
		};
		if (this.state.meta[moduleIds]) {
			if (this.state.meta[moduleIds].status == 'add') {
				data.status = "2";
			} else if (this.state.meta[moduleIds].status == 'edit') {
				data.status = "1";
			}
			//return data;
			return {
				areaType:'form',
				rows:[data]
			};
		}
	} else if (moduleIds instanceof Array) {
		let allFormData = {};
		for (let i = 0; i < moduleIds.length; i++) {
			let id = moduleIds[i];
			if (this.state.form[id]) {
				let formData = this.state.form[id];
				// allFormData[id] = {
				// 	status:
				// 		this.state.meta[id] &&
				// 		(this.state.meta[id].status == 'add' ? 2 : this.state.meta[id].status == 'edit' ? 1 : null),
				// 	values: formData
				// };

				allFormData[id] = {
					areaType: 'form',
					rows:[{
						status:this.state.meta[id] &&
						(this.state.meta[id].status == 'add' ? "2" : this.state.meta[id].status == 'edit' ? "1" : null),
						values: formData
					}]
				};
			}
		}
		return allFormData;
	}
}

// 设置表单所有数据
export function setAllFormValue(formDataObj,copyFlag=true) {
	for (let moduleId in formDataObj) {
		let newData = formDataObj[moduleId].rows[0].values;
		if (this.state.form[moduleId]) {
			for (let pop in newData) {
				this.state.form[moduleId][pop] = newData[pop];
				if(copyFlag){
					this.state.formBack[moduleId][pop] = newData[pop];
				}	
			}
		}
	}
	this.setState({
		form: this.state.form,
		formBack: this.state.formBack
	});
}

//
export function getCacheDataById(moduleId){
	if (this.state.formBack[moduleId]){
		return this.state.formBack[moduleId]
	}
}


//表单取消方法
export function cancel(ids) {
	if (typeof ids === 'string') {
		this.state.form[ids] = deepClone(this.state.formBack[ids]);
        this.state.meta[ids].status="browse";
	} else if (ids instanceof Array) {
		for (let i = 0; i < ids.length; i++) {
			let id = ids[i];
			if (this.state.form[id]) {
				this.state.form[id] = deepClone(this.state.formBack[id]);
                this.state.meta[id].status="browse";
			}
		}
	}
	this.setState({
		form: this.state.form,
		meta:this.state.meta
	});
}

//设置表单status
export function setFormStatus(moduleId, status) {
	if (this.state.meta[moduleId]) {
		this.state.meta[moduleId].status = status;
		this.setState({
			meta: this.state.meta
		});
	}
}

// export function setFormStatus(formStatusObj) {
// 	for (let moduleId in formStatusObj) {
// 		if(this.state.meta[moduleId]){
// 			this.state.meta[moduleId].status = formStatusObj[moduleId].status;
// 		}
// 	}
// 	this.setState({
// 		meta: this.state.meta
// 	});
// }
export function getFormStatus(moduleId) {
	if (this.state.meta[moduleId]) {
		return this.state.meta[moduleId].status;
	}
}

// 清空表单所有数据
export function EmptyAllFormValue(moduleId) {
	let data = this.state.form;
	for (let pop in data[moduleId]) {
		let item = this.state.meta[moduleId].items.find(function(elem) {
			return elem.attrcode == pop;
		});
		if (!!item.itemtype) {
			data[moduleId][pop].value = '';
		}
	}
	this.setState({ form: data });
}

//获取必输项字段名
function getRequiredItems(moduleId) {
	if (this.state.meta[moduleId]) {
		let itemsArr = this.state.meta[moduleId].items;
		itemsArr = itemsArr.filter((item) => typeof item.visible == 'undefined' || item.visible == true);
		let requiredItems = itemsArr
			.filter((ele) => {
				let finalValue = this.state.form[moduleId][ele.attrcode].value;
				return ele.required && !finalValue && finalValue !== 0;	
			})
			.map(function(ele, index) {
				return ele.attrcode;
			});
		// if (requiredItems.length > 0) {
		// 	NCMessage.create({ content: requiredItemsLabel + ' 不能为空！', color: 'danger' });
		// 	return false;
		// }
		return requiredItems;
	}
}
export function checkRequired(moduleId){
	let requiredItems = getRequiredItems.call(this, moduleId);
	if(requiredItems && requiredItems.length>0){
		return false;
	}
	return true;

}


//单个表单校验
function checkFormById(moduleId) {
	let flag = true;
	//必输项校验
	let requiredItems = getRequiredItems.call(this, moduleId);
	this.state.meta[moduleId].items.forEach((e, i) => {
		if (requiredItems.includes(e.attrcode)) {
			e.verify = false;
			flag = false;
		} else {
			e.verify = true;
		}
	});
	this.setState({
		meta: this.state.meta
	});
	//正则匹配

	//该表单的所有校验都通过
	return flag;
}

//点击保存按钮时，主动触发表单校验
export function isCheckNow(moduleId) {
	let flag = true;
	if (typeof moduleId === 'string') {
		flag = checkFormById.call(this, moduleId);
	} else if (moduleId instanceof Array) {
		for (let i = 0; i < moduleId.length; i++) {
			let newFlag = checkFormById.call(this, moduleId[i]);
			flag = flag && newFlag;
		}
	}
	if (!flag) {
		toast({
			color: 'warning',
			content: '校验未通过，请检查输入项！'
		});
	}
	return flag;
}

// 获取表单中某个字段的值
export function getFormItemsValue(moduleId, data) {
	if (this.state.form[moduleId]) {
		if (typeof data === 'string') {
			return this.state.form[moduleId][data];
		} else if (data instanceof Array) {
			let newData = [];
			const _this = this;
			newData = data.map((item, i) => {
				return _this.state.form[moduleId][item];
			});
			return newData;
		}
	}
}

// 设置表单中某个字段的值
export function setFormItemsValue(moduleId, values) {
	for (let key of Object.keys(values)) {
		if (key) {
			this.state.form[moduleId][key] = this.state.form[moduleId][key] || {};
			for (let pop in values[key]) {
				this.state.form[moduleId][key][pop] = values[key][pop];
			}
		}
	}
	this.setState({ form: this.state.form });
}

function setFormAttribute(moduleId, values, attribute) {
	let items = this.state.meta[moduleId].items;
	for (let key of Object.keys(values)) {
		if (key) {
			let item = items.find(function(elem) {
				return elem.attrcode == key;
			});
			let index = items.indexOf(item);
			this.state.meta[moduleId].items[index][attribute] = values[key];
		}
	}
	this.setState({ meta: this.state.meta });
}

function getFormAttribute(moduleId, id, attribute) {
	if (typeof id === 'string') {
		let arr = this.state.meta[moduleId].items.find(function(elem) {
			return elem.attrcode == id;
		});
		return arr[attribute];
	} else if (id instanceof Array) {
		let newData = [];
		const _this = this;
		newData = id.map((item, i) => {
			let arr = this.state.meta[moduleId].items.find(function(elem) {
				return elem.attrcode == item;
			});
			return arr[attribute];
		});
		return newData;
	}
}

// 获取表单某个或某些字段的编辑性
export function getFormItemsDisabled(moduleId, id) {
	return getFormAttribute.call(this, moduleId, id, 'disabled');
}

// 设置表单编辑性
export function setFormItemsDisabled(moduleId, values) {
	setFormAttribute.call(this, moduleId, values, 'disabled');
}

//设置表单某些字段的必输性
export function setFormItemsRequired(moduleId, values) {
	setFormAttribute.call(this, moduleId, values, 'required');
}

//获取表单某些字段的必输性
export function getFormItemsRequired(moduleId, id) {
	return getFormAttribute.call(this, moduleId, id, 'required');
}

//设置表单某些字段的校验规则
export function setFormItemsVerify(moduleId, values) {
	setFormAttribute.call(this, moduleId, values, 'verify');
}

//获取表单某些字段的校验规则
export function getFormItemsVerify(moduleId, id) {
	return getFormAttribute.call(this, moduleId, id, 'verify');
}

// 设置表单可见
export function formShow(id) {
	// if (typeof id === 'string') {
	// 	this.state.form[id].show = true;
	// 	this.setState({ form: this.state.form });
	// } else if (id instanceof Array) {
	// 	id.map((e, i) => {
	// 		this.state.form[e].show = true;
	// 	});
	// 	this.setState({ form: this.state.form });
	// } else {
	// 	return;
	// }
}

// 设置表单隐藏
export function formHide(id) {
	// if (typeof id === 'string') {
	// 	this.state.form[id].show = false;
	// 	this.setState({ form: this.state.form });
	// } else if (id instanceof Array) {
	// 	id.map((e, i) => {
	// 		this.state.form[e].show = false;
	// 	});
	// 	this.setState({ form: this.state.form });
	// } else {
	// 	return;
	// }
}
