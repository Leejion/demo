import React, { Component } from 'react';
import { createPage } from '../../src';
import { NCIcon, NCFormControl,NCButton } from '../../src/base';
import initTemplate from './initTemplate';
import renderTreeTitle from './renderTreeTitle';
import treeTableModelConfirm from './treeTableModelConfirm';
import loadChildNodeData from './loadChildNodeData';
import pageInfoClick from './pageInfoClick';
import tableModelConfirm from './tableModelConfirm';
import searchBtnClick from './searchBtnClick';

class TreeTableDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            config : {
                a:1,
                b:2
            }
        }

        this.treeTable =[
            {
                name: {value: "1111"},
                organ: { value: 1},
                code: {value:  1},
                id:{value:'1'},
                use:{value:true},
                ts:{value:'ts1'},
            }, {
                name:{value:"2222"} ,
                code: {value:2},
                id:{value:'2'},
                organ: { value: 2},
                use:{value:false},
                ts:{value:'ts2'},
            }
        ]

        this.simpleSearchArea = {
            id:"123",
            title: '物料分类',
            placeholder: '搜索名称'
        }
    }

    componentDidMount() {
        //请求后台数据
        setTimeout(()=>{
            let  treeTable =[
                {
                    name: {value: "类型1"},
                    organ: { value: 1},
                    code: {value:  1},
                    id:{value:'1'},
                    use:{value:true},
                    ts:{value:'ts1'},
                }, {
                    name:{value:"类型2"} ,
                    code: {value:2},
                    id:{value:'2'},
                    organ: { value: 2},
                    use:{value:false},
                    ts:{value:'ts2'},
                }
            ]
            let listTable ={
                pageinfo:{
                    number:0,
                    size:10,
                    totalElements:11,
                    totalPages:2
                },
                rows: [
                    {
                        rowId: 0,
                        values:{
                            name: {value: "类型1"},
                            organ: { value: '企业'},
                            code: {value:  1},
                            id:{value:'1'},
                            use:{value:true},
                            ts:{value:'ts1'}
                        }
                    },
                    {
                        rowId: 0,
                        status: 1,
                        values:{
                            name:{value:"类型2"} ,
                            code: {value:2},
                            id:{value:'2'},
                            organ: { value: '组织'},
                            use:{value:false},
                            ts:{value:'ts2'}
                        }
                    }, {
                        rowId: 0,
                        values:{
                            name: {value: "类型1"},
                            organ: { value: '企业'},
                            code: {value:  1},
                            id:{value:'1'},
                            use:{value:true},
                            ts:{value:'ts1'}
                        }
                    }, {
                        rowId: 0,
                        values:{
                            name: {value: "类型1"},
                            organ: { value: '企业'},
                            code: {value:  1},
                            id:{value:'1'},
                            use:{value:true},
                            ts:{value:'ts1'}
                        }
                    }, {
                        rowId: 0,
                        values:{
                            name: {value: "类型1"},
                            organ: { value: '企业'},
                            code: {value:  1},
                            id:{value:'1'},
                            use:{value:true},
                            ts:{value:'ts1'}
                        }
                    },{
                        rowId: 0,
                        values:{
                            name: {value: "类型1"},
                            organ: { value: '企业'},
                            code: {value:  1},
                            id:{value:'1'},
                            use:{value:true},
                            ts:{value:'ts1'}
                        }
                    }, {
                        rowId: 0,
                        values:{
                            name: {value: "类型1"},
                            organ: { value: '企业'},
                            code: {value:  1},
                            id:{value:'1'},
                            use:{value:true},
                            ts:{value:'ts1'}
                        }
                    },{
                        rowId: 0,
                        values:{
                            name: {value: "类型1"},
                            organ: { value: '企业'},
                            code: {value:  1},
                            id:{value:'1'},
                            use:{value:true},
                            ts:{value:'ts1'}
                        }
                    }, {
                        rowId: 0,
                        values:{
                            name: {value: "类型1"},
                            organ: { value: '企业'},
                            code: {value:  1},
                            id:{value:'1'},
                            use:{value:true},
                            ts:{value:'ts1'}
                        }
                    }, {
                        rowId: 0,
                        values:{
                            name: {value: "类型1"},
                            organ: { value: '企业'},
                            code: {value:  1},
                            id:{value:'1'},
                            use:{value:true},
                            ts:{value:'ts1'}
                        }
                    },
                    {
                        rowId: 0,
                        status: 1,
                        values:{
                            name:{value:"类型2"} ,
                            code: {value:2},
                            id:{value:'2'},
                            organ: { value: '组织'},
                            use:{value:false},
                            ts:{value:'ts2'}
                        }
                    }, 
                ]
            }
            //将返回的数据设置给树
            this.props.treeTable.initTreeValue('treeTable',treeTable);
            this.props.table.setAllTableData("listTable", listTable);
        }  
        ,500)
    }

    handelChange=() =>{
        let old = this.state.config;
        old.a = 5;
        console.log(old.a)
        this.props.treeTable.initTreeValue('treeTable',this.treeTable);
        this.setState({
            config:old
        })
    }

    addrootNodeClick = () =>{
        this.props.treeTable.setModalInitValue('treeTable',{parentName:{value:"~"}})
        this.props.treeTable.openTreeTableModel( 'treeTable','root','add');
    }
    
    render() {
        const { treeTable, table, button } = this.props;
        const { createTreeTable } = treeTable;
        const  { createSimpleTable } = table;
        const  { createButton } = button;
        return (
            <div style={{ width:1260, margin:'30px auto'}}>
                <div>
                  <NCFormControl
                   style={{width:240}}
                  />
                  {createButton('searchButton', { name: '搜索' })}
                  <NCButton
                    onClick={this.handelChange}
                    
                    >切换
                  </NCButton>
                  <NCButton
                    onClick={this.addrootNodeClick}
                    >新增一级节点
                  </NCButton>
                </div>
                { createTreeTable(
                    'treeTable',
                    {
                        //配置信息
                        title:'级别/编码/分类',
                        openIcon: <NCIcon type="uf-minus" />,
                        closeIcon:  <NCIcon type="uf-plus" />,
                        //树事件
                        renderTreeTitle: renderTreeTitle.bind(this),
                        treeTableModelConfirm: treeTableModelConfirm.bind(this),
                        loadChildNodeData: loadChildNodeData.bind(this),
                    })
                }
                {/* { createSimpleTable(
                    'listTable',
                    {
                        config: this.state.config
                    } 
                )} */}
            </div>

        );
    }
}

export default createPage({
    //页面初始化
    initTemplate: initTemplate
})(TreeTableDemo);
