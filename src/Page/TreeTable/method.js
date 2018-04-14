import clone from '../../public/deepClone';

//新增
export function addHandler(moduleId, id) {
    //根据 id 找到当前节点
    let currentNode = this.treeTable.findTreeNodeById(moduleId, id);
    //给模态框的父节点分类设置默认值
    this.treeTable.setModalInitValue(moduleId, { parent: currentNode.name })
    //打开模态框
    this.treeTable.openTreeTableModel(moduleId, id, 'add');
}
//修改
export function editHandler(moduleId, id) {
    //根据 id 找到当前节点
    let currentNode = this.treeTable.findTreeNodeById(moduleId, id);
    //给模态框设置默认值
    this.treeTable.setModalInitValue(moduleId, currentNode)
    //打开模态框
    this.treeTable.openTreeTableModel(moduleId, id, 'edit');
}
//停用
export function disableHandler(moduleId, id) {
    //根据 id 找到当前节点
    let currentNode = this.treeTable.findTreeNodeById(moduleId, id);
    let flag = this.treeTable.isTreePropertyEqual(currentNode, 'use', true);
    if (flag) {
        alert('请先停用子节点')
    } else {
        //停用该节点
        this.treeTable.setTreeNodeValue(moduleId, id, { use: false })
    }
}
//启用
export function enableHandler(moduleId, id) {
    //根据 id 找到当前节点
    let currentNode = this.treeTable.findTreeNodeById(moduleId, id);
    //启用该节点
    this.treeTable.setTreeNodeValue(moduleId, id, { use: true })
}
//确认
export function modelConfirm(moduleId, operType, data) {
    if (operType == 'add') {
        this.treeTable.addTreeNode(moduleId, data)
    }
    if (operType == 'edit') {
        this.treeTable.editTreeNode(moduleId, data);
    }
}


//初始化树组件的数据
export function initTreeValue(moduleId, data) {
    if (this.state.treeTable[moduleId]) {
        this.state.treeTable[moduleId].rows = data;
        this.state.treeTable[moduleId].expandedKeys = [];
        this.setState({
            treeTable: this.state.treeTable
        })
    }
}

//给节点增加设置子节点
export function setChildrenByParentId(moduleId, id, data) {
    let curNode = this.treeTable.findTreeNodeById(moduleId, id);
    curNode.children = data;
    this.setState({
        treeTable: this.state.treeTable
    })
}

//修改节点
export function editTreeNode(moduleId, data) {
    //查找当前节点
    let id = this.state.treeTable[moduleId].id;
    let curNode = this.treeTable.findTreeNodeById(moduleId, id);
    //修改当前节点
    let childItem = data;
    for (let pop in childItem) {
        if (pop != 'children' && pop != 'parentId') {
            curNode[pop] = {
                value: childItem[pop].value
            }
        }
    }
    this.setState({
        treeTable: this.state.treeTable
    })
}

//获取ishover
export function getHoverNodeId(moduleId) {
    return this.state.treeTable[moduleId] && this.state.treeTable[moduleId].isHover;
}

//设置选中节点
export function setSelectedNodeById(moduleId, id) {
    if (this.state.treeTable[moduleId]) {
        this.state.treeTable[moduleId].selectedKeys = [id];
        this.setState({
            treeTable: this.state.treeTable
        })
    }

}

export function addRootTreeNode(moduleId, data) {
    if (this.state.treeTable[moduleId]) {
        this.state.treeTable[moduleId].rows.push(data);
        if (data.id.value) {
            this.state.treeTable[moduleId].selectedKeys = [data.id.value];
        }
        this.setState({
            treeTable: this.state.treeTable
        })
    }

}

//根据id向节点中插入子节点
export function addTreeNode(moduleId, data) {
    //查找当前节点
    let id = this.state.treeTable[moduleId].id;
    let curNode = this.treeTable.findTreeNodeById(moduleId, id);
    //给元素添加新节点
    let childItem = data;
    if (curNode.children && curNode.children.length) {
        curNode.children.push(childItem);
    } else {
        curNode.children = [childItem];
    }
    //展开父节点
    this.state.treeTable[moduleId].expandedKeys.push(id);
    //this.state.treeTable[moduleId].selectedKeys = [id];
    //修改state
    this.setState({
        treeTable: this.state.treeTable
    })

}


//打开模态框
export function openTreeTableModel(moduleId, id, operType) {
    this.state.treeTable[moduleId].modal = true;
    this.state.treeTable[moduleId].operType = operType;
    this.state.treeTable[moduleId].id = id;
    let initData = {};
   // this.state.meta[moduleId].items
    this.setState({
        treeTable: this.state.treeTable,
        tableModeldata: {
			[moduleId]: initData || {}
		}
    })
}

//根据节点设置模态框默认值
export function setModalInitValue(moduleId, popsObj) {
    for (let pop in popsObj) {
        let item = this.state.meta[moduleId].items.find(function (elem) {
            return elem.key == pop;
        });
        let index = this.state.meta[moduleId].items.indexOf(item);
        if (item) {
            item.value = popsObj[pop].value;
        }
        this.state.meta[moduleId].items[index] = item;
    }
    this.setState({
        meta: this.state.meta
    })
}

//设置树中某个节点的属性
export function setTreeNodeValue(moduleId, id, popsObj) {
    let currentNode = this.treeTable.findTreeNodeById(moduleId, id);
    for (let pop in popsObj) {
        currentNode[pop] = {
            value: popsObj[pop]
        }
    }
    this.setState({ treeTable: this.state.treeTable });
}

//获取树中某个节点的属性
// this.treeTable.getTreeNodeValue(moduleId, id, ['organ','name'])
export function getTreeNodeValue(moduleId, id, pops) {
    let currentNode = this.treeTable.findTreeNodeById(moduleId, id);

    if (typeof pops === 'string') {
        return currentNode[pops].value;

    } else if (pops instanceof Array) {
        let newData = [];
        newData = pops.map((item, i) => {
            return currentNode[item].value;
        });
        return newData;
    }
}

//根据id查找多叉树中的某个节点
export function findTreeNodeById(moduleId, id) {
    let node = this.state.treeTable[moduleId].rows;

    var queue = [];
    while (node != null) {
        if (node.id) {
            if (node.id.value == id) {
                return node;
            }
        }
        if (node.length) {
            for (var i = 0; i < node.length; i++) {
                queue.push(node[i]);//借助于队列,暂存当前节点的所有子节点  
            }
        }
        if (node.children && node.children.length) {
            for (var i = 0; i < node.children.length; i++) {
                queue.push(node.children[i]);//借助于队列,暂存当前节点的所有子节点  
            }
        }
        node = queue.shift();//先入先出，借助于数据结构：队列  
    }
}

//判断树中某个节点是否含有属性pop=val的子节点
//返回true/false
export function isTreePropertyEqual(root, pop, val) {
    /*
     root为树的根节点
     pop为要查找的属性
     value为属性值
    */
    if (root.children && root.children.length) {
        let node = root.children;
        var queue = [];
        while (node != null) {
            if (node[pop]) {
                if (node[pop].value == val) {
                    return true;
                }
            }
            if (node.length) {
                for (var i = 0; i < node.length; i++) {
                    queue.push(node[i]);
                }
            }
            if (node.children && node.children.length) {
                for (var i = 0; i < node.children.length; i++) {
                    queue.push(node.children[i]);
                }
            }
            node = queue.shift();//先入先出，借助于数据结构：队列  
        }
    }
    return false;
}

//根据节点的id 查找该节点的父节点
export function findParentById(moduleId, id) {
    let node = clone(this.state.treeTable[moduleId].rows);
    let ok = false;
    let result; //子节点的父节点
    while (!ok) {
        if(node && node.length>0){
            let item = node.shift();
            if (item.children && item.children.length > 0) {
                for (let i = 0; i < item.children.length; i++) {
                    if (item.children[i].id.value == id) {
                        result = item;
                        ok = true;
                        break;
                    } else {
                        node = node.concat(item.children);
                    }
                }
            }
        }else{
            return false; 
        } 
    }
    return result;
}
