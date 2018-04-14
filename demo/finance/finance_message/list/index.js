import React, { Component } from 'react';
import { createPage } from '../../../../src';
import Ajax from '../../../../src/api/ajax';
import { buttonClick, searchBtnClick, pageInfoClick, initTemplate } from './events';
import './index.less'



class FinanceMessageList extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        //默认显示第一页
        const _this = this;
        let searchVal = this.props.search.getAllSearchData('financeSearchArea');
        searchVal.page = 0;
        searchVal.size = 10;
        searchVal.sort = {
            property: "investdate",
            direction: "desc"
        };
        let data = {
            page: 0,
            size: 10,
            searchParams: {
                'searchMap': searchVal
            }
        };
        // Ajax({
        //     data: data,
        //     url: '/demo-web/demo/inment/search',
        //     success: function (res) {
        //         _this.props.table.setAllTableData("financeListTable", res.data.invest);
        //     }
        // })
        let invest={
            rows: [
                {
                    rowId: 0,
                    values:{
                        investdate: {value: "类型1"},
                        investmny: { value: '企业'},
                        investtype: {value:  1},
                        interstrate:{value:'1'},
                        enddate:{value:'2011-12-10'},
                        id:{value:1},
                        expectedinterest:{value:'ts1'}
                    }
                },
                {
                    rowId: 0,
                    status: 1,
                    values:{
                        investdate: {value: "2017-04-12"},
                        investmny: { value: '企业'},
                        investtype: {value:  1},
                        interstrate:{value:'1'},
                        id:{value:2},
                        enddate:{value:'2014-12-10'},
                        expectedinterest:{value:'ts1'}
                    }
                }
            ]
        }
        this.props.table.setAllTableData("financeListTable", invest);
    }


    render() {
        let { table, button, search } = this.props;
        let { createSimpleTable } = table;
        let { createButton } = button;
        let { NCCreateSearch, setSearchValue } = search;
        return (
            <div>
                <div className="back-link"> <a href="#/finance/finance_message/main"> {'<'}返回</a> </div>
                <div className="finance-list-content">
                    <div className="finance-list-title">
                        <span>理财信息</span>
                        {createButton('addButton', { name: '新增' })}
                    </div>
                    <div className="finance-list-search">
                        {NCCreateSearch(
                            {
                                id:'financeSearchArea',
                                clickSearchBtn:searchBtnClick.bind(this)
                            }
                        )}
                    </div>
                    <div className="finance-list-table">
                        {createSimpleTable('financeListTable')}
                    </div>
                </div>
            </div>

        )
    }
}

export default createPage({
    initTemplate: initTemplate,
	//按钮点击事件
    onButtonClick: buttonClick,
    //分页点击事件
    handlePageInfoChange: pageInfoClick
})(FinanceMessageList);