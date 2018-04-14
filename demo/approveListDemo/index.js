/**
 * Created by wangshhj on 2018/2/7.
 */
import React, { Component } from 'react';
import ApproveListItem from '../../src/ApproveCenter/pages/ApproveList';
// import ApproveDetailCom from '../../src/ApproveCenter/containers/ApproveDetailCom';
import { createPage, ajax, base } from '../../src';
import { initTemplate } from '../tree_card/events';
class ApproveListDemo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ApproveDetail: null, //审批历史数据
			approveType: 'approve', //审批内选中的操作
			suggestion: '', //输入的意见
			approveList: [ //审批内所有的操作
				{ display: '批准', value: 'approve' },
				{ display: '不批准', value: 'Noapprove' },
				{ display: '驳回', value: 'reject' }
			],
			billID: '1001A110000000004I83'
		};
	}

	componentDidMount() {
		let ApproveDetails = {
			data: [
				{
					dealman: '于晓龙',
					dealdate: '2018-03-21 11:13:01',
					approvestatus: '提交',
					approveresult: '提交',
					actortype: '操作员',
					current: false
				},
				{
					dealman: '于晓龙',
					dealdate: '2018-03-21 11:13:07',
					approvestatus: '已完成',
					approveresult: '批准',
					actortype: '操作员',
					current: false
				},
				{
					dealman: '李洪鹏',
					approvestatus: '运行中',
					actortype: '操作员',
					current: true
				}
			],
			message: '',
			success: true
		};
		setTimeout(() => {
			this.setState({
				ApproveDetail: ApproveDetails.data
			});
		}, 500);
	}

	//审批按钮操作事件
	approveRadio = (val) => {
		this.setState({
			approveType: val
		}, () => console.log(this.state));
	};
    //输入意见输入框
	suggestChange(val) {
		this.setState({
			suggestion: val
		});
	}

	render() {
		const { approveDetail } = this.props;
		let { ApproveDetail, approveType, approveList, suggestion, billID } = this.state;
		return (
			<div>
				{approveDetail.create('demo1', {
					data: ApproveDetail,
					approveType,
					suggestion,
					approveList,
					needInput: true,
					approveRadio: this.approveRadio.bind(this),
					suggestChange: this.suggestChange.bind(this),
					billID
				})}
				{/*<ApproveDetailCom*/}
				{/*data={this.state.ApproveDetail} //审批进程图所需数据*/}
				{/*needInput = {true}  //是否显示 填写意见input框、审批通过按钮、驳回按钮*/}
				{/*approveRadio = {this.approveRadio}    //审批通过按钮回调事件*/}
				{/*disallowanceBtnClick = {this.disallowanceBtnClick}  //驳回按钮回调事件*/}
				{/*/>*/}

				{/*<ApproveListItem*/}
				{/*url=""*/}
				{/*queryDoneTaskList="/scm-pu-web/platform/approve/queryToDoTaskList"//查询数据接口*/}

				{/*approveBills="/approve/platform/approve/approveBills"//审批接口*/}
				{/*unapproveBills="/approve/platform/approve/unapproveBills"//取消审批接口*/}
				{/*rejectBills="/approve/platform/approve/rejectBills"//驳回接口*/}

				{/*/>*/}
			</div>
		);
	}
}

export default createPage({
	initTemplate: initTemplate
})(ApproveListDemo);
