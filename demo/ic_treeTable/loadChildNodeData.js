export default function loadChildNodeData(props,moduleId,id,config) {

    setTimeout(()=>{
        // id 为点击节点的 id值
        //根据 id请求后台数据
        //console.log(id);
        //console.log('config:',config)
        let children = [
            {
                name: {value: "类型1-1"},
                code: {value:2},
                id:{value:'1-1'},
                organ: {value: 2},
                use:{value:false},
                ts:{value:'ts1-1'},
            }, {
                name: {value:"类型1-2"},
                code: {value:2},
                id:{value:'1-2'},
                organ: {value: 1},
                use:{value:true},
                ts:{value:'ts1-2'},
            }
        ]
        //将请求回来的数据添加为当前结点的子节点
        props.treeTable.setChildrenByParentId(moduleId,id,children);
    },500);
    
}