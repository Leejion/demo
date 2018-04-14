import { warningOnce, isObj, typeFormat, isUndefined } from '../../public';
import deepClone from '../../public/deepClone';
import toast from '../../api/toast';

/**
 *  ***************前 言***************
 *  1、table数据结构中的status说明  status  '0'=>原始 '1'=>修改 '2'=>新增 '3'=>删除
 *	2、
 */

// 公共配置 常量
const CONFIG = {
	CACHE_DATA: {}
}

/**
 * mofify by yanggqm @18/03/09
 * 根据index的删除行方法
 * 规则：1、当state == ‘2’    新增        这时候直接删除数组就可以了
 *      2、当state == ‘0/1’  原始/修改   这时候数组的内容不能删除，把state置位3
 *      3、当state == ‘3’    已删除      这时候数组的内容不会显示，所以没删除功能
 * 解决思路： 把不是新增的 置位3 并push到结尾，其余的按index删除即可。 控制index的最大取值。
 * @param  tableId   meta的id号
 * @param  index     删除的行号
 */

export function delRow(tableId, index) {
	if (typeof tableId == 'string' && this.state.table[tableId]) {
		let len = this.state.table[tableId].rows.filter((item) => item.status != '3').length - 1;
		let numFlag = !isNaN(parseInt(index, 10)) && index >= 0 && index <= len;
		if (numFlag) {
			let stat = this.state.table[tableId].rows[index].status;
			if (stat == '1' || stat == '0') {
				this.state.table[tableId].rows[index].status = '3';
				this.state.table[tableId].rows.push(this.state.table[tableId].rows[index]);
			}
			this.state.table[tableId].rows.splice(index, 1);
			this.setState({
				table: this.state.table
			});
			return false;
		} else {
			warningOnce(numFlag, '传入的第二个参数为行index值，须为大于等于0且小于等于总行数减一的整数');
			return false;
		}
	}
	toast({ content: `所操作的表格中无ID为的${tableId}数据`, color: 'warning' });
	return false;
}

/**
 * add by yanggqm @18/03/07
 * 根据id获取表格中所有的行的数量
 * @param  tableId   meta的id号
 */
export function getNumberOfRows(tableId) {
	if (typeof tableId == 'string' && this.state.table[tableId]) {
		return getAllRows.call(this, tableId, true).length;
	}
	toast({ content: `所操作的表格中无ID为的${tableId}数据`, color: 'warning' });
	return 0;
}

/**
 * mofify by yanggqm @18/03/09
 * 获取表格内所有行数据（不包含删除项目）
 * @param  tableId   meta的id号
 * @param  flag      是否关闭必输项校验   默认不传undefined/false开启   true：关闭
 */
export function getAllRows(tableId, flag) {
	let isTrue = true; // 检测必输项是否输入标志位
	if (typeof tableId == 'string' && this.state.meta[tableId]) {
		this.state.meta[tableId].items.map((item, num) => {
			if (item.required && !flag) {
				// 如果是必输项
				this.state.table[tableId].rows.map((val, index) => {
					let value = val.values[item.attrcode].value;
					if (value === '' || value === null || value === undefined) {
						toast({ content: `表格 ${tableId} 第 ${index + 1} 行 ${item.label} 不得为空`, color: 'danger' });
						isTrue = false;
					}
				});
			}
		});
		if (isTrue) {
			let rows = deepClone(this.state.table[tableId].rows);
			rows.forEach((item) => {
				let values = item.values;
				for (let key in values) {
					key == 'numberindex' && delete item.values[key];
				}
			});
			return rows;
		}
		return false;
	}
	toast({ content: `所操作的表格中无ID为的${tableId}数据`, color: 'warning' });
	return false;
}

export function getAllData(tableId) {
	let rows = getAllRows.call(this, tableId, true);
	let data = {
		areaType: "table",
		rows,
		areacode: null
	}
	return data;
}

/**
 * add by yanggqm @18/03/06
 * 获取表格内所有行数据（不包含删除项目）
 * @param  tableId   meta的id号
 * @param  keys      排除的项（根据columns里） 可数组可字符串也可不传
 */
export function getAllRowsRemoveKeys(tableId, keys) {
	if (typeof tableId == 'string' && this.state.meta[tableId]) {
		let one = deepClone(this.state.table[tableId].rows);
		let [isStr, isArr] = [typeof keys === 'string', Array.isArray(keys)];

		if (keys == undefined || isStr || isArr) {
			// 是字符串或者是数组 或者是undefined
			one.map(function (elem) {
				let values = elem.values;
				for (let key in values) {
					if ((isStr && key === keys) || (isArr && keys.includes(key))) {
						delete values[key];
					}
				}
			});
			return one.filter((e) => e.status != '3');
		}
		warningOnce(keys == undefined || isStr || isArr, '传入的第二个参数为columns的key,须为字符串或者字符串组成的数组,或者不传');
		return false;
	}
	toast({ content: `所操作的表格中无ID为的${tableId}数据`, color: 'warning' });
	return false;
}

/**
 * modify by yanggqm @18/03/06
 * 获取表格内所有行数据（不包含删除项目）
 * @param  tableId   meta的id号
 * @param  index     增加行的位置index
 */
export function addRow(tableId, index) {
	if (typeof tableId == 'string' && this.state.meta[tableId]) {
		let len = this.state.table[tableId].rows.filter((item) => item.status != '3').length;
		let numFlag = index == undefined || (!isNaN(parseInt(index, 10)) && index >= 1 && index <= len);
		if (numFlag) {
			index = index == undefined ? getNumberOfRows.call(this, tableId) : index;
			edit.call(this, tableId); // 把meta改为 ‘edit’态
			const newRow = {
				rowId: String(new Date().getTime()).slice(-5) + Math.random().toString(12),
				status: '2',
				values: {}
			};
			this.state.meta[tableId].items.forEach((item) => {
				let _isObj = isObj(item.initialvalue);
				newRow.values[item.attrcode] = {
					display: _isObj ? item.initialvalue.display : null,
					scale: _isObj ? item.initialvalue.scale : 0,
					value: _isObj ? item.initialvalue.value : _transform(item.attrcode, null)
				};
			});
			this.state.table[tableId].rows.splice(index, 0, newRow);
			this.setState({
				table: this.state.table
			});
			return false;
		}
		warningOnce(numFlag, '传入的第二个参数为行序号，不传入默认为最后一行，否则须为大于等于1且小于等于总行数的整数');
		return false;
	}
	toast({ content: `所操作的表格中无ID为的${tableId}数据`, color: 'warning' });
	return false;
}

// TODO
export function _transform(key, value) {
	// value 为空返回false
	if (key == 'isdefault') {
		return value ? true : false;
	}
	return value;
}

/**
 * modify by yanggqm @18/03/04
 * 根据id和column的key隐藏某列
 * @param  tableId   meta的id号
 * @param  key       columns的键值
 */
export function hideEditTableColByKey(tableId, key) {
	if (typeof tableId == 'string' && this.state.meta[tableId]) {
		let [isStr, isArr] = [typeof key === 'string', Array.isArray(key)];
		if (isStr || isArr) {
			this.state.meta[tableId].items.map(function (elem) {
				if (isStr && elem.key === key && elem.visible == true) {
					elem.visible = false;
				}
				if (isArr && key.includes(elem.key) && elem.visible == true) {
					elem.visible = false;
				}
			});
			this.setState({
				meta: this.state.meta
			});
		}
		warningOnce(isStr || isArr, '传入的第二个参数为columns的key,须为字符串或者字符串组成的数组');
		return false;
	}
	toast({ content: `所操作的表格中无ID为的${tableId}数据`, color: 'warning' });
	return false;
}

/**
 * modify by yanggqm @18/03/04
 * 根据id和column的key显示某列
 * @param  tableId   meta的id号
 * @param  key       columns的键值
 */
export function showEditTableColByKey(tableId, key) {
	if (typeof tableId == 'string' && this.state.meta[tableId]) {
		let [isStr, isArr] = [typeof key === 'string', Array.isArray(key)];
		if (isStr || isArr) {
			this.state.meta[tableId].items.map(function (elem) {
				if (isStr && elem.key === key && (typeof elem.visible == 'undefined' || elem.visible == false)) {
					elem.visible = true;
				}
				if (isArr && key.includes(elem.key) && (typeof elem.visible == 'undefined' || elem.visible == false)) {
					elem.visible = true;
				}
			});
			this.setState({
				meta: this.state.meta
			});
		}
		warningOnce(isStr || isArr, '传入的第二个参数为columns的key,须为字符串或者字符串组成的数组');
		return false;
	}
	toast({ content: `所操作的表格中无ID为的${tableId}数据`, color: 'warning' });
	return false;
}

/**
 * modify by yanggqm @18/04/04
 * 根据行序号设置表格某行某个字段值  1代表第一行  行序号可有可没有
 * @param  tableId   meta的id号
 * @param  index     行序号，从1开始
 * @param  key       columns的键值
 * @param  value     需要设置的value值
 * @param  display   需要设置的display值
 * @param  scale     需要设置的scale值
 */
export function setValByKeyAndRowNumber(tableId, index, key, { value, display, scale }) {
	if (typeof tableId == 'string' && this.state.meta[tableId]) {
		let allRows = this.state.table[tableId].rows.length;
		if (+index && +index >= 1 && (+index <= allRows)) {
			let num = parseInt(index - 1, 10)
			this.state.table[tableId].rows[num].rowId += Math.random().toString(5);
			let metaArr = this.state.meta[tableId].items.map(item => item.attrcode);
			if (metaArr.includes(key)) {
				let _isObj = isObj(this.state.table[tableId].rows[num].values[key]);
				if (!_isObj) {
					this.state.table[tableId].rows[num].values[key] = {}
				}
				!isUndefined(value) && (this.state.table[tableId].rows[num].values[key].value = value)
				!isUndefined(display) && (this.state.table[tableId].rows[num].values[key].display = display)
				!isUndefined(scale) && (this.state.table[tableId].rows[num].values[key].scale = scale)
				this.setState({
					table: this.state.table
				});
				return false;
			}
			warningOnce(metaArr.includes(key), '传入的第三个参数为表头键值，须是meta中字段')
			return false;
		}
		warningOnce(+index && +index >= 1 && (+index <= allRows + 1), '传入的第二个参数为行序号，须为大于等于1且小于等于总行数的整数')
		return false;
	}
	toast({ content: `所操作的表格中无ID为的${tableId}数据`, color: 'warning' });
	return false;
}

/**
 * modify by yanggqm @18/03/04
 * 设置表格数据，同时缓存数据，取消时调用
 * @param  tableId   meta的id号
 * @param  data      传入的data数据
 * 解决思路：
 * 		1、给不同的tableId配对应的data
 * 		2、不论第几次给tableId对应table来setTableData，都要把最新的data存下来
 */
export function setTableData(tableId, data) {
	if (typeof tableId == 'string') {
		let checkData = data && data.rows && Array.isArray(data.rows)
		if (checkData) {
			// 加入
			data.rows = data.rows.map((e, i) => {
				e.rowId = e.rowId || String(new Date().getTime()).slice(-5) + Math.random().toString(12);
				return e;
			});
			let tempData = deepClone(data);
			CONFIG.CACHE_DATA[tableId] = tempData;
			// tempData.rows = tempData.rows.map((e, i) => {
			// 	e.rowId = e.rowId || i;
			// 	return e;
			// });
			let table = deepClone({
				...this.state.table,
				[tableId]: tempData
			});
			this.setState({
				table
			}, () => {
				// console.log(this.state.table)
				let temp = deepClone(this.state.table[tableId].rows);
				temp.map((item, indexx) => {
					for (let keys in item.values) {
						this.editTableInitValue[`${indexx}**${keys}`] = item.values[keys] && item.values[keys].value;
					}
				})
			});
			return false;
		}
		warningOnce(checkData, '传入的第二个参数为所设置的数据，数据格式是对象，且有个rows属性，rows的内容是数组')
		return false;
	}
	toast({ content: `第一个参数必须为字符串`, color: 'warning' });
	return false;
}

//取消编辑
export function cancelEdit(tableId, cb) {
	this.state.meta[tableId].status = 'browse';
	setTableData.call(this, tableId, deepClone(CONFIG.CACHE_DATA[tableId]));
	this.setState({ // set meta是为了设置浏览态
		meta: this.state.meta
	}, () => {
		cb && cb.call(this);
	});
}

//设置表格状态
export function setStatus(id, status, callback) {
	if (['edit', 'browse'].includes(status)) {
		if (this.state.meta[id]) {
			this.state.meta[id].status = status;
			this.setState(
				{
					meta: this.state.meta
				},
				() => {
					callback && callback.call(this, id, status, deepClone(CONFIG.CACHE_DATA[tableId]), this.state.table[id]);
				}
			);
		}
	} else {
		console.warn(`unknown status: ${status}, status should be 'edit' or 'browse'`);
	}
}

//编辑表格
export function edit(id, cb) {
	if (this.state.meta[id]) {
		this.state.meta[id].status = 'edit';
		this.setState(
			{
				meta: this.state.meta
			},
			() => {
				cb && cb.call(this);
			}
		);
	}
}

//获取表格状态
export function getCurrentStatus(id) {
	if (this.state.meta[id]) {
		return this.state.meta[id].status;
	}
}

//保存  做了什么？ 
export function save(id, cb) {
	let changedRows = getChangedRows.call(this, id); //
	if (changedRows) {
		let allRows = getAllRows.call(this, id);
		cb && cb(changedRows, allRows);
	}
}

//获取变化行的信息  返回
export function getChangedRows(id) {
	//判断修改的行，值是否和改之前一样，如果一样，把status设为0
	let changeRows = getAllRows.call(this, id);
	if (changeRows) {
		return changeRows.filter((e) => {
			// 返回status为 1或者2的meta项目
			return e.status == '1' || e.status == '2' || e.status == '3';
		});
	}
}

//复制粘贴行，默认粘贴到该行下方
export function pasteRow(id, data, index) {
	//index ? 在指定位置新增一行 : 在最后新增一行
	// edit.call(this, id);
	let datas = JSON.parse(JSON.stringify(data));
	let newRow = {
		rowId: String(new Date().getTime()).slice(-5) + Math.random().toString(12),
		status: '2', //0123 => 原始、修改、新增、删除
		values: datas.values
	};
	index = index === undefined ? 0 : index + 1;
	this.state.table[id].rows.splice(index, 0, newRow);
	this.setState({
		table: this.state.table
	});
}

// 根据rowId设置表格某行某个字段值
export function setValByKey(tableId, rowId, key, val, display) {
	let row = this.state.table[tableId].rows;
	row.find((item) => {
		if (item.rowId == rowId) {
			item.values[key].value = val ? val : '';
			item.values[key].display = display ? display : null;
		}
	});
	this.setState({
		table: this.state.table
	});
}

//设置表格某行某个字段编辑性
export function setEditableByKey(tableId, rowId, key, status) {
	let row = this.state.table[tableId].rows;
	row.find((item) => {
		if (item.rowId == rowId) {
			item.values[key].disabled = !status;
		}
	});
	this.setState({
		table: this.state.table
	});
}

//获取表格某列数据
export function getColValue(tableId, key) {
	if (this.state.table[tableId]) {
		let row = this.state.table[tableId].rows;
		let newData = {
			value: [],
			display: []
		};
		row.find((item) => {
			newData.value.push(item.values[key].value);
			if (item.values[key].display) {
				newData.display.push(item.values[key].display);
			}
		});
		return newData;
	}
}

//设置表格某列数据
export function setColValue(tableId, key, data) {
	let row = this.state.table[tableId].rows;
	let newData = data;
	row.find((item, index) => {
		item.values[key].value = newData.value[index];
		item.values[key].display = newData.display[index];
	});
	this.setState({
		table: this.state.table
	});
}

export function setColValueByData(tableId, key, newData, num) {
	let row = this.state.table[tableId].rows;
	row.filter((item, index) => index != num).map((item, index) => {
		// TODO 需要加入 状态的转变功能
		item.values[key].value = typeof newData.value != 'undefined' ? newData.value : '';
		item.values[key].display = newData.display || null;
	});
	// console.log(this.state.table[tableId].rows)
	this.setState(
		{
			table: this.state.table
		},
		() => {
			console.log(this.state.table);
		}
	);
}

//追加数据
export function addRowValue(id, data, index) {
	//index ? 在指定位置新增一行 : 在最后新增一行
	let datas = JSON.parse(JSON.stringify(data));
	datas.map((val, index1) => {
		val.rowId = String(new Date().getTime()).slice(-5) + Math.random().toString(12) + index1;
		val.status = '2';
		if (!index || index > this.state.table[id].rows.length) {
			this.state.table[id].rows.push(val);
		} else {
			this.state.table[id].rows.splice(index + index1, 0, val);
		}
	});
	// index = index === undefined ? 0 : index + 1;

	this.setState({
		table: this.state.table
	});
}

export function getEditTableCacheDataById(tableId) {
	if (tableId) {
		let data = CONFIG.CACHE_DATA[tableId] || {}
		return deepClone(data)
	}
	return null;
}


export function filterEmptyRows(tableId) {
	if (!tableId) return;
	let emptyRows = [];
	if (this.state.table[tableId]) {
		let row = this.state.table[tableId].rows && this.state.table[tableId].rows;
		for (let i = 0; i < row.length; i++) {
			let emptyFlag = true;
			let vals = row[i].values;
			for (let pop in vals) {
				if (vals[pop] && pop != 'numberindex') {
					if ((!!vals[pop].display || !!vals[pop].value)) {
						emptyFlag = false;
					}
				}
				if (!emptyFlag) break;
			}
			if (emptyFlag) {
				emptyRows.push(i);
			}
		}
	}
	if (emptyRows.length > 0) {
		for (let i = emptyRows.length - 1; i >= 0; i--) {
			this.state.table[tableId].rows.splice(emptyRows[i], 1);
		}
		this.setState({
			table: this.state.table
		})

	}
}

export function getTableCheckedRows(moduleId) {
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

export function selectAllTableRows(moduleId, checked) {
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

export function reverseTableSelected(moduleId) {
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

export function deleteRowsByRowId(tableId, index) {
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

export function deleteRowsByIndex(tableId, rowId) {
	if (typeof tableId == 'string' && this.state.table[tableId]) {
		if (typeof rowId == 'string') {
			let arr = deepClone(this.state.table[tableId].rows)
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

export function openEditModel(moduleId, type, record, index) {
	if (!moduleId) return;
	let data = deepClone(this.state.table[moduleId]);
	data.model = true;
	data.operType = type;
	if (type == 'edit') {
		data.origin = record;
		data.rowIndex = index || null;
	} else if (type == 'add') {
		data.origin = null;
		data.rowIndex = null;
	}
	this.setState({
		table: {
			...this.state.table,
			[moduleId]: data
		},
		tableModeldata: {
			[moduleId]: record || {
				"rowId": String(new Date().getTime()).slice(-5) + Math.random().toString(12),
				"status": 0,
				"values": {}
			}
		}
	});
}

export function closeEditModel(moduleId) {
	// console.log(this.state.table, moduleId)
	let data = deepClone(this.state.table[moduleId]);
	data.model = false;

	this.setState({
		table: {
			...this.state.table,
			[moduleId]: data
		}
	});
}