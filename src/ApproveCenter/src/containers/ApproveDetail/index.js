import React, { Component } from 'react';
import { Button, Breadcrumb } from 'tinper-bee';
import './index.less';
import ajax from '../../../api/ajax';
// import { toast } from 'utils/utils.js';
// const URL = window.reqURL.bpm;

export default class ApproveDetail extends Component {
	static defaultProps = {
		processInstanceId: '',
		type: 'edit'
	};
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			content: '',
			status: ''
		};
		this.querybillinfo();
	}

	querybillinfo = () => {
		let { type } = this.props;
		let that = this;
		if (type === 'detail') {
			ajax({
				loading: true,
				url: URL + 'bpm/queryflowinfo',
				data: {
					module: this.props.module,
					busitype: this.props.busitype,
					billid: this.props.id
				},
				success: function(res) {
					let data = res.data,
						status = '';
					if (data.length && data[data.length - 1].activityType === 'endEvent') {
						status = 'endEvent';
					}
					that.setState({
						data,
						status
					});
				}
			});
		} else {
			ajax({
				loading: true,
				url: URL + 'bpm/querybillinfo',
				data: { processInstanceId: this.props.processInstanceId },
				success: function(res) {
					let data = res.data,
						status = '';
					if (data.length && data[data.length - 1].activityType === 'endEvent') {
						status = 'endEvent';
					}
					that.setState({
						data,
						status
					});
				}
			});
		}
	};

	approvebill = (action) => {
		let that = this;
		ajax({
			loading: true,
			url: URL + 'bpm/' + action,
			data: {
				data: [
					{
						businesskey: that.props.businesskey,
						billid: that.props.billid,
						content: that.state.content
					}
				]
			},
			success: function(res) {
				if (res.success) {
					switch (action) {
						case 'approvebills':
							toast({ content: '审批成功' });
							// that.querybillinfo();
							// that.props.refresh && that.props.refresh();
							break;
						case 'rejectbills':
							toast({ content: '驳回成功' });
							break;
						case 'unapprovebills':
							toast({ content: '取消审批成功' });
							break;
						default:
							break;
					}

					window.history.back();
				}
			}
		});
	};

	render() {
		let { data, status } = this.state;
		let { type } = this.props;
		return (
			<div id="approve-detail">
				<div className="approve-detail">
					{type !== 'detail' && (
						<div className="approve-header bd-header">
							<textarea
								className="u-form-control"
								placeholder="请输入审批意见"
								value={this.state.content}
								onChange={(e) => {
									this.setState({ content: e.target.value });
								}}
							/>
							{sessionStorage.approveStatus == '0' && (
								<Button
									className="btn-2"
									style={{ marginLeft: '15px', color: '#fff' }}
									onClick={this.approvebill.bind(this, 'approvebills')}
								>
									审批通过
								</Button>
							)}
							{sessionStorage.approveStatus == '0' && (
								<Button
									className="btn-2 btn-cancel"
									style={{ marginLeft: '10px' }}
									onClick={this.approvebill.bind(this, 'rejectbills')}
								>
									驳回
								</Button>
							)}
							{sessionStorage.approveStatus == '1' && (
								<Button
									className="btn-2 btn-cancel"
									style={{ marginLeft: '10px' }}
									onClick={this.approvebill.bind(this, 'unapprovebills')}
								>
									取消审批
								</Button>
							)}
						</div>
					)}
					<div className="approve-process clearfix">
						{data.map((e, i) => {
							let deleteReason = '';
							switch (data[i].deleteReason) {
								case 'completed':
									deleteReason = '审批通过';
									break;
								case 'withdraw':
									deleteReason = '取消审批';
									break;
								default:
									break;
							}
							switch (e.activityType) {
								case 'endEvent':
									deleteReason = '结束';
									break;
								case 'startEvent':
									deleteReason = '提交';
									break;
								default:
									break;
							}

							return (
								<div
									className={`process active ${status ? '' : 'doing'} ${e.activityType === 'endEvent'
										? 'end-event'
										: ''}`}
								>
									<p className="approve-time">{e.startTime.split('.')[0].replace('T', ' ')}</p>
									<p className="approve-content">
										{e.assigneeName && <span className="approve-action">{e.assigneeName}</span>}
										<span className="approve-person">
											{e.activityType === 'endEvent' ? (
												'审批通过'
											) : e.activityType === 'startEvent' ? (
												'提交'
											) : (
												e.activityName
											)}
										</span>
									</p>
									<i className="approve-point" />
									<span className="delete-reason">{deleteReason}</span>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		);
	}
}
