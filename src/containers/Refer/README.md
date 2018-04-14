## 参照
## 参照
### API

参数 | 说明|类型|默认值
---|---|---|---|
refCode|参照编码（必输）|string |'code'| 
value|参照的值（必输）| object|{}|
onChange|选中参照后的回调（必输）|function(value)|null
isMultiSelectedEnabled|是否多选|boolean| false| 
refType|参照展示类型(grid/tree/gridTree)|string|'grid'
columnConfig| 配置多级菜单以及参照展示|array|[{name: [ '编码', '名称' ],code: [ 'refcode', 'refname' ]}]|
treeConfig| 配置树的展示|array|[{name: [ '名称' ],code: [ 'refname' ]}]|
hotDataSize|历史记录条数|number|20|
pageSize|分页请求数据时每页条数|number|20|
disabled|是否禁用|boolean|false|
placeholder|placeholder|string|''|
queryGridUrl|查询表数据的请求url|string|''|
queryTreeUrl|查询树数据的请求url|string|''|
clickContainer|指定点击可以触发参照弹窗的元素|object|null
queryCondition|return一个对象，传到后台|function|function () {}
onTreeNodeExpand|树节点展开事件|function|function (node) {}
isCacheable|是否启用数据缓存|boolean|true


示例：

```javascript
import React, { Component } from 'react';
//业务组写法：从npm包引入
import { high } from 'nc-lightapp-front';
const { Refer } = high;

// 业务组可以简单的将通用的参照组件封装成业务参照组件，如下面的：物料参照、银行参照
class MaterielRefer extends Component {
	render() {
		return (
			<Refer
				{...this.props}
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
				refCode={'bank'}
				queryGridUrl={'/newdemo-web/demo/bank/listbank'}
				queryTreeUrl={'/newdemo-web/demo/matrialclass/matrialclasstree'}
			/>
		);
	}
}

class DemoPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currency: {},
			currency1: {},
			currency2: [],
			currency3: [],
			currency4: []
		};
	}

	render() {
		return (
			<div className="clearfix">
				<div style={{ width: '240px', float: 'left' }}>
					<BankRefer
						value={this.state.currency}
						onChange={(value) => {
							this.setState({
								currency: value
							});
						}}
						placeholder="单选表"
						refType="grid"
					/>
				</div>
				<div style={{ width: '240px', float: 'left' }}>
					<MaterielRefer
						value={this.state.currency1}
						onChange={(value) => {
							this.setState({
								currency1: value
							});
						}}
						placeholder="单选树"
						refType="tree"
					/>
				</div>
				<div style={{ width: '240px', float: 'left' }}>
					<MaterielRefer
						value={this.state.currency2}
						onChange={(value) => {
							this.setState({
								currency2: value
							});
						}}
						placeholder="多选树"
						refType="tree"
						isMultiSelectedEnabled={true}
					/>
				</div>
				<div style={{ width: '240px', float: 'left' }}>
					<BankRefer
						value={this.state.currency3}
						onChange={(value) => {
							this.setState({
								currency3: value
							});
						}}
						placeholder="多选表格"
						refType="grid"
						isMultiSelectedEnabled={true}
					/>
				</div>
				<div style={{ width: '240px', float: 'left' }}>
					<MaterielRefer
						value={this.state.currency4}
						onChange={(value) => {
							this.setState({
								currency4: value
							});
						}}
						placeholder="多选树表"
						refType="gridTree"
						isMultiSelectedEnabled={true}
					/>
				</div>
			</div>
		);
	}
}

export default DemoPage;


```