import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
// import { createPage, ajax, base } from 'nc-lightapp-front';
// const { NCButton, NCFromControl } = base;
import {createPage, ajax, base} from '../../src';
 import { NCDatePicker, NCButton, NCBreadcrumb} from '../../src/base';
import {searchBtnClick, pageInfoClick, initTemplate, afterEvent, buttonClick, headerButtonClick, clickSearchBtn } from './events';
import './index.less';
const NCBreadcrumbItem = NCBreadcrumb.NCBreadcrumbItem;

const NCTree = base.NCTree;

class SyncTree extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        let { form, button, table, search ,syncTree } = this.props;
        let { setSyncTreeData } = syncTree;
        this.setSyncTreeData = setSyncTreeData;   //设置树根节点数据方法
        this.state = {
            showHide: false,
            editTree:false
        }
    }

    componentDidMount () {
        // this.queryTreeData('root');
        let that = this;
        let treeData = null;
        setTimeout(() => {
            treeData = {
                "data": {
                    "page": {"pageIndex": "0", "pageSize": "10", "total": "0", "totalPage": "3"},
                    "rows": [
                        {
                            "disabled":true,
                            "isleaf": false,
                            "pid": "1001A110000000001UPS",
                            "refcode": "040001",
                            "refname": "中国建设银行上海支行",
                            "refpk": "1001A110000000001UPa",
                            "values": {},
                            "children":[
                                {
                                    "isleaf": true,
                                    "pid": "1001A110000000001UPa",
                                    "refcode": "040001",
                                    "refname": "中国建设银行上海某某地支行",
                                    "refpk": "1001A110000000001U12",
                                    "values": {}
                                },
                            ]
                        },
                        {
                            "isleaf": true,
                            "pid": "1001A110000000001UPS",
                            "refcode": "040001",
                            "refname": "中国工商银行天安支行",
                            "refpk": "1001A110000123144",
                            "values": {}
                        },
                        {
                            "isleaf": true,
                            "pid": "1001A110000000002233",
                            "refcode": "040001",
                            "refname": "中国农业银行天安支行",
                            "refpk": "1001A110000022323",
                            "values": {}
                        },
                        {
                            "isleaf": false,
                            "pid": "1001A110000000044442",
                            "refcode": "040001",
                            "refname": "中国招商银行天安支行",
                            "refpk": "1001A110000000001Uvv",
                            "values": {},
                            "children":[
                                {
                                    "isleaf": false,
                                    "pid": "1001A110000000001Uvv",
                                    "refcode": "040001",
                                    "refname": "中国招商银行广州支行",
                                    "refpk": "1001A1100000000023232",
                                    "values": {},
                                    "children":[
                                        {
                                            "isleaf": true,
                                            "pid": "1001A110000000001U12",
                                            "refcode": "040001",
                                            "refname": "中国招商银行广州天河路支行",
                                            "refpk": "1001A1100000000566",
                                            "values": {}
                                        },
                                    ]
                                },
                            ]
                        },
                    ]
                }, "error": null, "success": true
            };
            that.setSyncTreeData('tree1', treeData.data.rows, this.onSelectChange)
        }, 1000);
    }

    // 编辑修改树节点事件
    editNodeCallBack( data, pk, item ) {
        console.log(data, item);
        // ajax 请求成功后，调用
        let newItem =  {
            "isleaf": true,
            "pid": item.pid,
            "refcode": "040001",
            "refname": '888888',
            "refpk": "1001A110000000001U12",
            "values": {}
        };
        this.props.syncTree.editNodeSuccess('tree1',newItem)
    };

    // 新增树节点事件
    addNodeCallBack (data, parpk) { //name:新增节点名称； parpk: 当前点击新增的节点pk
        // ajax 请求成功后，调用
        let newNode =  {
                "isleaf": true,
                "pid": parpk,
                "refcode": "040001",
                "refname": '666',
                "refpk": "1001A110000000001U12",
                "values": {}
            };
        this.props.syncTree.addNodeSuccess('tree1',newNode)
    };

    // 删除树节点事件
    delNodeCallBack (pk) { //pk: 要删除节点的pk
        console.log(pk)
        // ajax 请求成功后，调用
        this.props.syncTree.delNodeSuceess('tree1',pk)
    };

    onSelectEve (data, item, isChange) {
        console.log(data, item, isChange)
    }

    onSelectChange (){
        console.log('change22')
    }

    createTree (){
        let that = this;
        let treeData = null;
        // setTimeout(() => {
        //     treeData = {
        //         "data": {
        //             "page": {"pageIndex": "0", "pageSize": "10", "total": "0", "totalPage": "3"},
        //             "rows": [
        //                 {
        //                     "isleaf": false,
        //                     "pid": "1001A110000000001UPS",
        //                     "refcode": "040001",
        //                     "refname": "中国建666666",
        //                     "refpk": "1001A110000000001UPa",
        //                     "values": {},
        //                     "children":[
        //                         {
        //                             "isleaf": true,
        //                             "pid": "1001A110000000001UPa",
        //                             "refcode": "040001",
        //                             "refname": "中国建设银行上海某某地支行",
        //                             "refpk": "1001A110000000001U12",
        //                             "values": {}
        //                         },
        //                     ]
        //                 },
        //                 {
        //                     "isleaf": true,
        //                     "pid": "1001A110000000001UPS",
        //                     "refcode": "040001",
        //                     "refname": "中国工商银行天安支行",
        //                     "refpk": "1001A110000123144",
        //                     "values": {}
        //                 },
        //                 {
        //                     "isleaf": true,
        //                     "pid": "1001A110000000002233",
        //                     "refcode": "040001",
        //                     "refname": "中国农业银行天安支行",
        //                     "refpk": "1001A110000022323",
        //                     "values": {}
        //                 },
        //                 {
        //                     "isleaf": false,
        //                     "pid": "1001A110000000044442",
        //                     "refcode": "040001",
        //                     "refname": "中国招商银行天安支行",
        //                     "refpk": "1001A110000000001Uvv",
        //                     "values": {},
        //                     "children":[
        //                         {
        //                             "isleaf": false,
        //                             "pid": "1001A110000000001Uvv",
        //                             "refcode": "040001",
        //                             "refname": "中国招商银行广州支行",
        //                             "refpk": "1001A1100000000023232",
        //                             "values": {},
        //                             "children":[
        //                                 {
        //                                     "isleaf": true,
        //                                     "pid": "1001A110000000001U12",
        //                                     "refcode": "040001",
        //                                     "refname": "中国招商银行广州天河路支行",
        //                                     "refpk": "1001A1100000000566",
        //                                     "values": {}
        //                                 },
        //                             ]
        //                         },
        //                     ]
        //                 },
        //             ]
        //         }, "error": null, "success": true
        //     };
        //     that.setSyncTreeData('tree1', treeData.data.rows, this.onSelectChange)
        // }, 1000)

        // let data = this.props.syncTree.getSyncTreeValue('tree1','1001A110000000001UPa')
        // console.log(data)

        // this.props.syncTree.delNodeSuceess('tree1','1001A110000000001UPa')
        // this.props.syncTree.setNodeDisable('tree1', true,'1001A110000123144')

        this.setState({
            editTree:!this.state.editTree
        })
    }

    //  自定义dom
    defineEve () {
        return (
            <div>
                我是自定义dom
            </div>
        )
    }

    render() {
        const {table, button, search, form, editTable, syncTree, modal } = this.props;
        let {createEditTable} = editTable;
        const {createForm} = form;
        const {createSimpleTable} = table;
        const {createButton} = button;
        const {NCCreateSearch} = search;
        const {activeKey, showSearch, orderdateVal} = this.state;
        let {createSyncTree} = syncTree;
        let { createModal } = modal;

        return (
            <div className="bankPage">
                <button onClick={ this.createTree.bind(this) }>再次创建树</button>
                {createButton('modalButton_info', { name: '弹窗消息', onButtonClick: buttonClick.bind(this) })}
                <div>
                    <h1>面包屑NCBreadcrumb,NCBreadcrumbItem的使用实例</h1>
                    <NCBreadcrumb>
                        <NCBreadcrumbItem className="breadItem" href="#">
                            Home
                        </NCBreadcrumbItem>
                        <NCBreadcrumbItem className="breadItem">
                            Library
                        </NCBreadcrumbItem>
                        <NCBreadcrumbItem active >
                            Data
                        </NCBreadcrumbItem>
                    </NCBreadcrumb>
                </div>

                <div className="leftBox">
                    { createSyncTree({
                        treeId:'tree1', // 组件id
                        // needSearch:false //是否需要查询框，默认为true,显示。false: 不显示
                        // needEdit:this.state.editTree,  //是否需要编辑节点功能，默认为true,可编辑；false：不可编辑
                        // editNodeCallBack: this.editNodeCallBack.bind(this),//编辑节点回调方法
                        // addNodeCallBack: this.addNodeCallBack.bind(this),//  新增节点回调方法
                        // delNodeCallBack: this.delNodeCallBack.bind(this),//删除节点回调方法
                        onSelectEve: this.onSelectEve.bind(this),   //选择节点回调方法
                        // onSelectedChange:this.onSelectChange.bind(this)  //监听选择节点改变事件
                        // userDefine:this.defineEve.bind(this) // 业务组自定义dom事件,布局放在树最上面
                    })}
                </div>

            </div>
        )
    }
}

export default createPage({
    initTemplate: initTemplate,
})(SyncTree);