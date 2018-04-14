import ajax from '../../../../src/api/ajax'

export default function(props, id) {
	console.log(id)
	switch (id) {
		case 'add':
			props.editTable.addRow('purchaseOrderCardTable');
			break;
		case 'save':
			props.editTable.save('purchaseOrderCardTable', function(changedRows, allRows) {
				console.log(changedRows, allRows);
				let url = '/nccloud/reva/pobdoc/save.do';
                ajax({
                    url: url,
                    mode: 'normal',
                    method: 'POST',
                    data:changedRows,
					success:function (res) {
						console.log(res)
                    },
					error:function (res) {
                        console.log(res);
                    }
				})
			});
			break;
		case 'edit':
			props.editTable.edit('purchaseOrderCardTable', function() {
				console.log(this);
			});
			break;
		case 'cancel':
			props.editTable.cancelEdit('purchaseOrderCardTable', function() {
				console.log(this);
			});
			break;
		case 'del':
			props.editTable.delRow('purchaseOrderCardTable', 0);
			break;
		default:
			break;
	}
}
