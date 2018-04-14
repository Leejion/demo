
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
// import { createPage, ajax, base } from 'nc-lightapp-front';
// const { NCButton, NCFromControl } = base;
import { createPage, ajax } from '../../../src';
import { NCDatePicker, NCButton } from '../../../src/base';
import { searchBtnClick, pageInfoClick, initTemplate } from './events';
import './index.less';


class OrderList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeKey: 0,
            showSearch: false,
            orderdateVal: ''
        }
        this.tabs = ['处理中', '待签字', '已签字', '全部'];
    }

    componentDidMount() {
        window.onbeforeunload = function () {
            return 'Are you really going to leave？';
        }
        const _this = this;
        // ajax({
        //     url: '/newdemo-web/pu/puchasein/queryall',
        //     success: function (res) {
        //         _this.props.table.setAllTableData("purchaseOrderListTable", res.data.purchaseOrderListTable);
        //     }
        // })
        // let data = {
        //     rows: [{
        //         rowId: 0,
        //         values: {
        //             'item-ne9v0hhw2e-re9b-kk': { value: "122" },
        //             'item-ne9v0hhw2e-re9b-kk': { value: '1222' }
        //         }
        //     }]
        // }
        let data = {
            pageinfo:{
                totalElements:1,
            },
            rows:[
                {
                    status:0,
                    values:{
                        name:{value:'张三'},
                        mny:{value:'120'},
                        date:{value:'2017-10-11'},
                        sex:{value:'0',display:'男'},
                        household :{display:'国内',value:0},
                        hobby:{	display:'篮球',value:0},
                        enable:{value:'是'},
                        code:{value:"23423532543"}
                    }
                }
            ]
        }
        //this.props.table.setAllTableData("pu_temp_001", data);
        this.props.table.setAllTableData('purchaseOrderListTable',data)
    }

    changeTabClick = (index) => {
        if (this.state.activeKey != index) {
            this.setState({
                activeKey: index
            })
        }
        if (index == 3) {
            this.props.table.showColByKey('purchaseOrderListTable', 'orderstatus');
        } else {
            this.props.table.hideColByKey('purchaseOrderListTable', 'orderstatus');
        }
    }

    toggleShowSearch = (flag) => {
        if (this.state.showSearch != flag) {
            this.setState({
                showSearch: flag
            })
        }
    }

    changeOrderDate = (value) => {
        if (value != this.state.orderdateVal) {
            this.setState({
                orderdateVal: value
            })
        }
    }

    render() {
        const { table, button, search, form } = this.props;
        const { createForm } = form;
        const { createSimpleTable } = table;
        const { createButton } = button;
        const { NCCreateSearch } = search;
        const { activeKey, showSearch, orderdateVal } = this.state;
        return (
            <div className="purchaseOrder-list-wrapper">
                 <div className="purchaseOrder-list-header">
                    <div className="title">
                        <h2 className="head">采购入库管理</h2>
                        <NCButton className="head-btn" onClick={() => {
                            window.location.hash = '/purchaseOrder/card?type=add';
                        }}>自制入库</NCButton>
                        <NCButton className="head-btn">到货入库</NCButton>
                    </div>
                    <div className="simple-search">
                        <NCDatePicker
                            className="condition"
                            placeholder='搜索单据日期'
                            value={orderdateVal}
                            onChange={this.changeOrderDate}
                        />
                        <span className="toggle-search" onClick={this.toggleShowSearch.bind(this, !showSearch)}>{showSearch ? "收起" : "高级"}</span>
                    </div>
                </div>
                {showSearch && <div className="purchaseOrder-list-searchArea">
                    {NCCreateSearch({
                        id: 'purchaseOrderSearchArea',
                        clickSearchBtn: searchBtnClick.bind(this)
                    })}
                </div>}
                <div className="purchaseOrder-list-simpleTable">
                    <ul className="table-tabs">
                        {this.tabs.map((item, index) => {
                            let tabClass = classnames({
                                'tab': true,
                                'active': activeKey === index
                            });
                            return (
                                <li
                                    className={tabClass}
                                    key={index}
                                    onClick={() => {
                                        this.changeTabClick(index)
                                    }}
                                >
                                    {item}
                                </li>
                            )
                        })}
                    </ul>
                    {createSimpleTable('purchaseOrderListTable', {
                        handlePageInfoChange: pageInfoClick.bind(this)
                    })}
                </div> 
            </div>
            
        )
    }
}

     /* <div>
                {createForm('pu_temp_003', {
                    onAfterEvent : afterEvent
                })}
                </div>
                {createSimpleTable('pu_temp_001', {
                    handlePageInfoChange: pageInfoClick.bind(this)
                })}
                {createSimpleTable('pu_temp_002', {
                    handlePageInfoChange: pageInfoClick.bind(this)
                })} */


export default createPage({
    //模板
    initTemplate: initTemplate,
    //分页点击事件
    //handlePageInfoChange: pageInfoClick
})(OrderList);