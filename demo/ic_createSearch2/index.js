/**
 * Created by wangshhj on 2018/1/16.
 */
import React, {Component} from 'react';
import {Table} from 'tinper-bee';
import {  Row, Col  } from 'tinper-bee';

import zhCN from "rc-calendar/lib/locale/zh_CN";
import enUS from "rc-calendar/lib/locale/en_US";
import moment from "moment/moment";
import Ajax from '../../src/api/ajax';
import {createPage} from '../../src';

import {setTableBodyData, pageIndexChange, pageSizeChange, clickSearchBtn, initTemplate} from './events';

class Icinserttable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: [moment('2017-01-11'),moment('2017-01-19')]
        };
        let {form, button, table, search ,asyncTree} = this.props;
        let {setSearchValue, setSearchValByField, getAllSearchData} = search;
        let {setTreeData, setChildTreeData} = asyncTree;
        this.setSearchValue = setSearchValue;
        this.setSearchValByField = setSearchValByField;
        this.getAllSearchData = getAllSearchData;
        this.setTreeData = setTreeData;
        this.setChildTreeData = setChildTreeData;
    }

    componentWillMount() {
        //查询外层表格数据
        // Ajax({
        //     url:'',
        //     data:'',
        //     success:function (res) {
        //
        //     }
        // });


    }
    remove(){
        this.setState({value:''})
    }
    // react：界面渲染函数
    render() {
        let {form, button, table, insertTable, search ,asyncTree} = this.props;
        let {createButton} = button;
        let {createInsertTable, getInsertTableValue} = insertTable;
        let {NCCreateSearch} = search;
        let { createTZDatepicker, setTimeZone} = form;
        console.log(createTZDatepicker );
        console.log(setTimeZone)

        return (
            <div className="insertTablePage" style={{"margin": "30px"}}>
                <div>嵌套类型表格</div>
                { NCCreateSearch(
                    'searchArea',//模块id
                    {
                        clickSearchBtn: clickSearchBtn.bind(this),//   点击按钮事件
                        // maxNum: 4,   // 一行显示几个字段，默认6个
                        // saveSearchPlan:true  //  是否需要查询方案功能
                    }
                )}
                <div>东八区</div>
                {/*{createTZDatepicker(*/}
                    {/*'searchArea',//模块id*/}
                    {/*{*/}
                        {/*clickSearchBtn: clickSearchBtn.bind(this),//   点击按钮事件*/}
                        {/*// maxNum: 4,   // 一行显示几个字段，默认6个*/}
                        {/*// saveSearchPlan:true  //  是否需要查询方案功能*/}
                    {/*}*/}
                {/*)}*/}
            </div>
        );
    }
}

export default createPage({
    initTemplate: initTemplate
})(Icinserttable);


