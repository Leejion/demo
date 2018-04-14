/*
*    插入子节点数据
*    @ child 子表数据
*    @ parent 当前行信息
* */
function setChildNodeEve(tableData, child, parent) {
    let parentKey = parent.key;
    let len = tableData.length;
    for (let i = 0; i < len; i++) {
        let item = tableData[i];
        if (item.rowId === parentKey) {
            tableData[i].values.children = child;
            break
        } else if (item.values.hasOwnProperty('children')) {
            setChildNodeEve(item.values.children, child, parent)
        }
    }
    return tableData
}

/*
 *   添加rowId;
 *   field: rowId字段
* */
function addRowId(data, field) {
    data.map((item) => {
        item.rowId = item.values[field].value;
        if (item.values.hasOwnProperty('children')) {
            addRowId(item.values.children, field)
        }
    })
}

/*
*   初始化树状表数据
*   @ data 数据
*   @ rowId 行id字段
* */
export function initTreeTableData(moduleId, data, rowId) {
    let thisTable = this.state.treeTableCol[moduleId];
    thisTable.data = data;
    thisTable.firstTime = true;
    this.setState({
        treeTableCol: this.state.treeTableCol
    })
}

//  编辑成功
export function editSuccess(moduleId, newData) {

}
