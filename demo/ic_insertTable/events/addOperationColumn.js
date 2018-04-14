/**
 * Created by wangshhj on 2018/1/23
 */
//添加页面模板信息
export default function addOperationColumn(props) {
     console.log(props)
    let metas = null;
    setTimeout(function () {
        metas = {
            searchArea: {
                moduleType: 'search',
                items: [
                    {
                        label: '选择仓库',
                        attrcode: 'pk_warehouse',
                        config: {
                            refcode: 'pk_warehouse',
                            refType: 'tree',
                            queryTreeUrl:'/newdemo-web/demo/matrialclass/matrialclasstree'
                        },
                        initialvalue: '',
                        placeholder: '选择仓库',
                        required: false,
                        itemtype: 'refer'
                    },
                    {
                        attrcode: 'investtype',
                        label: '存款类型',
                        itemtype: 'select',
                        initialvalue: null,
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
                        attrcode: 'beginmny',
                        label: '起始理财金额',
                        itemtype: 'input',
                        initialvalue: null
                    },
                    {
                        attrcode: 'endmny',
                        label: '截止理财金额',
                        itemtype: 'input',
                        initialvalue: null
                    },
                    {
                        attrcode: 'begindate',
                        label: '起始购买日期',
                        itemtype: 'datepicker',
                        initialvalue: null
                    },
                    {
                        attrcode: 'enddate',
                        label: '截止购买日期',
                        itemtype: 'datepicker',
                        initialvalue: null
                    },
                    {
                        attrcode: 'radioDemo',
                        label: '单选',
                        itemtype: 'radio',
                        initialvalue: '1',
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
                ]
            },
            insertTable: {
                insertTable1: {
                    moduleType: 'table',
                    pagination: {
                        pageSize: 5
                    },
                    columns: [
                        {
                            label: '单据编号',
                            attrcode: 'ordercode'
                        },
                        {
                            label: '单据日期',
                            attrcode: 'orderdate'
                        },
                        {
                            label: '仓库',
                            attrcode: 'store',
                            wattrcodeth:250
                        },
                        {
                            label: '采购员',
                            attrcode: 'buyer',
                            // visible: false
                        },
                        {
                            label: '供应商',
                            wattrcodeth:250,
                            attrcode: 'supplier'
                        },
                        {
                            label: '单据状态',
                            attrcode: 'orderstatus'
                        },
                        {
                            label: "操作",
                            dataIndex: "d",
                            attrcode: "d",
                            render(text, record, index) {
                                if (record.a == "令狐冲") {
                                    return (
                                        <span
                                            onClick={() => {
                                                alert("这是第" + index + "列，内容为:" + JSON.stringify(record));
                                            }}
                                        >
                          新增
                                            </span>
                                    );
                                } else {
                                    return (
                                        <span
                                            onClick={() => {
                                                alert("这是第" + index + "列，内容为:" + JSON.stringify(record));
                                            }}
                                        >
                          修改
                                            </span>
                                    );
                                }

                            }
                        }
                    ],
                }
            }
        };
        props.meta.setMeta(metas)

    },100);
}