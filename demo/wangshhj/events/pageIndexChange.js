/**
 * Created by wangshhj on 2018/2/1.
 */
//分页事件
export default function pageIndexChange(pageindex,props) {
    console.log(pageindex)
    console.log(props)
    props.editTable.setTableData()

}