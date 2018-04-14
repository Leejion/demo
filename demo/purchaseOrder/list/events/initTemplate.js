import Ajax from '../../../../src/api/ajax';
import { NCPopconfirm } from '../../../../src/base';
export default function(props) {

	

	// Ajax({
	// 	url:'/newdemo-web/pu/puchasein/test',
	// 	success:(res)=>{
	// 		let meta = res.data.templets;
	// 		props.meta.setMeta(meta);
	// 		console.log(meta)
	// 	}
	// })


	setTimeout(()=>{
		let meta = {
			purchaseOrderSearchArea:  {
					moduletype: 'search',
					items: [
						{
							attrcode: 'name',
							label: '姓名',
							itemtype: 'input',
							initialvalue: { value: '张三' }
						},
						{
							attrcode: 'mny',
							label: '金额',
							itemtype: 'number',
							scale: 2
						},
						{
							attrcode: 'date',
							label: '出生日期',
							itemtype: 'datepicker'
						},
						{
							attrcode: 'rangedate',
							label: '出行时间',
							itemtype: 'rangepicker'
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
							]
						},
						{
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
							]
						},
						{
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
							]
						},
						{
							attrcode: 'enable',
							label: '是否启用',
							itemtype: 'switch'
						}
					]
			},
			purchaseOrderListTable: {
				moduletype: 'table',
				pagination: {
					pageSize: 10
				},
				items: [

					{
						attrcode:'name',
						label:'姓名',
						itemtype:'input'
					},{
						attrcode:'mny',
						label:'金额',
						itemtype:'number'
					},{
						attrcode:'date',
						label:'出生日期',
						itemtype:'datepicker'
					},{
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
					},{
						attrcode:'household',
						label:'户籍',
						itemtype:'radio',
						options:[
							{
								display:'国内',
								value:0
							},{
								display:'国外',
								value:1
							}
						]
					},{
						attrcode:'hobby',
						label:'爱好',
						itemtype:'checkbox',
						options:[
							{
								display:'篮球',
								value:0
							},{
								display:'跑步',
								value:1
							},{
								display:'游泳',
								value:2
							},{
								display:'羽毛球',
								value:3
							}
						]
					},{
						attrcode:'enable',
						label:'是否启用',
						itemtype:'switch'
					},{
						attrcode:'code',
						label:'编号',
						itemtype:'label'
					}
				]
			}
		};
		// let listTableMeta = meta.purchaseOrderListTable;
		// //let listTableMeta = meta.purchaseOrderListTable;
		// if (listTableMeta) {
		// 	//显示序号
		// 	listTableMeta.showindex = true;
		// 	//修改列渲染样式
		// 	listTableMeta.items = listTableMeta.items.map((item, key) => {
		// 		if (item.attrcode == "vbillcode") {
		// 			item.render = (text, record, index) => {
		// 				return (
		// 					<a 
		// 						  style={{'textDecoration':'underline','cursor':'pointer'}}
		// 						href={'#/purchaseOrder/card?type=browse&id=' + record.sysid.value}>
		// 						{record.vbillcode.value}
		// 					</a>
		// 				)
		// 			}
		// 		}
		// 		return item
		// 	});
		// 	//添加折行显示列
		// 	let newshowCol = {
		// 		label: '采购员/采购部门/采购组织',
		// 		width:250,
		// 		attrcode: 'merge',
		// 		render(text, record, index) {
		// 			return (
		// 				<span>
		// 					{record.pk_employeer.value+'-'+record.pk_dept.value}<br />
		// 					{record.pk_purorg.value}
		// 				</span>
		// 			);
		// 		}
		// 	}
		// 	listTableMeta.items.splice(3,0,newshowCol);
		// 	//添加表格操作列
		// 	let event = {
		// 		label: '操作',
		// 		attrcode: 'opr',
		// 		render(text, record, index) {
		// 			return (
		// 				<span>
		// 					<i
		// 						className="icon iconfont icon-bianji"
		// 						onClick={() => {
		// 							window.location.hash = `/purchaseOrder/card?type=edit&id=${record.sysid.value}`;
		// 						}}
		// 					/>
		// 					<NCPopconfirm trigger="click" placement="top" content="确认删除?" onClose={()=>{
		// 						console.log("删除",index)
		// 					}}>
		// 						{<i className="icon iconfont icon-shanchu"/>}
		// 					</NCPopconfirm>
		// 				</span>
		// 			);
		// 		}
		// 	};
		// 	listTableMeta.items.push(event);
		// }
		props.meta.setMeta(meta);

	},100)

	
}