import { ajax } from '../../../../src';

export default function(props) {
	let pageInfo = props.table.getTablePageInfo('pobdoc');
	let searchVal = props.search.getAllSearchData('20520100');
	searchVal.page = pageInfo.page;
	searchVal.size = pageInfo.size;
	searchVal.sort = {
		property: 'investdate',
		direction: 'desc'
	};
	let data = {
		page: pageInfo.page,
		size: pageInfo.size,
		searchParams: {
			searchMap: searchVal
		}
	};
	//得到数据渲染到页面
	ajax({
		url: '/ncdemo-web/bd/basedoc/queryObligation.do',
		data: data,
		success: function(res) {
			props.table.setAllTableData('pobdoc', res.data.pobdoc);
		}
	});
}
