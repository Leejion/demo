import { ajax } from '../../../../src';
import { NCMessage } from '../../../../src';
//点击查询，获取查询区数据
export default function clickSearchBtn(props) {
	console.log(props);
	let pageInfo = props.table.getTablePageInfo('pobdoc');
	let searchVal = props.search.getAllSearchData('20520100');
	console.log(searchVal);
	let data = {
		queryTemplateID: '0001Z51000000000BG4M',
		metapath: 'reva.pobdoc',
		conditions: searchVal,
		pageInfo: {
			currentPageIndex: 0,
			pageSize: 10,
			total: 0,
			pageCount: 0
		}
	};
	//校验通过后，条件查询请求
	const _this = this;
	//得到数据渲染到页面
	ajax({
		//http://localhost:8080/ncdemo-web/bd/basedoc/queryObligation.do
		url: '/ncdemo-web/bd/basedoc/queryObligation.do',
		data: data,
		success: function(res) {
			debugger;
			props.table.setAllTableData('pobdoc', res.data.pobdoc);
		}
	});
}
