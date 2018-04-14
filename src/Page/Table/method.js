import clone from '../../public/deepClone';
import { warningOnce, isObj } from '../../public';
import toast from '../../api/toast';

// 当前页码重置为1
export function resetTablenumber(callback) {
	this.state.table.pageInfo.pageIndex = 1;
	this.setState(
		{
			table: this.state.table
		},
		() => {
			callback && callback(this.state.table);
		}
	);
}

// 获取pageinfo对象的方法
export function getTablePageInfo(moduleId) {
	if (typeof moduleId == 'string' && this.state.table[moduleId]) {
		let { pageIndex = 0, pageSize = 10 } = this.state.table[moduleId].pageInfo;
		return {
			pageIndex: pageIndex > 0 ? pageIndex - 1 : 0,
			pageSize
		};
	}
	return { pageIndex: 0, pageSize: 10 }
}

// 设置表格组件数据并渲染
export function setAllTableData(moduleId, data) {
	let tmp = {
		pageInfo: {},
		rows: [],
		model: null,
		origin: null,
		operType: null,
		checkedAll: false,
		indeterminate: false
	}
	data.rows = data.rows.map((e, i) => {
		e.rowId = e.rowId || String(new Date().getTime()).slice(-5) + Math.random().toString(12);
		return e;
	});
	let conData = clone({ ...tmp, ...data })
	this.setState({
		table: {
			...this.state.table,
			[moduleId]: conData
		}
	});
}

// 新增功能
export function openModel(moduleId, type, record, index) {
	if (!moduleId) return;
	let data = clone(this.state.table[moduleId]);
	data.model = true;
	if (type == 'edit') {
		data.origin = record;
		data.rowIndex = index || null;
	} else if (type == 'add') {
		data.origin = null;
		data.rowIndex = null;
	}
	data.operType = type;
	this.setState({
		table: {
			...this.state.table,
			[moduleId]: data
		},
		tableModeldata: {
			[moduleId]: record || {}
		}
	});
}

export function closeModel(moduleId) {
	// console.log(this.state.table, moduleId)
	let data = clone(this.state.table[moduleId]);
	data.model = false;

	this.setState({
		table: {
			...this.state.table,
			[moduleId]: data
		}
	});
}

//设置表格某一列的 render
export function setTableRender(moduleId, key, render) {
	if (this.state.meta[moduleId]) {
		let obj = this.state.meta[moduleId].items.find(function (elem) {
			return elem.attrcode == key;
		});
		let index = this.state.meta[moduleId].items.indexOf(obj);
		this.state.meta[moduleId].items[index].render = render;
		this.setState({
			meta: this.state.meta
		});
	}
}

export function setTableColumn(moduleId, data) {
	if (!moduleId) return;
	this.setState({
		meta: {
			...this.state.meta,
			[moduleId]: data
		}
	});
}

export function setTableColumnMeta(moduleId, data) {
	if (!moduleId) return;
	this.setState({
		meta: {
			...this.state.meta,
			[moduleId]: data
		}
	});
}

export function getAllTableData(moduleId) {
	if (!moduleId) return;
	return clone(this.state.table[moduleId]);
}

export function setTableValueByKeyAndRecord(moduleId, record, dist) {
	// TODO
	let newRecord = { ...record, ...dist };
	let id = record.attrcode.value;
	let rows = clone(this.state.table[moduleId].rows);

	rows.map(item => {
		if (item.values.attrcode && (id == item.values.attrcode.value)) {
			item.values = { ...newRecord }
		}
	})
	// console.log(rows)
	let data = this.state.table[moduleId];
	data.rows = rows

	this.setState({
		table: {
			...this.state.table,
			[moduleId]: data
		}
	}, () => {
		console.log(data)
	});
}

export function hideColByKey(moduleId, key) {
	if (this.state.meta[moduleId]) {
		this.state.meta[moduleId].items.map(function (elem) {
			if (elem.attrcode == key && elem.visible) {
				elem.visible = false
			}
		});
		this.setState({
			meta: this.state.meta
		});
	}
}

export function showColByKey(moduleId, key) {
	if (this.state.meta[moduleId]) {
		this.state.meta[moduleId].items.map(function (elem) {
			if (elem.attrcode == key && !elem.visible) {
				elem.visible = true
			}
		});
		this.setState({
			meta: this.state.meta
		});
	}
}

export function getCheckedRows(moduleId) {
	let consArr = [];
	this.state.table[moduleId].rows.map((item, index) => {
		if (!!item.selected) {
			consArr.push({
				data: item,
				index
			})
		}
	})
	return consArr;
}

export function selectAllRows(moduleId, checked) {
	this.state.table[moduleId].checkedAll = checked
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

export function reverseSelected(moduleId) {
	this.state.table[moduleId].rows.forEach(element => {
		element.selected = !element.selected
	});
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
	});
}

export function deleteTableRowsByIndex(tableId, index) {
	if (typeof tableId == 'string' && this.state.table[tableId]) {
		let numFlag = Array.isArray(index) || !isNaN(parseInt(index, 10));
		let deleteNum = 0;
		if (numFlag) {
			if (Array.isArray(index)) {
				index.forEach(item => {
					deleteNum++
					delete this.state.table[tableId].rows[item];
				})
			} else if (!isNaN(parseInt(index, 10))) {
				deleteNum++
				this.state.table[tableId].rows.splice(index, 1);
			}
			this.state.table[tableId].rows = this.state.table[tableId].rows.filter(item => !!item)
			// 置位false
			this.state.table[tableId].indeterminate = false;
			// 全选置位false 
			this.state.table[tableId].checkedAll = false;
			if (this.state.table[tableId].pageInfo && this.state.table[tableId].pageInfo.total) {
				this.state.table[tableId].pageInfo.total -= deleteNum
			}
			this.setState({
				table: this.state.table
			});
			return false;
		}
		warningOnce(numFlag, '传入的第二个参数为行index值，可以是数字组成的数组或者单个数字');
		return false;
	}
	toast({ content: `所操作的表格中无ID为的${tableId}数据`, color: 'warning' });
	return false;
}

export function deleteTableRowsByRowId(tableId, rowId) {
	if (typeof tableId == 'string' && this.state.table[tableId]) {
		if (typeof rowId == 'string') {
			let arr = clone(this.state.table[tableId].rows)
			this.state.table[tableId].rows = arr.filter(item => item.rowId !== rowId);
			this.setState({
				table: this.state.table
			});
			return false;
		} else {
			warningOnce(typeof rowId == 'string', '传入的第二个参数为rowId，字符串');
			return false;
		}
	}
	toast({ content: `所操作的表格中无ID为的${tableId}数据`, color: 'warning' });
	return false;
}


export function addTableRow(tableId, data, index) {
	if (typeof tableId == 'string' && this.state.meta[tableId]) {
		let tempArr = clone(this.state.table[tableId].rows);
		let len = tempArr.length;
		let numFlag = index == undefined || (!isNaN(parseInt(index, 10)) && index >= 0 && index <= len - 1);
		if (numFlag) {
			index = index == undefined ? 0 : index;
			let newArr = clone(data.rows);
			newArr = newArr.map((e, i) => {
				e.rowId = e.rowId || String(new Date().getTime()).slice(-5) + Math.random().toString(12);
				return e;
			});
			this.state.table[tableId].rows = [...newArr, ...tempArr];
			// 只有当前页条目数量位10才删除多余项
			if (len >= 10 || this.state.table[tableId].rows.length > 10) {
				// 不会出现8+3的情况，只会有 8+1  9+1 10+1
				// 8+1 9+1 len 为8，9，不走此分支，总页数加 1或者newArr.length
				// 10 + 1 或者 8+3的情况， len为10或则总条数大于10 走此分支，然后总页数不变
				this.state.table[tableId].rows.length = 10;
			}
			if (len < 10 && this.state.table[tableId].pageInfo && this.state.table[tableId].pageInfo.total) {
				this.state.table[tableId].pageInfo.total += newArr.length
			}

			this.setState({
				table: this.state.table
			}, () => {
				console.log(this.state.table)
			});
			return false;
		}
		warningOnce(numFlag, '传入的第三个参数为行序号，不传入默认为行首，否则须为大于等于0且小于等于总行数减1的整数');
		return false;
	}
	toast({ content: `所操作的表格中无ID为的${tableId}数据`, color: 'warning' });
	return false;
}

export function setTableValueBykey(tableId, key, data, type) {
	// TODO 问问亚军 data是对象还是value
	if (type == 'refer') {
		this.state.tableModeldata[tableId][key] = {
			display: data.refname,
			value: data.refpk
		}
	} else {
		this.state.tableModeldata[tableId][key] = {
			value: data,
			display: null,
		}
	}

	this.setState({
		tableModeldata: this.state.tableModeldata
	})
}

export function setTableValueDisabled(tableId, key, flag) {
	if (this.state.meta[tableId]) {
		this.state.meta[tableId].items.map(function (elem) {
			if (elem.attrcode == key) {
				elem.disabled = !!flag
			}
		});
		this.setState({
			meta: this.state.meta
		});
	}
}

export function setTableValueRequired(tableId, key, flag) {
	if (this.state.meta[tableId]) {
		this.state.meta[tableId].items.map(function (elem) {
			if (elem.attrcode == key) {
				elem.required = !!flag
			}
		});
		this.setState({
			meta: this.state.meta
		});
	}
}