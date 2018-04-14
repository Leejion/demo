import { ajax } from '../../../src';
import buttonClick from './buttonClick'
import React,{Component} from 'react'
// class Zzy extends Component{
//     render(){
//         return <button onClick={this.props.zzyClick.bind(this)}>{this.props.text}</button>
//     }
// }
const Zzy = (props) => {
    //console.log(props)
    return (
        <button onClick={props.zzyClick.bind(this)}>{props.text}</button>
    )
}
const zzyClickAlert = () => alert(1)
export default function (props) {
    // ajax({
    // 	url: 'ncdemo-web/platform/template/queryTemplet.do',
    // 	data: {
    // 		"pagecode": "10140curtp",
    // 		"pk_org": "0001A1100000000005T5",
    // 		"tenantid": null,
    // 		"userid": "1001A1100000000010CY"
    // 	},
    // 	success: function (res) {
	/* let res = {
        "data": {
            "id": null,
            "orgid": null,
            "pagecode": "10140curtp",
            "pagename": null,
            "sysid": null,
            "sysinitflag": false,
            "templets": {
                "10140curtpgrid": {
                    "id": "0001Z01000000003TYTS",
                    "items": [
                        {
                            "attrcode": "pk_currtype",
                            "attrmetapath": "pk_currtype",
                            "col": "0",
                            "disabled": true,
                            "formattype": null,
                            "id": null,
                            "itemtype": "input",
                            "label": "币种主键",
                            "leftspace": "0",
                            "maxlength": "0",
                            "options": null,
                            "ratio": null,
                            "refmetapath": "pk_currtype",
                            "required": false,
                            "rightspace": "0",
                            "rows": "0",
                            "scale": "0",
                            "sysid": null,
                            "templateid": null,
                            "templatename": null,
                            "tenantid": null,
                            "unit": null,
                            "visible": false,
                            "width": null
                        },
                        {
                            "attrcode": "pk_org",
                            "attrmetapath": "pk_org.name",
                            "col": "0",
                            "disabled": false,
                            "formattype": null,
                            "id": null,
                            "itemtype": "refer",
                            "refcode": "obligation",
                            "label": "所属组织",
                            "leftspace": "0",
                            "maxlength": "0",
                            "options": null,
                            "ratio": null,
                            "refmetapath": "pk_org.name",
                            "required": false,
                            "rightspace": "0",
                            "rows": "0",
                            "scale": "0",
                            "sysid": null,
                            "templateid": null,
                            "templatename": null,
                            "tenantid": null,
                            "unit": null,
                            "visible": true,
                            "width": null
                        },
                        {
                            "attrcode": "pk_group",
                            "attrmetapath": "pk_group.code",
                            "col": "0",
                            "disabled": true,
                            "formattype": null,
                            "id": null,
                            "itemtype": "input",
                            "label": "所属集团",
                            "leftspace": "0",
                            "maxlength": "0",
                            "options": null,
                            "ratio": null,
                            "refmetapath": "pk_group.code",
                            "required": false,
                            "rightspace": "0",
                            "rows": "0",
                            "scale": "0",
                            "sysid": null,
                            "templateid": null,
                            "templatename": null,
                            "tenantid": null,
                            "unit": null,
                            "visible": false,
                            "width": null
                        },
                        {
                            "attrcode": "code",
                            "attrmetapath": "code",
                            "col": "0",
                            "disabled": true,
                            "formattype": null,
                            "id": null,
                            "itemtype": "input",
                            "label": "币种编码",
                            "leftspace": "0",
                            "maxlength": "40",
                            "options": null,
                            "ratio": null,
                            "refmetapath": "code",
                            "required": false,
                            "rightspace": "0",
                            "rows": "0",
                            "scale": "0",
                            "sysid": null,
                            "templateid": null,
                            "templatename": null,
                            "tenantid": null,
                            "unit": null,
                            "visible": true,
                            "width": null
                        },
                        {
                            "attrcode": "name",
                            "attrmetapath": "name",
                            "col": "0",
                            "disabled": true,
                            "formattype": null,
                            "id": null,
                            "itemtype": "input",
                            "label": "币种名称",
                            "leftspace": "0",
                            "maxlength": "200",
                            "options": null,
                            "ratio": null,
                            "refmetapath": "name",
                            "required": false,
                            "rightspace": "0",
                            "rows": "0",
                            "scale": "0",
                            "sysid": null,
                            "templateid": null,
                            "templatename": null,
                            "tenantid": null,
                            "unit": null,
                            "visible": true,
                            "width": null
                        },
                        {
                            "attrcode": "currtypesign",
                            "attrmetapath": "currtypesign",
                            "col": "0",
                            "disabled": true,
                            "formattype": null,
                            "id": null,
                            "itemtype": "input",
                            "label": "币种币符",
                            "leftspace": "0",
                            "maxlength": "50",
                            "options": null,
                            "ratio": null,
                            "refmetapath": "currtypesign",
                            "required": false,
                            "rightspace": "0",
                            "rows": "0",
                            "scale": "0",
                            "sysid": null,
                            "templateid": null,
                            "templatename": null,
                            "tenantid": null,
                            "unit": null,
                            "visible": true,
                            "width": null
                        },
                        {
                            "attrcode": "isdefault",
                            "attrmetapath": "isdefault",
                            "col": "0",
                            "disabled": true,
                            "formattype": null,
                            "id": null,
                            "itemtype": "switch",
                            "label": "全局本位币",
                            "leftspace": "0",
                            "maxlength": "1",
                            "options": null,
                            "ratio": null,
                            "refmetapath": "isdefault",
                            "required": false,
                            "rightspace": "0",
                            "rows": "0",
                            "scale": "0",
                            "sysid": null,
                            "templateid": null,
                            "templatename": null,
                            "tenantid": null,
                            "unit": null,
                            "visible": true,
                            "width": null
                        },
                        {
                            "attrcode": "currdigit",
                            "attrmetapath": "currdigit",
                            "col": "0",
                            "disabled": true,
                            "formattype": null,
                            "id": null,
                            "itemtype": "select",
                            "label": "金额小数位数",
                            "leftspace": "0",
                            "maxlength": "0",
                            "options": [
                                {
                                    "display": "0",
                                    "value": "0"
                                },
                                {
                                    "display": "1",
                                    "value": "1"
                                },
                                {
                                    "display": "2",
                                    "value": "2"
                                },
                                {
                                    "display": "3",
                                    "value": "3"
                                },
                                {
                                    "display": "4",
                                    "value": "4"
                                }
                            ],
                            "ratio": null,
                            "refmetapath": "currdigit",
                            "required": false,
                            "rightspace": "0",
                            "rows": "0",
                            "scale": "0",
                            "sysid": null,
                            "templateid": null,
                            "templatename": null,
                            "tenantid": null,
                            "unit": null,
                            "visible": true,
                            "width": null
                        },
                        {
                            "attrcode": "roundtype",
                            "attrmetapath": "roundtype",
                            "col": "0",
                            "disabled": true,
                            "formattype": null,
                            "id": null,
                            "itemtype": "radio",
                            "label": "金额进舍规则",
                            "leftspace": "0",
                            "maxlength": "0",
                            "options": [
                                {
                                    "display": "全部进位",
                                    "value": "0"
                                },
                                {
                                    "display": "全部舍位",
                                    "value": "1"
                                },
                                {
                                    "display": "四舍五入",
                                    "value": "4"
                                }
                            ],
                            "ratio": null,
                            "refmetapath": "roundtype",
                            "required": false,
                            "rightspace": "0",
                            "rows": "0",
                            "scale": "0",
                            "sysid": null,
                            "templateid": null,
                            "templatename": null,
                            "tenantid": null,
                            "unit": null,
                            "visible": true,
                            "width": null
                        },
                        {
                            "attrcode": "unitcurrdigit",
                            "attrmetapath": "unitcurrdigit",
                            "col": "0",
                            "disabled": true,
                            "formattype": null,
                            "id": null,
                            "itemtype": "select",
                            "label": "单价小数位数",
                            "leftspace": "0",
                            "maxlength": "0",
                            "options": [
                                {
                                    "display": "0",
                                    "value": "0"
                                },
                                {
                                    "display": "1",
                                    "value": "1"
                                },
                                {
                                    "display": "2",
                                    "value": "2"
                                },
                                {
                                    "display": "3",
                                    "value": "3"
                                },
                                {
                                    "display": "4",
                                    "value": "4"
                                },
                                {
                                    "display": "5",
                                    "value": "5"
                                },
                                {
                                    "display": "6",
                                    "value": "6"
                                },
                                {
                                    "display": "7",
                                    "value": "7"
                                },
                                {
                                    "display": "8",
                                    "value": "8"
                                }
                            ],
                            "ratio": null,
                            "refmetapath": "unitcurrdigit",
                            "required": false,
                            "rightspace": "0",
                            "rows": "0",
                            "scale": "0",
                            "sysid": null,
                            "templateid": null,
                            "templatename": null,
                            "tenantid": null,
                            "unit": null,
                            "visible": true,
                            "width": null
                        },
                        {
                            "attrcode": "unitroundtype",
                            "attrmetapath": "unitroundtype",
                            "col": "0",
                            "disabled": true,
                            "formattype": null,
                            "id": null,
                            "itemtype": "select",
                            "label": "单价进舍规则",
                            "leftspace": "0",
                            "maxlength": "0",
                            "options": [
                                {
                                    "display": "全部进位",
                                    "value": "0"
                                },
                                {
                                    "display": "全部舍位",
                                    "value": "1"
                                },
                                {
                                    "display": "四舍五入",
                                    "value": "4"
                                }
                            ],
                            "ratio": null,
                            "refmetapath": "unitroundtype",
                            "required": false,
                            "rightspace": "0",
                            "rows": "0",
                            "scale": "0",
                            "sysid": null,
                            "templateid": null,
                            "templatename": null,
                            "tenantid": null,
                            "unit": null,
                            "visible": true,
                            "width": null
                        },
                        {
                            "attrcode": "creator",
                            "attrmetapath": "creator.user_code",
                            "col": "0",
                            "disabled": false,
                            "formattype": null,
                            "id": null,
                            "itemtype": "label",
                            "label": "创建人",
                            "leftspace": "0",
                            "maxlength": "0",
                            "options": null,
                            "ratio": null,
                            "refmetapath": "creator.user_code",
                            "required": false,
                            "rightspace": "0",
                            "rows": "0",
                            "scale": "0",
                            "sysid": null,
                            "templateid": null,
                            "templatename": null,
                            "tenantid": null,
                            "unit": null,
                            "visible": true,
                            "width": null
                        },
                        {
                            "attrcode": "creationtime",
                            "attrmetapath": "creationtime",
                            "col": "0",
                            "disabled": false,
                            "formattype": null,
                            "id": null,
                            "itemtype": "label",
                            "label": "创建时间",
                            "leftspace": "0",
                            "maxlength": "19",
                            "options": null,
                            "ratio": null,
                            "refmetapath": "creationtime",
                            "required": false,
                            "rightspace": "0",
                            "rows": "0",
                            "scale": "0",
                            "sysid": null,
                            "templateid": null,
                            "templatename": null,
                            "tenantid": null,
                            "unit": null,
                            "visible": true,
                            "width": null
                        },
                        {
                            "attrcode": "modifier",
                            "attrmetapath": "modifier.user_code",
                            "col": "0",
                            "disabled": false,
                            "formattype": null,
                            "id": null,
                            "itemtype": "label",
                            "label": "最后修改人",
                            "leftspace": "0",
                            "maxlength": "0",
                            "options": null,
                            "ratio": null,
                            "refmetapath": "modifier.user_code",
                            "required": false,
                            "rightspace": "0",
                            "rows": "0",
                            "scale": "0",
                            "sysid": null,
                            "templateid": null,
                            "templatename": null,
                            "tenantid": null,
                            "unit": null,
                            "visible": true,
                            "width": null
                        },
                        {
                            "attrcode": "modifiedtime",
                            "attrmetapath": "modifiedtime",
                            "col": "0",
                            "disabled": false,
                            "formattype": null,
                            "id": null,
                            "itemtype": "label",
                            "label": "最后修改时间",
                            "leftspace": "0",
                            "maxlength": "19",
                            "options": null,
                            "ratio": null,
                            "refmetapath": "modifiedtime",
                            "required": false,
                            "rightspace": "0",
                            "rows": "0",
                            "scale": "0",
                            "sysid": null,
                            "templateid": null,
                            "templatename": null,
                            "tenantid": null,
                            "unit": null,
                            "visible": true,
                            "width": null
                        },
                        {
                            "attrcode": "dataoriginflag",
                            "attrmetapath": "dataoriginflag",
                            "col": "0",
                            "disabled": true,
                            "formattype": null,
                            "id": null,
                            "itemtype": "select",
                            "label": "分布式",
                            "leftspace": "0",
                            "maxlength": "0",
                            "options": [
                                {
                                    "display": "本级产生",
                                    "value": "0"
                                },
                                {
                                    "display": "上级下发",
                                    "value": "1"
                                },
                                {
                                    "display": "下级上报",
                                    "value": "2"
                                },
                                {
                                    "display": "本级产生已上报下发",
                                    "value": "3"
                                },
                                {
                                    "display": "系统预置",
                                    "value": "-1"
                                }
                            ],
                            "ratio": null,
                            "refmetapath": "dataoriginflag",
                            "required": false,
                            "rightspace": "0",
                            "rows": "0",
                            "scale": "0",
                            "sysid": null,
                            "templateid": null,
                            "templatename": null,
                            "tenantid": null,
                            "unit": null,
                            "visible": false,
                            "width": null
                        },
                        {
                            "attrcode": "ts",
                            "attrmetapath": "ts",
                            "col": "0",
                            "disabled": true,
                            "formattype": null,
                            "id": null,
                            "itemtype": "datepicker",
                            "label": "时间戳",
                            "leftspace": "0",
                            "maxlength": "19",
                            "options": null,
                            "ratio": null,
                            "refmetapath": "ts",
                            "required": false,
                            "rightspace": "0",
                            "rows": "0",
                            "scale": "0",
                            "sysid": null,
                            "templateid": null,
                            "templatename": null,
                            "tenantid": null,
                            "unit": null,
                            "visible": false,
                            "width": null
                        }
                    ],
                    "moduletype": "table",
                    "orgid": null,
                    "pagination": true,
                    "sysid": null,
                    "templatecode": "币种",
                    "templatename": "币种",
                    "tenantid": null
                }
            },
            "tenantid": null
        },
        "error": null,
        "success": true
    } */

    let res = {
        data: {
            code: '20521030',
            pageid: '20521030',
            revecont_b: {
                items: [
                    {
                        itemtype: 'label',
                        maxlength: '20',
                        label: '我的按钮',
                        disabled: true,
                        attrcode: 'zzy',
                        visible: true
                    },
                    {
                        itemtype: 'input',
                        maxlength: '20',
                        label: '收入合同子实体',
                        disabled: true,
                        attrcode: 'crevecontbid',
                        visible: true
                    },
                    // {
                    //     itemtype: 'label',
                    //     maxlength: '20',
                    //     visible: true,
                    //     label: '行号',
                    //     disabled: true,
                    //     attrcode: 'crowno'
                    // },
                    // {
                    //     itemtype: 'refer',
                    //     maxlength: '20',
                    //     visible: true,
                    //     refcode: 'material',
                    //     label: '履约义务编码',
                    //     attrcode: 'cpobid'
                    // },
                    // {
                    //     itemtype: 'select',
                    //     visible: true,
                    //     label: '方向',
                    //     options: [
                    //         {
                    //             display: '借',
                    //             value: '0'
                    //         },
                    //         {
                    //             display: '贷',
                    //             value: '1'
                    //         },
                    //         {
                    //             display: '手工',
                    //             value: '2'
                    //         }
                    //     ],
                    //     attrcode: 'fconfirmpoint'
                    // },
                    // {
                    //     itemtype: 'radio',
                    //     visible: true,
                    //     label: '确认收入时点',
                    //     options: [
                    //         {
                    //             display: '销售发货',
                    //             value: '0'
                    //         },
                    //         {
                    //             display: '销售开票',
                    //             value: '1'
                    //         },
                    //         {
                    //             display: '手工',
                    //             value: '2'
                    //         }
                    //     ],
                    //     attrcode: 'fconfirmpoint'
                    // },
                    // {
                    //     itemtype: 'number',
                    //     scale: '1',
                    //     maxlength: '28',
                    //     visible: true,
                    //     label: '数量',
                    //     attrcode: 'npobnum'
                    // },
                    // {
                    //     itemtype: 'label',
                    //     maxlength: '20',
                    //     visible: true,
                    //     label: '单位',
                    //     disabled: true,
                    //     attrcode: 'cunitid'
                    // },
                    // {
                    //     itemtype: 'number',
                    //     scale: '2',
                    //     maxlength: '28',
                    //     visible: true,
                    //     label: '分配金额',
                    //     attrcode: 'nallotmny'
                    // },
                    // {
                    //     itemtype: 'label',
                    //     scale: '8',
                    //     maxlength: '28',
                    //     visible: true,
                    //     label: '已履约数量',
                    //     disabled: true,
                    //     attrcode: 'nfinishnum'
                    // },
                    // {
                    //     itemtype: 'label',
                    //     scale: '8',
                    //     maxlength: '28',
                    //     visible: true,
                    //     label: '已履约金额',
                    //     disabled: true,
                    //     attrcode: 'nfinishmny'
                    // },
                    // {
                    //     itemtype: 'label',
                    //     maxlength: '19',
                    //     label: '时间戳',
                    //     disabled: true,
                    //     attrcode: 'ts'
                    // },
                    // {
                    //     itemtype: 'label',
                    //     maxlength: '500',
                    //     visible: true,
                    //     label: '行备注',
                    //     disabled: true,
                    //     attrcode: 'vrownote'
                    // }
                ],
                moduletype: 'table',
                pagination: false,
                code: 'revecont_b',
                name: '收入合同子实体'
            }
        },
        success: true
    };

    let meta = res.data;
    meta['revecont_b'].showindex = true;
    meta['revecont_b'].status = 'edit';
    // 针对每一列做事件处理
    meta['revecont_b'].items.map((item) => {
        if (item.attrcode == 'cpobid') {
            item.queryCondition = () => {
                // let data = props.editTable.getAllRowsRemoveKeys('revecont_b', 'npobnum')[0].values.nallotmny.value;
                let data = '0001A1100000000005T5';
                return { pk_org: '0001A1100000000005T5' };
            };
        }
    });

    //添加表格操作列
    let event = {
        label: '操作',
        attrcode: 'opr',
        render(text, record, index) {
            let recordVal = record.values;
            return (
                <div className="currency-opr-col">
                    <span
                        className="currency-opr-del"
                        onClick={() => {
                            console.log(index);
                            props.editTable.delRow('revecont_b', index);
                        }}
                    >
                        删除
					</span>
                </div>
            );
        }
    };
    meta['revecont_b'].items.push(event);
    props.meta.setMeta(meta);
    props.renderItem("table","revecont_b","zzy",<Zzy text="按钮" zzyClick={zzyClickAlert}/>)
    // 	} <zzyButton zzyClick={zzyClickAlert} text="增加" />
    // });
}
