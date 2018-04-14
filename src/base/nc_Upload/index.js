import React, { Component } from 'react';
import { Upload } from 'tinper-bee';

export default class NCUpload extends Component {
	render() {
		return <Upload {...this.props} />;
	}
}
