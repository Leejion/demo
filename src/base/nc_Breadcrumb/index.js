import React, { Component } from 'react';
import { Breadcrumb } from 'tinper-bee';
import NCBreadcrumbItem from './nc_BreadcrumbItem';
import './index.less'

class NCBreadcrumb extends Component {
	render() {
		return <Breadcrumb {...this.props} />;
	}
}
NCBreadcrumb.NCBreadcrumbItem = NCBreadcrumbItem;
export default NCBreadcrumb;
