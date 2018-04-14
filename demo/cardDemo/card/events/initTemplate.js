//import { base, ajax } from 'nc-lightapp-front';
import { base, ajax } from '../../../../src';
const { NCPopconfirm } = base;

const formId = 'formAreaId';
const tableId = 'revecont_b';

export default function(props) {
	let datas = {
		formAreaId:{
			moduletype:'form',
		   items: [
				{
					attrcode: 'name',
					label: '姓名',
					itemtype: 'input',
					initialvalue: { value: '张三' },
					col: 4,
					required: true
				}, {
					attrcode: 'mny',
					label: '金额',
					itemtype: 'number',
					scale: 2,
					col: 4
				}, {
					attrcode: 'date',
					label: '出生日期',
					itemtype: 'datepicker',
					col: 4,
					required: true
				},
				{
					attrcode: 'sex',
					label: '性别',
					itemtype: 'select',
					initialvalue: { value: 0, display: '男' },
					options: [
						{
							display: '男',
							value: 0
						}, {
							display: '女',
							value: 1
						}
					],
					col: 4,
					required: true
				}, {
					attrcode: 'address',
					label: '地址',
					itemtype: 'radio',
					options: [
						{
							display: '国内',
							value: 0
						}, {
							display: '国外',
							value: 1
						}
					],
					col: 4
				}, {
					attrcode: 'hobby',
					label: '爱好',
					itemtype: 'checkbox',
					options: [
						{
							display: '篮球',
							value: 0
						}, {
							display: '跑步',
							value: 1
						}, {
							display: '游泳',
							value: 2
						}, {
							display: '羽毛球',
							value: 3
						}
					],
					col:4
				}, {
					attrcode: 'enable',
					label: '是否启用',
					itemtype: 'switch',
					col: 4
				}, {
					attrcode: 'code',
					label: '编号',
					itemtype: 'label',
					initialvalue: { value: '13232435' },
					col: 4
				}, {
					attrcode: 'corporate',
					label: '单位',
					itemtype: 'input',
					initialvalue: { value: '用友' },
					disabled: true,
					col: 4
				}, {
					attrcode: 'gradtime',
					label: '毕业时间',
					itemtype: 'datepicker',
					col: 4,
					required: true
				},
				{
					attrcode: 'vbillcode',
					label: '单据编号',
					itemtype: 'input',
					col: 4,
					rightspace: 4
				},
				{
					attrcode: 'dbilldate',
					label: '单据日期',
					required: true,
					itemtype: 'datepicker',
					col: 4,
				},
				{
					attrcode: 'breturn',
					label: '采购退库',
					itemtype: 'switch',
					col: 4,
					initialvalue: { value: 1 },
				},
				{
					attrcode: 'next',
					label: '下个',
					itemtype: 'label',
					visible: false,
					col: 4
				},
				{
					attrcode: 'pk_org',
					label: '组织',
					itemtype: 'refer',
					refcode: 'pk_org',
					col: 4,
					rightspace:8
				},
				{
					attrcode: 'memo',
					label: '备注',
					itemtype: 'textarea',
					col: 12,
					rows: 4
				}
	
	
			]
		}
	}
	//let meta = res.data;
	let meta = modifierMeta(props, datas);
	props.meta.setMeta(meta);

}

function modifierMeta(props, meta) {

	//meta[tableId].showindex = true;
	// props.renderItem('form', formId, 'pk_country', refer('country'));
	// props.renderItem(
	// 	'table',
	// 	'taxregionb',
	// 	'pk_region',
	// 	refer('region',{
	// 		queryCondition:function(){
	// 			return {
	// 				pk_country:props.form.getFormItemsValue(formId,'pk_country').value
	// 			}
	// 		}
	// 	})
	// );

	let porCol = {
		attrcode: 'opr',
		label: '操作',
		// itemtype:'customer',
		render(text, record, index) {
			return (
				<NCPopconfirm
					trigger="click"
					placement="top"
					content="确认删除?"
					onClose={() => {
						props.editTable.delRow(tableId, index);
					}}
				>
					<span className="opr-col">删除</span>
				</NCPopconfirm>
			);
		}
	};
	//meta[formId].items.push(porCol);
	return meta;
}

//获取url的status
function getStatus() {
	return window.location.hash.split('?')[1].split('&')[0].split('=')[1];
}
