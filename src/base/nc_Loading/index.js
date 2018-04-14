import React, { Component } from 'react';
import { Loading } from 'tinper-bee';

export default class NCLoading extends Component {
	render() {
		return <Loading {...this.props} />;
	}
}
