import React, { Component } from 'react';
// import TmcUploader from '../../src/Page/TmcUploader';
import {createPage, ajax, base} from '../../src';

class UploadDemo extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const { Uploader } = this.props;
		return (
			<div
				style={{
					width: '200px',
					height: '50px',
					margin: '0 auto'
				}}
			>
				{ Uploader('1001A110000000004I83') }
				{/*<TmcUploader billID="1001A110000000004I832222" />*/}
			</div>
		);
	}
}
export default createPage({})(UploadDemo)
