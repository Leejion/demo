import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
// import { createPage, ajax, base } from 'nc-lightapp-front';
// const { NCButton, NCFromControl } = base;
import {createPage, ajax, base} from '../../src';
import {NCDatePicker, NCButton} from '../../src/base';
import {searchBtnClick, pageInfoClick, initTemplate, afterEvent, buttonClick, headerButtonClick, clickSearchBtn } from './events';
import './index.less';

const NCTree = base.NCTree;

class TreeTableManyCol extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        let that = this;
        this.queryData();
    }

    queryData () {
        setTimeout(()=>{
            let data = {
                "data": {
                    "gird1": {
                        "pageInfo": {
                            "pageIndex": "1",
                            "pageSize": "10",
                            "total": "23",
                            "totalPage": "3"
                        },
                        "rows": [
                            {
                                "status": 0,
                                "values": {
                                    "pk":{
                                        "display": null,
                                        "scale": 0,
                                        "value": "asdffghjkl",
                                    },
                                    "name": {
                                        "display": null,
                                        "scale": 0,
                                        "value": "老大",
                                    },
                                    "age": {
                                        "display": null,
                                        "scale": 0,
                                        "value": "66"
                                    },
                                    "address": {
                                        "display": null,
                                        "scale": 0,
                                        "value": "中国"
                                    },
                                    "children":[
                                        {
                                            "status": 0,
                                            "values": {
                                                "name": {
                                                    "display": null,
                                                    "scale": 0,
                                                    "value": "老二"
                                                },
                                                "age": {
                                                    "display": null,
                                                    "scale": 0,
                                                    "value": "55"
                                                },
                                                "address": {
                                                    "display": null,
                                                    "scale": 0,
                                                    "value": "中国山东"
                                                },

                                            }
                                        },
                                        {
                                            "status": 0,
                                            "values": {
                                                "name": {
                                                    "display": null,
                                                    "scale": 0,
                                                    "value": "老三"
                                                },
                                                "age": {
                                                    "display": null,
                                                    "scale": 0,
                                                    "value": "44"
                                                },
                                                "address": {
                                                    "display": null,
                                                    "scale": 0,
                                                    "value": "中国新疆"
                                                },

                                            }
                                        },
                                    ]
                                }
                            },

                        ]
                    }
                },
                "error": null,
                "success": true
            };
            this.props.treeTableManyCol.initTreeTableData('treeTableCol',data.data.gird1.rows)

        },500)
    }

    editCallBack(data, row){
        console.log(data, row)
    }

    //  异步执行，展开子节点事件
    expandEve (item){

    }

    render() {
        const {table, button, search, form, editTable, treeTableManyCol, modal } = this.props;
        console.log(this.props)
        let { treeTableCol } = treeTableManyCol;
        let { createModal } = modal;

        return (
            <div className="treeTableCol">
                <div className="leftBox">
                    { treeTableCol( 'treeTableCol',{
                        editCallBack: this.editCallBack.bind(this), //  编辑节点回调
                        expandEve: this.expandEve.bind(this), //    异步时， 展开子节点事件
                        // async:false //  是否异步； 默认为true，若需要同步， 传false
                    } ) }
                </div>
            </div>
        )
    }
}

export default createPage({
    initTemplate: initTemplate,
})(TreeTableManyCol);