import React, { Component } from 'react';
import './index.less';

export default class NCTextArea extends Component {
	render() {
		let { onChange, onBlur, className, value,  ...others } = this.props;
		return (
			<textarea
				className={`u-form-control ${className}`}
				onChange={(e) => void onChange(e.target.value, e)}
				onBlur={(e) => { onBlur && onBlur(e.target.value)}}
				{...others}
			/>
		);
	}
}
