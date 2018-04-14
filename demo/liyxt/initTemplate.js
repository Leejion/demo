import Ajax from '../../src/api/ajax';
import { NCUnit, NCPopconfirm } from '../../src/base';
import { high } from '../../src';
const { Refer } = high,
	{ getRefer } = Refer;

export default function(props) {
	// 模拟查询模板的ajax请求
	setTimeout(() => {
		// 模板数据
		let meta = {
			formArea1: {
				status,
				moduletype: 'form',
				items: [
					{
						attrcode: 'dept',
						refcode: 'dept',
						label: '部门',
						itemtype: 'refer',
						initialvalue: {},
						col: 12,
						required: true
					}
				]
			}
		};
		// 公共参照里有
		// props.renderItem(
		// 	'form', // 区域类型form/table/search
		// 	'formArea1', // 模板中的区域id
		// 	'dept', // 字段的attrcode
		// 	getRefer('dept', {
		// 		// refcode以及其他参数
		// 		isMultiSelectedEnabled: false
		// 	})
		// );

		// 公共参照里没有
		props.renderItem(
			'form', // 区域类型form/table/search
			'formArea1', // 模板中的区域id
			'dept', // 字段的attrcode
			<Refer // 配置参考参照组件属性文档
				refName={'部门'}
				refCode={'dept'}
				refType={'tree'}
				queryTreeUrl={'/nccloud/reva/ref/dept.do'}
				isMultiSelectedEnabled={true}
			/>
		);
		props.meta.setMeta(meta);
	}, 100);
}
