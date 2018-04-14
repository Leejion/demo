import React, { Component } from 'react';
import { Button } from 'tinper-bee';
import $NCPE from '../../pe/pe.js';
import './index.less';

export function createButton(id, config = {}) {
	let { disabled = false, name = '', onButtonClick, buttonColor, ...others } = config;
	if (!this.state.button.hasOwnProperty(id)) {
		//初始化
		this.state.button[id] = { disabled };
	}

	return (
		<Button
			disabled={this.state.button[id].disabled}
			onClick={() => {
				$NCPE.proxy(onButtonClick.bind(this, { ...this.props, ...this.output }, id), this, name)();
				//onButtonClick.call(this,{...this.props,...this.output},id)
			}}
			{...others}
			color={buttonColor}
			id={id}
			className={
              `${  !this.state.button[id].hasOwnProperty('visible') || this.state.button[id].visible ? 'show' : 'hide' }  button-component `
			}
		>
			{name}
		</Button>
	);
}
