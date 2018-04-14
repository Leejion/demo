/**
 * Created by wangshhj on 2018/1/25.
 */
import { NCMessage } from '../../base';

//获取查询区所有数据
export default function getAllSearchData (comId) {
    if(!this.state.meta.hasOwnProperty(comId)){
        return false
    }
    let callBackMeta = [];

    let searchInfo = this.state.meta[comId];
    for (let i = 0; i < searchInfo.items.length; i++){
        let Obj = {
            "field":null,
            "value":null
        };
        let val = searchInfo.items[i];
        let value = null;
        if(val.required){
            if(!val.initialvalue.value && val.initialvalue.value !== 0){
                { NCMessage.create({content: '您有必输项未填写', color: 'warning'});}
                return false;
            }
        }
        if (val.itemtype == 'rangepicker' && val.initialvalue) {
            let vals = val.initialvalue.value;
            let newVal = [];
            if(vals && Object.prototype.toString.call(vals)=='[object Array]'){
                if(vals[0].format){
                    vals.map(function (value) {
                        newVal.push(value.format('YYYY-MM-DD'));
                    });
                    value = newVal;
                }else{
                    value = vals;
                }
            }else{
                value = newVal;
            }
        } else if (val.itemtype == 'refer') {
            value = val.initialvalue.value;
        } else if (val.itemtype == 'checkbox') {
            let select = [];
            val.options.map((t,index) => {
                if(t.checked){
                    select.push(t.value)
                }
            });
            value = select;

        } else {
            value = val.initialvalue.value;
        }
        Obj.field = val.attrcode;
        Obj.value = value;
        Obj.queryoperatetype = val.queryoperatetype || '=';
        Obj.metapath = val.metapath || '';
        callBackMeta.push(Obj);
    }

    return callBackMeta
}