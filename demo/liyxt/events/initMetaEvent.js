/**
 * Created by wangshhj on 2018/1/31.
 */
//添加页面模板信息
export default function addOperationColumn(props) {
    console.log(props)

    let metas = {
        investTable: {
            moduleType: 'table',
            pagination: false,
            columns: [
                {
                    key: 'investtype',
                    label: '存款类型',
                    itemType: 'select',
                    disabled: false,
                    visible: true,
                    scale: null,
                    required: true,
                    maxLength: null,
                    unit: '%',
                    ratio: '0.01',
                    formatType: null,
                    width: null,
                    options: [
                        {
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
                        }
                    ]
                },
                {
                    key: 'investtype1',
                    label: '普通input',
                    itemType: 'input',
                    disabled: false,
                    visible: true,
                    scale: null,
                    required: true,
                    maxLength: null,
                    unit: '%',
                    ratio: '0.01',
                    formatType: null,
                    width: null
                },
                {
                    key: 'investdate',
                    label: '日期',
                    itemType: 'datepicker',
                    disabled: false,
                    visible: true,
                    scale: null,
                    required: true,
                    maxLength: null,
                    unit: '%',
                    ratio: '0.01',
                    formatType: null,
                    width: null
                },
                {
                    key: 'investmny',
                    label: '金额',
                    itemType: 'number',
                    disabled: false,
                    visible: true,
                    scale: 2,
                    required: true,
                    maxLength: null,
                    unit: '%',
                    ratio: '0.01',
                    formatType: null,
                    width: null
                },
                {
                    label: "操作",
                    // dataIndex: "d",
                    key: "operateCol",
                    render(text, record, index) {
                        return (
                            <div>
                                <span
                                       onClick={() => {
                                           props.editTable.delRow('investTable',index)
                                       }}
                                   >
                                 删除
                            </span>
                                &nbsp;
                                <span
                                    onClick={() => {
                                        console.log(record)
                                        props.editTable.pasteRow('investTable',record,index)
                                    }}
                                >
                                复制
                            </span>
                            </div>

                        );
                    }
                }
            ]
        },
    }
    return metas
}