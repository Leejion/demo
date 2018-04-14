import Ajax from '../../../../src/api/ajax';
import NCMessage from '../../../../src/base/nc_Message'
//点击查询，获取查询区数据
export default function clickSearchBtn(val) {
    console.log(val)
    console.log(this)

    let pageInfo = this.props.table.getTablePageInfo('financeListTable')
    
    // val.page = 0;
    // val.size = pageInfo.size;
    // val.beginmny = parseFloat(beginmny);
    // val.endmny = parseFloat(endmny);
    // val.sort = {
    //     property: "investdate",
    //     direction: "desc"
    // }
    let data = {
        page: 0,
        size: pageInfo.size,
        searchParams: {
            //searchMap: val
        }
    }

    //校验通过后，条件查询请求
    const _this = this;
    // Ajax({
    //     method: 'post',
    //     data: data,
    //     url: '/demo-web/demo/inment/search',
    //     success: function (res) {
    //         _this.props.table.setAllTableData("financeListTable", res.data.invest);
    //     }
    // })

};
