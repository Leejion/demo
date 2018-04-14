/**
 * Created by wangshhj on 2018/3/9.
 */
import React, {Component} from 'react';
import {Tree} from 'tinper-bee';
import PropTypes from 'prop-types';
import {NCInput, NCIcon} from '../../base';
import deepClone from '../../public/deepClone';
import './syncTree.less'

const TreeNode = Tree.TreeNode;
//  查询功能用；
const dataList = [];
//  保存当前操作节点信息
const current = {
    key: '',
    item: ''
};

//  拆分数据，用于查询关键字
const generateList = (data) => {
    for (let i = 0; i < data.length; i++) {
        const node = data[i];
        const key = node.key;
        dataList.push({
            key,
            title: key
        });
        if (node.children) {
            generateList(node.children, node.key);
        }
    }
};

//  获取符合查询关键字的节点的父节点
const getParentKey = (key, tree) => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
        const node = tree[i];
        if (node.children) {
            if (node.children.some(item => item.key === key)) {
                parentKey = node.key;
            } else if (getParentKey(key, node.children)) {
                parentKey = getParentKey(key, node.children);
            }
        }
    }
    return parentKey;
};

//  删除节点
const delNode = (tree, key) => {
    tree.forEach((data, index) => {
        if (data.key === key) {
            tree.splice(index, 1)
        } else {
            if (data.hasOwnProperty('children')) {
                delNode(data.children, key)
            }
        }
    })
};

//  去掉key ------ 删除不掉？？？？
const delKey = (data) => {
    if (Object.prototype.toString.call(data) === "[object Array]") {
        data.map((item) => {
            item.hasOwnProperty('key') ? delete item.key : item
        })
    } else if (Object.prototype.toString.call(data) === "[object Object]") {
        if (data.hasOwnProperty('key')) {
            delete data.key;
        }
    }
};

const getItem = ( treeData, key ) => {
    if(!key){
        return false
    }
    let length = treeData.length;
    for (let i=0 ;i < length; i++){
        let item = treeData[i];
        if(item.key === key){
            return item;
        }else if(item.hasOwnProperty('children')){
            let res = getItem(item.children, key);
            if(res){
                return res;
            }
        }
    }
};

let lastData = [];   //记录上一次点击树 的节点；

/*
*    创建同步树
*    @ needSearch 是否需要搜索
*    @ needEdit 是否需要编辑
*    @ onSelectEve 点击节点事件
*    @ onSelectedChange 节点选择改变监听事件
*    @  userDefine 业务自定义添加dom事件
* */
function createSyncTree({
                            treeId,
                            needSearch = true, //是否需要搜索框
                            needEdit = true, // 是否需要编辑树
                            editNodeCallBack, //编辑 回调
                            addNodeCallBack, //新增回调
                            delNodeCallBack, // 删除回调
                            onSelectEve,    //节点点击事件
                            onSelectedChange, // 节点选择改变事件
                            userDefine ,    //业务自定义dom插入
                            onTreeStatusChange  //树 编辑态改变监听事件


} = {}) {
    let thisTree = this.state.treeData[treeId];
    if (!thisTree) {
        thisTree = this.state.treeData[treeId] = {};
        // let thisTree = this.state.treeData[id];
        thisTree.onSelectedChange = onSelectedChange;
        thisTree.onTreeStatusChange = onTreeStatusChange;
        thisTree.currentTree = null;//保存当前点击的树节点pk
        thisTree.treeNode = null;   //节点对象
        thisTree.expandedKeys = []; // 查询定位后树结构
        thisTree.searchValue = '';  //查询值
        thisTree.autoExpandParent = true;  //是否展开父节点
        thisTree.addNodeName = '';  //新增节点名称
        thisTree.saveItem = '';  //保存当前操作节点对象，用于重置
        thisTree.isHover = "";  // 鼠标滑到某个节点
        thisTree.editKey = "";  //编辑某个节点
        thisTree.ctrlKey = "";  // ctrl + 左击
        thisTree.pkArr = [];  // ctrl + 左击
        thisTree.itemArr = [];  // ctrl + 左击

        //  监听ctrl + 左击
        // document.onclick = (e) => {
        //     console.log(e.ctrlKey)
        //     thisTree.ctrlKey = e.ctrlKey;
        // };
        return false
    }
    if( !(thisTree.hasOwnProperty('data') &&  thisTree.data.length > 0) ){
        return false
    }

    // let treeMeta = null;
    // if( this.state.meta.hasOwnProperty(treeId) ){
    //     treeMeta = this.state.meta[treeId].items;
    // }

    let treeData = thisTree.data;

    //  设置树的编辑性
    let editType = needEdit;
    if(thisTree.hasOwnProperty('editType')){
        editType = thisTree.editType
    }

    // setState
    const setStateEve = (fun) => {
        this.setState({
            treeData: this.state.treeData
        });
    };

    //  节点展开事件
    const onExpand = (expandedKeys) => {
        thisTree.expandedKeys = expandedKeys; // 查询定位后树结构
        thisTree.autoExpandParent = false;  //是否展开父节点
        setStateEve()
    };

    //  输入框模糊查询树节点
    const searchChange = (value) => {
        const expandedKeys = [];
        dataList.forEach((item) => {
            if (item.key.indexOf(value) > -1) {
                expandedKeys.push(getParentKey(item.key, treeData));
            }
        });
        const uniqueExpandedKeys = [];
        expandedKeys.forEach((item) => {
            if (item && uniqueExpandedKeys.indexOf(item) === -1) {
                uniqueExpandedKeys.push(item);
            }
        });
        thisTree.expandedKeys = uniqueExpandedKeys;
        thisTree.searchValue = value;
        thisTree.autoExpandParent = true;

        if ((!value || value == '') && value !== '0') {
            thisTree.expandedKeys = [];
        }
        setStateEve()
    };

    //  鼠标进入及节点
    const onMouseEnter = (e) => {
        thisTree.isHover = e.node.props.eventKey;
        setStateEve();
    };

    //  鼠标离开节点
    const onMouseLeave = (e, treenode) => {
        thisTree.isHover = "";
        // thisTree.editKey = "";
        setStateEve();
    };

    //  点击编辑图标事件
    const editRender = (item) => {
        // thisTree.editKey = item.key;
        // thisTree.saveItem = deepClone(item);
        // setStateEve();
        current.key = item.key;
        current.item = item;
        // thisTree.addNodeName = '';
        this.form.EmptyAllFormValue(treeId);
        this.modal.show("editNode");
    };

    // 编辑模态框确认按钮事件
    const editNodeEve = () => {
        let data = this.form.getAllFormValue(treeId).rows[0].values;
        console.log(data);
        typeof editNodeCallBack == 'function' ? editNodeCallBack(data, current.item.refpk, current.item) : null;
    };

    //  点击新增图标事件
    const addRender = (item) => {
        current.key = item.key;
        current.item = item;
        thisTree.addNodeName = '';
        this.form.EmptyAllFormValue(treeId);
        this.modal.show("addNode");
    };

    // 新增节点模态框  确定事件
    const addNodeEve = () => {
        let data = this.form.getAllFormValue(treeId).rows[0].values;
        console.log(data);

        typeof addNodeCallBack == 'function' ? addNodeCallBack(data, current.item.refpk, current.item) : null;
    };

    // 新增节点弹出框内容
    const modalContent = () => {
        return (
            <div className="addModal">
                {  this.form.createForm(treeId) }
                {/*<span>节点名称: </span>*/}
                {/*<NCInput*/}
                    {/*className="searchNameInput"*/}
                    {/*value={thisTree.addNodeName}*/}
                    {/*onChange={addNameChange.bind(this)}*/}
                {/*/>*/}
            </div>
        )
    };

    // 新增节点输入框监听change
    const addNameChange = (val) => {
        thisTree.addNodeName = val;
        setStateEve()
    };

    //  点击删除图标事件，删除节点
    const delRender = (item) => {
        current.key = item.key;
        current.item = item;
        this.modal.show("delNode")
    };

    //  提示框确认删除节点事件
    const delNodeEve = () => {
        // ajax请求删除节点，返回成功后，再删除state中的节点
        typeof delNodeCallBack == 'function' ? delNodeCallBack(current.item.refpk) : null;
        // delNode(treeData, current.key);
        // setStateEve();
    };

    // //  编辑节点名称
    // const nodechange = (item, value) => {
    //     item.refname = value;
    // };
    //
    // // 编辑确定图标点击事件
    // const sureRender = (item) => {
    //     typeof editNodeCallBack == 'function' ? editNodeCallBack(item.refpk, item) : null
    // };
    //
    // // 编辑取消图标点击事件
    // const cancelRender = (item) => {
    //     item = thisTree.saveItem;
    //     thisTree.isHover = "";
    //     thisTree.editKey = "";
    //     setStateEve()
    // };

    // 新增根节点
    const addRootEve = () => {
        this.modal.show("addNode");
    };

    //  渲染节点dom
    const renderTreeTitle = (item) => {
        let editIcon, titleInfo, addIcon, delIcon, sureIcon, canceIcon, iconBox;
        let searchValue = thisTree.searchValue;
        const index = item.key.search(searchValue);
        const beforeStr = item.key.substr(0, index);
        const afterStr = item.key.substr(index + searchValue.length);

        //编辑图标
        if (thisTree.isHover == item.key && editType) {
            editIcon = <NCIcon className="title-middle edit-icon" type="uf-pencil"
                               onClick={(e) => editRender.call(this, item)}></NCIcon>;
            addIcon = <NCIcon className="title-middle add-icon" type="uf-plus"
                              onClick={(e) => addRender.call(this, item)}></NCIcon>;
            delIcon = <NCIcon className="title-middle delete-icon" type="uf-del"
                              onClick={(e) => delRender.call(this, item)}></NCIcon>;
            // sureIcon = <NCIcon className="title-middle sure-icon" type="uf-correct"
            //                    onClick={(e) => sureRender.call(this, item)}></NCIcon>;
            // canceIcon = <NCIcon className="title-middle cancel-icon" type="uf-close"
            //                     onClick={(e) => cancelRender.call(this, item)}></NCIcon>;
        }

        //编辑时input框
        // if (thisTree.editKey == item.key && editType) {
        //     titleInfo = <input type="text" id="itemKey" defaultValue={item.refname}
        //                        onChange={(e) => nodechange.call(this, item, e.target.value)}/>;
        //
        //     iconBox = <span>{sureIcon} {canceIcon}</span>
        // } else {
        //     titleInfo = index > -1 ? (
        //         <span className="title-middle">
        //             {beforeStr}
        //             <span className="u-tree-searchable-filter">{searchValue}</span>
        //             {afterStr}
        //         </span>
        //     ) : <span className="title-middle">{item.key}</span>;
        //
        //     iconBox = <span>{editIcon} {addIcon} {delIcon}</span>;
        // }
        titleInfo = index > -1 ? (
            <span className="title-middle">
                    {beforeStr}
                <span className="u-tree-searchable-filter">{searchValue}</span>
                {afterStr}
                </span>
        ) : <span className="title-middle">{item.key}</span>;

        iconBox = <span>{editIcon} {addIcon} {delIcon}</span>;

        return (
            <div className="title-con">
                {titleInfo}
                {iconBox}
            </div>
        );
    };

    // 组织节点dom
    const loop = data => data.map((item) => {
        item.key = item.refname;
        if (item.children) {
            return (
                <TreeNode key={item.key} title={renderTreeTitle.call(this, item)} disabled = { item.disabled }>
                    {loop(item.children)}
                </TreeNode>
            );
        }
        return <TreeNode key={item.key} title={renderTreeTitle.call(this, item)} disabled = { item.disabled }/>;
    });

    //  选择节点回调
    const onSelect = ( pk ,node)=> {
        let selected = node.selected;
        let isChange = ()=> lastData[0] !== pk[0];
        if(onSelectEve && typeof onSelectEve == 'function' && pk.length !== 0){
            let item = getItem( treeData, pk[0] );

            if(thisTree.ctrlKey){
                // thisTree.pkArr.push(item.refpk);
                // thisTree.itemArr.push(item);

            }else{
                onSelectEve(item.refpk, item, isChange() );
            }

            if( isChange() ){
                if( thisTree.onSelectedChange ){
                    thisTree.onSelectedChange()
                }
            }
            lastData[0] = pk[0];
        }
    };

    const treeNodes = loop(treeData);
    if (thisTree.firstTime) {
        dataList.splice(0, dataList.length);
        generateList(treeData);
        thisTree.firstTime = false;
    }

    return (
        <div className="syncTreeCom">
            {/*{editType ? <div className="addRoot" onClick={addRootEve.bind(this)}>新增根节点</div> : null}*/}
            { userDefine ? userDefine():null }
            { needSearch ? <NCInput
                style={{width: 200}}
                placeholder="Search"
                onChange={searchChange.bind(this)}
            /> : null}

            <Tree
                onSelect = { onSelect.bind(this) }
                onExpand={onExpand.bind(this)}    //  节点展开事件
                expandedKeys={thisTree.expandedKeys}    //搜索节点关键字后要展开的父节点
                autoExpandParent={thisTree.autoExpandParent}    //是否展开所有节点
                onMouseLeave={onMouseLeave.bind(this)}    //鼠标进入节点事件
                onMouseEnter={onMouseEnter.bind(this)}    //鼠标离开节点事件
                // multiple = {true} //是否允许选择多个节点
            >
                {treeNodes}
            </Tree>
            {this.modal.createModal('delNode', {
                title: '删除节点',
                content: '确定该删除节点？',
                beSureBtnClick: delNodeEve.bind(this)
            })}
            {this.modal.createModal('addNode', {
                title: '新增节点',
                content: modalContent.call(this),
                beSureBtnClick: addNodeEve.bind(this)
            })}
            {this.modal.createModal('editNode', {
                title: '编辑节点',
                content: modalContent.call(this),
                beSureBtnClick: editNodeEve.bind(this)
            })}
        </div>
    );
}

export default createSyncTree;


