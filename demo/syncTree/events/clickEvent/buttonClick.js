import { createPage, ajax, base } from '../../../../src';
import { NCMessage } from '../../../../src/base';

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
		case 'modalButton_info':
			NCMessage.create({ content: 'This is a warning message', color: 'warning' })
			break;
		case 'modalButton_success':
			NCMessage.create({ content: 'This is a success message', color: 'warning' })
			break;
		case 'modalButton_wrong':
			NCMessage.create({ content: 'This is a wrong message', color: 'warning' })
			break;
		case 'modalButton_help':
			NCMessage.create({ content: 'This is a help message', color: 'warning' })
			break;
		default:
			break;
	}
}
