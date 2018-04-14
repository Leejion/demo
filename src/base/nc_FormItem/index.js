import React, { Component } from 'react';
import { Form } from 'tinper-bee';
const { FormItem } = Form;
export default class NCFormItem extends Component {
	render() {
		return <FormItem {...this.props} />;
	}
}
