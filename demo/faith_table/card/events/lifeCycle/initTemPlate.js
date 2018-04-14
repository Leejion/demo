import Ajax from '../../../../../src/api/ajax';
export default function(props) {
    setTimeout(() => {
		let meta = {
			purchaseOrderCardTable: {
				moduletype: 'table',
				pagination: false,
				editType: 'inline', //or popover
				status: 'browse', //or edit
				lineHeight: '40px',
				items: [
					{
						label: '物料',
						attrcode: 'materiel',
						itemtype: 'input',
						initialvalue: {
							value: '饲料A',
							display: null
						},
						visible: true,
					},
					{
						itemtype: 'refer',
						attrcode: 'model',
						label: '交易类型',
						initialvalue: {
							value: 'fsfsfs-434343ggfg',
							display: '打死我也不交易'
						},
						config: {
							refType: "grid",
							refCode: 'materiel',
							queryGridUrl: '/newdemo-web/demo/matrial/matrialtree',
							label: '交易类型',
							refName: '交易类型',
						}
					},
					{
						label: '规格',
						initialvalue: {
							value: '亿立方米',
							display: null
						},
						attrcode: 'specification',
						itemtype: 'label',
						visible: true,
					},
					{
						label: '批次号',
						attrcode: 'batchno',
						itemtype: 'input',
					}, {
						label: '货权组织',
						attrcode: 'huoquan',
						itemtype: 'input',
					}, {
						label: '使用组织',
						attrcode: 'useorgan',
						itemtype: 'input',
					},
					{
						label: '应收数量',
						attrcode: 'shouldnum',
						itemtype: 'input',
					},
					{
						label: '实收数量',
						attrcode: 'actualnum',
						itemtype: 'input',
					}
				]
			}
		};
		meta.purchaseOrderCardTable.showindex = true;
		props.meta.setMeta(meta)
	}, 20);
}