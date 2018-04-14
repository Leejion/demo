export default function(props, id) {
	console.log(id)
	switch (id) {
		case 'add':
			props.editTable.addRow('purchaseOrderCardTable');
			break;
		case 'save':
			props.editTable.save('purchaseOrderCardTable', function(changedRows, allRows) {
				console.log(changedRows, allRows);
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
