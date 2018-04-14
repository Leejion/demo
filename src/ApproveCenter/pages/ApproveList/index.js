import React, {Component} from 'react';
import {Checkbox} from 'tinper-bee';
import ApproveListItem from './ApproveListItem';
import './index.less';
import ajax from '../../../api/ajax';
// import { toast } from 'utils/utils.js';
import nodataPic from '../../../static/images/nodata.png';

import NCBreadcrumb from '../../../base/nc_Breadcrumb';
const NCBreadcrumbItem = NCBreadcrumb.NCBreadcrumbItem;
import NCTabs from '../../../base/nc_Tabs';
const NCTabPane = NCTabs.NCTabPane;
import NCButton from '../../../base/nc_Button';
import NCPagination from '../../../base/nc_Pagination';
import NCFormControl from '../../../base/nc_FormControl';
import NCMessage from '../../../base/nc_Message';
import NCSelect from '../../../base/nc_Select'
import RejectModal from '../../containers/RejectModal/RejectModal'
let NCOption = NCSelect.NCOption;

export default class ApproveList extends Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.props = props;
        if (sessionStorage.approveStatus === undefined) {
            sessionStorage.approveStatus = 0;
        }
        if (sessionStorage.billtypecode === undefined) {
            sessionStorage.billtypecode = null;
        }
        this.state = {
            classify: [],
            approveList: [], //列表数据
            pageInfo: {
                pageIndex: sessionStorage.approveListActivePage || 1,
                pageSize: 5
            },
            categoryinfo: [], //分类数据
            totalnums: 100,
            status: sessionStorage.approveStatus || 0,
            billtypecode: JSON.parse(sessionStorage.billtypecode) || null,
            singleData:null,
            searchVal:''
        };
    }

    componentDidMount() {
        this.queryMethod();
    }

    //  查询数据方法
    queryMethod = (searchDatas) => {
        let that = this;
        let url = '';
        if(this.state.status == 0){
            url = '2323';
        }
        let searchData = searchDatas?searchDatas:'';
        let data = {
            billtypecode: this.state.billtypecode,
            pageIndex: this.state.pageInfo.pageIndex,
            pageSize: this.state.pageInfo.pageSize,
            // searchman:searchData
        };
        console.log(data)
        let res2 = null;
        ajax({
            loading: true,
            url: this.props.queryDoneTaskList,
            data: data,
            success: function (res) {
                res2 = res;
                console.log(res)
                if (res.success) {

                        //组装分类区域
                        let listData = null;
                        listData = res.data.categories;
                        let totalNum = 0;
                        listData.map((val) => {
                            totalNum += val.count
                        });

                        let gridDatas = res.data.grid;
                        that.setState({
                            categoryinfo: [{billtypename: '全部', billtypecode: 'null', count: totalNum}].concat(
                                listData
                            ),
                            approveList: gridDatas.items,
                            pageInfo: gridDatas.pageInfo
                        });


                }
            },
            error:function (res) {

            }
        });
        // let res2 = {
        //     "data": {
        //         "billtypecode": "fm0010",
        //         "categories": [
        //             {
        //             "count": 10,
        //             "billtypename": "订单类型名称1",
        //             "billtypecode": "fm0010"
        //             },
        //             {
        //                 "count": 5,
        //                 "billtypename": "订单类型名称2",
        //                 "billtypecode": "fm0012"
        //             },
        //         ],
        //         "grid": {
        //             "pageInfo": {
        //                 "pageIndex": 1,
        //                 "pageSize": 20,
        //                 "totalPage": 1
        //             },
        //             "items": [
        //                 {
        //                 "head": {
        //                     "billtypename": "订单类型名称1",
        //                     "vbillno": "vbillcode1",
        //                     "committime": 1519629771125,
        //                     "vbillname": "订单信息1"
        //                 },
        //                 "billinfourl": "http://localhost:8080/details",
        //                 "body": [{
        //                     "displayName": "订单信息1表体显示1",
        //                     "displayValues": "订单信息1表体值1"
        //                 }, {
        //                     "displayName": "订单信息1表体显示2",
        //                     "displayValues": "订单信息1表体值2"
        //                 }],
        //                 "billtypecode": "fm0010",
        //                 "billid": "billid1"
        //             },
        //                 {
        //                     "head": {
        //                         "billtypename": "订单类型名称2",
        //                         "vbillno": "vbillcode1",
        //                         "committime": 1519629771125,
        //                         "vbillname": "订单信息1"
        //                     },
        //                     "billinfourl": "http://localhost:8080/details",
        //                     "body": [{
        //                         "displayName": "订单信息1表体显示1",
        //                         "displayValues": "订单信息1表体值1"
        //                     }, {
        //                         "displayName": "订单信息1表体显示2",
        //                         "displayValues": "订单信息1表体值2"
        //                     }],
        //                     "billtypecode": "fm0011",
        //                     "billid": "billid2"
        //                 },
        //                 {
        //                     "head": {
        //                         "billtypename": "订单类型名称3",
        //                         "vbillno": "vbillcode1",
        //                         "committime": 1519629771125,
        //                         "vbillname": "订单信息1"
        //                     },
        //                     "billinfourl": "http://localhost:8080/details",
        //                     "body": [{
        //                         "displayName": "订单信息1表体显示1",
        //                         "displayValues": "订单信息1表体值1"
        //                     }, {
        //                         "displayName": "订单信息1表体显示2",
        //                         "displayValues": "订单信息1表体值2"
        //                     }],
        //                     "billtypecode": "fm0012",
        //                     "billid": "billid3"
        //                 },
        //             ]
        //         }
        //     },
        //     "success": true
        // };
        // if (res2.success){
        //     //组装分类区域
        //     let listData = null;
        //     listData = res.data.categories;
        //     let totalNum = 0;
        //     listData.map((val) => {
        //         totalNum += val.count
        //     });
        //
        //     let gridDatas = res.data.grid;
        //     that.setState({
        //         categoryinfo: [{billtypename: '全部', billtypecode: 'null', count: totalNum}].concat(
        //             listData
        //         ),
        //         approveList: gridDatas.items,
        //         pageInfo: gridDatas.pageInfo
        //     });
        //
        // }
    };


    //审批，取消，驳回按钮请求
    approvebill (data, action, notes) {
        console.log(data)
        let that = this;
        if (data.length == 0) {
            NCMessage.create({content: '请选择要处理的单据',color: 'warning'});
            return false
        }
        let url = '';
        let note = '';
        switch(action){
            case 'approvebills':
                url = this.props.approveBills;
                break;
            case 'unapprovebills':
                url = this.props.unapproveBills;
                break;
            case 'rejectbills':
                url = this.props.rejectBills;
                note = notes;
                break;
        }
        let request = {
            "infos":data,
            "note":note
        };

        ajax({
            loading: true,
            // url: URL + 'bpm/' + action,
            url: url,
            data: request,
            success: function (res) {
                console.log(res)
                if (res.success) {
                    switch (action) {
                        case 'approvebills':
                            NCMessage.create({content: '审批成功', color: 'success' });
                            break;
                        case 'unapprovebills':
                            NCMessage.create({content: '取消审批成功', color: 'success'});
                            break;
                        case 'rejectbills':
                            NCMessage.create({content: '驳回成功', color: 'success'});
                            break;

                        default:
                            break;
                    }
                    that.queryMethod();
                }
            },
            error:function (res) {
                if (res.success) {
                    switch (action) {
                        case 'approvebills':
                            NCMessage.create({content: '审批失败', color: 'error' });
                            break;
                        case 'unapprovebills':
                            NCMessage.create({content: '取消审批失败', color: 'error'});
                            break;
                        case 'rejectbills':
                            NCMessage.create({content: '驳回失败', color: 'error'});
                            break;
                        default:
                            break;
                    }
                }
            }
        });
    };

    //驳回模态框确定按钮事件，返回意见内容
    beSureEve(res)  {
        let data = [];
        if ( this.state.singleData) {
            let listDatas =  this.state.singleData[0];
            data.push({
                billtypecode: listDatas.billtypecode,
                billid: listDatas.billid,
            });
        } else {
            this.state.approveList.map((e, i) => {
                if (e.checked) {
                    data.push({
                        billtypecode: e.billtypecode,
                        billid: e.billid,
                    });
                }
            });
        }
        this.approvebill(data, 'rejectbills',res);
    };

    //审批、取消、驳回按钮事件
    multiApprove = (action, datas) => {
        let data = [];
        console.log(datas)
        if (action == 'rejectbills') {
            this.setState({
                showModal: true
            });
            //区分批量驳回/单个驳回
            if (Object.prototype.toString.call(datas) == "[object Array]") {
                this.state.singleData = datas;
            }else{
                this.state.singleData = null;
            }
        } else {
            this.state.approveList.map((e, i) => {
                if (e.checked) {
                    data.push({
                        billtypecode: e.billtypecode,
                        billid: e.billid
                    });
                }
            });
            this.approvebill(data, action)
        }
    };

    //复选框事件
    onCheck = (index) => {
        this.state.approveList[index].checked = !this.state.approveList[index].checked;
        this.setState({
            approveList: this.state.approveList
        });
    };

    //全选事件
    checkAll = (checked) => {
        this.state.approveList = this.state.approveList.map((e, i) => {
            return {
                ...e,
                checked
            };
        });
        this.setState({
            approveList: this.state.approveList
        });
    };

    //待审批、已审批事件
    tabChangeEve = (key) => {
        console.log(key)
        sessionStorage.approveStatus = key;
        sessionStorage.approveListActivePage = 1;
        this.state.pageInfo.pageIndex = 1;
        this.state.pageInfo.pageSize = this.state.pageInfo.pageSize ? this.state.pageInfo.pageSize : 5;
        this.setState(
            {
                status: Number(key),
                pageInfo: this.state.pageInfo
            },
            () => {
                this.queryMethod();
            }
        );
    };

    //关闭模态框
    closeModal = () => {
        this.setState({
            showModal: false
        })
    };

    //每页显示条数
    pageSizeSelect = (val) => {
        console.log(val)
        this.state.pageInfo.pageSize = val;
        this.setState(this.state, () => {
            this.queryMethod();
        });
    };

    //分页事件
    paginationEve = (key) => {
        sessionStorage.approveListActivePage = key;
        this.state.pageInfo.pageIndex = key;
        this.setState(this.state);
        this.queryMethod();
    };

    //左侧分类点击事件
    billTypeCodeChange = (key) => {
        sessionStorage.billtypecode = key;
        this.state.pageInfo.pageIndex = 1;
        sessionStorage.approveListActivePage = 1;
        this.setState(
            {
                billtypecode: key,
                pageInfo: this.state.pageInfo
            },
            () => {
                this.queryMethod();
            }
        );
    };

    //搜索框点击事件
    clickSearchBtn = () => {
        this.queryMethod(this.state.searchVal)
    };

    //输入框change事件
    searchChange = (val) => {
        this.state.pageInfo.pageIndex = 1;
        this.setState({
            searchVal:val
        })
    };

    render() {
        let {categoryinfo, approveList, pageInfo} = this.state;
        let checkedAll = approveList.length > 0;
        let checkedPart = false;
        let checkedNum = 0;
        for (let item of approveList) { //判断全选
            if (!item.checked) {
                checkedAll = false;
            }else{
                checkedNum ++;
            }
        }

        if(checkedNum == approveList.length){ //判断部分选中
            checkedPart = false
        }else if(checkedNum > 0 && checkedNum < approveList.length){
            checkedPart = true
        }
        return (
            <div id="approve-list" className="bd-wraps">
                {/*<NCBreadcrumb>*/}
                {/*<NCBreadcrumbItem href="#">首页</NCBreadcrumbItem>*/}
                {/*<NCBreadcrumbItem>审批</NCBreadcrumbItem>*/}
                {/*</NCBreadcrumb>*/}
                <div className="approve-list">
                    <div className="header bd-header">
                        <NCTabs
                            defaultActiveKey={sessionStorage.approveStatus || '0'}
                            tabBarStyle="simple"
                            className="tabs"
                            onChange={this.tabChangeEve}
                        >
                            <NCTabPane tab="待审批" key="0"/>
                            <NCTabPane tab="已审批" key="1"/>
                        </NCTabs >
                        <div className="right-nav clearfix">
                            {checkedPart? <Checkbox className="checkbox" checked={checkedAll} indeterminate onChange={this.checkAll}/>:<Checkbox className="checkbox" checked={checkedAll}  onChange={this.checkAll}/>}

                            <span className="selectAll">全选</span>
                            {this.state.status == '0' && (
                                <NCButton
                                    className="btn-2 BK_red"
                                    style={{marginLeft: '20px'}}
                                    onClick={this.multiApprove.bind(this, 'approvebills')}
                                >
                                    审批通过
                                </NCButton>
                            )}
                            {this.state.status == '1' && (
                                <NCButton
                                    className="btn-2 BK_red"
                                    style={{marginLeft: '20px'}}
                                    onClick={this.multiApprove.bind(this, 'unapprovebills')}
                                >
                                    取消审批
                                </NCButton>
                            )}
                            {this.state.status == '0' && (
                                <NCButton
                                    className="btn-2 cancelBtn"
                                    style={{marginLeft: '10px'}}
                                    onClick={this.multiApprove.bind(this, 'rejectbills')}
                                >
                                    驳回
                                </NCButton>
                            )}
                            <span className="search">
								<NCFormControl  onChange={this.searchChange.bind(this)} value={this.state.searchVal} placeholder="搜索提交人"/>
								<span className="iconfont icon-icon-sousuo" onClick={this.clickSearchBtn.bind(this)}> </span>
							</span>
                        </div>
                    </div>
                    <div className="container clearfix">
                        <div className="left">
                            {categoryinfo && (
                                <NCTabs
                                    defaultActiveKey={this.state.billtypecode || 'null'}
                                    tabBarPosition="left"
                                    className="tab-left"
                                    onChange={this.billTypeCodeChange.bind(this)}
                                >

                                    {categoryinfo.map((e, i) => {
                                        return <NCTabPane className = {i == 0 ? 'allBtn':null} key={e.billtypecode} tab={`${e.billtypename} ${e.count}`}/>;
                                    })}
                                </NCTabs>
                            )}
                        </div>
                        <div className="right"
                             style={{
                                 background: approveList.length
                                     ? '#fff'
                                     : `url(${nodataPic}) center center/70px auto no-repeat #fff`
                             }}
                        >
                            {
                                approveList.map((item, i) => {
                                    return (
                                        <ApproveListItem
                                            status={this.state.status}
                                            key={i}
                                            index={i}
                                            data={item}
                                            approvebill={this.approvebill.bind(this)}
                                            multiApprove={this.multiApprove}
                                            onCheck={this.onCheck.bind(this, i)}
                                        />
                                    );
                                })}
                            <div className="bd-footer">
                                <div className="pagination">
                                    <NCSelect className="pageSizeDom"
                                              size="lg"
                                              value={this.state.pageInfo.pageSize ? this.state.pageInfo.pageSize : 5}
                                              style={{width: 100, marginRight: 6}}
                                              onChange={this.pageSizeSelect.bind(this)}
                                    >
                                        <NCOption value={5}>5条/页</NCOption>
                                        <NCOption value={10}>10条/页</NCOption>
                                        <NCOption value={20}>20条/页</NCOption>
                                        <NCOption value={50}>50条/页</NCOption>
                                        <NCOption value={100}>100条/页</NCOption>
                                    </NCSelect>
                                    <NCPagination
                                        first
                                        last
                                        prev
                                        next
                                        boundaryLinks
                                        size="sm"
                                        gap={true}
                                        items={pageInfo.maxPage || 1}
                                        maxButtons={5}
                                        activePage={pageInfo.pageIndex ? pageInfo.pageIndex : '1'}
                                        onSelect={this.paginationEve.bind(this)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <RejectModal
                        showModal={this.state.showModal}
                        closeModal={this.closeModal}
                        beSureEve={this.beSureEve.bind(this)}
                    />
                </div>
            </div>
        );
    }
}
