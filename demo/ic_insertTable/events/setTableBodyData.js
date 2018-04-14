//点击加号展开内嵌表格时，业务组请求表格数据，并且返回该数据
export default function setTableBodyData(record, hasThisChild) {    //record为点击的当前行信息; hasThisChild:是否已经有该子表，如果有，不需要再次请求；

    if(!hasThisChild){
        let that = this;
        //发送ajax请求内嵌表格数据，并return该数据
        let insertTableInfo = {};
        //内嵌表格列信息
        let columns =[
            {
                label: '号码22222',
                attrcode: 'ordercode'
            },
            {
                label: '单据日期',
                attrcode: 'orderdate'
            },
            {
                label: '仓库',
                attrcode: 'store',
                width:250
            },
            {
                label: '采购员',
                attrcode: 'buyer',
                showColumns: false,
            },
            {
                label: '供应商',
                width:250,
                attrcode: 'supplier'
            },
            {
                label: '单据状态',
                attrcode: 'orderstatus'
            }
        ];

        let data = null;
        //内嵌表格数据信息
        if (record.key == 1) {
            //假数据
            data = {
                    rows: [
                        {
                            values:{
                                id: {value: "555"},
                                ordercode: {value: "222222222"},
                                orderdate: { value: '2018-2-10'},
                                store: {value: '北京市海淀区第一仓库'},
                                buyer:{value:'张三'},
                                purchasedepartment:{value:'用友网络'},
                                purchaseorg:{value:'北京市用友产业园中区'},
                                supplier:{value:'北京市蓝蓝科技公司'},
                                orderstatus:{value:'自由'}
                            }
                        },
                    ]
                }
        } else if(record.key == 2) {
            //假数据
            data =
                {
                    rows: [
                        {
                            rowId: 0,
                            values:{
                                id: {value: "666"},
                                ordercode: {value: "啊啊啊啊啊啊啊"},
                                orderdate: { value: '2018-2-10'},
                                store: {value: '北京市海淀区第一仓库'},
                                buyer:{value:'张三'},
                                purchasedepartment:{value:'用友网络'},
                                purchaseorg:{value:'北京市用友产业园中区'},
                                supplier:{value:'北京市蓝蓝科技公司'},
                                orderstatus:{value:'自由'}
                            }
                        },
                        {
                            rowId: 1,
                            values:{
                                id: {value: "777"},
                                ordercode: {value: "哦哦哦哦哦哦"},
                                orderdate: { value: '2018-2-26'},
                                store: {value: '北京市海淀区第二仓库'},
                                buyer:{value:'张四'},
                                purchasedepartment:{value:'用友能源'},
                                purchaseorg:{value:'北京市用友产业园西区'},
                                supplier:{value:'北京市蓝蓝科技公司'},
                                orderstatus:{value:'已签字'}
                            }
                        }
                    ]
                }
        }else{
            //假数据
            data =
                {
                    rows: [
                        {
                            status: 0,
                            values:{
                                id: {value: "88888"},
                                ordercode: {value: "超级6666666"},
                                orderdate: { value: '2018-2-10'},
                                store: {value: '北京市海淀区第一仓库'},
                                buyer:{value:'张三'},
                                purchasedepartment:{value:'用友网络'},
                                purchaseorg:{value:'北京市用友产业园中区'},
                                supplier:{value:'北京市蓝蓝科技公司'},
                                orderstatus:{value:'自由'}
                            }
                        },
                        {
                            status: 0,
                            values:{
                                id: {value: "9999"},
                                ordercode: {value: "9999999999"},
                                orderdate: { value: '2018-2-26'},
                                store: {value: '北京市海淀区第二仓库'},
                                buyer:{value:'张四'},
                                purchasedepartment:{value:'用友能源'},
                                purchaseorg:{value:'北京市用友产业园西区'},
                                supplier:{value:'北京市蓝蓝科技公司'},
                                orderstatus:{value:'已签字'}
                            }
                        }
                    ]
                }
        }
        setTimeout(function () {
            that.props.insertTable.setChildTableData('insertTable1',record,columns,data,'id');
            // that.props.insertTable.setChildTableData('insertTable2',record.id,record.rowIndex,columns,data)
        },1000);
    }

};