import refer from './refer';
import clone from '../../src/public/deepClone';
export default async function (props) {
   setTimeout(()=>{

    let meta = {
        formid:{
            moduletype: 'form',
            items: [
                {
                    attrcode: 'pk_org11',
                    label: '时间测试',
                    itemtype: 'createTZDatepicker',
                    initialvalue: { value: '2018-04-02' },
                    col: 4,
                    required: true,
                    visible: true
                }, 
                {
                    attrcode: 'sex11',
                    label: '性别1',
                    itemtype: 'radio',
                    initialvalue: { value: 0, display: '男' },
                    options: [
                        {
                            display: '男',
                            value: 0
                        }, {
                            display: '女',
                            value: 1
                        }
                    ],
                    col: 4,
                    required: true,
                    visible: true
                },
                {
                    attrcode: 'bill1',
                    label: '参照1',
                    itemtype: 'refer',
                   // path:'./refer.js',
                  // path:'../containers/ReferDemo.js',
                   // path:'containers/ReferDemo.js',
                    refcode:'dept',
                    col: 4,
                    required: true,
                    visible: true
                },
                {
                    attrcode: 'pk_org',
                    label: '主组织',
                    itemtype: 'input',
                    initialvalue: { value: '张三' },
                    col: 4,
                    required: true,
                    visible:true
                }, {
                    attrcode: 'mny1',
                    label: '金额',
                    itemtype: 'input',
                    scale: 2,
                    col: 4,
                    visible: true
                }, 
                {
                    attrcode: 'mny22',
                    label: '金额22',
                    itemtype: 'number',
                    scale: 2,
                    col: 4,
                    visible: true
                },
                {
                    attrcode: 'bill',
                    label: '参照2',
                    //path:'./refer.js',
                    itemtype: 'refer',
                    refcode:'cont',
                    col: 4,
                    required: true,
                    visible: true
                },
                
            ]
        },
        table1:{
            moduletype: 'table',
            items: [
                {
                    attrcode: 'name2',
                    label: '姓名',
                    itemtype: 'input',
                    visible: true
                }, {
                    attrcode: 'mny2',
                    label: '金额',
                    itemtype: 'number',
                    visible: true
                }, {
                    attrcode: 'date2',
                    label: '出生日期',
                    itemtype: 'datepicker'
                }, {
                    attrcode: 'sex2',
                    label: '性别',
                    itemtype: 'select',
                    options: [
                        {
                            display: '男',
                            value: 0
                        }, {
                            display: '女',
                            value: 1
                        }
                    ],
                    visible: true
                }
            ]
        },
        table2: {
            moduletype: 'table',
            items: [
                {
                    attrcode: 'name3',
                    label: '名称',
                    itemtype: 'input',
                    visible: true
                }, {
                    attrcode: 'mny3',
                    label: '年龄',
                    itemtype: 'number',
                    visible: true
                }, {
                    attrcode: 'date3',
                    label: '生产日期',
                    itemtype: 'datepicker',
                    visible: true
                }, {
                    attrcode: 'sex3',
                    label: '类型',
                    itemtype: 'select',
                    options: [
                        {
                            display: '合格',
                            value: 0
                        }, {
                            display: '不合格',
                            value: 1
                        }
                    ]
                }
            ]
        }
    }
    meta.formid.status="edit";
    meta.table1.status = "edit";
    meta.table2.status = "edit";
    props.meta.setMeta(meta);
    //let path = './refer'
    //props.getCreateRefer()(meta,props,'formid')
	//requireRefer(meta,props);
    props.initMetaByPkorg();

   },100)
}

// async function requireRefer(meta,props) {
//     let referNum = 0;
// 	let referItems = [];
    
// 	meta.formid.items.forEach((item, index) => {
// 		if (item.itemtype === 'refer') {
// 			referNum++;
// 			referItems.push(item);
// 		}
//     })
//     let referElems ={
//         ['formid']:{}
//     };
//     for (let i = 0; i < referNum; i++) {
//         let elements = await importRefer(referItems[i], referElems,props);
//     }

//     // console.log(referElems)
//     // console.log(Object.keys(referElems))
//     // console.log(referElems['bill'])
//     // console.log(referElems['bill1'])
//     // console.log(props.refer.getMeta())
// }

// function importRefer(item, referElems,props) {
//    // let pathStr = './refer';
//     import(`${item.path}`).then((create) => {
//         create = create.default;
//         let element = create(item.refcode);
//         element.key = item.attrcode;
//         referElems['formid'][item.attrcode]=element;
//         props.refer.setMeta(referElems);
//     });
// }