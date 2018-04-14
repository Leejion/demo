import React, { Component } from 'react';
import { createPage } from '../../src';
import { searchButtonClick } from './events';
class IcSimpleSearch extends Component {
	constructor(props) {
		super(props);
		//表单meta信息
		this.meta9 = {
			title: '结算方式',
			id: 'jj', //模糊搜索字段
			buttons: [
				{ id: 'addButton', name: '新增', onButtonClick: this.buttonClick.bind(this, 'add'), colors: 'primary' },
				{ id: 'delButton', name: '删除', onButtonClick: this.buttonClick.bind(this, 'del'), colors: 'success' }
			],
			content: this.others(), //其他搜索，没有则不写
			refers: {
				//refer信息,没有则不写
				attrcode: 'dept',
				label: '组织',
				refcode: 'dept'
			}
		};
	}

	others() {
		//其他搜索条件，如停启用等
		return <div>嘎嘎嘎</div>;
	}

	buttonClick = (way) => {
		//跳转到新增页面或者弹出框
		console.log(way);
	};

	render() {
		let { createSimpleSearch } = this.props.simpleSearch;
		return <div>{createSimpleSearch(this.meta9, { searchButtonClick: searchButtonClick.bind(this) })}</div>;
	}
}

export default createPage({})(IcSimpleSearch);
