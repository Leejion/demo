import Ajax from '../../../../../src/api/ajax';
import NCMessage from '../../../../../src/base/nc_Message'
//点击查询，获取查询区数据
export default function buttonClick(props, id) {
    switch (id) {
		case 'saveButton':
            let formData1 = props.form.getAllFormValue('purchaseOrderCardForm1');
            let formData2 = props.form.getAllFormValue('purchaseOrderCardForm2');
            let formData3 = props.form.getAllFormValue('purchaseOrderCardForm3');
            console.log(formData1)
            console.log(formData2)
            console.log(formData3)
                // Ajax({
                // 	method: 'post',
                // 	//url: '/demo-web/demo/inment/save',
                // 	data: { data: data },
                // 	success: function (res) {
                        
                // 	}
                // });

                setTimeout(()=>{
                    props.setPageStatus('browse', props.location.query.id);
                    props.editTable.setStatus('purchaseOrderCardTable', 'browse');
                },500)
            break;
		case 'cancelButton':
			history.back();
			break;
		case 'editButton':
            props.setPageStatus('edit', props.location.query.id);
            //props.editTable.setStatus('purchaseOrderCardTable', 'edit');
            break;
        case 'copyButton':
        
        break;
        case 'backButton':
            window.location.hash = '/purchaseOrder/list';
        break;
		case 'addButton':
			//props.editTable.addRow('purchaseOrderCardTable');
            break;
        case 'getNumButton':
        //props.editTable.addRow('invest_table');
        break;
		default:
			break;
	}
};
