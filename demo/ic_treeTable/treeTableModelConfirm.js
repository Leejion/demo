export default function treeTableModelConfirm(props, moduleId, operType, data) {
    if (operType == 'add') {
        //拿到新增数据
       if(data.parentId.value==='root'){
           //新增数据请求后台
         
           //若请求成功 增加新的根节点
            props.treeTable.addRootTreeNode(moduleId, data);

       }else{
            //将新增数据请求后台

            //若请求成功，给树添加节点
            data.id={value:'1-1-1-1'}
            props.treeTable.addTreeNode(moduleId, data);
            props.treeTable.setSelectedNodeById(moduleId, data.id.value);
       }
    }

    if (operType == 'edit') {
        //拿到修改数据

        //将新增数据请求后台


        //若请求成功，修改树节点
        props.treeTable.editTreeNode(moduleId, data);
    }
}