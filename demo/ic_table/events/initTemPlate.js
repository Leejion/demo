import refer from './refer';

export default function (props) {
    var meta = {};
    setTimeout(() => {
        meta = {
            tableBank: {
                moduletype: 'table',
                pagination: true,
                items: [
                    {
                        label: '银行编码',
                        attrcode: 'orgid',
                        itemtype: 'input',
                        visible: true,
                        maxlength: 20,
                    },
                    {
                        label: '银行名称',
                        attrcode: 'bankname',
                        itemtype: 'number',
                        visible: true,
                    },
                    {
                        label: '期限',
                        attrcode: 'investmny',
                        itemtype: 'select',
                        visible: true,
                        options: [
                            {
                                "display": "活期",
                                "value": 1
                            },
                            {
                                "display": "三个月",
                                "value": 2
                            },
                            {
                                "display": "半年",
                                "value": 3
                            }
                        ]
                    },
                    {
                        itemtype: 'refer',
                        attrcode: 'creator',
                        label: '创建单位',
                        config: {
                            refType: "grid",
                            refCode: 'materiel',
                            queryGridUrl: '/newdemo-web/demo/matrial/matrialtree',
                            showLabel: false,
                        }
                    },
                    {
                        label: '时间',
                        attrcode: 'investdate',
                        visible: true,
                        itemtype: 'datepicker',
                    }
                ]
            }
        };

        //操作列
        let tableMeta = meta.tableBank;
        tableMeta.showindex = true // 显示 序号 选项
        props.renderItem(
            'table',
            'tableBank',
            'creator',
            refer('region')
        );

        if (tableMeta) {
            let event = {
                label: "操作",
                attrcode: "opr",
                itemtype: 'customer',
                visible: true,
                render(text, record, index) {
                    return (
                        <div>
                            <i className="icon iconfont icon-bianji" onClick={() => {
                                props.table.openModel('tableBank', 'edit', record, index)
                            }}>
                                编辑
                            </i>
                            <i className="icon iconfont icon-bianji" onClick={() => {
                                props.table.openModel('tableBank', 'edit', record)
                            }}>
                                删除
                            </i>
                        </div>
                    );

                }
            };
            tableMeta.items.push(event);
            meta.tableBank = tableMeta;
            props.meta.setMeta(meta)
        }
    }, 20);
}