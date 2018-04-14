import React, { Component } from 'react';
import { Checkbox} from 'tinper-bee';
import ApproveListItem from './ApproveListItem';
import './index.less';
import ajax from '../../../api/ajax';
// import { toast } from 'utils/utils.js';
import nodataPic from '../../../static/images/nodata.png';

import NCBreadcrumb from '../../../base/nc_Breadcrumb';
const NCBreadcrumbItem=NCBreadcrumb.NCBreadcrumbItem;
import NCTabs from '../../../base/nc_Tabs';
const NCTabPane = NCTabs.NCTabPane;
import NCButton from '../../../base/nc_Button';
import NCPagination from '../../../base/nc_Pagination';
import NCFormControl from '../../../base/nc_FormControl';
import NCSelect from '../../../base/nc_Select'


export default class ApproveList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			classify: [],
			approveList: [], //列表数据
			pageInfo: {
				pageIndex: sessionStorage.approveListActivePage || 1
			},
			categoryinfo: [], //分类数据
			totalnums: 100,
			status: sessionStorage.approveStatus || 0,
			busiType: sessionStorage.approveBusiType || null
		};
		if (sessionStorage.approveStatus === undefined) {
			sessionStorage.approveStatus = 0;
		}
		if (sessionStorage.approveBusiType === undefined) {
			sessionStorage.approveBusiType = 'null';
		}
	}

	componentDidMount() {
		this.querybills();
	}

	//改变每页显示数据的条数
	handlePageSizeSelect(e) {
		console.log(e);
	}
	// handleSelect(page){

	// }
	querybills = () => {
		/////////////////////假数据检验部分//////////////////////////
		let res={
			"data":{
				"bills":[
					{
						"body":[
							{
								"displayName":"付息编号",
								"displayValues":"fm0023201801277398339540590022"
							},
							{
								"displayName":"登记编号",
								"displayValues":"0001Z51000000000IF62"
							},
							{
								"displayName":"付息日期",
								"displayValues":"2018-01-27"
							},
							{
								"displayName":"付息金额",
								"displayValues":" 3.12"
							}
						],
						"vbillId":"6a8bef5d-77ec-48f3-8bbd-3d037f04a9ce",
						"vbillno":null,
						"head":{
							"billtypename":"采购订单",
							"vbillno":"fm0023201801277398.339540590022",
							"vbillname":"采购订单",
							"committime":"2018-01-30T09:25:48.000+08:00"
						},
						"taskinstance":{
							"processInstanceId":"80beadc6-055c-11e8-91eb-0242ac1e1107"
						},
						"billinfourl":"/bond/bondrepayinterestdetail?type=view",
						"businesskey":"fm&fm0023&6a8bef5d-77ec-48f3-8bbd-3d037f04a9ce&tmcbillnofm0023201801277398.339540590022&orgid_test"
					}
				],
				"categoryinfo":[
					{
						"processCategoryId":"a56c6254-f1f3-11e7-ae08-0242ac1e1105",
						"billtypecode":"fm0010",
						"billCategory":" 担保合约",
						"count":1
					},
					{
						"processCategoryId":"a573dc65-f1f3-11e7-ae08-0242ac1e1105",
						"billtypecode":"fm0021",
						"billCategory":"利息调整单",
						"count":1
					},
					{
						"processCategoryId":"a582f798-f1f3-11e7-ae08-0242ac1e1105",
						"billtypecode":"fm0016",
						"billCategory":"赎回",
						"count":1
					},
					{
						"processCategoryId":"a587d999-f1f3-11e7-ae08-0242ac1e1105",
						"billtypecode":"fm0006",
						"billCategory":"付费",
						"count":3
					},
					{
						"processCategoryId":"a58ce2aa-f1f3-11e7-ae08-0242ac1e1105",
						"billtypecode":"fm0017",
						"billCategory":"担保物权",
						"count":2
					},
					{
						"processCategoryId":"a591768b-f1f3-11e7-ae08-0242ac1e1105",
						"billtypecode":"fm0007",
						"billCategory":"发债申请",
						"count":1
					},
					{
						"processCategoryId":"a595bc4c-f1f3-11e7-ae08-0242ac1e1105",
						"billtypecode":"fm0018",
						"billCategory":"担保债务",
						"count":1
					},
					{
						"processCategoryId":"a599dafd-f1f3-11e7-ae08-0242ac1e1105",
						"billtypecode":"fm0008",
						"billCategory":"发债合约",
						"count":3
					},
					{
						"processCategoryId":"a5a7216f-f1f3-11e7-ae08-0242ac1e1105",
						"billtypecode":"fm0001",
						"billCategory":"贷款申请",
						"count":4
					},
					{
						"processCategoryId":"c84dae9a-f9cf-11e7-8bfb-0242ac1e1107",
						"billtypecode":"fm0023",
						"billCategory":"发债付息",
						"count":1
					},
					{
						"processCategoryId":"a5b48ef1-f1f3-11e7-ae08-0242ac1e1105",
						"billtypecode":"fm0002",
						"billCategory":"贷款合同",
						"count":4
					},
					{
						"processCategoryId":"a5c44662-f1f3-11e7-ae08-0242ac1e1105",
						"billtypecode":"fm0013",
						"billCategory":"转入",
						"count":2
					},
					{
						"processCategoryId":"a5c94f73-f1f3-11e7-ae08-0242ac1e1105",
						"billtypecode":"fm0003",
						"billCategory":"放款",
						"count":19
					},
					{
						"processCategoryId":"a5ce0a64-f1f3-11e7-ae08-0242ac1e1105",
						"billtypecode":"fm0014",
						"billCategory":"申购",
						"count":5
					},
					{
						"processCategoryId":"a5d20205-f1f3-11e7-ae08-0242ac1e1105",
						"billtypecode":"fm0004",
						"billCategory":"还本",
						"count":2
					},
					{
						"processCategoryId":"a5db02b7-f1f3-11e7-ae08-0242ac1e1105",
						"billtypecode":"fm0009",
						"billCategory":"债券登记",
						"count":1
					},
					{
						"processCategoryId":"2f31ea75-05b5-11e8-ab6e-0242ac1e1105",
						"billtypecode":"icdm0007",
						"billCategory":"内部利息调整单",
						"count":1
					},
					{
						"processCategoryId":"d0bc40ba-fd87-11e7-ad3f-0242ac1e2c8c",
						"billtypecode":"icdm0005",
						"billCategory":"内部付息",
						"count":5
					},
					{
						"processCategoryId":"cfbd1905-00e4-11e8-997a-0242ac1e1107",
						"billtypecode":"icdm0003",
						"billCategory":"内部放款",
						"count":1
					},
					{
						"processCategoryId":"a5dfe4b8-f1f3-11e7-ae08-0242ac1e1105",
						"billtypecode":"pass0001",
						"billCategory":"结算服务",
						"count":1
					},
					{
						"processCategoryId":"b705e3f2-00e4-11e8-997a-0242ac1e1107",
						"billtypecode":"icdm0002",
						"billCategory":"内部贷款合同",
						"count":1
					},
					{
						"processCategoryId":"a38d744f-00e4-11e8-997a-0242ac1e1107",
						"billtypecode":"icdm0001",
						"billCategory":"内部借贷申请",
						"count":3
					}
				],
				"counts":63,
				"page":{
					"pageIndex":1,
					"pageSize":5,
					"maxPage":1
				}
			},
			"message":null,
			"success":true
		};
		this.setState({
			approveList: res.data.bills,
			categoryinfo: [ { billCategory: '全部', billtypecode: 'null', count: res.data.counts } ].concat(
				res.data.categoryinfo
			),
			pageInfo: res.data.page
		});
		/////////////////////后台数据联调以下部分/////////////////////
		// let that = this;
		// let { pageInfo } = this.state;
		// ajax({
		// 	loading: true,
		// 	url: URL + 'bpm/querybills',
		// 	data: {
		// 		busitype: this.state.busiType === 'null' ? null : this.state.busiType,
		//
		// 		status: this.state.status,
		// 		pageIndex: pageInfo.pageIndex || 1,
		// 		pageSize: '5'
		// 	},
		// 	success: function(res) {
		// 		that.setState({
		// 			approveList: res.data.bills,
		// 			categoryinfo: [ { billCategory: '全部', billtypecode: 'null', count: res.data.counts } ].concat(
		// 				res.data.categoryinfo
		// 			),
		// 			pageInfo: res.data.page
		// 		});
		// 	}
		// });
	};

	approvebill = (data, action) => {
		let that = this;
		ajax({
			loading: true,
			url: URL + 'bpm/' + action,
			data: { data },
			success: function(res) {
				if (res.success) {
					switch (action) {
						case 'approvebills':
							toast({ content: '审批成功' });
							break;
						case 'unapprovebills':
							toast({ content: '取消审批成功' });
							break;
						case 'rejectbills':
							toast({ content: '驳回成功' });
							break;

						default:
							break;
					}
					that.querybills();
				}
			}
		});
	};

	multiApprove = (action) => {
		let that = this;
		let data = [];
		this.state.approveList.map((e, i) => {
			if (e.checked) {
				data.push({
					businesskey: e.businesskey,
					billid: e.vbillId
				});
			}
		});
		this.approvebill(data, action);
	};

	onCheck = (index) => {
		this.state.approveList[index].checked = !this.state.approveList[index].checked;
		this.setState({
			approveList: this.state.approveList
		});
	};

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

	render() {
		let { categoryinfo, approveList, pageInfo } = this.state;
		let checked = approveList.length > 0;
		for (let item of approveList) {
			if (!item.checked) {
				checked = false;
				break;
			}
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
							onChange={(key) => {
								sessionStorage.approveStatus = key;
								sessionStorage.approveListActivePage = 1;
								this.state.pageInfo.pageIndex = 1;
								this.setState(
									{
										status: Number(key),
										pageInfo: this.state.pageInfo
									},
									() => {
										this.querybills();
									}
								);
							}}
						>
							<NCTabPane tab="未审批" key="0" />
							<NCTabPane tab="已审批" key="1" />
						</NCTabs >
						<div className="right-nav clearfix">
							<Checkbox className="checkbox" checked={checked} onChange={this.checkAll} />全选
							{this.state.status == '0' && (
								<NCButton
									className="btn-2"
									style={{ marginLeft: '17px' }}
									onClick={this.multiApprove.bind(this, 'approvebills')}
								>
									审批通过
								</NCButton>
							)}
							{this.state.status == '1' && (
								<NCButton
									className="btn-2"
									style={{ marginLeft: '17px' }}
									onClick={this.multiApprove.bind(this, 'unapprovebills')}
								>
									取消审批
								</NCButton>
							)}
							{this.state.status == '0' && (
								<NCButton
									className="btn-2 btn-cancel"
									style={{ marginLeft: '10px' }}
									onClick={this.multiApprove.bind(this, 'rejectbills')}
								>
									驳回
								</NCButton>
							)}
							<span className="search">
								<NCFormControl type="text" placeholder="搜索提交人" />
								<span className="iconfont icon-icon-sousuo"> </span>
							</span>
						</div>
					</div>
					<div className="container clearfix">
						<div className="left">
							{categoryinfo && (
								<NCTabs 
									defaultActiveKey={this.state.busiType || 'null'}
									tabBarPosition="left"
									className="tab-left"
									onChange={(key) => {
										sessionStorage.approveBusiType = key;
										this.state.pageInfo.pageIndex = 1;
										sessionStorage.approveListActivePage = 1;
										this.setState(
											{
												busiType: key,
												pageInfo: this.state.pageInfo
											},
											() => {
												this.querybills();
											}
										);
									}}
								>
									{categoryinfo.map((e, i) => {
										return <NCTabPane key={e.billtypecode} tab={`${e.billCategory} ${e.count}`} />;
									})}
								</NCTabs >
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
										approvebill={this.approvebill}
										onCheck={this.onCheck.bind(this, i)}
									/>
								);
							})}
							<div className="bd-footer">
								<div className="pagination">
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
										activePage={pageInfo.pageIndex ? pageInfo.pageIndex : 1}
										onSelect={(key) => {
											sessionStorage.approveListActivePage = key;
											pageInfo.pageIndex = key;
											this.setState({
												pageInfo
											});
											this.querybills();
										}}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
