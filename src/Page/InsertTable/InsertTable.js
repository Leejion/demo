/**
 * Created by wangshhj on 2018/1/16.
 */
import React, {Component} from "react";
import {Table, InputRender, Pagination, Col, Checkbox} from "tinper-bee";
import NCTable from "../../base/nc_Table";
import NCSelect from "../../base/nc_Select"
import './insertTable.less'
let NCOption = NCSelect.NCOption;
let bodyKey = null; //当前行的key
let currentRowIndex = null; //当前行的index

const defaultProps = {  //复选框
    prefixCls: "bee-table",
    multiSelect: {
        type: "checkbox",
        param: "key"
    }
};
// const defaultProps_child = {
//     prefixCls: "bee-table",
//     multiSelect: {
//         type: "checkbox",
//         param: "key"
//     }
// };
//创建嵌套类型表格

//  检测所有子表是否有选中项
const checkChildSelected = (data) => {
    let res = false;
    for(let key in data){
        let item = data[key];
        if(item.checkedAllChild){
            res = true;
            break
        }else{
            let child = item.checkedArrayChild;
            let len = child.length;
            for( let i = 0; i < len; i++){
                if(child[i]){
                    res = true;
                    break
                }
            }
        }
    }
    return res
};

//  检测主表是否有选中项
const checkOutTableSelected = (data) => {
    let i = data.length;
    let res = false;
    while(i--){
        if(data[i]){
            res = true;
            break;
        }
    }
    return res
};

//  检测主表是否全选
const checkOutTableAllSelected = (Obj) => {
    let out = Obj.mainCheckObj;
    let len = out.checkedArray.length;
    out.checkedAll = true;
    while (len -- ){
        if(!out.checkedArray[len]){
            out.checkedAll = false;
            break
        }
    }
};

export function createInsertTable(id, { setTableBodyData, pageIndexChange, pageSizeChange, onAllCheckChangeEve,rowCheckChange, comType, needIndex = true }) {

    if(!this.state.meta){
        return false
    }
    if(!this.state.meta.hasOwnProperty('insertTable') || !this.state.insertTable[id]){
        return false
    }
    this.defPageInfo = {//默认分页信息
        pageSize:10,
        pageIndex:1,
        totalPageIndex:5,
    };
    let currentTable = this.state.insertTable[id];
    let data = currentTable.outerData;
    let pageInfo =  Object.assign(this.defPageInfo, currentTable.pageInfo);
    let pageSize = pageInfo.pageSize;
    let pageIndex = pageInfo.pageIndex;
    let totalPage = Math.ceil(pageInfo.total/ pageSize);

    this.setTableBodyData = setTableBodyData;//设置内嵌表格数据
    this.pageIndexChange = pageIndexChange; //切换分页
    this.pageSizeChange = pageSizeChange; //切换每页显示条数

    let columns = this.state.meta.insertTable[id].columns;

    // let check = (flag, obj) => {
    //     console.log(flag);
    //     console.log(obj);
    // };

    //切换分页
    const pageIndexChanges = (eventKey) => {
        data = this.pageIndexChange(eventKey);
        pageIndex = eventKey;
        this.setState(this.state);
    };

    //每页显示条数
    const pageSizeSelect = (val) => {
        data = this.pageSizeChange(val);
        pageSize = val;
        this.setState(this.state);
    };

    //===========================子表添加复选框===========================================

    //子表复选框全选
    const onAllCheckChangeChild = (record,index) => {
        let checkedArray = [];
        let mainCheckObj = currentTable.childCheckObj[record.key];
        for (var i = 0; i < mainCheckObj.checkedArrayChild.length; i++) {
            checkedArray[i] = !mainCheckObj.checkedAllChild;
        }
        currentTable.mainCheckObj.checkedArray[index] =  mainCheckObj.checkedAllChild = !mainCheckObj.checkedAllChild;
        mainCheckObj.checkedArrayChild = checkedArray;
        checkOutTableAllSelected(currentTable);

        this.setState(this.state);

        // onAllCheckChangeEve(mainCheckObj.checkedAllChild,currentTable.mainCheckObj.data,currentTable.bodyData)
    };

    //子表复选框单个勾选
    const onCheckboxChangeChild = (text, record, index, parents, parentsIndex) => {
        let allFlag = false;
        let childCheckObj = currentTable.childCheckObj[parents.key];
        childCheckObj.checkedArrayChild[index] = !childCheckObj.checkedArrayChild[index];

        for (var i = 0; i < childCheckObj.checkedArrayChild.length; i++) {
            if (!childCheckObj.checkedArrayChild[i]) {
                allFlag = false;
                break;
            } else {
                allFlag = true;
            }
        }
        currentTable.mainCheckObj.checkedArray[parentsIndex] = childCheckObj.checkedAllChild = allFlag;
        checkOutTableAllSelected(currentTable);
        this.setState(this.state);
        // rowCheckChange(checkedArrayChild[index],currentTable.bodyData.data[bodyKey])
    };

    //子表  表格和复选框列组合到一起
    const renderColumnsMultiSelectChild = (columns, records, indexs) => {
        // if(!currentTable.childCheckObj.hasOwnProperty(bodyKey)){
        //     return false
        // }
        let { checkedAllChild, checkedArrayChild } = currentTable.childCheckObj[records.key];
        let { multiSelect } = defaultProps;
        let indexCol = [
            {
                label:'序号',
                attrcode: "indexCol",
                dataIndex: "indexCol",
                render:(text, record2, index) => {
                    return (
                        <span>
                            {index + 1}
                        </span>
                    )
                }
            }
        ]; // 添加序号列
        let newColumn = columns;
        if(needIndex){
            newColumn = indexCol.concat(newColumn);
        }

        let indeterminate_bool = false;
        if (multiSelect && multiSelect.type === "checkbox") {
            let i = checkedArrayChild.length;
            while(i--){
                if(checkedArrayChild[i]){
                    indeterminate_bool = true;
                    break;
                }
            }
            let defaultColumns = [
                {
                    label: (
                        <Checkbox
                            className="table-checkbox"
                            checked={checkedAllChild}
                            indeterminate={indeterminate_bool&&!checkedAllChild}
                            onChange={ onAllCheckChangeChild.bind(this, records, indexs) }
                        />
                    ),
                    attrcode: "checkbox",
                    dataIndex: "checkbox",
                    width: "5%",
                    render: (text, record, index) => {
                        return (
                            <Checkbox
                                className="table-checkbox"
                                checked={checkedArrayChild[index]}
                                onChange={onCheckboxChangeChild.bind(this, text, record, index, records,indexs)}
                            />
                        );
                    }
                }
            ];
            newColumn = defaultColumns.concat(newColumn);
        }

        return newColumn;
    };

    //表格展开显示的内容
    const expandedRowRender = (record, index) => {
        if(JSON.stringify(currentTable.bodyData.column) == "{}"){
            return false
        }
        if(!currentTable.childCheckObj.hasOwnProperty(record.key)){
            return false
        }

        //  根据组件类型，判断是否带复选框
        let newColumn = currentTable.bodyData.column;
        let classByType = null;
        if(comType == 'hasCheckBox_child'){
            newColumn = renderColumnsMultiSelectChild.call(this,newColumn, record, index);
        }

        if (JSON.stringify(currentTable.bodyData) !== "{}" && currentTable.bodyData.data.hasOwnProperty(record.key)) {
            return (
                <Table
                    columns={ createNewCol(newColumn) }
                    data={ createNewData(currentTable.bodyData.data[record.key].rows) }
                    // data={ index==0?createNewData(data1.rows):createNewData(data2.rows) }
                />
            );
        }
    };

    //当点击展开的时候才去请求内嵌表格数据
    const getData = (expanded, record,index) => {
        if (expanded) {
            bodyKey = record.key;
            currentRowIndex = record.rowIndex;

            //判断是否已经有该子表数据，如果有，不需要再次请求。
            let hasThisChild = currentTable.childCheckObj.hasOwnProperty(bodyKey);
            this.setTableBodyData(record,hasThisChild);
        }
    };

//============================================添加复选框==================================

    //主表复选框全选点击事件
    const onAllCheckChange = () => {
        let checkedArray = [];
        let mainCheckObj = currentTable.mainCheckObj;
        for (var i = 0; i < mainCheckObj.checkedArray.length; i++) {
            checkedArray[i] = !mainCheckObj.checkedAll;
        }
        mainCheckObj.checkedAll = !mainCheckObj.checkedAll;
        mainCheckObj.checkedArray = checkedArray;
        let childCheckObj =  currentTable.childCheckObj;
        //设置子表勾选
       for (let key in childCheckObj){
           childCheckObj[key].checkedAllChild = mainCheckObj.checkedAll;
           childCheckObj[key].checkedArrayChild = childCheckObj[key].checkedArrayChild.map((val) => {
               val = mainCheckObj.checkedAll;
               return val
           })
       }


        this.setState(this.state);

        if(typeof onAllCheckChangeEve === 'function'){
            onAllCheckChangeEve(currentTable.mainCheckObj.checkedAll,currentTable.mainCheckObj.data,currentTable.bodyData)
        }
    };

    //主表复选框单个勾选
    const onCheckboxChange = (text, record, index) => {
        let allFlag = false;
        let thisKey = record.key;
        let mainCheckObj = currentTable.mainCheckObj;
        mainCheckObj.checkedArray[index] = !mainCheckObj.checkedArray[index];
        for (var i = 0; i < mainCheckObj.checkedArray.length; i++) {
            if (!mainCheckObj.checkedArray[i]) {
                allFlag = false;
                break;
            } else {
                allFlag = true;
            }
        }
        mainCheckObj.checkedAll = allFlag;

        //设置子表勾选
        if(JSON.stringify(currentTable.childCheckObj) !== '{}' && currentTable.childCheckObj.hasOwnProperty(thisKey)){
            currentTable.childCheckObj[thisKey].checkedAllChild = mainCheckObj.checkedArray[index];
            currentTable.childCheckObj[thisKey].checkedArrayChild.map((val,ind) => {
                currentTable.childCheckObj[thisKey].checkedArrayChild[ind] = mainCheckObj.checkedArray[index];
            });
        }

        this.setState(this.state);
        if(typeof rowCheckChange === 'function'){
            rowCheckChange(checkedArray[index],currentTable.mainCheckObj.data[index])
        }

    };

    //主表  表格和复选框列组合到一起
    const renderColumnsMultiSelect = (columns) => {
        const { data,checkedArray } = currentTable.mainCheckObj;
        const { multiSelect } = defaultProps;
        let indeterminate_bool = false;  //主表半选
        let indexCol = [
            {
                label:'序号',
                attrcode: "indexCol",
                dataIndex: "indexCol",
                render:(text, record, index) => {
                    return (
                        <span>
                            {index + 1}
                        </span>
                    )
                }
            }
        ]; // 添加序号列
        let newColumn = columns;
        if(needIndex){
            newColumn = indexCol.concat(newColumn);
        }

        if (multiSelect && multiSelect.type === "checkbox") {
            if(comType === 'hasCheckBox_child'){
                indeterminate_bool =  checkOutTableSelected(checkedArray);
                if(!indeterminate_bool){
                    indeterminate_bool = checkChildSelected(currentTable.childCheckObj)
                }
            }else{
                indeterminate_bool = checkOutTableSelected(checkedArray);
            }

            let defaultColumns = [
                {
                    label: (
                        <Checkbox
                            className="table-checkbox"
                            checked={currentTable.mainCheckObj.checkedAll}
                            indeterminate={indeterminate_bool&&!currentTable.mainCheckObj.checkedAll}
                            onChange={onAllCheckChange.bind(this)}
                        />
                    ),
                    attrcode: "checkbox",
                    dataIndex: "checkbox",
                    width: "5%",
                    render: (text, record, index) => {
                        let indeterminate_bool_child = false; //子表半选
                        if(currentTable.childCheckObj && currentTable.childCheckObj.hasOwnProperty(record.key)){
                            let checkedArrayChild = currentTable.childCheckObj[record.key].checkedArrayChild;
                            let i = checkedArrayChild.length;

                            while(i--){
                                if(checkedArrayChild[i]){
                                    indeterminate_bool_child = true;
                                    break;
                                }
                            }
                        }


                        return (
                            <Checkbox
                                className="table-checkbox"
                                checked={currentTable.mainCheckObj.checkedArray[index]}
                                indeterminate={indeterminate_bool_child&&!currentTable.mainCheckObj.checkedArray[index]}
                                onChange={onCheckboxChange.bind(this, text, record, index)}
                            />
                        );
                    }
                }
            ];
            newColumn = defaultColumns.concat(newColumn);
        }

        return newColumn;
    };

    if(data && currentTable.firstTime){
        currentTable.firstTime = false;
        //初始化内嵌表格数据
        currentTable.bodyData = {
            column:{},
            data:{}
        };
        currentTable.childCheckObj = {};

        //初始化复选框
        currentTable.mainCheckObj = {
            checkedAll:false,
            checkedArray: [],
            data: data
        };
        //设置每行是否勾选
        data.map((val,index)=>{
            currentTable.mainCheckObj.checkedArray.push(false)
        });
    }

    //  根据组件类型，判断是否带复选框
    let column = columns;
    let classByType = null;
    if(comType == 'hasCheckBox' || comType == 'hasCheckBox_child'){
        column = renderColumnsMultiSelect.call(this,columns);
        classByType = 'hasCheckBox'
    }

    // 处理模板
    const createNewCol = (column) => {
        return  column.map((item) => {
            let render = null;
            if(item.label !== '操作' && item.attrcode !== 'checkbox' && item.attrcode !== 'indexCol'){
                render = (text, record, index) => {
                    let display = record[item.attrcode].display;
                    let value = record[item.attrcode].value;
                    let dom = '';
                    if(display || display == 0){
                        dom = display
                    }else{
                        dom = value
                    }
                    return (
                        <span>
                            {dom}
                        </span>
                    )
                };
            }else{
                render = item.render
            }
            return {...item,render, key:item.attrcode, title:item.label}
        });
    };

    //  处理数据
    const createNewData = (data) => {
        let datas = [];
        data.map((val,index) => {
            datas.push(val.values)
        });
        return datas
    };

    return (
        <div className={["insertTable",classByType].join(' ')}>
            <NCTable
                columns={createNewCol(column)}
                data={createNewData(currentTable.mainCheckObj.data)}
                onExpand={getData.bind(this)}
                expandedRowRender={expandedRowRender.bind(this)}
            />
            <Col md={12} xs={12} sm={12}>
                <NCSelect className="pageSizeDom"
                          size="lg"
                          defaultValue={pageSize}
                          style={{width: 100, marginRight: 6}}
                          onChange={pageSizeSelect.bind(this)}
                >
                    <NCOption value={5}>5条/页</NCOption>
                    <NCOption value={10}>10条/页</NCOption>
                    <NCOption value={20}>20条/页</NCOption>
                    <NCOption value={50}>50条/页</NCOption>
                    <NCOption value={100}>100条/页</NCOption>
                </NCSelect>

                {pageInfo ? <Pagination
                    className="Pagination"
                    first
                    last
                    prev
                    next
                    boundaryLinks
                    items={totalPage}   //总页数
                    maxButtons={5}  //显示最多页数按钮
                    activePage={pageIndex}
                    onSelect={pageIndexChanges.bind(this)}
                /> : ""}
            </Col>
        </div>
    );
}

