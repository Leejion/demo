import React, { Component } from 'react';
import { Tabs } from 'tinper-bee';
const { TabPane } = Tabs;
import './nc_Tabs.less'
class NCTabPane extends Component {
	render() {
		return <TabPane {...this.props} />;
	}
}

class NCTabs extends Component {
	render() {
		let { children, ...others } = this.props;
		return (
			<Tabs {...others} className='lightapp-component-tabs'>
				{this.props.children.map((e, i) => {
					if (e.type.name === 'NCTabPane') {
						return e;
					}
				})}
			</Tabs>
		);
	}
}
NCTabs.NCTabPane = NCTabPane;

export default NCTabs;
