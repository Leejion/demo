import React, { Component } from 'react';
//业务组写法：从npm包引入
// import { high } from 'nc-lightapp-front';
// 从打包后的build目录引入
// import { high } from 'build';
// 从源码引入
import { createPage, high, base } from '../../src';
// import { createPage, high, base } from '../../build';
const { Refer, TmcUploader } = high;
const { NCNumber, NCButton, NCTabs } = base;
const { NCTabPane } = NCTabs;

import './index.less';
import initTemplate from './initTemplate';
import buttonClick from './buttonClick';
import { Select } from 'tinper-bee';
import { afterEvent } from './events';

const Option = Select.Option;
const OptGroup = Select.OptGroup;

class MaterielRefer extends Component {
	render() {
		return (
			<Refer
				{...this.props}
				refName={'物料'}
				refCode={'materiel'}
				queryGridUrl={'/newdemo-web/demo/matrial/matrialtree'}
				queryTreeUrl={'/newdemo-web/demo/matrialclass/matrialclasstree'}
			/>
		);
	}
}

class BankRefer extends Component {
	render() {
		return (
			<Refer
				{...this.props}
				refName={'银行'}
				refCode={'bank'}
				queryGridUrl={'/newdemo-web/demo/bank/listbank'}
				queryTreeUrl={'/newdemo-web/demo/matrialclass/matrialclasstree'}
			/>
		);
	}
}

class IcApply extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currency: {},
			currency1: {},
			currency2: [],
			currency3: [],
			currency4: [],
			value: ''
		};
	}

	render() {
		const { editTable, form, button, table } = this.props;
		const { createForm } = form;
		const { createEditTable } = editTable;
		const { createSimpleTable } = table;
		const { createButton } = button;
		return <div style={{ width: '240px' }}>{<BankRefer />}</div>;
	}
}

export default createPage({
	//模板
	initTemplate
	// 编辑后事件
})(IcApply);
