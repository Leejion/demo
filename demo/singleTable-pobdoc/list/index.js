import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createPage, ajax, getAfterDate } from '../../../src';
// import 'nc-lightapp-front/build/index.css';
import { buttonClick, initTemplate, afterEvent, searchBtnClick, pageInfoClick, tableModelConfirm } from './events';
import './index.less';
class SingleTable extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		this.getData();
		this.props.button.setButtonsVisible({
			saveButton: false,
			cancelButton: false
		});
	}

	getData = () => {
		let data = {
			queryTemplateID: '0001Z51000000000BG4M',
			metapath: 'reva.pobdoc',
			conditions: [],
			pageInfo: {
				currentPageIndex: 0,
				pageSize: 10,
				total: 0,
				pageCount: 0
			}
		};
		var _this = this; //http://localhost:8080/ncdemo-web/bd/basedoc/queryObligation.do
		ajax({
			//http://10.11.117.147:8080/ncdemo-web/bd/basedoc/queryObligation.do
			url: '/ncdemo-web/bd/basedoc/queryObligation.do',
			data: data,
			success: function(res) {
				let { success, data } = res;
				if (success) {
					_this.props.table.setAllTableData('pobdoc', data.obligation_grid);
				}
			}
		});
	};

	render() {
		const { table, button, search } = this.props;
		const { createSimpleTable } = table;
		const { NCCreateSearch } = search;
		const { createButton } = button;
		return (
			<div className="nc-pobdoc">
				<div className="searchArea">
					{NCCreateSearch({
						id: '20520100',
						clickSearchBtn: searchBtnClick.bind(this)
					})}
				</div>
				<div className="header cf">
					{createButton('addButton', { name: '新增', onButtonClick: buttonClick.bind(this) })}
				</div>
				<div className="content">
					{createSimpleTable('pobdoc', {
						onAfterEvent: afterEvent,
						handlePageInfoChange: pageInfoClick,
						tableModelConfirm: tableModelConfirm
					})}
				</div>
			</div>
		);
	}
}

export default createPage({
	initTemplate: initTemplate
})(SingleTable);

// ReactDOM.render(<SingleTable />, document.querySelector('#app'));
