import React, { Component } from 'react';
import { Pagination } from 'tinper-bee';

export default class NCPagination extends Component {
	render() {
		return <Pagination {...this.props} />;
	}
}
