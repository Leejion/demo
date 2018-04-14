import { NCIcon } from '../../src/base';
export default function renderTreeTitle(props,moduleId,item,config){
    let titleIcon, titleInfo;
    //console.log('renderTreeTitle',config)
    //显示名称
    titleInfo = <span className="title-middle">{item.name.value}</span>
    
    //显示操作图标
    if (props.treeTable.getHoverNodeId(moduleId) == item.id.value) {
        titleIcon = (
            <span className="icon">
                <NCIcon
                    className="uf-add-c-o"
                    onClick ={()=>{
                        //根据 id 找到当前节点
                        let currentNode = props.treeTable.findTreeNodeById(moduleId, item.id.value);
                        //给模态框的父节点分类设置默认值
                        props.treeTable.setModalInitValue(moduleId,{parentName:currentNode.name})
                        //打开模态框
                        props.treeTable.openTreeTableModel(moduleId,item.id.value,'add');
                    }}
                >
                </NCIcon>
                <NCIcon
                    className="uf-pencil-s"
                    onClick ={()=>{
                        //根据 id 找到当前节点
                        let currentNode = props.treeTable.findTreeNodeById(moduleId, item.id.value);
                        //根据id找到父节点
                        let parentNode = props.treeTable.findParentById(moduleId, item.id.value);
                        if(parentNode){
                            currentNode.parentName=parentNode.name;
                        }else{
                            currentNode.parentName={value:"~"};
                        }
                        //给模态框设置默认值
                        props.treeTable.setModalInitValue(moduleId,currentNode);
                        //打开模态框
                        props.treeTable.openTreeTableModel(moduleId,item.id.value,'edit');
                    }}
                >
                </NCIcon>
                {/* {
                    item.use.value ?( 
                        //use 为true 表示可用，显示停用按钮
                        <i
                            className="icon iconfont icon-jianshao"
                            onClick ={()=>{
                                //根据 id 找到当前节点
                                let currentNode =  props.treeTable.findTreeNodeById(moduleId, item.id.value);
                                let flag =  props.treeTable.isTreePropertyEqual(currentNode,'use',true);
                                if(flag){
                                    alert('请先停用子节点')
                                }else{
                                    //停用该节点
                                    props.treeTable.setTreeNodeValue(moduleId, item.id.value, {use:false})
                                }
                            }}
                        >
                        </i>
                    ):(
                         //use 为false 表示不可用，显示启用
                        <NCIcon type="uf-play-o"
                            onClick ={()=>{
                                //根据 id 找到当前节点
                                let currentNode =  props.treeTable.findTreeNodeById(moduleId, item.id.value);
                                //启用该节点
                                props.treeTable.setTreeNodeValue(moduleId, item.id.value, {use:true})
                            }}
                        >
                        </NCIcon>
                    )
                }               */}
            </span>
        )
    }

    return (
        <div 
            className="title-icon"
        >
            {/* 级别 */}
            <span className="title-type">{item.code.value == 1 ? "企业" : '组织'}</span>
            {titleInfo}
            {titleIcon}
        </div>
    );
}