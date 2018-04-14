import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
// import { createPage, ajax, base } from 'nc-lightapp-front';
// const { NCButton, NCFromControl } = base;
import {createPage, ajax, base} from '../../src';
import {NCDatePicker, NCButton} from '../../src/base';
import {searchBtnClick, pageInfoClick, initTemplate, afterEvent, buttonClick, headerButtonClick, clickSearchBtn } from './events';
import './index.less';

const NCTree = base.NCTree;

class treeCard extends Component {
    constructor(props) {
        super(props);
        let { form, button, table, search ,asyncTree } = this.props;
        let { setTreeData } = asyncTree;
        this.setTreeData = setTreeData;   //设置树根节点数据方法
        this.state = {
            showHide: false
        }
    }

    componentWillMount() {
        // this.queryTreeData('root');
        let that = this;
        let treeData = null;
        setTimeout(() => {
            treeData = {
                "data": {
                    "page": {"pageIndex": "0", "pageSize": "10", "total": "0", "totalPage": "3"},
                    "rows": [
                        {
                            "isleaf": false,
                            // "pid": "1001A110000000001UPS",
                            "refcode": "040001",
                            "refname": "中国建设银行上海支行",
                            "refpk": "1001A110000000001UPa",
                            "values": {},
                        },
                        {
                            "isleaf": false,
                            // "pid": "1001A110000000001UPS",
                            "refcode": "040001",
                            "refname": "中国建设银行天安支行",
                            "refpk": "1001A110000000001Uvv",
                            "values": {}
                        },
                    ]
                }, "error": null, "success": true
            };
            that.setTreeData('tree1', treeData.data.rows)
        }, 1000);
    }

    // 树节点 点击事件
    selectTree = (val, node ,treeData) => {
        console.log(val)
        console.log(node)
        console.log(treeData)
    };

    // 树展开子节点事件
    loadTreeData = (pid, treeNode) => {
        // this.queryTreeData(pid)
        setTimeout(()=>{
            let treeData2 = {
                "data": {
                    "page": {"pageIndex": "0", "pageSize": "10", "total": "0", "totalPage": "3"},
                    "rows": [
                        {
                            "isleaf": false,
                            "pid": pid,
                            "refcode": "040001",
                            "refname": "中国建设银行上海北京路支行",
                            "refpk": "1001A11000000000666",
                            "values": {},
                        }
                    ]
                }, "error": null, "success": true
            };
            this.setTreeData('tree1', treeData2.data.rows, treeNode)

        },1000)

    };

    // 请求树 根节点—数据
    queryTreeData = (pid) => {
        let that = this;
        let data = {
            "pid":pid,
            "keyword":"",
            "pageInfo":{
                "pageIndex":0,
                "pageSize":10,
                "total":0,
                "totalPage":0
            },
            "queryCondition":{}
        };
        ajax({
            loading: true,
            url: '/ncdemo-web/bd/basedoc/regiontree.do',
            data: data,
            success: function (res) {
                console.log(res);
                if(res.success){
                    that.setTreeData('tree1', res.data.rows)
                }else {
                    alert(res.message)
                }
            },
            error: function (res) {
                alert(res.message)
            }
        });
    };

    componentDidMount() {
        const _this = this;
    }

    //  控制表单显隐性
    showHide = () => {
        this.setState({
            showHide: !this.state.showHide
        })
    };

    // 树组件change监听事件
    onSelectedChange = () =>{
        console.log('树组件change监听')
    };

    render() {
        const {table, button, search, form, editTable, asyncTree, modal } = this.props;
        let {createEditTable} = editTable;
        const {createForm} = form;
        const {createSimpleTable} = table;
        const {createButton} = button;
        const {NCCreateSearch} = search;
        const {activeKey, showSearch, orderdateVal} = this.state;
        let {createAsyncTree} = asyncTree;
        let { createModal } = modal;

        return (
            <div className="bankPage">
                { createModal('modal') }
                <div className="header">
                    <div className="headerBtn">
                        { createButton('add', {name: '新增', colors:'danger', onButtonClick: headerButtonClick })}
                        { createButton('edit', {name: '编辑',colors:'danger', onButtonClick: headerButtonClick })}
                        { createButton('del', {name: '删除',colors:'danger', onButtonClick: headerButtonClick })}
                        { createButton('save', {name: '保存',colors:'danger', onButtonClick: headerButtonClick })}
                        { createButton('cancel', {name: '取消',colors:'default', onButtonClick: headerButtonClick })}
                    </div>
                </div>
                <div className="searchAreaBox">
                    { NCCreateSearch(
                        'searchArea', //模块id
                        {
                            clickSearchBtn: clickSearchBtn.bind(this),//点击按钮事件
                            maxNum: 4   //一行显示几个字段，默认6个
                        }
                    )}
                </div>

                <div className="leftBox">
                    { createAsyncTree({
                        treeId:'tree1',
                        onSelectEve: this.selectTree.bind(this),
                        loadTreeData: this.loadTreeData.bind(this),
                        // onSelectedChange:this.onSelectedChange.bind(this)
                    })}
                </div>

                <div className="rightBox">
                    <div className="formBox">
                        {createForm('head', {
                            onAfterEvent: afterEvent
                        })}
                        <div className="lineBox">
                            <i className={`icon iconfont ${this.state.showHide ? 'icon-jiantou_you ' : 'icon-sanjiao1'}`}
                               onClick={this.showHide.bind(this)}></i>
                            <span className="showHideBtn" onClick={this.showHide.bind(this)}>网银信息</span>
                            <span className="borderLine"></span>
                        </div>

                        <div className={this.state.showHide ? 'hideThisDom' : null}>
                            {createForm('purchaseOrderCardForm2', {
                                onAfterEvent: afterEvent
                            })}
                        </div>
                    </div>

                    <div className="tableBox" style={{padding: '20px'}}>
                        <div className="btnBox">
                            {createButton('add', {name: '新增', onButtonClick: buttonClick})}
                            {createButton('edit', {name: '编辑', onButtonClick: buttonClick})}
                            {createButton('cancel', {name: '取消', onButtonClick: buttonClick})}
                            {createButton('save', {name: '保存', onButtonClick: buttonClick})}
                            {createButton('del', {name: '删除', onButtonClick: buttonClick})}
                        </div>

                        {createEditTable(
                            'purchaseOrderCardTable',
                            // pageIndexChange,
                            // pageSizeChange
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

// Ajax({
//     url:'/newdemo-web/pu/puchasein/test',
//     success:(res)=>{
//         let meta = res.data.templets;
//         console.log(meta)
//     }
// })

export default createPage({
    initTemplate: initTemplate,
})(treeCard);