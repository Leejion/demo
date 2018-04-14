export default function tableModelConfirm(props, data, operType){
    if (operType == 'edit') {
        //拿到修改数据
        console.log(data)
        //将新增数据请求后台
        

        //若请求成功，将返回数据重新渲染表格
        props.table.setAllTableData('listTable', res.data.bank)
    }  
}