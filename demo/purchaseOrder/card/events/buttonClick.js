import Ajax from '../../../../src/api/ajax';
import {NCMessage,NCModal} from '../../../../src/base'
//点击查询，获取查询区数据
export default function buttonClick(props, id) {
    switch (id) {
        case 'saveButton':
            //let formIds = ['purchaseOrderCardForm3'];
            let flag = props.form.isCheckNow('purchaseOrderCardForm3');
            //表单校验通过后保存数据
        //let formData = props.form.getAllFormValue(formIds);
        //let tableData = props.editTable.getAllRows('purchaseOrderCardTable');
            //console.log(props.meta.getMeta())
            let saveData = props.createHeadAfterEventData('1212', 'head_code', 'body_code', 'purchaseOrderCardForm3', 'name', { value: '张三' }); 
            
            console.log(saveData)
        // console.log(tableData)
            // if(flag){
            //     let formData = props.form.getAllFormValue(formIds);
            //     let tableData1 = props.editTable.getAllRows('purchaseOrderCardTable');
                
            //     let data = formData;
            //     data.purchaseOrderCardTable = {
            //         rows:tableData
            //     }
            //     data.purchaseCardChildTable = [{}]
            //    // console.log(formData)
            //     // Ajax({
            //     //     method: 'post',
            //     //     url: '/newdemo-web/pu/puchasein/save',
            //     //     data: { data: data },
            //     //     success: function (res) {
            //     //         console.log(res)
            //     //         this.togglePageShow();
            //     //     }
            //     // });

            //     this.togglePageShow();
            // }
            
            break;
        case 'cancelButton':
            if (this.getStatus() != 'add') {
                //表格返回上一次的值
                props.editTable.cancelEdit('purchaseOrderCardTable');
                //表单返回上一次的值
                let oldFormData = props.form.getCacheFormData();
                props.form.setAllFormValue(oldFormData);
                this.togglePageShow();
            }
            //页面回退	
            history.back();
			break;
        case 'editButton':
            window.location.hash = `/purchaseOrder/card?type=edit&id=${this.getPageParam('id')}`;
            this.togglePageShow();
            break;
        case 'copyButton':
        
        break;
        case 'deleteButton':
            props.modal.show('purchase-card-delete');
        break;
        case 'backButton':
            window.location.hash = '/purchaseOrder/list';
        break;
        case 'getNumButton':
            let shouldNums = props.editTable.getColValue('purchaseOrderCardTable', 'shouldnum');
            props.editTable.setColValue('purchaseOrderCardTable', 'actualnum',shouldNums);
        break;
		default:
			break;
	}
};
