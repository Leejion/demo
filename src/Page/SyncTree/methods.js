/**
 * Created by wangshhj on 2018/3/9.
 */
import {Tree} from 'tinper-bee';

//  获取树节点
const getItem = (treeData, pk) => {
    if (!pk) {
        return treeData
    }
    let length = treeData.length;
    for (let i = 0; i < length; i++) {
        let item = treeData[i];
        if (item.refpk === pk) {
            return item;
        } else if (item.hasOwnProperty('children')) {
            let res = getItem(item.children, pk);
            if (res) {
                return res;
            }
        }
    }
};

// 重置节点item
function resetItem(tree, thisTree) {
    let length = tree.length;
    let pk = thisTree.refpk;
    for (let i = 0; i < length; i++) {
        if (tree[i].refpk == pk) {
            tree[i] = thisTree;
            break
        } else if (tree[i].hasOwnProperty('children')) {
            resetItem(tree[i].children, pk)
        }
    }
}

//  新增节点，插入到对应的父节点中
function addNodeFun(treeData, child) {
    if (!child.hasOwnProperty('pid')) {
        treeData.push(child);
        return
    }
    const loop = (data) => {
        data.forEach((item) => {
            if (item.refpk === child.pid) {
                if (item.hasOwnProperty('children')) {
                    item.children.push(child);
                } else {
                    item.children = [child]
                }
            } else if (item.hasOwnProperty('children')) {
                loop(item.children, child)
            }
        });
    };
    loop(treeData);
}

//  编辑节点，更新节点
function renewNodeFun(treeData, child) {
    const loop = (data) => {
        let len = data.length;
        for (let i = 0; i < len; i++) {
            let item = data[i];
            if (item.refpk === child.refpk) {
                data[i] = child;
                break
            } else if (item.hasOwnProperty('children')) {
                loop(item.children, child)
            }
        }
    };
    loop(treeData);
}

//  删除节点
function delNode(tree, key) {
    tree.forEach((data, index) => {
        if (data.refpk === key) {
            tree.splice(index, 1)
        } else {
            if (data.hasOwnProperty('children')) {
                delNode(data.children, key)
            }
        }
    })
}

// 设置节点不可用
function setNodeDisableEve(treeData, disable, pk) {
    let len = treeData.length;
    for(let i = 0; i < len; i++){
        let item = treeData[i];
        if(pk){
            if( item.refpk === pk ){
                treeData[i].disabled = disable;
                break
            }
        }else{
            treeData[i].disabled = disable;
        }
        if (item.hasOwnProperty('children')) {
            setNodeDisableEve(item.children, disable, pk)
        }
    }
    return treeData
}

// 设置树 数据
export function setSyncTreeData(id, datas) {
    this.state.treeData[id].firstTime = true;  // 首次渲染
    if (Object.prototype.toString.call(datas) !== "[object Array]") {
        alert("setSyncTreeData方法data参数为数组");
        return false
    }
    this.state.treeData[id].data = datas;
    this.setState({
        treeData: this.state.treeData
    }, () => {
        if (this.state.treeData[id].onSelectedChange) {
            this.state.treeData[id].onSelectedChange();
        }
    })
}

// 编辑成功调用方法
export function editNodeSuccess(id, newItem) {
    let thisTree = this.state.treeData[id];
    // resetItem(thisTree.data, thisTree.saveItem);
    renewNodeFun(thisTree.data, newItem);
    this.setState({
        treeData: this.state.treeData
    })

}

// 新增节点成功调用方法
export function addNodeSuccess(id, data) {
    let thisTree = this.state.treeData[id];
    addNodeFun(thisTree.data, data);
    thisTree.firstTime = true;  //新增节点成功时，需要重新分割当前树，用于查询定位树节点
    this.setState({
        treeData: this.state.treeData
    })
}

// 删除节点成功调用
export function delNodeSuceess(id, pk) {
    let thisTree = this.state.treeData[id];
    delNode(thisTree.data, pk);
    this.setState({
        treeData: this.state.treeData
    })

}

//  获取树某个节点或整个树信息
export function getSyncTreeValue(id, pk) {
    if (this.state.treeData.hasOwnProperty(id)) {
        return getItem(this.state.treeData[id].data, pk)
    } else {
        console.warn('getSyncTreeValue,没有找到树组件id');
        return null
    }
}

//  设置节点不可用
export function setNodeDisable(id, disable, pk) {
    this.state.treeData[id].data =  setNodeDisableEve(this.state.treeData[id].data, disable, pk);
    this.setState({
        treeData: this.state.treeData
    })
}

//  设置树的编辑性
export function setTreeEdit(id, status) {
    let thisTree = this.state.treeData[id];
    if(thisTree.editType !== status){
        if(thisTree.onTreeStatusChange){
            thisTree.onTreeStatusChange()
        }
    }
    this.state.treeData[id].editType = status;
    this.setState({
        treeData: this.state.treeData
    })
}