import React, { Component } from 'react';
import { render } from 'react-dom';
class Demo extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return <div>card</div>;
	}
}
render(<Demo />, document.getElementById('app'));
