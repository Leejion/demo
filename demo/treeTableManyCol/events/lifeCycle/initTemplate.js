import Ajax from '../../../../src/api/ajax';
import {NCPopconfirm} from '../../../../src/base';
export default function (props) {
    // Ajax({
    // 	url:'/newdemo-web/pu/puchasein/test',
    // 	success:(res)=>{
    // 		let meta = res.data.templets;
    // 		// meta.pu_temp_003.items.map((item,index)=>{
    // 		// 	item.id=item.id.split('-')[0];
    // 		// 	return item;
    // 		// })
    // 		props.meta.setMeta(meta);
    // 		console.log(meta)
    // 	}
    // })
    let meta = {};
    let that = this;
    let data ={
        "cuserid":"1001A1100000000010CY",
        "funcnode":"10140REG",
        "pk_group":"0001A1100000000005T5",
        "nodekey":"region"
    };

    // Ajax({
    //     url: '/ncdemo-web/platform/template/queryCardTemplet.do',
    //     data:data,
    //     success: function (res) {
    //         console.log(res);
    //         meta['head'] = res.data.templets['head'];
    //         // meta['10140bankform'] = res.data.templets['10140bankform'];
    //         props.meta.setMeta(meta)
    //     }
    // });

    meta = {
        treeTableCol: {
            moduletype: 'table',
            pagination: false,
            // editType: 'inline', //or popover
            // status: 'browse', //or edit
            // lineHeight: '40px',
            items: [
                {
                    label: '姓名',
                    col:12,
                    attrcode: 'name',
                    itemtype: 'input',
                    visible:true,
                },
                {
                    label: '年龄',
                    col:12,
                    attrcode: 'age',
                    itemtype: 'input',
                    visible:true,
                },
                {
                    label: '地址',
                    col:12,
                    attrcode: 'address',
                    itemtype: 'input',
                    // visible:true,
                }
            ]
        },

    };
    // meta.purchaseOrderCardTable.showindex = true;   //显示序号
    props.meta.setMeta(meta)

}