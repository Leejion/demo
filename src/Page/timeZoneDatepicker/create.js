import React, { Component } from 'react';
import { Button } from 'tinper-bee';
import DatePicker from "tinper-bee/lib/Datepicker";
import moment from 'moment';
import './index.less';
import $NCPE from '../../pe/pe.js';

export function createTZDatepicker(item) {
		let { format = 'YYYY-MM-DD', value, onChange, ...others } = this.props;
		return (
			<DatePicker
				className="nc-input"
				format={format}
				value={value ? moment(value) : null}
				onChange={(v) => {
					console.log(v);
					//this.state.timeZone = v.format(format);//
					console.log(this.state.timeZone)
					//this.props.onChange && this.props.onChange(v.format(format));
				}}
				{...others}
			/>
		);
	}

