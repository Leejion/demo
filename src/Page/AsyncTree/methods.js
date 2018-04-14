/**
 * Created by wangshhj on 2018/3/9.
 */
import {Tree} from 'tinper-bee';
import { delNodeSuceess, getSyncTreeValue, editNodeSuccess, setNodeDisable } from '../SyncTree'

//  获取树节点
const getItem = ( treeData, pk ) => {
    if(!pk){
        return treeData
    }
    let length = treeData.length;
    for (let i=0 ;i < length; i++){
        let item = treeData[i];
        if(item.refpk === pk){
            return item;
        }else if(item.hasOwnProperty('children')){
            let res = getItem(item.children, pk);
            if(res){
                return res;
            }
        }
    }
};

//  插入对应的 树 子节点数据
function getNewTreeData(treeData, parentKey, child, level) {
    const loop = (data) => {
        if (child.length == 0) {
            return false
        }

        data.forEach((item) => {
            if (item.children) {
                loop(item.children);
            } else {
                if (item.key === child[0].pid) {
                    item.children = child;
                }
            }
        });
    };
    loop(treeData);
}

// 新增节点，插入节点
function addTreeNode(treeData, data) {
    let pid = data.pid;
    if(pid){
        let len = treeData.length;
        for (let i = 0; i < len; i++){
            let node = treeData[i];
            if(node.refpk === pid){
                if(node.children){
                    node.children.push(data)
                }else{
                    node.children = [data]
                }
                break
            }else if(node.hasOwnProperty(children)){
                addTreeNode(node.children, data)
            }
        }
    }else{
        if(data.hasOwnProperty('refpk')){
            treeData.push(data)
        }else{
            console.warn('addTreeNode方法，参数data格式不正确')
        }
    }
}

// 组装树组件需要的结构
let createNewData = (val) => {
    if(Object.prototype.toString.call(val) === "[object Array]"){
        val.map((item, index) => {
            item.key = item.refpk;
        });
    }else if(val.refpk){
        val.key = val.refpk;
    }else{
        console.error('createNewData, 异步树，数据格式不正确')
    }
    return val
};

// 设置树 数据
export function setTreeData(id, datas, treeNode) {
    let data = null;
    if(datas &&  Object.prototype.toString.call(datas) == "[object Array]"){
        data = createNewData(datas)
    }
    // let treeNode = this.state.treeData[id].treeNode;
    if (!treeNode) {    //判断是否是根节点; 不是根节点要去找对应的父节点插入child
        this.state.treeData[id].data = data;
    } else {
        getNewTreeData(this.state.treeData[id].data, treeNode.props.eventKey, data, 2);
    }
    this.setState({
        treeData: this.state.treeData
    },()=>{
        if(this.state.treeData[id].onSelectedChange && !treeNode){
            this.state.treeData[id].onSelectedChange()
        }
    })
}

//  添加树节点
export function addTreeData(id, datas) {
    let data = createNewData(datas);
    let treeData = this.state.treeData[id].data;
    addTreeNode(treeData, data);
    this.setState({
        treeData: this.state.treeData
    })
}

//  获取树某个节点或整个树信息
export function getAsyncTreeValue(id,pk) {
    return getSyncTreeValue.call(this, id, pk)
    // if(this.state.treeData.hasOwnProperty(id)){
    //     return getItem(this.state.treeData[id].data, pk)
    // }else{
    //     console.warn('getSyncTreeValue,没有找到树组件id');
    //     return null
    // }
}

// 删除树节点
export function delTreeData(id, pk) {
    delNodeSuceess.call(this, id, pk)
}

// 编辑树节点
export function editTreeData(id, newItem) {
    editNodeSuccess.call(this, id, newItem)
}

//  设置节点不可用
export function setAsyncNodeDisable(id, disable, pk) {
    setAsyncNodeDisable.call(this, this.state.treeData[id].data, disable, pk);
}

