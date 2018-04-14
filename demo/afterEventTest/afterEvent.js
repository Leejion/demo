import { ajax } from '../../src';
export default function (props,modid,key,value) {
    if (modid == 'formid'){
        let data1 = props.createFormAfterEventData('20521030', modid, modid,key,value);
        props.form.setFormItemsDisabled(modid, {mny1:true});
        console.log('data1', data1);
        // ajax({
        //     url:'/nccloud/reva/revebill/formafteredit.do',
        //     data: data1,
        //     success:(res)=>{
        //         console.log(res)
        //     }
        // })
        let data2 = props.createHeadAfterEventData('20521030', modid,'table1', modid, key, value);
        console.log('data2', data2);
        let data3 = props.createHeadAfterEventData('20521030', modid, ['table1','table2'], modid, key, value);
        console.log('data3', data3);
    }

    if (modid == 'table1'){
        let data21 = props.createGridAfterEventData('20521030', modid, modid, key, value);
        console.log('22data1', data21);

        let data22 = props.createBodyAfterEventData('20521030', 'formid', 'table1', modid, key, value);
        console.log('22data2', data22);
        let data23 = props.createBodyAfterEventData('20521030', 'formid', ['table1', 'table2'], modid, key, value);
        console.log('22data3', data23);
    }
    if(key == 'pk_org'){
        props.resMetaAfterPkorgEdit();
    }

}