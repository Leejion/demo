 import Ajax from '../../../../src/api/ajax';
import { NCUnit, NCPopconfirm } from '../../../../src/base';
import afterEvent  from './afterEvent';

export default function (props) {

	setTimeout(()=>{

		let meta = {
			purchaseOrderCardForm3: {
				moduletype: 'form',
				items: [
					{
						attrcode: 'name',
						label: '姓名',
						itemtype: 'input',
						initialvalue: { value: '张三' },
						col: 12,
						required: true
					}, {
						attrcode: 'mny',
						label: '金额',
						itemtype: 'refer',
						scale: 2,
						col: 12,
						required: true
					}, {
						attrcode: 'date',
						label: '出生日期',
						itemtype: 'datepicker',
						col: 6,
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
						col: 6,
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
						col: 6
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
						col: 6,
						required: true
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
						itemtype: 'number',
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
						attrcode: 'memo',
						label: '备注',
						itemtype: 'textarea',
						col: 4,
						rows: 3
					}
					

				]
			},
			purchaseOrderCardTable: {
				moduletype: 'table',
				pagination: false,
				// pagination: {
				// 	pageSize: 10
				// },
				items: [ 
					{
						attrcode:'name',
						label:'姓名',
						itemtype:'input',
						required:true
					},{
						attrcode:'mny',
						label:'金额',
						itemtype:'number'
					},{
						attrcode:'date',
						label:'出生日期',
						itemtype:'datepicker',
						required:true
					},
					{
						attrcode:'sex',
						label:'性别',
						itemtype:'select',
						options:[
							{
								display:'男',
								value:0
							},{
								display:'女',
								value:1
							}
						]
					}
					,{
						attrcode:'code',
						label:'编号',
						itemtype:'label'
					}
				]
			}
		};


		meta.purchaseOrderCardForm3.status=getStatus();
		meta.purchaseOrderCardTable.status=getStatus();
		props.meta.setMeta(meta);

		// let form3Meta = meta.purchaseOrderCardForm3;
		// if (form3Meta) {
		// 	//单据日期默认为今天
		// 	form3Meta.items.forEach((item, index) => {
		// 		if (item.attrcode === 'dbilldate') {
		// 			let today = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate();
		// 			item.initialvalue = {value:today};
		// 		}
		// 	})
		// }
	
		// let cardTableMeta = meta.purchaseOrderCardTable;
		// if (cardTableMeta) {
		// 	cardTableMeta.showindex = true;
		// 	//添加折行显示列
		// 	// let newshowCol1 = {
		// 	// 	label: '物料/规格/型号',
		// 	// 	attrcode: 'merge1',
		// 	// 	render(text, record, index) {
		// 	// 		let recordVal = record.values;
		// 	// 		return (
		// 	// 			<span>
		// 	// 				{recordVal.materiel&&recordVal.materiel.value}<br />
		// 	// 				{/* {recordVal.specification.value} <br />
		// 	// 				{recordVal.model.value} */}
		// 	// 			</span>
		// 	// 		);
		// 	// 	}
		// 	// }
		// 	// cardTableMeta.columns.unshift(newshowCol1);
	
		// 	//添加折行显示列
		// 	let newshowCol2 = {
		// 		label: '应收数量/实收数量',
		// 		attrcode: 'merge2',
		// 		render(text, record, index) {
		// 			let recordVal = record.values;
		// 			return (
		// 				//获取表格状态 表格和表单有自己的status
		// 				props.getPageStatus() === 'browse' ? (
		// 					<span>
		// 						{recordVal.nshouldassistnum&&recordVal.nshouldassistnum.value}<br />
		// 						<span style={{'color':'#F6720F'}}>{recordVal.nassistnum&&recordVal.nassistnum.value}</span><br />
		// 					</span>
		// 				) : (
		// 						<span>
		// 							<NCUnit
		// 								value={recordVal.nshouldassistnum&&recordVal.nshouldassistnum.value}
		// 								unitValue={recordVal.pk_astunit&&recordVal.pk_astunit.value}
		// 								options={[
		// 									{
		// 										display: '箱',
		// 										value: '0'
		// 									},
		// 									{
		// 										display: '台',
		// 										value: '1'
		// 									},
		// 									{
		// 										display: '个',
		// 										value: '2'
		// 								}]}
		// 								onChangeInput={(value) => {
		// 									// 若为采购退库，应收数量不允许录入正数；否则，不允许录入负数。
		// 									afterEvent(props,'purchaseOrderCardTable','nshouldassistnum',value,index);
		// 								}}
		// 								onChangeUnit={(value, display) => {		
		// 									afterEvent(props,'purchaseOrderCardTable','pk_astunit',{value:value,display:display},index);
		// 								}}
		// 							/> <br />
		// 							<NCUnit
		// 								value={recordVal.nassistnum&&recordVal.nassistnum.value}
		// 								unitValue={recordVal.pk_astunit&&recordVal.pk_astunit.value}
		// 								options={[
		// 									{
		// 										display: '箱',
		// 										value: '0'
		// 									},
		// 									{
		// 										display: '台',
		// 										value: '1'
		// 									},
		// 									{
		// 										display: '个',
		// 										value: '2'
		// 								}]}
		// 								onChangeInput={(value) => {
		// 									afterEvent(props,'purchaseOrderCardTable','nassistnum',value,index);
		// 								}}
		// 								onChangeUnit={(value, display) => {
		// 									afterEvent(props,'purchaseOrderCardTable','pk_astunit',{value:value,display:display},index);
		// 								}}
		// 							/>
		// 						</span>
		// 				)
		// 			);
		// 		}
		// 	}
		// 	cardTableMeta.items.push(newshowCol2);
	
		// 	//添加表格操作列
		// 	let event = {
		// 		label: '操作',
		// 		attrcode: 'opr',
		// 		render(text, record, index) {
		// 			let recordVal = record.values;
		// 			return (
		// 				<div>
		// 					<span
		// 						className="opr-col"
		// 						onClick={() => {
		// 							props.editTable.pasteRow('purchaseOrderCardTable', record, index)
		// 						}}
		// 					>
		// 						复制
		// 					</span><br />
		// 					<span
		// 						className="opr-col"
		// 						onClick={() => {
	
		// 						}}
		// 					>
		// 						货位序列号
		// 					</span><br />
		// 					<NCPopconfirm trigger="click" placement="top" content="确认删除?" onClose={() => {
		// 						props.editTable.delRow('purchaseOrderCardTable', index);
		// 					}}>
		// 						<span className="opr-col">删除</span>
		// 					</NCPopconfirm>
		// 				</div>
		// 			);
		// 		}
		// 	};
		// 	cardTableMeta.items.push(event);
	
		// 	meta.purchaseOrderCardTable = cardTableMeta;
		// }

		
	
	},0)
	
}

function getStatus(){
	return window.location.href.split('?')[1].split("&")[0].split("=")[1];
}