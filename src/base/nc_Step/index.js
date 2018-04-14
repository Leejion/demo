import React, { Component } from 'react';
import { Step } from 'tinper-bee';
const { Steps } = Step;

export default class NCStep extends Component {
	render() {
		return <Step {...this.props} />;
	}
}

NCStep.NCSteps = Steps;
