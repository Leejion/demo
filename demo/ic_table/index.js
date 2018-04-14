import React, { Component } from 'react';
import { createPage } from '../../src';
import Button from 'bee-button';
import ajax from '../../src/api/ajax';
import getTableData from "./events/sendAjax"
import { handleAfterChange, addOperationColumn, tableModelConfirm, initTemPlate, afterEvent, buttonClick } from './events';
import './index.less';
import { Link, hashHistory } from 'react-router';

class IcTable extends Component {
	// react：构造函数
	constructor(props) {
		super(props);
		//表单meta信息
	}

	handleClick = () => {
		this.props.table.openModel('tableBank', 'add');
	}

	hideCol = () => {
		this.props.table.hideColByKey('tableBank', 'orgid')
	}

	showCol = () => {
		console.log(this.props.table)
		this.props.table.showColByKey('tableBank', 'orgid')
	}

	componentWillMount() {
		let pageInfo = this.props.table.getTablePageInfo('tableBank');
		let searchParams = { searchMap: { "bankname": "" } };
		let data = {
			...pageInfo,
			searchParams,
		}
		let { setAllTableData } = this.props.table
		//得到数据渲染到页面
		let res = {
			"success": true,
			"message": "",
			"table": {
				"pageInfo": {
					"pageIndex": "0",
					"pageSize": "10",
					"total": "32",
					"totalPage": "3"
				},
				"rows": [
					{
						"rowId": 'frga-efefe-23g-d45hhh',
						"values": {
							"creator": {
								"display": "伯纳乌",
								"scale": -1,
								"value": "57d185aa-1b3f-454f-8d44-9cf55653ae92"
							},
							"sysid": {
								"display": null,
								"scale": -1,
								"value": "tm"
							},
							"modifier": {
								"display": null,
								"scale": -1,
								"value": null
							},
							"memo": {
								"display": null,
								"scale": -1,
								"value": null
							},
							"vbillno": {
								"display": null,
								"scale": -1,
								"value": null
							},
							"expectedinterest": {
								"display": null,
								"scale": -1,
								"value": "0.20000000"
							},
							"interstrate": {
								"display": null,
								"scale": -1,
								"value": "1.00000000"
							},
							"orgid": {
								"display": null,
								"scale": -1,
								"value": "c0bf153e-f804-4415-88e1-fd7382a495dd"
							},
							"currtypeid": {
								"display": null,
								"scale": -1,
								"value": null
							},
							"bank": {
								"display": null,
								"scale": -1,
								"value": null
							},
							"investtype": {
								"display": null,
								"scale": -1,
								"value": 1
							},
							"modifiedtime": {
								"display": null,
								"scale": -1,
								"value": null
							},
							"enddate": {
								"display": null,
								"scale": -1,
								"value": "2018-04-11"
							},
							"investdate": {
								"display": null,
								"scale": -1,
								"value": "2018-01-18"
							},
							"investmny": {
								"display": null,
								"scale": 2,
								"value": 1
							},
							"tenantid": {
								"display": null,
								"scale": -1,
								"value": "vs1h8do0"
							},
							"id": {
								"display": null,
								"scale": -1,
								"value": "3a0e680b-3fce-43c3-8260-d31e0776a347"
							},
							"creationtime": {
								"display": null,
								"scale": -1,
								"value": "2018-01-19 09:41:18"
							},
							"bankname": {
								"display": null,
								"scale": 2,
								"value": null
							},
							"calinterestdate": {
								"display": null,
								"scale": -1,
								"value": null
							}
						},
						"status": 0
					},
					{
						"rowId": 'frga-efefe-23g-ffg55',
						"values": {
							"creator": {
								"display": "诺坎普",
								"scale": -1,
								"value": "57d185aa-1b3f-454f-8d44-9cf55653ae92"
							},
							"sysid": {
								"display": null,
								"scale": -1,
								"value": "tm"
							},
							"modifier": {
								"display": null,
								"scale": -1,
								"value": null
							},
							"memo": {
								"display": null,
								"scale": -1,
								"value": null
							},
							"vbillno": {
								"display": null,
								"scale": -1,
								"value": null
							},
							"expectedinterest": {
								"display": null,
								"scale": -1,
								"value": "0.20000000"
							},
							"interstrate": {
								"display": null,
								"scale": -1,
								"value": "1.00000000"
							},
							"orgid": {
								"display": null,
								"scale": -1,
								"value": "c0bf153e-f804-4415-88e1-fd7382a495dd"
							},
							"currtypeid": {
								"display": null,
								"scale": -1,
								"value": null
							},
							"bank": {
								"display": null,
								"scale": -1,
								"value": null
							},
							"investtype": {
								"display": null,
								"scale": -1,
								"value": 1
							},
							"modifiedtime": {
								"display": null,
								"scale": -1,
								"value": null
							},
							"enddate": {
								"display": null,
								"scale": -1,
								"value": "2018-04-18"
							},
							"investdate": {
								"display": null,
								"scale": -1,
								"value": "2018-01-18"
							},
							"investmny": {
								"display": null,
								"scale": 2,
								"value": 2
							},
							"tenantid": {
								"display": null,
								"scale": -1,
								"value": "vs1h8do0"
							},
							"id": {
								"display": null,
								"scale": -1,
								"value": "5ee6a360-5842-4a1b-b150-a0a7d7a9a5ac"
							},
							"creationtime": {
								"display": null,
								"scale": -1,
								"value": "2018-01-19 09:42:37"
							},
							"bankname": {
								"display": null,
								"scale": 4,
								"value": 234.29999
							},
							"calinterestdate": {
								"display": null,
								"scale": -1,
								"value": null
							}
						},
						"status": 0
					},
					{
						"rowId": 'frga-efefe-23g-fggf',
						"values": {
							"creator": {
								"display": "慕尼黑奥林匹克体育场",
								"scale": -1,
								"value": "57d185aa-1b3f-454f-8d44-9cf55653ae92"
							},
							"sysid": {
								"display": null,
								"scale": -1,
								"value": "tm"
							},
							"modifier": {
								"display": null,
								"scale": -1,
								"value": null
							},
							"memo": {
								"display": null,
								"scale": -1,
								"value": null
							},
							"vbillno": {
								"display": null,
								"scale": -1,
								"value": null
							},
							"expectedinterest": {
								"display": null,
								"scale": -1,
								"value": "0.20000000"
							},
							"interstrate": {
								"display": null,
								"scale": -1,
								"value": "12.00000000"
							},
							"orgid": {
								"display": null,
								"scale": -1,
								"value": "c0bf153e-f804-4415-88e1-fd7382a495dd"
							},
							"currtypeid": {
								"display": null,
								"scale": -1,
								"value": null
							},
							"bank": {
								"display": null,
								"scale": -1,
								"value": null
							},
							"investtype": {
								"display": null,
								"scale": -1,
								"value": 1
							},
							"modifiedtime": {
								"display": null,
								"scale": -1,
								"value": null
							},
							"enddate": {
								"display": null,
								"scale": -1,
								"value": "2018-04-17"
							},
							"investdate": {
								"display": null,
								"scale": -1,
								"value": "2018-01-18"
							},
							"investmny": {
								"display": null,
								"scale": 2,
								"value": 3
							},
							"tenantid": {
								"display": null,
								"scale": -1,
								"value": "vs1h8do0"
							},
							"id": {
								"display": null,
								"scale": -1,
								"value": "6c5b7d74-f308-4079-9fbe-0980c099abc1"
							},
							"creationtime": {
								"display": null,
								"scale": -1,
								"value": "2018-01-19 09:22:47"
							},
							"bankname": {
								"display": null,
								"scale": 3,
								"value": 4677.666
							},
							"calinterestdate": {
								"display": null,
								"scale": -1,
								"value": null
							}
						},
						"status": 0
					},
					{
						"rowId": 'frga-efefe-23g-f566f',
						"values": {
							"creator": {
								"display": "奥林匹克球场",
								"scale": -1,
								"value": "57d185aa-1b3f-454f-8d44-9cf55653ae92"
							},
							"sysid": {
								"display": null,
								"scale": -1,
								"value": "tm"
							},
							"modifier": {
								"display": null,
								"scale": -1,
								"value": null
							},
							"memo": {
								"display": null,
								"scale": -1,
								"value": null
							},
							"vbillno": {
								"display": null,
								"scale": -1,
								"value": null
							},
							"expectedinterest": {
								"display": null,
								"scale": -1,
								"value": "0.20000000"
							},
							"interstrate": {
								"display": null,
								"scale": -1,
								"value": "12.00000000"
							},
							"orgid": {
								"display": null,
								"scale": -1,
								"value": "c0bf153e-f804-4415-88e1-fd7382a495dd"
							},
							"currtypeid": {
								"display": null,
								"scale": -1,
								"value": null
							},
							"bank": {
								"display": null,
								"scale": -1,
								"value": null
							},
							"investtype": {
								"display": null,
								"scale": -1,
								"value": 1
							},
							"modifiedtime": {
								"display": null,
								"scale": -1,
								"value": null
							},
							"enddate": {
								"display": null,
								"scale": -1,
								"value": "2018-04-18"
							},
							"investdate": {
								"display": null,
								"scale": -1,
								"value": "2018-01-18"
							},
							"investmny": {
								"display": null,
								"scale": -1,
								"value": 2
							},
							"tenantid": {
								"display": null,
								"scale": -1,
								"value": "vs1h8do0"
							},
							"id": {
								"display": null,
								"scale": -1,
								"value": "718c9e04-1398-45a8-b820-8ff79d9f5b95"
							},
							"creationtime": {
								"display": null,
								"scale": -1,
								"value": "2018-01-19 09:09:27"
							},
							"bankname": {
								"display": null,
								"scale": 1,
								"value": 667888
							},
							"calinterestdate": {
								"display": null,
								"scale": -1,
								"value": null
							}
						},
						"status": 0
					},
					{
						"rowId": 'frga-efefe-23g-f2rg',
						"values": {
							"creator": {
								"display": "酉长球场",
								"scale": -1,
								"value": "57d185aa-1b3f-454f-8d44-9cf55653ae92"
							},
							"sysid": {
								"display": null,
								"scale": -1,
								"value": "tm"
							},
							"modifier": {
								"display": null,
								"scale": -1,
								"value": null
							},
							"memo": {
								"display": null,
								"scale": -1,
								"value": null
							},
							"vbillno": {
								"display": null,
								"scale": -1,
								"value": null
							},
							"expectedinterest": {
								"display": null,
								"scale": -1,
								"value": "0.20000000"
							},
							"interstrate": {
								"display": null,
								"scale": -1,
								"value": "11.00000000"
							},
							"orgid": {
								"display": null,
								"scale": -1,
								"value": "c0bf153e-f804-4415-88e1-fd7382a495dd"
							},
							"currtypeid": {
								"display": null,
								"scale": -1,
								"value": null
							},
							"bank": {
								"display": null,
								"scale": -1,
								"value": null
							},
							"investtype": {
								"display": null,
								"scale": -1,
								"value": 1
							},
							"modifiedtime": {
								"display": null,
								"scale": -1,
								"value": null
							},
							"enddate": {
								"display": null,
								"scale": -1,
								"value": "2018-04-17"
							},
							"investdate": {
								"display": null,
								"scale": -1,
								"value": "2018-01-18"
							},
							"investmny": {
								"display": null,
								"scale": -1,
								"value": 2
							},
							"tenantid": {
								"display": null,
								"scale": -1,
								"value": "vs1h8do0"
							},
							"id": {
								"display": null,
								"scale": -1,
								"value": "9264080c-6916-4997-834c-377515940243"
							},
							"creationtime": {
								"display": null,
								"scale": -1,
								"value": "2018-01-19 09:33:37"
							},
							"bankname": {
								"display": null,
								"scale": 0,
								"value": 4555.777
							},
							"calinterestdate": {
								"display": null,
								"scale": -1,
								"value": null
							}
						},
						"status": 0
					},
					{
						"rowId": 'frga-efefe-23g-j66j',
						"values": {
							"creator": {
								"display": "情歌球场",
								"scale": -1,
								"value": "57d185aa-1b3f-454f-8d44-9cf55653ae92"
							},
							"sysid": {
								"display": null,
								"scale": -1,
								"value": "asdfghjkl12341234543"
							},
							"modifier": {
								"display": null,
								"scale": -1,
								"value": "456"
							},
							"memo": {
								"display": null,
								"scale": -1,
								"value": "备注呀"
							},
							"vbillno": {
								"display": null,
								"scale": -1,
								"value": "asdfghjkl12341234543"
							},
							"expectedinterest": {
								"display": null,
								"scale": -1,
								"value": "333.00000000"
							},
							"interstrate": {
								"display": null,
								"scale": -1,
								"value": "222.00000000"
							},
							"orgid": {
								"display": null,
								"scale": -1,
								"value": "asdfghjkl12341234543"
							},
							"currtypeid": {
								"display": null,
								"scale": -1,
								"value": "asdfghjkl12341234543"
							},
							"bank": {
								"display": null,
								"scale": -1,
								"value": "ICBC"
							},
							"investtype": {
								"display": null,
								"scale": -1,
								"value": 1
							},
							"modifiedtime": {
								"display": null,
								"scale": -1,
								"value": "2018-01-17 00:00:00"
							},
							"enddate": {
								"display": null,
								"scale": -1,
								"value": "2018-01-15"
							},
							"investdate": {
								"display": null,
								"scale": -1,
								"value": "2018-01-15"
							},
							"investmny": {
								"display": null,
								"scale": -1,
								"value": 3
							},
							"tenantid": {
								"display": null,
								"scale": -1,
								"value": "asdfghjkl12341234543"
							},
							"id": {
								"display": null,
								"scale": -1,
								"value": "asdfghjkl12341234543"
							},
							"creationtime": {
								"display": null,
								"scale": -1,
								"value": "2018-01-18 15:52:07"
							},
							"bankname": {
								"display": null,
								"scale": 5,
								"value": 23.5666
							},
							"calinterestdate": {
								"display": null,
								"scale": -1,
								"value": "2018-01-15"
							}
						},
						"status": 0
					},
					{
						"rowId": 'frga-efefe-23g-fhtht',
						"values": {
							"creator": {
								"display": "圣保罗",
								"scale": -1,
								"value": "57d185aa-1b3f-454f-8d44-9cf55653ae92"
							},
							"sysid": {
								"display": null,
								"scale": -1,
								"value": "tm"
							},
							"modifier": {
								"display": null,
								"scale": -1,
								"value": null
							},
							"memo": {
								"display": null,
								"scale": -1,
								"value": "备注呀"
							},
							"vbillno": {
								"display": null,
								"scale": -1,
								"value": "asdfghjkl12341234543"
							},
							"expectedinterest": {
								"display": null,
								"scale": -1,
								"value": "333.00000000"
							},
							"interstrate": {
								"display": null,
								"scale": -1,
								"value": "222.00000000"
							},
							"orgid": {
								"display": null,
								"scale": -1,
								"value": "c0bf153e-f804-4415-88e1-fd7382a495dd"
							},
							"currtypeid": {
								"display": null,
								"scale": -1,
								"value": "asdfghjkl12341234543"
							},
							"bank": {
								"display": null,
								"scale": -1,
								"value": "ICBC"
							},
							"investtype": {
								"display": null,
								"scale": -1,
								"value": 1
							},
							"modifiedtime": {
								"display": null,
								"scale": -1,
								"value": "2018-01-17 00:00:00"
							},
							"enddate": {
								"display": null,
								"scale": -1,
								"value": "2018-01-15"
							},
							"investdate": {
								"display": null,
								"scale": -1,
								"value": "2018-01-15"
							},
							"investmny": {
								"display": null,
								"scale": -1,
								"value": 1
							},
							"tenantid": {
								"display": null,
								"scale": -1,
								"value": "vs1h8do0"
							},
							"id": {
								"display": null,
								"scale": -1,
								"value": "d9a01677-37d8-49d0-ae87-f4589801f508"
							},
							"creationtime": {
								"display": null,
								"scale": -1,
								"value": "2018-01-18 15:28:24"
							},
							"bankname": {
								"display": null,
								"scale": 3,
								"value": 234775.7777
							},
							"calinterestdate": {
								"display": null,
								"scale": -1,
								"value": "2018-01-15"
							}
						},
						"status": 0
					},
					{
						"rowId": 'frga-efefe-23g-u67uu',
						"values": {
							"creator": {
								"display": "老特拉福德",
								"scale": -1,
								"value": "57d185aa-1b3f-454f-8d44-9cf55653ae92"
							},
							"sysid": {
								"display": null,
								"scale": -1,
								"value": "tm"
							},
							"modifier": {
								"display": null,
								"scale": -1,
								"value": null
							},
							"memo": {
								"display": null,
								"scale": -1,
								"value": "备注2321"
							},
							"vbillno": {
								"display": null,
								"scale": -1,
								"value": "asdfghjkl12341234543"
							},
							"expectedinterest": {
								"display": null,
								"scale": -1,
								"value": "333.00000000"
							},
							"interstrate": {
								"display": null,
								"scale": -1,
								"value": "222.00000000"
							},
							"orgid": {
								"display": null,
								"scale": -1,
								"value": "c0bf153e-f804-4415-88e1-fd7382a495dd"
							},
							"currtypeid": {
								"display": null,
								"scale": -1,
								"value": "asdfghjkl12341234543"
							},
							"bank": {
								"display": null,
								"scale": -1,
								"value": "ICBC"
							},
							"investtype": {
								"display": null,
								"scale": -1,
								"value": 1
							},
							"modifiedtime": {
								"display": null,
								"scale": -1,
								"value": "2018-01-17 00:00:00"
							},
							"enddate": {
								"display": null,
								"scale": -1,
								"value": "2018-01-15"
							},
							"investdate": {
								"display": null,
								"scale": -1,
								"value": "2018-01-15"
							},
							"investmny": {
								"display": null,
								"scale": -1,
								"value": 1
							},
							"tenantid": {
								"display": null,
								"scale": -1,
								"value": "vs1h8do0"
							},
							"id": {
								"display": null,
								"scale": -1,
								"value": "da7beed4-b271-4d09-bfe9-34df6a1cbdbb"
							},
							"creationtime": {
								"display": null,
								"scale": -1,
								"value": "2018-01-18 15:39:59"
							},
							"bankname": {
								"display": null,
								"scale": 2,
								"value": 122.4567
							},
							"calinterestdate": {
								"display": null,
								"scale": -1,
								"value": "2018-01-15"
							}
						},
						"status": 0
					},
					{
						"rowId": 'frga-efefe-23g-eggg55',
						"values": {
							"creator": {
								"display": "梅阿查球场",
								"scale": -1,
								"value": "57d185aa-1b3f-454f-8d44-9cf55653ae92"
							},
							"sysid": {
								"display": null,
								"scale": -1,
								"value": "tm"
							},
							"modifier": {
								"display": null,
								"scale": -1,
								"value": null
							},
							"memo": {
								"display": null,
								"scale": -1,
								"value": "备注呀111"
							},
							"vbillno": {
								"display": null,
								"scale": -1,
								"value": "asdfghjkl12341234543"
							},
							"expectedinterest": {
								"display": null,
								"scale": -1,
								"value": "333.00000000"
							},
							"interstrate": {
								"display": null,
								"scale": -1,
								"value": "222.00000000"
							},
							"orgid": {
								"display": null,
								"scale": -1,
								"value": "c0bf153e-f804-4415-88e1-fd7382a495dd"
							},
							"currtypeid": {
								"display": null,
								"scale": -1,
								"value": "asdfghjkl12341234543"
							},
							"bank": {
								"display": null,
								"scale": -1,
								"value": "ICBC"
							},
							"investtype": {
								"display": null,
								"scale": -1,
								"value": 1
							},
							"modifiedtime": {
								"display": null,
								"scale": -1,
								"value": "2018-01-17 00:00:00"
							},
							"enddate": {
								"display": null,
								"scale": -1,
								"value": "2018-01-15"
							},
							"investdate": {
								"display": null,
								"scale": -1,
								"value": "2018-01-15"
							},
							"investmny": {
								"display": null,
								"scale": -1,
								"value": 3
							},
							"tenantid": {
								"display": null,
								"scale": -1,
								"value": "vs1h8do0"
							},
							"id": {
								"display": null,
								"scale": -1,
								"value": "ebe23d65-37a4-4122-997c-514f34752984"
							},
							"creationtime": {
								"display": null,
								"scale": -1,
								"value": "2018-01-18 15:27:59"
							},
							"bankname": {
								"display": null,
								"scale": 0,
								"value": 3344.5567
							},
							"calinterestdate": {
								"display": null,
								"scale": -1,
								"value": "2018-01-15"
							}
						},
						"status": 0
					},
					{
						"rowId": 'frga-efefe-23g-j77jh',
						"values": {
							"creator": {
								"display": "海布利球场",
								"scale": -1,
								"value": "57d185aa-1b3f-454f-8d44-9cf55653ae92"
							},
							"sysid": {
								"display": null,
								"scale": -1,
								"value": "tm"
							},
							"modifier": {
								"display": null,
								"scale": -1,
								"value": null
							},
							"memo": {
								"display": null,
								"scale": -1,
								"value": null
							},
							"vbillno": {
								"display": null,
								"scale": -1,
								"value": null
							},
							"expectedinterest": {
								"display": null,
								"scale": -1,
								"value": "0.20000000"
							},
							"interstrate": {
								"display": null,
								"scale": -1,
								"value": "12.00000000"
							},
							"orgid": {
								"display": null,
								"scale": -1,
								"value": "c0bf153e-f804-4415-88e1-fd7382a495dd"
							},
							"currtypeid": {
								"display": null,
								"scale": -1,
								"value": null
							},
							"bank": {
								"display": null,
								"scale": -1,
								"value": null
							},
							"investtype": {
								"display": null,
								"scale": -1,
								"value": 1
							},
							"modifiedtime": {
								"display": null,
								"scale": -1,
								"value": null
							},
							"enddate": {
								"display": null,
								"scale": -1,
								"value": "2018-04-18"
							},
							"investdate": {
								"display": null,
								"scale": -1,
								"value": "2018-01-18"
							},
							"investmny": {
								"display": null,
								"scale": -1,
								"value": 2
							},
							"tenantid": {
								"display": null,
								"scale": -1,
								"value": "vs1h8do0"
							},
							"id": {
								"display": null,
								"scale": -1,
								"value": "ec252dbb-1256-4fbb-929f-940a50609b96"
							},
							"creationtime": {
								"display": null,
								"scale": -1,
								"value": "2018-01-19 09:09:39"
							},
							"bankname": {
								"display": null,
								"scale": 3,
								"value": 2344.7654
							},
							"calinterestdate": {
								"display": null,
								"scale": -1,
								"value": null
							}
						},
						"status": 0
					}
				]
			}
		}

		setAllTableData('tableBank', res.table)
	}

	handlePageInfoChange = (props, config) => {
		let pageInfo = props.table.getTablePageInfo('tableBank')
		let keyWords = null; // 通过第三方方法获得
		console.log(pageInfo, config.params)
		//getTableData(pageInfo, keyWords, props.table.setAllTableData);
	}

	deleteRowsByIndex = () => {
		let data = this.props.table.getCheckedRows('tableBank');
		let arr = data.map(item => item.index);
		this.props.table.deleteTableRowsByIndex('tableBank', arr)
	}

	deleteRowsByrowId = () => {
		this.props.table.deleteTableRowsByRowId('tableBank')
	}

	getSelectedRows = () => {
		let data = this.props.table.getCheckedRows('tableBank');
	}

	reverseSelect = () => {
		this.props.table.reverseSelected('tableBank');
	}

	allSelectTrue = () => {
		this.props.table.selectAllRows('tableBank', true);
	}

	allSelectFalse = () => {
		this.props.table.selectAllRows('tableBank', false);
	}

	// react：界面渲染函数
	render() {
		let { form, button, table } = this.props;
		let { createSimpleTable } = table;
		let { createButton } = button;
		return (
			<div className="ICTable">
				<div>
					<Button colors="info" onClick={this.handleClick}>新增</Button>
					<Button colors="info" onClick={this.hideCol}>隐藏某列</Button>
					<Button colors="info" onClick={this.showCol}>显示某列</Button>
					<Button colors="info" onClick={this.getSelectedRows}>获得选中行</Button>
					<Button colors="info" onClick={this.reverseSelect}>反选中</Button>
					<Button colors="info" onClick={this.allSelectTrue}>全选</Button>
					<Button colors="info" onClick={this.allSelectFalse}>全不选</Button>
					<Button colors="info" onClick={this.deleteRowsByIndex}>按行号删除</Button>
					<Button colors="info" onClick={this.deleteRowsByrowId}>按rowId删除</Button>
					{createButton('saveButton', { name: '保存', onButtonClick: buttonClick,buttonColor:'secondary-button'})}
				</div>
				{createSimpleTable('tableBank', {
					handlePageInfoChange: this.handlePageInfoChange
				})}
			</div>
		);
	}
}


// 如果多个 页码change事件
export default createPage({
	moduleId: 'table-0001',
	initTemplate: initTemPlate,
})(IcTable);
