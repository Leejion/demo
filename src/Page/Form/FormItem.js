import React, { Component } from 'react';
import { NCCol as Col, NCRow as Row } from '../../base';

export default class FormItem extends Component {
	constructor(props) {
		super(props);
	}

	// shouldComponentUpdate(nextProps, nextState) {
	// 	return (
	// 		nextProps.children.props.value !== this.props.children.props.value ||
	// 		nextProps.children.props.disabled !== this.props.children.props.disabled
	// 	);
	// }

	// componentDidUpdate(prevProps, prevState) {
	// 	// console.log(this.props.label, ': updated');
	// }

	render() {
		// console.log(this.props);
		let {
			children,
			errorMsg,
			verify,
			labelName,
			labelXs,
			xs,
			col,
			isrequired,
			leftspace,
			rightspace,
			pagestatus,
			isViewMode,
			scale,
			errormessage,
			itemtype
		} = this.props;
		if (this.props.children instanceof Array) {
			children = [ ...this.props.children ];
		}
		if (verify === false) {
			errorMsg = (
				<span
					style={{
						color: 'red',
						fontSize: '10px'
					}}
					className="input-error-message"
				>
					{errormessage || '请输入合法的数据！'}
				</span>
			);
		}
		return (
			<span>
				{leftspace != 0 && <Col xs={leftspace} style={{ height: '55px' }} />}
				<Col xs={labelXs} style={{ lineHeight: '21px', height: '21px',textAlign:'right' ,position:'relative',top:'5px'}}>
					{isrequired && <span className="u-mast">*</span>}
					{`${labelName}：`}
				</Col>
				<Col xs={xs} className={'clearfix'} style={{ paddingBottom: '13px' }}>
					<div style={{ minHeight: '28px' }} className={`form-component-item-wrapper ${itemtype}-wrapper`}>
						{children}
					</div>
					<div
						className="form-component-errorMessage"
						style={{ height: '20px', position: 'absolute', bottom: 5, left: 15 }}
					>
						{errorMsg}
					</div>
				</Col>
				{rightspace != 0 && <Col xs={rightspace} style={{ height: '43px' }} />}
			</span>
		);
	}
}
