import Ajax from '../../../../src/api/ajax';
import {NCPopconfirm} from '../../../../src/base';
export default function (props) {
    // Ajax({
    // 	url:'/newdemo-web/pu/puchasein/test',
    // 	success:(res)=>{
    // 		let meta = res.data.templets;
    // 		// meta.pu_temp_003.items.map((item,index)=>{
    // 		// 	item.id=item.id.split('-')[0];
    // 		// 	return item;
    // 		// })
    // 		props.meta.setMeta(meta);
    // 		console.log(meta)
    // 	}
    // })
    let meta = {};
    let that = this;
    let data ={
        "cuserid":"1001A1100000000010CY",
        "funcnode":"10140REG",
        "pk_group":"0001A1100000000005T5",
        "nodekey":"region"
    };

    // Ajax({
    //     url: '/ncdemo-web/platform/template/queryCardTemplet.do',
    //     data:data,
    //     success: function (res) {
    //         console.log(res);
    //         meta['head'] = res.data.templets['head'];
    //         // meta['10140bankform'] = res.data.templets['10140bankform'];
    //         props.meta.setMeta(meta)
    //     }
    // });

    meta = {
        searchArea: {
            moduleType: 'search',
            items: [
                {
                    visible:true,
                    attrcode: 'rangepicker',
                    label: 'rangepicker',
                    itemtype: 'rangepicker',
                    required: true
                    // initialvalue: {
                    //     value:'',
                    //     display:''
                    // }
                },
                // {
                //     attrcode: 'refer',
                //     label: '参照',
                //     itemtype: 'refer',
                //     // initialvalue: {
                //     //     value:0,
                //     //     display:''
                //     // }
                // },
                {
                    visible:true,
                    attrcode: 'number1',
                    label: '数字',
                    itemtype: 'number',
                    required: true,
                    // initialvalue: {
                    //     value:0,
                    //     display:''
                    // },
                    scale: 2
                },
                // {
                //     attrcode: 'checkbox',
                //     label: '复选框',
                //     itemtype: 'checkbox',
                //     initialvalue: {
                //         value: 1,
                //         display: ''
                //     },
                //     options: [
                //         {
                //             display: '篮球',
                //             value: 0
                //         }, {
                //             display: '跑步',
                //             value: 1
                //         }, {
                //             display: '游泳',
                //             value: 2
                //         }, {
                //             display: '羽毛球',
                //             value: 3
                //         }
                //     ]
                // },

                {
                    visible:true,
                    attrcode: 'bankname',
                    label: '银行',
                    itemtype: 'input',
                    // initialvalue: {
                    //     value:0,
                    //     display:''
                    // },
                },
                {
                    visible:true,
                    attrcode: 'investtype',
                    label: '存款类型',
                    itemtype: 'select',
                    // initialvalue: {
                    //     value:0,
                    //     display:''
                    // },
                    options: [{
                        display: '活期',
                        value: 0
                    },
                        {
                            display: '三个月',
                            value: 1
                        },
                        {
                            display: '半年',
                            value: 2
                        },
                        {
                            display: '三年',
                            value: 3
                        },
                        {
                            display: '五年',
                            value: 4
                        }
                    ]
                },
                {
                    visible:true,
                    attrcode: 'beginmny',
                    label: '起始理财金额',
                    itemtype: 'number',
                    // initialvalue: {
                    //     value:0,
                    //     display:''
                    // },
                },
                {
                    visible:true,
                    attrcode: 'begindate',
                    label: '起始购买日期',
                    itemtype: 'datepicker',
                    // initialvalue: {
                    //     value:0,
                    //     display:''
                    // },
                },
                {
                    visible:true,
                    attrcode: 'enddate',
                    label: '截止购买日期',
                    itemtype: 'datepicker',
                    // initialvalue: {
                    //     value:0,
                    //     display:''
                    // },
                },
                {
                    visible:true,
                    attrcode: 'switch',
                    label: 'switch',
                    itemtype: 'switch',
                    // initialvalue: {
                    //     value:true,
                    //     display:''
                    // }
                },
                {
                    visible:true,
                    attrcode: 'radioDemo',
                    label: '单选',
                    itemtype: 'radio',
                    // initialvalue: {
                    //     value:0,
                    //     display:''
                    // },
                    options: [
                        {
                            value: '0',
                            display: '活期'
                        },
                        {
                            value: '1',
                            display: '一个月'
                        },
                        {
                            value: '2',
                            display: '一年'
                        },
                    ]
                },

            ],
            defaultConditionsNum: 3//如果是有默认查询条件的查询区，请添加该字段，表示前3个字段是默认查询条件；如果不需要默认查询条件，不用添加该字段
        },
        head: {
            moduletype: 'form',
            items: [
                {
                    label: '所属组织',
                    attrcode: 'store',
                    initialvalue: {
                        value: '哈哈哈',
                        display: ''
                    },
                    placeholder: '',
                    col: 4,
                    leftspace: 0,
                    rightspace: 0,
                    rows: 3,
                    // required: true,
                    itemtype: 'input',
                    disabled: true
                    //itemtype: 'input'
                },
                {
                    label: '银行编码',
                    attrcode: 'storeNum',
                    initialvalue: '',
                    placeholder: '',
                    col: 4,
                    leftspace: 0,
                    rightspace: 0,
                    rows: 3,
                    // required: true,
                    itemtype: 'input',
                    disabled: true
                    //itemtype: 'input'
                },
                {
                    label: '银行名称',
                    attrcode: 'storeNum2',
                    initialvalue: '',
                    placeholder: '',
                    col: 4,
                    leftspace: 0,
                    rightspace: 0,
                    rows: 3,
                    // required: true,
                    itemtype: 'input',
                    disabled: true
                    //itemtype: 'input'
                },
                {
                    label: '简称',
                    attrcode: 'name1',
                    initialvalue: '',
                    placeholder: '',
                    col: 4,
                    leftspace: 0,
                    rightspace: 0,
                    rows: 3,
                    // required: true,
                    itemtype: 'input',
                    disabled: true
                    //itemtype: 'input'
                },
                {
                    label: '银行类别',
                    attrcode: 'name2',
                    initialvalue: '',
                    placeholder: '',
                    col: 4,
                    leftspace: 0,
                    rightspace: 0,
                    rows: 3,
                    // required: true,
                    itemtype: 'input',
                    disabled: true
                    //itemtype: 'input'
                },
                {
                    label: '对应资金组织',
                    attrcode: 'name3',
                    initialvalue: {
                        value:333333.3,
                        display:null,
                        scale:4
                    },
                    placeholder: '',
                    col: 4,
                    leftspace: 0,
                    rightspace: 0,
                    rows: 3,
                    required: true,
                    itemtype: 'number',
                    visible:true,
                    scale:4
                    //itemtype: 'input'
                },

                {
                    attrcode: 'storekeeper',
                    label: '选择库管员',
                    itemtype: 'refer',
                    //itemtype: 'input',
                    disabled: true,
                    col: 4,
                    rows: 3,
                    leftspace: 0,
                    rightspace: 0,
                },
                {
                    attrcode: 'purchasedepartment',
                    label: '选择采购部门',
                    itemtype: 'refer',
                    //itemtype: 'input',
                    config: {
                        refcode: 'purchasedepartment',
                        refType: 'tree',
                        isMultiSelectedEnabled: true,
                        queryGridUrl: '/newdemo-web/demo/matrial/matrialtree',
                        queryTreeUrl: '/newdemo-web/demo/matrialclass/matrialclasstree'
                    },
                    col: 4,
                    leftspace: 0,
                    rightspace: 0,
                },
                {
                    attrcode: 'supplier',
                    label: '选择供应商',
                    itemtype: 'refer',
                    //itemtype: 'input',
                    required: true,
                    config: {
                        refcode: 'supplier',
                        refType: 'grid',
                        isMultiSelectedEnabled: true,
                        queryGridUrl: '/newdemo-web/demo/matrial/matrialtree',
                        queryTreeUrl: '/newdemo-web/demo/matrialclass/matrialclasstree'
                    },
                    col: 4,
                    leftspace: 0,
                    rightspace: 0,
                }
            ],
            // status:'edit',
            status:'browse',
        },

        purchaseOrderCardForm2: {
            moduletype: 'form',
            items: [
                {
                    attrcode: 'ordercode',
                    label: '地区代码',
                    itemtype: 'input',
                    col: 4,
                    leftspace: 0,
                    rightspace: 0,
                },
                {
                    attrcode: 'orderdate',
                    label: '开户地区',
                    required: true,
                    itemtype: 'input',
                    col: 4,
                    leftspace: 0,
                    rightspace: 0,
                },
                {
                    attrcode: 'purchaseback',
                    label: '省份',
                    itemtype: 'input',
                    col: 4,
                    initialvalue: '',
                    leftspace: 0,
                    rightspace: 0,
                },
                {
                    attrcode: 'comm',
                    label: '客户编码',
                    itemtype: 'input',
                    col: 4,
                    leftspace: 0,
                    rightspace: 0,
                }
            ]
        },

        purchaseOrderCardTable: {
            moduletype: 'table',
            pagination: false,
            editType: 'inline', //or popover
            status: 'browse', //or edit
            lineHeight: '40px',
            items: [
                {
                    label: '联系人',
                    attrcode: 'materiel',
                    itemtype: 'input',
                    initialvalue: {
                        value: '',
                        display: null
                    },
                    visible: true,
                },
                {
                    itemtype: 'number',
                    attrcode: 'model',
                    label: '电话',
                    visible: true,
                    initialvalue: {
                        value: '234.123456',
                        display: '',
                        scale:3
                    },
                    scale:3

                },
                {
                    label: '传真',
                    initialvalue: {
                        value: '亿立方米',
                        display: null
                    },
                    attrcode: 'specification',
                    itemtype: 'label',
                    visible: true,
                },
                {
                    label: 'Email',
                    attrcode: 'batchno',
                    itemtype: 'input',
                }
            ]
        },

    };
    meta.purchaseOrderCardTable.showindex = true;   //显示序号
    props.meta.setMeta(meta)

}