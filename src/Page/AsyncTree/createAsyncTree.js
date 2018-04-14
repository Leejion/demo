/**
 * Created by wangshhj on 2018/3/9.
 */
import React, {Component} from 'react';
import {Tree} from 'tinper-bee';
import PropTypes from 'prop-types';

const TreeNode = Tree.TreeNode;

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

let lastData = []; //记录上次点击的节点

// 创建树
function createAsyncTree ({treeId, onSelectEve, loadTreeData, onSelectedChange, userDefine }) {
    if(!this.state.treeData.hasOwnProperty(treeId) ){
        this.state.treeData[treeId] = {
            onSelectedChange:onSelectedChange   //  树组件change事件监听
        };
        return false
    }
    if( !(this.state.treeData[treeId].hasOwnProperty('data') &&  this.state.treeData[treeId].data.length > 0) ){
        return false
    }
    let thisTree = this.state.treeData[treeId];
    let treeData = thisTree.data;
    thisTree.currentTree = null;//保存当前点击的树节点pk
    // thisTree.treeNode = null;   //节点对象

    // 点击节点事件
    let onSelect = (pk, node) => {
        thisTree.currentTree = pk;
        let isChange = ()=> lastData[0] !== pk[0];
        if (onSelectEve && typeof onSelectEve === 'function' && pk.length !== 0) {
            onSelectEve(pk, getItem(treeData, pk[0]), isChange());
            if( isChange() ){
                if( thisTree.onSelectedChange ){
                    thisTree.onSelectedChange()
                }
            }
            lastData[0] = pk[0];
        }
    };

    // 展开子元素事件
    let onLoadData = (treeNode) => {
        if( loadTreeData ){
            return new Promise((resolve) => {
                // thisTree.treeNode = treeNode;
                loadTreeData(treeNode.props.eventKey, treeNode);
                resolve();
            });
        }
    };

    // 组装树 结构
    const loop = data => data.map((item) => {
        if (item.children) {
            return <TreeNode title={item.refname} key={item.key}>{loop(item.children)}</TreeNode>;
        }
        return <TreeNode title={item.refname} key={item.key} isLeaf={item.isleaf} disabled={item.key === '0-0-0'}/>;
    });
    const treeNodes = loop(treeData);

    return (
        <div>
            { userDefine?userDefine():null }
            <Tree onSelect={ onSelect.bind(this) } loadData={ onLoadData.bind(this) }>
                {treeNodes}
            </Tree>
        </div>

    );
}
export default createAsyncTree;


