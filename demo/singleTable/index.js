import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Button from 'bee-button';
import { createPage, ajax } from '../../src';
import { buttonClick, initTemplate, afterEvent } from './events';
import './index.less';


class SingleTable extends Component {
    constructor(){
        super()
    }
    componentDidMount() {
        //this.getData()
        /* let res = {
            "data": {
                "currtype": {
                    "areaType": "table",
                    "pageinfo": null,
                    "rows": [
                        {
                            "rowId": null,
                            "status": "0",
                            "values": {
                                "currtypesign": {
                                    "display": null,
                                    "scale": "-1",
                                    "value": "￥"
                                },
                                "ts": {
                                    "display": null,
                                    "scale": "-1",
                                    "value": "2018-03-11 17:57:55"
                                },
                                "isdefault": {
                                    "display": null,
                                    "scale": "-1",
                                    "value": false
                                },
                                "code": {
                                    "display": null,
                                    "scale": "-1",
                                    "value": "CNY"
                                },
                                "dataoriginflag": {
                                    "display": "系统预置",
                                    "scale": "-1",
                                    "value": "-1"
                                },
                                "creator": {
                                    "display": null,
                                    "scale": "-1",
                                    "value": null
                                },
                                "unitcurrdigit": {
                                    "display": "2",
                                    "scale": "-1",
                                    "value": "2"
                                },
                                // "creationtime": {
                                //     "display": null,
                                //     "scale": "-1",
                                //     "value": null
                                // },
                                "modifier": {
                                    "display": null,
                                    "scale": "-1",
                                    "value": null
                                },
                                "currdigit": {
                                    "display": "2",
                                    "scale": "-1",
                                    "value": "2"
                                },
                                "pk_currtype": {
                                    "display": null,
                                    "scale": "-1",
                                    "value": "1002Z0100000000001K1"
                                },
                                "pk_org": {
                                    "display": null,
                                    "scale": "-1",
                                    "value": "GLOBLE00000000000000"
                                },
                                "name": {
                                    "display": null,
                                    "scale": "-1",
                                    "value": "人民币"
                                },
                                "modifiedtime": {
                                    "display": null,
                                    "scale": "-1",
                                    "value": null
                                },
                                "pk_group": {
                                    "display": null,
                                    "scale": "-1",
                                    "value": null
                                },
                                "unitroundtype": {
                                    "display": "四舍五入",
                                    "scale": "-1",
                                    "value": "4"
                                },
                                "roundtype": {
                                    "display": "四舍五入",
                                    "scale": "-1",
                                    "value": "4"
                                }
                            }
                        },
                        {
                            "rowId": null,
                            "status": "0",
                            "values": {
                                "currtypesign": {
                                    "display": null,
                                    "scale": "-1",
                                    "value": "&"
                                },
                                "ts": {
                                    "display": null,
                                    "scale": "-1",
                                    "value": "2018-03-11 19:23:28"
                                },
                                "isdefault": {
                                    "display": null,
                                    "scale": "-1",
                                    "value": false
                                },
                                "code": {
                                    "display": null,
                                    "scale": "-1",
                                    "value": "EUR"
                                },
                                "dataoriginflag": {
                                    "display": "系统预置",
                                    "scale": "-1",
                                    "value": "-1"
                                },
                                "creator": {
                                    "display": null,
                                    "scale": "-1",
                                    "value": null
                                },
                                "unitcurrdigit": {
                                    "display": "2",
                                    "scale": "-1",
                                    "value": "2"
                                },
                                "creationtime": {
                                    "display": null,
                                    "scale": "-1",
                                    "value": null
                                },
                                "modifier": {
                                    "display": null,
                                    "scale": "-1",
                                    "value": "#UAP#"
                                },
                                "currdigit": {
                                    "display": "2",
                                    "scale": "-1",
                                    "value": "2"
                                },
                                "pk_currtype": {
                                    "display": null,
                                    "scale": "-1",
                                    "value": "1002Z0100000000001K3"
                                },
                                "pk_org": {
                                    "display": null,
                                    "scale": "-1",
                                    "value": "GLOBLE00000000000000"
                                },
                                "name": {
                                    "display": null,
                                    "scale": "-1",
                                    "value": "欧元"
                                },
                                "modifiedtime": {
                                    "display": null,
                                    "scale": "-1",
                                    "value": "2018-03-11 19:23:28"
                                },
                                "pk_group": {
                                    "display": null,
                                    "scale": "-1",
                                    "value": null
                                },
                                "unitroundtype": {
                                    "display": "四舍五入",
                                    "scale": "-1",
                                    "value": "4"
                                },
                                "roundtype": {
                                    "display": "四舍五入",
                                    "scale": "-1",
                                    "value": "4"
                                }
                            }
                        },
                        {
                            "rowId": null,
                            "status": "0",
                            "values": {
                                "currtypesign": {
                                    "display": null,
                                    "scale": "-1",
                                    "value": "￡"
                                },
                                "ts": {
                                    "display": null,
                                    "scale": "-1",
                                    "value": "2018-03-11 19:23:28"
                                },
                                "isdefault": {
                                    "display": null,
                                    "scale": "-1",
                                    "value": false
                                },
                                "code": {
                                    "display": null,
                                    "scale": "-1",
                                    "value": "GBP"
                                },
                                "dataoriginflag": {
                                    "display": "系统预置",
                                    "scale": "-1",
                                    "value": "-1"
                                },
                                "creator": {
                                    "display": null,
                                    "scale": "-1",
                                    "value": null
                                },
                                "unitcurrdigit": {
                                    "display": "2",
                                    "scale": "-1",
                                    "value": "2"
                                },
                                "creationtime": {
                                    "display": null,
                                    "scale": "-1",
                                    "value": null
                                },
                                "modifier": {
                                    "display": null,
                                    "scale": "-1",
                                    "value": "#UAP#"
                                },
                                "currdigit": {
                                    "display": "2",
                                    "scale": "-1",
                                    "value": "2"
                                },
                                "pk_currtype": {
                                    "display": null,
                                    "scale": "-1",
                                    "value": "1002Z0100000000001K4"
                                },
                                "pk_org": {
                                    "display": null,
                                    "scale": "-1",
                                    "value": "GLOBLE00000000000000"
                                },
                                "name": {
                                    "display": null,
                                    "scale": "-1",
                                    "value": "英镑"
                                },
                                "modifiedtime": {
                                    "display": null,
                                    "scale": "-1",
                                    "value": "2018-03-11 19:23:28"
                                },
                                "pk_group": {
                                    "display": null,
                                    "scale": "-1",
                                    "value": null
                                },
                                "unitroundtype": {
                                    "display": "四舍五入",
                                    "scale": "-1",
                                    "value": "4"
                                },
                                "roundtype": {
                                    "display": "四舍五入",
                                    "scale": "-1",
                                    "value": "4"
                                }
                            }
                        }
                    ]
                }
            },
            "error": null,
            "success": true
        } */

        let res = {
            "data": {
                "body": {
                    "body": {
                        "areacode": "body",
                        "rows": [
                            {
                                "status": "0",
                                "values": {
                                    "ts": {
                                        "value": "2018-03-21 10:53:18"
                                    },
                                    "crevecontid": {
                                        "value": "1001A310000000005SC8"
                                    },
                                    "crevecontbid": {
                                        "value": "1001A310000000005SC9"
                                    },
                                    "fclosetype": {
                                        "value": false
                                    },
                                    "nallotmny": {
                                        "value": "1199.000"
                                    },
                                    "fallocation": {
                                        "value": false
                                    },
                                    "fconfirmpoint": {
                                        "value": "1",
                                        display: '销售发货'
                                    },
                                    "npobnum": {
                                        "value": "10888"
                                    },
                                    "cpobid": {
                                        "value": "10,3",
                                        display: "夏侯惇,白起"
                                    }
                                }
                            },
                            {
                                "status": "0",
                                "values": {
                                    "ts": {
                                        "value": "2018-03-21 10:53:18"
                                    },
                                    "crevecontid": {
                                        "value": "1001A310000000005SC8"
                                    },
                                    "crevecontbid": {
                                        "value": "1001A310000000005SC9"
                                    },
                                    "fclosetype": {
                                        "value": false
                                    },
                                    "nallotmny": {
                                        "value": "11955",
                                        "scale": '2'
                                    },
                                    "fallocation": {
                                        "value": false
                                    },
                                    "fconfirmpoint": {
                                        "value": "1",
                                        display: '销售发货'
                                    },
                                    "npobnum": {
                                        "value": "10.888",
                                        "scale": '6'
                                    },
                                    "cpobid": {
                                        "value": "10,3",
                                        display: "夏侯惇,白起"
                                    }
                                }
                            }
                        ]
                    }
                },
                "head": {
                    "head": {
                        "areacode": "head",
                        "rows": [
                            {
                                "status": "0",
                                "values": {
                                    "vbillcode": {
                                        "value": "wew"
                                    },
                                    "cdeptvid": {
                                        "value": "1001A11000000000058I"
                                    },
                                    "ts": {
                                        "value": "2018-03-21 10:53:18"
                                    },
                                    "pk_org_v": {
                                        "value": "0001A11000000000246T"
                                    },
                                    "crevecontid": {
                                        "value": "1001A310000000005SC8"
                                    },
                                    "ccustomerid": {
                                        "value": "1001A11000000000223R"
                                    },
                                    "pk_org": {
                                        "value": "0001A11000000000246T"
                                    },
                                    "ctrantypeid": {
                                        "value": "1001Z510000000004JMJ"
                                    },
                                    "bcloseflag": {
                                        "value": false
                                    },
                                    "vname": {
                                        "value": "wew"
                                    }
                                }
                            }
                        ]
                    }
                }
            },
            "success": true
        }
        this.props.editTable.setTableData("revecont_b", res.data.body.body);
        this.props.button.setButtonsVisible({
            saveButton: false,
            cancelButton: false,
        })
    }

    getData = () => {
        var _this = this;
        ajax({
            url: 'ncdemo-web/bd/basedoc/querycurrtype.do',
            success: function (res) {
                _this.props.editTable.setTableData("10140curtpgrid", res.data.currtype);
            }
        })
    }

    deleteRowsByIndex = () => {
        let data = this.props.editTable.getCheckedRows('revecont_b');
        let arr = data.map(item => item.index);
        this.props.editTable.deleteTableRowsByIndex('revecont_b', arr)
    }

    deleteRowsByrowId = () => {
        this.props.editTable.deleteTableRowsByRowId('revecont_b')
    }

    getSelectedRows = () => {
        let data = this.props.editTable.getCheckedRows('revecont_b');
    }

    reverseSelect = () => {
        this.props.editTable.reverseSelected('revecont_b');
    }

    allSelectTrue = () => {
        this.props.editTable.selectAllRows('revecont_b', true);
    }

    allSelectFalse = () => {
        this.props.editTable.selectAllRows('revecont_b', false);
    }

    addModel = () => {
        this.props.editTable.openModel('revecont_b', 'add');
    }

    onCloseModel = () => {
        this.props.editTable.closeModel('revecont_b');
    }

    editSelectModel = () => {
        let res = this.props.editTable.getCheckedRows('revecont_b');
        let { index, data } = res[0];
        console.log(index, data)
        this.props.editTable.openModel('revecont_b', 'edit', data, index);
    }

    onSelected = (props, moduleId, record, index) => {
        console.log(props, moduleId, record, index)
    }

    setValue = () => {
        console.log(this.props)
        this.props.editTable.setValByKeyAndRowNumber('revecont_b', 1, 'fdfd', { display: '妹妹', scale: 0 });
        // (tableId, index, key, val, display)
    }

    render() {
        const { editTable, button } = this.props;
        const { createEditTable } = editTable;
        const { createButton } = button;
        return (
            <div className="nc-fm-currency">
                <h2 className="title">  -- 币种节点</h2>
                <div className="header cf">
                    {createButton('editButton', { name: '修改', onButtonClick: buttonClick.bind(this) })}
                    {createButton('addButton', { name: '新增', onButtonClick: buttonClick.bind(this) })}
                    {createButton('saveButton', { name: '保存', onButtonClick: buttonClick.bind(this) })}
                    {createButton('cancelButton', { name: '取消', onButtonClick: buttonClick.bind(this) })}
                    <Button colors="info" onClick={this.addModel}>弹出式新增</Button>
                    <Button colors="info" onClick={this.setValue}>赋值测试</Button>
                    <Button colors="info" onClick={this.editSelectModel}>选中弹出式编辑</Button>
                    <Button colors="info" onClick={this.getSelectedRows}>获得选中行</Button>
                    <Button colors="info" onClick={this.reverseSelect}>反选中</Button>
                    <Button colors="info" onClick={this.allSelectTrue}>全选</Button>
                    <Button colors="info" onClick={this.allSelectFalse}>全不选</Button>
                    <Button colors="info" onClick={this.deleteRowsByIndex}>按行号删除</Button>
                    <Button colors="info" onClick={this.deleteRowsByrowId}>按rowId删除</Button>
                </div>
                <div className="content">
                    {createEditTable('revecont_b', {
                        onAfterEvent: afterEvent,
                        onCloseModel: this.onCloseModel,
                        onSelected: this.onSelected
                    })}
                </div>
            </div>
        )
    }
}

export default createPage({
    initTemplate: initTemplate,
})(SingleTable);