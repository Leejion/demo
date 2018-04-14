/**
 * Created by wangshhj on 2018/1/10.
 */
import React, { Component } from 'react';
import { Select } from 'tinper-bee';
const Option = Select.Option;
import './index.less';

class NCSelect extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		let { className, ...others } = this.props;
		return (
			<Select className={`nc-select ${className}`} {...others}>
				{this.props.children}
			</Select>
		);
	}
}

NCSelect.NCOption = Option;

export default NCSelect;
