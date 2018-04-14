export default function searchButtonClick(comp,props, id){
    // 通过comp.state 可以拿到自己定义的state上的模糊匹配值
    console.log(comp.state)
    
    
    //得到数据渲染到表格
    const _this = this;
    // ajax({
    //     url: '/demo-web/demo/bank/query',
    //     data: data,
    //     success: function(res) {
    //         // if(res.data.bank){
    //                props.table.setAllTableData("listTable", listTable);
    //         // }else{
    //         //     props.table.setAllTableData("listTable", listTable);
    //         // }
            
    //     }
    // });
}