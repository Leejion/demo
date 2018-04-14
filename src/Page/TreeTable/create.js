import { Tree } from 'tinper-bee';
import './index.less';
import classnames from 'classnames';
import ModelForm from '../Table/modelForm';
const TreeNode = Tree.TreeNode;
import clone from '../../public/deepClone';

export function createTreeTable(moduleId, configs) {
	if (!this.state.treeTable.hasOwnProperty(moduleId)) {
		this.state.treeTable[moduleId] = {
			rows: [],
			isHover: '',
			model: false,
			operType: null,
			id: null,
			expandedKeys: [],
			selectedKeys: []
		};
	}

	let ModelFormMeta = {};

	if (this.state.meta[moduleId]) {
		ModelFormMeta = {
			moduleId,
			modelColumn: this.state.meta[moduleId].items,
			id: this.state.treeTable[moduleId].id
		};
	}
	let tableModeldata = this.state.tableModeldata[moduleId] || {};

	return this.state.meta[moduleId] ? (
		<div className="nc-tree-table">
			<div className="nc-tree-table-title">{configs.title}</div>
			<Tree
				className="nc-tree-table-content"
				openIcon={configs.openIcon}
				closeIcon={configs.closeIcon}
				expandedKeys={this.state.treeTable[moduleId].expandedKeys}
				selectedKeys={this.state.treeTable[moduleId].selectedKeys}
				onMouseLeave={() => {
					onMouseLeave.call(this, moduleId);
				}}
				onMouseEnter={(e) => {
					onMouseEnter.call(this, e, moduleId);
				}}
				autoExpandParent={false}
				//选中的节点
				onSelect={(selectedKeys, e) => {
					onSelect.call(this, moduleId, selectedKeys, e);
				}}
				//打开的节点
				onExpand={(expandArr, b) => {
					onExpand.call(this, moduleId, expandArr, b)
				}}
				//打开父节点时加载子节点数据
				loadData={(treeNode) => {
					return new Promise((resolve) => {
						configs.loadChildNodeData({ ...this.output, ...this.props }, moduleId, treeNode.props.eventKey);
						resolve();
					});
				}}
			>
				{loop.call(this, moduleId, this.state.treeTable[moduleId].rows, 1, configs)}
			</Tree>

			<ModelForm
				moduleId={moduleId}
				showModal={this.state.treeTable[moduleId].modal}
				type={this.state.treeTable[moduleId].operType}

				modelDatas={ModelFormMeta}
				tableModeldata={tableModeldata}
				//renderItem={renderItem.table && renderItem.table[moduleId]}

				afterEvent={(configs.onAfterEvent && typeof configs.onAfterEvent == 'function') ? configs.onAfterEvent.bind(this, { ...this.output }) : function () { }}
				output={this.output}
				closeModel={closeModel.bind(this, moduleId)}
				tableModelConfirm={(data) => {
					modelConfirm.call(this, moduleId, data, configs);
				}}
			/>
		</div>
	) : null;
}

function modelConfirm(moduleId, data, configs) {
	//关闭模态框
	this.state.treeTable[moduleId].modal = false;
	//清空meta的value
	this.state.meta[moduleId].items = this.state.meta[moduleId].items.map((item, index) => {
		item.value = null;
		return item;
	});
	this.setState({
		meta: this.state.meta,
		treeTable: this.state.treeTable
	});

	const id = this.state.treeTable[moduleId].id;
	let newData = clone(data[moduleId].rows[0].values);
	if (id != 'root') {
		const currentNode = this.treeTable.findTreeNodeById(moduleId, id);
		if (currentNode.ts) {
			newData.ts = currentNode.ts;
		}
	}
	//根据子节点的id 查找父节点
	if (this.state.treeTable[moduleId].operType == 'edit') {
		let parentId = this.treeTable.findParentById(moduleId, id).id;
		if (parentId) {
			newData.parentId = parentId;
		}
	}
	if (this.state.treeTable[moduleId].operType == 'add') {
		newData.parentId = newData.id;
		delete newData.id;
	}
	//确认回调
	configs.treeTableModelConfirm.call(
		this,
		{ ...this.output, ...this.props },
		moduleId,
		this.state.treeTable[moduleId].operType,
		newData
	);
}

function closeModel(moduleId) {
	//关闭模态框
	this.state.treeTable[moduleId].modal = false;
	//清空meta的value
	this.state.meta[moduleId].items = this.state.meta[moduleId].items.map((item, index) => {
		item.value = null;
		return item;
	});
	this.setState({
		treeTable: this.state.treeTable,
		meta: this.state.meta
	});
}

function loop(moduleId, data, level, configs) {
	const selectedKeys = this.state.treeTable[moduleId].selectedKeys;
	const isHover = this.state.treeTable[moduleId].isHover;
	return data.map((item, index) => {
		let treeNodeClass = classnames({
			'tree-level': true,
			'tree-level-selected': selectedKeys && selectedKeys == item.id.value,
			'tree-level-hover': isHover && isHover == item.id.value
		});

		if (item.children && item.children.length) {
			return (
				<TreeNode
					key={item.id.value}
					title={configs.renderTreeTitle.call(
						this,
						{
							...this.props,
							...this.output
						},
						moduleId,
						item
					)}
					className={treeNodeClass}
					switcherStyle={{ paddingLeft: level * 20 + 200 }}
				>
					{loop.call(this, moduleId, item.children, level + 1, configs)}
				</TreeNode>
			);
		} else {
			return (
				<TreeNode
					key={item.id.value}
					title={configs.renderTreeTitle.call(
						this,
						{
							...this.props,
							...this.output
						},
						moduleId,
						item
					)}
					className={treeNodeClass}
					switcherStyle={{ paddingLeft: level * 20 + 200 }}
				/>
			);
		}
	});
}

function onMouseEnter(e, moduleId) {
	this.state.treeTable[moduleId].isHover = e.node.props.eventKey;
	this.setState({
		treeTable: this.state.treeTable
	});
}

function onMouseLeave(moduleId) {
	this.state.treeTable[moduleId].isHover = '';
	this.setState({
		treeTable: this.state.treeTable
	});
}

function onSelect(moduleId, selectedKeys, e) {
	this.state.treeTable[moduleId].selectedKeys = selectedKeys;
	this.setState({
		treeTable: this.state.treeTable
	});
}

function onExpand(moduleId, expandArr, b) {
	this.state.treeTable[moduleId].expandedKeys = expandArr;
	this.setState({
		treeTable: this.state.treeTable
	});
}
