/**
 * Created by yanggqm on 2018/2/7.
 */
import React,{Component} from 'react';
import ApproveProcess from '../../src/ApproveCenter/pages/ApproveProcess'

export default class ApproveProcessDemo extends Component {
    constructor (props){
        super (props)
    }

    render() {
        return (
            <ApproveProcess
            	approveType='0' // 审批状态，0为企业级，1为组织级
            	queryTreeUrl='/queryTreeByType' // 1左侧树形菜单查询
            	queryDatasUrl='/queryDatasByBilltype' // 2右侧列表查询
                queryClassByStatus=""//查询数据接口
                queryClassByApproveStatus=""//查询分类接口
                approveBills=""//审批接口
                unapproveBills=""//取消审批接口
                rejectBills=""//驳回接口

            />
        )
    }
}