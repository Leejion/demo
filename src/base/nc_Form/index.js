import React, { Component } from 'react';
import { Form } from 'tinper-bee';
import NCFormItem from '../nc_FormItem';
class NCForm extends Component {
	render() {
		return <Form {...this.props} />;
	}
}

NCForm.NCFormItem = NCFormItem;
export default NCForm;
