import React, { Component } from 'react';
import { Button } from 'tinper-bee';
import $NCPE from '../../pe/pe.js';

export default class NCButton extends Component { 
	render() {
		let { onClick, ...others } = this.props;
		return (
			<Button
				onClick={() => {
					$NCPE.proxy(onClick, this, this.props.children)();
					//typeof onClick === 'function' && onClick();
				}}
				{...others}
			/>
		);
	}
}
