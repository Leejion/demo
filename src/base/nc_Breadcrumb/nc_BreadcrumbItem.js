import React, { Component } from 'react';
import { Breadcrumb } from 'tinper-bee';

export default class NCBreadcrumbItem extends Component {
	render() {
		return <Breadcrumb.Item {...this.props} />;
	}
}
