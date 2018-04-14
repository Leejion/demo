import React, { Component } from 'react';
import { Table } from 'tinper-bee';
import './index.less';

export default class NCTable extends Component {
	render() {
		return <Table {...this.props} />;
	}
}
