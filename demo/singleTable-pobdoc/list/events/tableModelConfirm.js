import { ajax } from '../../../../src';
export default function(props, saveData, opr) {
	console.log(props, saveData, opr);
	// let rowsArr=[];
	// for(var i=0;i<props.data.pobdoc.rows[0].values.length;i++){
	//     let obj={};
	//     obj.status=2;
	//     obj.rowId=1;
	//     obj.values={};
	//     obj.values.display=props.data.pobdoc.rows[0].values[i].display;
	//     obj.values.value=props.data.pobdoc.rows[0].values[i].value;
	//     obj.values.scale=props.data.pobdoc.rows[0].values[i].scale;
	//     rowsArr.push(obj);
	// }

	let data = { obligation_grid: null };
	data.obligation_grid = saveData.pobdoc;
	// ajax({
	//     url: '/ncdemo-web/bd/basedoc/saveObligation.do',
	//     data,
	//     success: function (res) {
	//         let { success, data } = res;
	//         if (success) {

	//         }
	//     }
	// })
	// if(opr==='add'){
	//     alert("新增")
	// }

	// if(opr==='edit'){
	//     alert("修改")

	// }
}
