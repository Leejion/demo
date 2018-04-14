/**
 * Created by wangshhj on 2018/3/12.
 */
export default function (props, id) {
    console.log(id)
    switch (id) {
        case 'add':
            // props.editTable.addRow('purchaseOrderCardTable');
            props.form.setFormStatus('head', 'edit');
            // props.form.setFormStatus('purchaseOrderCardForm2', 'edit');
            // props.editTable.edit('purchaseOrderCardTable');
            let formData = {
                head: {
                    rows: [
                        {
                            values: {
                                store: {
                                    value: '22222',
                                    display: ''
                                },
                                storeNum: {
                                    value: '3333',
                                    display: ''
                                }
                            }
                        }
                    ]
                }
            };
            props.form.setAllFormValue(formData);

            break;
        case 'save':
            let formData2 = props.form.getAllFormValue ('head');
            console.log(formData2)
            break;
        case 'edit':
            props.form.setFormStatus('head', 'edit');
            props.form.setFormStatus('purchaseOrderCardForm2', 'edit');
            props.editTable.edit('purchaseOrderCardTable');

            break;
        case 'cancel':
            props.modal.show('modal', {
                title: '确认取消',
                content: '是否确认要取消？',
                beSureBtnClick: () => {
                    props.form.cancel('head');
                    props.form.cancel('purchaseOrderCardForm2');
                    props.editTable.cancelEdit('purchaseOrderCardTable');

                }
            });

            break;
        case 'del':
            props.modal.show('modal', {
                title: '确认删除',
                content: '您确定要删除所选数据吗？',
                beSureBtnClick: () => {
                    console.log('删除成功')
                }
            });
            // props.editTable.delRow('purchaseOrderCardTable', 0);

            break;
        default:
            break;
    }
}
