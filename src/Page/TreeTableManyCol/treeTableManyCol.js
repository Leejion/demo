import { Tree } from 'tinper-bee';
import './treeTableManyCol.less';
import { Table } from 'tinper-bee';
import classnames from 'classnames';
import ModelForm from '../Table/modelForm';
import deepClone from '../../public/deepClone';
const TreeNode = Tree.TreeNode;
import clone from '../../public/deepClone';
const current = {
	row:null
};
let formId = null;
function TreeTableManyCol(id, { editCallBack, addCallBack, delCallBack, expandEve } = {}) {
    if(!this.state.treeTableCol.hasOwnProperty(id)){
        this.state.treeTableCol[id] = {
        	firstTime:true
		}
    }
	let columns = this.state.meta[id];
	if (!columns) {
		return false;
	}
	if (!this.state.treeTableCol[id].data) {
		return false;
	}

	let thisTable = this.state.treeTableCol[id];
    let treeData = thisTable.data;

	let defTreeData = deepClone(treeData);
	let defCol = deepClone(columns);
	console.log(columns);

	console.log(treeData);

    //	显示加号
	const haveExpandIcon = (record, index) => {
		//控制是否显示行展开icon
		if (record.hasOwnProperty('children')) {
			return true;
		}
		return false;
	};

	//  处理数据格式
	let num = 0;
	const createNewData = (data) => {
		return data.map((item, index) => {
            num++;
			let values = item.values;
			for(let key in values){
				if( key === 'children' ){
                    values[key] = createNewData(values[key])
				}else{
					let itemVal = item.values[key];
                    values[key] = itemVal.display || itemVal.display == 0 ? itemVal.display : itemVal.value;
				}
			}
            values.key = values.rowId =  new Date().getTime() + index + num;
            return values
		});
	};

	//  编辑按钮事件
	const showModal = (record, node) => {
		current.row = record;
		this.modal.show(node)
	};

    // 新增/修改节点弹出框内容
    const modalContent = () => {
        return (
            <div className="addModal">
                {  this.form.createForm( formId ) }
            </div>
        )
    };

    //  删除模态框确认事件
    const delNodeEve = ( record ) => {
        console.log(record)
    };

    //  新增模态框确认事件
    const addNodeEve = ( record ) => {
        console.log(record)
    };

    //  修改模态框确认事件
    const editNodeEve = ( ) => {
       let data = this.form.getAllFormValue(formId);
		if(editCallBack && typeof editCallBack == 'function'){
            editCallBack(data.rows[0].values, current.row)
		}
    };

	// 处理模板
	const createNewCol = (data) => {
		let newArr = [];
		 data.forEach((item) => {
			if(item.visible){
                item.title = item.label;
                item.dataIndex = item.attrcode;
                newArr.push(item)
			}
		});
        let btnCol = {
            title: '操作',
            visible:true,
            dataIndex: 'btnCol',
            render(text, record, index) {
                return (
                    <div>
						<span className="editButton btn" onClick={ showModal.bind(this, record, 'editNode')}>
							修改
						</span>
                        <span className="addButton btn" onClick={ showModal.bind(this, record, 'addNode' )}>
							增行
						</span>
                        <span className="delButton btn" onClick={ showModal.bind(this, record, 'delNode')}>
							删除
						</span>
                    </div>
                );
            }
        };
        newArr.push(btnCol);
		return newArr
	};

	//	第一次渲染，处理数据，并设置编辑弹出模态框模板
	if( thisTable.firstTime ){
        formId = id + 'form';
        this.state.meta[formId] = {
            moduletype: 'form',
            items:defCol.items
        };
        thisTable.firstTime = false;
	}

	//	展开行
	const onExpand = ( status, item ) => {
		if( status ){
			if(expandEve && typeof expandEve === 'function'){
				thisTable.currentRow = item;
				expandEve(item)
			}
		}
	};

	return (
		<div id={id} className="treeTableManyCol">
			<Table
				haveExpandIcon={haveExpandIcon.bind(this)}
				columns={ createNewCol(columns.items) }
				data={ createNewData(defTreeData) }
                onExpand = { onExpand.bind(this) }
			/>

            {this.modal.createModal('delNode', {
                title: '删除节点',
                content: '确定该删除节点？',
                beSureBtnClick: delNodeEve.bind(this)
            })}
            {this.modal.createModal('addNode', {
                title: '新增节点',
                content: modalContent.call(this),
                beSureBtnClick: addNodeEve.bind(this)
            })}
            {this.modal.createModal('editNode', {
                title: '编辑节点',
                content: modalContent.call(this),
                beSureBtnClick: editNodeEve.bind(this)
            })}
		</div>
	);
}

export default TreeTableManyCol;
