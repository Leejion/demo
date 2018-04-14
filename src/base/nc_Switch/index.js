/**
 * Created by wangshhj on 2018/1/10.
 */
import React, { Component } from 'react';
import { Row, Col, Switch } from 'tinper-bee';

export default class NCSwitch extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return <Switch {...this.props} />;
	}
}
