import { ajax, base } from '../../../../src';
const { NCPopconfirm, NCIcon } = base;
import refer from './refer';

export default function(props) {
	ajax({
		url: '/ncdemo-web/platform/template/queryTempletFromjson.do',
		data: {
			pagecode: '20520100',
			pk_org: '0001A1100000000005T5',
			tenantid: null,
			userid: '1001A1100000000010CY'
		},
		success: function(res) {
			let meta = res.data.templets;
			console.log(meta);
			for (var i = 0; i < meta['20520100'].items.length; i++) {
				if (meta['20520100'].items[i].attrcode == 'pk_org') {
					meta['20520100'].items[i].itemtype = 'refer';
					props.renderItem('search', '20520100', 'pk_org', refer('pk_org'));
				}
			}
			for (var i = 0; i < meta.pobdoc.items.length; i++) {
				meta.pobdoc.items[i].disabled = false; //
				if (meta.pobdoc.items[i].attrcode == 'pk_org') {
					meta.pobdoc.items[i].maxlength = 100;
					meta.pobdoc.items[i].itemtype = 'refer';
					props.renderItem('table', 'pobdoc', 'pk_org', refer('pk_org'));
				}
				if (meta.pobdoc.items[i].attrcode == 'frevemoment') {
					//meta.pobdoc.items[i].label='默认时点';
					meta.pobdoc.items[i].maxlength = 10;
				}
				if (meta.pobdoc.items[i].attrcode == 'nsinglemny') {
					meta.pobdoc.items[i].itemtype = 'input';
				}
			}
			//添加表格操作列
			let event = {
				label: '操作',
				attrcode: 'opr',
				render(text, record, index) {
					return (
						<div className="currency-opr-col">
							<NCIcon
								type="uf-pencil-s"
								onClick={() => {
									props.table.openModel('pobdoc', 'edit', record);
								}}
							/>
							<NCPopconfirm
								trigger="click"
								placement="top"
								content="确认删除?"
								onClose={() => {
									console.log('删除', index);
								}}
							>
								<i className="icon iconfont icon-shanchu" />
							</NCPopconfirm>
						</div>
					);
				}
			};
			meta['pobdoc'].items.push(event);
			props.meta.setMeta(meta);
		}
	});
}
