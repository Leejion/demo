import React, { Component } from 'react';
import { Checkbox } from 'tinper-bee';
import './ApproveListItem.less';
import ajax from '../../../api/ajax';
import { Link } from 'react-router';
// const URL = window.reqURL.bpm;

export default class ApproveListItem extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	//驳回事件
	bohui = () => {
        this.props.multiApprove(
        	'rejectbills',
			[
                {
                    billtypecode: this.props.data.billtypecode,
                    billid: this.props.data.billid
                }
            ]
        )
	};

	render() {
		let { data } = this.props;
		let date = new Date(data.head.committime);
		let year = date.getFullYear(),
			month = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1,
			day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
			hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours(),
			min = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(),
			sec = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();

        let type = '';
        let url = '';
		if(this.props.data.billinfourl){
            type = this.props.data.billinfourl.split('?type=')[1];
            url = this.props.data.billinfourl.split('?type=')[0]
        }

		return (
			<div className="approve-list-item">
				<div className="item-header clearfix">
					<Checkbox
						className="checkbox"
						checked={this.props.data.checked}
						onChange={this.props.onCheck.bind(this, this.props.index)}
					/>
					<span className="item-title">
						{data.head.vbillname}
					</span>
					<Link
						to={{
							pathname: `/approve${url}`,
							query: {
								processInstanceId: this.props.data.processInstanceId,
								billtypecode: this.props.data.billtypecode,
								id: this.props.data.billid,
								type
							}
						}}
					>
						<span className="classify">{this.props.data.head.vbillno}</span>
					</Link>
					<div className="float-div">
						<span className="date">{`${year}-${month}-${day} ${hour}:${min}:${sec}`}</span>
						{this.props.status == '0' && (
							<span
								className="resolve"
								onClick={this.props.approvebill.bind(
									this,
									[
										{
											billtypecode: this.props.data.billtypecode,
											billid: this.props.data.billid
										}
									],
									'approvebills'
								)}
							>
								审批通过
							</span>
						)}
						{this.props.status == '0' && (
							<span
								className="reject"
								onClick={this.bohui.bind(this)}
							>
								驳回
							</span>
						)}
						{this.props.status == '1' && (
							<span
								className="reject"
								onClick={this.props.approvebill.bind(
									this,
									[
										{
											billtypecode: this.props.data.billtypecode,
											billid: this.props.data.billid
										}
									],
									'unapprovebills'
								)}
							>
								取消审批
							</span>
						)}
					</div>
				</div>
				<div className="list-container">
					{data.body.map((e, i) => {
						return (
							<p key={i}>
								<span className="label">{`${e.displayName}：`}</span>
								<span className="content">{e.displayValues}</span>
							</p>
						);
					})}
				</div>
			</div>
		);
	}
}
