//点击加号展开内嵌表格时，业务组请求表格数据，并且返回该数据
export default function setTableBodyData(record) {    //record为点击的当前行信息
    let that = this;
    //发送ajax请求内嵌表格数据，并return该数据
    let insertTableInfo = {};
    //内嵌表格列信息
    insertTableInfo.columns = [
        {
            title: "用户名", dataIndex: "a", key: "a", width: 100
        },
        {id: "123", title: "性别", dataIndex: "b", key: "b", width: 100},
        {title: "年龄", dataIndex: "c", key: "c", width: 200},
    ];
    //内嵌表格数据信息
    if (record.a == "杨过") {
        //假数据
        insertTableInfo.data = [
                {a: "麻花藤", b: "男", c: 41}
            ]
    } else {
        insertTableInfo.data =
            [
                {a: "麻花藤", b: "男", c: 41},
                {a: "麻花藤", b: "男", c: 41}
            ]
    }
    setTimeout(function () {
        that.props.insertTable.setChildTableData('insertTable1',record.key,insertTableInfo)
    },600);

};