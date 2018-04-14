import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import SingleGrid from './SingleGrid';
import SingleTree from './SingleTree';
import MultiRefer from './MultiRefer';
import './SingleGrid.less';
import './MultiRefer.less';
import getRefer from '../ReferDemo';

class Refer extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { isMultiSelectedEnabled, refType, ...others } = this.props;
		if (isMultiSelectedEnabled || refType === 'gridTree') {
			return <MultiRefer {...this.props} />;
		} else if (refType === 'tree') {
			return <SingleTree {...others} />;
		} else {
			return <SingleGrid {...others} />;
		}
	}
}

Refer.propTypes = {
	isMultiSelectedEnabled: PropTypes.bool
};

Refer.defaultProps = {
	isMultiSelectedEnabled: false //是否多选
};

Refer.getRefer = getRefer;

export default Refer;
