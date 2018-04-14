import React, { Component } from 'react';
import { Popconfirm } from 'tinper-bee';

export default class NCPopconfirm extends Component {
	render() {
		return <Popconfirm {...this.props}></Popconfirm>;
	}
}