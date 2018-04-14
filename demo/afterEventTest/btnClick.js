import { ajax } from '../../src';
export default function (props, id) {
    switch (id) {
        case 'saveBtn':
            let flag = props.form.isCheckNow('formid');
            let data1 = props.createExtCardData('12132','formid',['table1','table2']);
            console.log(data1)
            let tableData = props.editTable.getAllRows('table1');
            console.log('11111111',tableData)
             props.editTable.filterEmptyRows('table1');
           
        break;
        case 'addBtn':
            props.editTable.addRow('table1');
        break;
    }
}