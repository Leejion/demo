import { ajax } from '../../../src';

function save(props) {
	let tableData = props.editTable.getAllData('revecont_b');

	console.log(tableData);
	// ajax({
	//     url: 'ncdemo-web/bd/basedoc/savecurrtype.do',
	//     data,
	//     success: function (res) {
	//         let { success, data } = res;
	//         props.editTable.setTableData("revecont_b", data.currtype)
	//         props.editTable.setStatus("revecont_b", 'browse');
	//         props.button.setButtonsVisible({
	//             saveButton: false,
	//             cancelButton: false,
	//             editButton: true
	//         });
	//     }
	// })
}

export default function buttonClick(props, id) {
	switch (id) {
		case 'editButton':
			props.editTable.setStatus('revecont_b', 'edit');
			props.button.setButtonsVisible({
				saveButton: true,
				cancelButton: true,
				editButton: false
			});
			break;
		case 'addButton':
			props.editTable.addRow('revecont_b');
			let num = props.editTable.getNumberOfRows('revecont_b');
			// props.editTable.setValByKeyAndRowNumber("revecont_b", num, 'pk_org', 'GLOBLE00000000000000', null)
			props.button.setButtonsVisible({
				saveButton: true,
				cancelButton: true,
				editButton: false
			});
			break;
		case 'saveButton':
			save(props);
			break;
		case 'cancelButton':
			props.editTable.cancelEdit('revecont_b');
			props.button.setButtonsVisible({
				saveButton: false,
				cancelButton: false,
				editButton: true
			});
			break;
		case 'editModelButton':
			props.editTable.editCallModel('revecont_b');
			break;
		default:
			break;
	}
}
