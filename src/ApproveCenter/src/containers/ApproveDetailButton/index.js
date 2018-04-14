import React, { Component } from 'react';
import ApproveDetail from '../ApproveDetail';
import { Button, Icon, Modal } from 'tinper-bee';
import './index.less';

export default class ApproveDetailButton extends Component {
	static defaultProps = {
		processInstanceId: '',
		icon: false
	};

	constructor(props) {
		super(props);
		this.state = {
			modalShow: false
		};
	}

	showApproveDetail = () => {
		this.setState({
			modalShow: true
		});
	};

	render() {
		let { modalShow } = this.state;
		let { processInstanceId, icon, ...otherProps } = this.props;
		return (
			<div className="approve-detail-button" {...otherProps}>
				{icon ? (
					<Icon
						className="iconfont icon-shenpiliucheng icon-style"
						data-tooltip="审批流程"
						onClick={this.showApproveDetail}
					/>
				) : (
					<Button className="btn-2 btn-cancel" onClick={this.showApproveDetail}>
						审批流程
					</Button>
				)}
				<Modal
					show={modalShow}
					backdrop={true}
					size={'lg'}
					onHide={() => {
						this.setState({
							modalShow: false
						});
					}}
					className="approve-detail-modal"
				>
					<Modal.Header closeButton>审批流程</Modal.Header>
					<Modal.Body>
						<ApproveDetail type={'detail'} {...this.props} />
					</Modal.Body>
				</Modal>
			</div>
		);
	}
}
