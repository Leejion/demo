/**
 * Created by wangshhj on 2018/2/27.
 * 审批状态流程图
 */
import React, { Component } from 'react';
import './approveDetailCom.less';
import { FormControl, Button, Radio } from 'tinper-bee';

export default function approveDetail(
	id,
	{ data = {}, approveType, approveList, suggestion, billID, needInput = false, approveRadio, suggestChange } = {}
	//approveType：单选按钮选中结果  suggestion：意见输入框 data:步骤数据 approveList:操作按钮，审批或驳回 billID:附件下载billID
) {
	if (!data) {
		return false;
	}
	let props = {
		output: this.output,
		id,
		data,
		billID,
		approveType,
		approveList,
		needInput,
		approveRadio,
		suggestChange
	};
	return <ApproveDetailCom {...props} />;
}

class ApproveDetailCom extends Component {
	constructor(props) {
		super(props);
		this.props = props;
		this.currentIndex = null;
		this.state = {};
	}

	componentDidMount() {
		let wid = this.dom.offsetWidth;
		let parentWid = this.dom.parentElement.offsetWidth;
		if (wid > parentWid && Math.ceil(this.currentIndex * 300) > parentWid) {
			this.dom.parentElement.scrollTo(wid - parentWid + 100, 0);
		}
	}

	//审批
	createDisallowance = () => {
		const { approveType, approveList, suggestion, suggestChange, approveRadio, billID } = this.props;
		const { Uploader } = this.props.output;
		return (
			<div className="optionArea">
				<FormControl
					className="optionInput"
					placeholder="请输入意见"
					value={suggestion}
					onChange={(val) => suggestChange(val)}
				/>
				{approveList.length > 0 && (
					<Radio.RadioGroup name="fruit" selectedValue={approveType} onChange={(val) => approveRadio(val)}>
						{approveList.map((item) => {
							return <Radio value={item.value}>{item.display}</Radio>;
						})}
					</Radio.RadioGroup>
				)}
				<div>{Uploader(`${billID}`)}</div>
			</div>
		);
	};

	//创建审批状态流程图
	createDom = () => {
		let that = this;
		let { data, approveType } = this.props;
		return data.map((val, index) => {
			if (data[index + 1] && data[index + 1].current) {
				that.currentIndex = index + 1;
			}
			return (
				<div className="approve-box">
					<div
						className={[
							'approveDetail',
							data[index + 1] && data[index + 1].current ? 'currentStatus' : null
						].join(' ')}
						key={index}
					>
						<div className="detail_1">
							<span className="detailIcon" />
							<span className="detailName">
								{val.approveresult ? val.approveresult : val.approvestatus}
							</span>

							{index == data.length - 1 ? null : <span className="detailBorder" />}
						</div>
						<div className="detailDate">{val.dealdate}</div>
						<div className="detail_2">
							{/*<span>{val.position}:</span>*/}
							<span>{val.dealman}</span>
						</div>
					</div>
				</div>
			);
		});
	};
	render() {
		return (
			<div className="approveDetailBox" id={this.props.id}>
				{this.props.needInput ? this.createDisallowance.call(this) : null}
				<div className="approveDetailPicture">
					<div
						className="approveDetailAuto"
						ref={(dom) => {
							this.dom = dom;
						}}
					>
						{this.createDom()}
					</div>
				</div>
			</div>
		);
	}
}
