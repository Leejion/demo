/**
 * Created by wangshhj on 2018/1/23
 */
import refer from './refer'; //参照包

//添加页面模板信息
export default function initTemplate(props) {
    let metas = {
        searchArea: {
            moduleType: 'search',
            items: [
                {
                    attrcode: 'rangepicker',
                    label: 'rangepicker',
                    itemtype: 'rangepicker',
                    required:true,
                    visible:true,
                    // initialvalue: {
                    //     value:'',
                    //     display:''
                    // }
                },
                {
                    visible:true,
                    attrcode: 'refer_1',
                    label: '参照',
                    itemtype: 'refer',
                    refcode:'pk_org',
                    // initialvalue: {
                    //     value:'1',
                    //     display:'我是参照'
                    // }
                },
                {
                    visible:true,
                    attrcode: 'number1',
                    label: '数字',
                    itemtype: 'number',
                    required:true,
                    // initialvalue: {
                    //     value:0,
                    //     display:''
                    // },
                    scale:2
                },
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
                    attrcode: 'radioDemo',
                    label: '单选',
                    itemtype: 'radio',
                    // initialvalue: {
                    //     value:0,
                    //     display:''
                    // },
                    options: [
                        {
                            value:'0',
                            display: '活期'
                        },
                        {
                            value:'1',
                            display: '一个月'
                        },
                        {
                            value:'2',
                            display: '一年'
                        },
                    ]
                },
                {
                    visible: true,
                    attrcode: 'checkbox',
                    label: '复选框',
                    itemtype: 'checkbox',
                    initialvalue: {
                        value: 1,
                        display: ''
                    },
                    options: [
                        {
                            display: '篮球',
                            value: 0
                        }, {
                            display: '跑步',
                            value: 1
                        }, {
                            display: '游泳',
                            value: 2
                        }, {
                            display: '羽毛球',
                            value: 3
                        }
                    ]
                },
                {
                    visible: true,
                    attrcode: 'switch',
                    label: 'switch',
                    itemtype: 'switch',
                    // initialvalue: {
                    //     value:true,
                    //     display:''
                    // }
                },
            ],
            // defaultConditionsNum:2//如果是有默认查询条件的查询区，请添加该字段，表示前3个字段是默认查询条件；如果不需要默认查询条件，不用添加该字段
        }
    };

    props.renderItem('search', 'searchArea', 'refer_1', refer('pk_org'));//参数：查询组件、组件id、字段attrcode、字段refcode

    props.meta.setMeta(metas)

}