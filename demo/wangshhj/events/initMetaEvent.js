/**
 * Created by wangshhj on 2018/1/31.
 */
//添加页面模板信息
export default function addOperationColumn(props) {
    console.log(props);
    setTimeout(() => {
        let meta = {
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
                        itemtype: 'refer',
                        attrcode: 'model',
                        label: '电话',
                        initialvalue: {
                            value: 'fsfsfs-434343ggfg',
                            display: '打死我也不交易'
                        },
                        config: {
                            refType: "grid",
                            refCode: 'materiel',
                            queryGridUrl: '/newdemo-web/demo/matrial/matrialtree',
                            label: '交易类型',
                            refName: '交易类型',
                        }
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
            }
        };
        meta.purchaseOrderCardTable.showindex = true;
        props.meta.setMeta(meta)
    });

}