import React, { Component } from 'react';
//从npm包引入
// import { createPage, base } from 'nc-lightapp-front';
// 从打包后的build目录引入
// import { createPage, base } from 'build';
// 从源码引入
import { createPage, base, ajax } from '../../src';
import { afterEvent, buttonClick , initMetaEvent,  pageIndexChange, pageSizeChange} from './events';
const { NCTabs } = base;
const NCTabPane = NCTabs.NCTabPane;

// import { DemoRefer as Refer } from '../../src/containers/Refer';
// import { highGrade } from 'build';
// const { Refer } = highGrade;
// import MultiRefer from 'containers/Refer/MultiRefer';
import axios from 'axios';
import Table from '../../src/base/nc_Table';


class IcApply extends Component {
    // react：构造函数
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            currency: {}
        };
    }

    // react: 生命周期，可做初始化操作，相当于init
    componentDidMount() {
        let that = this;
        // ajax({
        // 	url: '/demo-web/demo/invest/query',
        // 	success: function(res) {
        // 		that.props.editTable.setTableData('investTable', res.data.invest);
        // 	}
        // });

        setTimeout(() => {
            let cardTable = {
                pageinfo: {
                    number: 0,
                    size: 10,
                    totalElements: 3,
                    totalPages: 1
                },
                rows: [
                    {
                        rowId: 0,
                        values: {
                            id: { value: "1" },
                            materiel: { value: "0222333" },
                            specification: { value: '2018-2-10' },
                            model: { value: 'ererereregfefef', display: '北京市海淀区第一仓库' },
                            batchno: { value: '张三', edit: false },
                            huoquan: { value: '用友网络' },
                            useorgan: { value: '北京市用友产业园中区' },
                            shouldnum: { value: '200' },
                            actualnum: { value: '23' }
                        }
                    }, {
                        rowId: 1,
                        values: {
                            id: { value: "2" },
                            materiel: { value: "0222333" },
                            specification: { value: '2018-2-10' },
                            model: { value: 'ererereregfeddfef', display: '北京市海淀区第二仓库' },
                            batchno: { value: '张三' },
                            huoquan: { value: '用友网络' },
                            useorgan: { value: '北京市用友产业园中区' },
                            shouldnum: { value: '122' },
                            actualnum: { value: '11' }
                        }
                    }, {
                        rowId: 2,
                        values: {
                            id: { value: "3" },
                            materiel: { value: "0222333" },
                            specification: { value: '2018-2-10' },
                            model: { value: 'rereregfeddfef', display: '北京市海淀区第三仓库' },
                            batchno: { value: '张三' },
                            huoquan: { value: '用友网络' },
                            useorgan: { value: '北京市用友产业园中区' },
                            shouldnum: { value: '100' },
                            actualnum: { value: '12' }
                        }
                    },
                ]
            }
            this.props.editTable.setTableData("purchaseOrderCardTable", cardTable);
            // this.props.editTable.edit("purchaseOrderCardTable");
        }, 300)

    }

    // react：界面渲染函数
    render() {
        let { form, button, editTable } = this.props;
        let { createForm } = form;
        let { createButton } = button;
        let { createEditTable } = editTable;

        return (
			<div>
                {/* 创建表单 */}

                {/* 创建表格 */}
                {createButton('add', { name: '新增',onButtonClick: buttonClick, buttonColor:'main-button'})}
                {createButton('edit', { name: '编辑',onButtonClick: buttonClick, buttonColor:'main-button' })}
                {createButton('cancel', { name: '取消' , onButtonClick: buttonClick, buttonColor:'secondary-button'})}
                {createButton('save', { name: '保存' , onButtonClick: buttonClick, buttonColor:'secondary-button'})}
                {createButton('del', { name: '删除', onButtonClick: buttonClick, buttonColor:'secondary-button' })}
                <div className='tab-area'>
                    <NCTabs navtype="turn" contenttype="moveleft" defaultActiveKey="2">
                        <NCTabPane tab="Tab 1" key="1"></NCTabPane>
                        <NCTabPane tab="Tab 2" key="2"></NCTabPane>
                        <NCTabPane tab="Tab 3" key="3"></NCTabPane>
                        <NCTabPane tab="Tab 4" key="4"></NCTabPane>
                    </NCTabs>
                </div>
				<div style={{ padding: '20px' }}>
                    {createEditTable(
                        'purchaseOrderCardTable',
                        pageIndexChange,
                        pageSizeChange
                    )}
				</div>
			</div>
        );
    }
}

export default createPage({
    // 页面初始状态
    status: 'browse',
    initTemplate:initMetaEvent,
    //模板id
    moduleId: '100', //或者 [ '001', '002', '003' ]
    // 编辑后事件
    onAfterEvent: afterEvent,
    // 按钮点击事件
    onButtonClick: buttonClick,
    onMetaReceived: function(props, meta) {
        // meta.invest.items[0].label = '修改表单字段名称';
        // props.meta.setMeta(meta);
    }
})(IcApply);
