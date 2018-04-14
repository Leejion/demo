import React, { Component } from 'react';
import { FormControl } from 'tinper-bee';
import './index.less';

export default class NCFormControl extends Component {
	handleBlur = (e) => {
		const { onBlur } = this.props;
		onBlur && onBlur(e.target.value);
	};
	render() {
		let { isViewMode, className, onBlur, ...others } = this.props;
		return isViewMode ? (
			<span style={{ lineHeight: '28px' }}>{this.props.value}</span>
		) : (
			<FormControl className={`nc-input ${className}`} onBlur={this.handleBlur} {...others} />
		);
	}
}
