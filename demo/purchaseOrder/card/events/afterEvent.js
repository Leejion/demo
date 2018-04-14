import Ajax from '../../../../src/api/ajax';
import NCMessage from '../../../../src/base/nc_Message'
import toast from '../../../../src/api/toast';

export default function afterEvent(props, moduleId, key, value, index) {


    let data = props.createHeadAfterEventData('123121', 'head', 'body', moduleId, key, value);
    console.log(data);
    //表单一：
    if (moduleId === 'purchaseOrderCardForm1') {
        //编辑仓库
        if (key === 'pk_warehouse') {
            //自动赋值库管员
            props.form.setFormItemsValue('purchaseOrderCardForm1', { 'pk_whsmanager': { display: '自动赋值', value: '323' } });
        }
    }


    //表单二：
    if (moduleId === 'purchaseOrderCardForm2') {
        //选择采购组织
        if (key === 'pk_purorg') {
            //对采购员和采购部门过滤

        }
        //选择采购员
        if (key === 'pk_employeer') {
            //自动赋值采购部门
            props.form.setFormItemsValue('purchaseOrderCardForm2', { 'pk_dept': { display: '用友', value: '1212' } });
        }
    }

    //表格：
    if (moduleId === 'purchaseOrderCardTable') {
        //编辑数量
        if (key === 'nshouldassistnum' || key === 'nassistnum') {
            console.log('1111')
            let purchaseback = props.form.getFormItemsValue('purchaseOrderCardForm3', 'breturn');
            if(Number(value)){
                if (purchaseback.value === 1) {
                    if (Number(value) > 0) {
                        toast({
                            'color': 'warning',
                            'content': `采购退库时,${key === 'nshouldassistnum' ? '应' : '实'}收数量不大于0！`
                        })
                        return;
                    }
                } else {
                    if (Number(value) < 0) {
                        toast({
                            'color': 'warning',
                            'content': `采购退库时,${key === 'nshouldassistnum' ? '应' : '实'}收数量须不小于0！`
                        })
                        return;
                    }
                }
                console.log(moduleId, index, key, value)
                //props.editTable.setValByKey(moduleId, index, key, value);
                props.editTable.setValByKeyAndRowNumber(moduleId, index+1, key , value)
               
            }
            
        }

        //数量单位的编辑后事件
        if (key === 'pk_astunit') {
            //props.editTable.setValByKey(moduleId, index, 'pk_astunit', value.value, value.display);
            props.editTable.setValByKeyAndRowNumber(moduleId, index+1, 'pk_astunit' , value.value, value.display)
            //props.editTable.setValByKey(moduleId, index, 'actualunit', value.value, value.display);	
        }
    }


};