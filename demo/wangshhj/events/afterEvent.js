export default function(props, moduleId, itemId, value,row) {
	console.log(`触发编辑后事件：moduleId:${moduleId},itemId:${itemId},value:`, value);
	console.log(row)
	//编辑后事件，设置某行某个字段的值
    // setValByKey(tableId,rowId,key,val,display)
	props.editTable.setValByKey(moduleId,row.rowId,'investmny',66666);
	//获取某列的数据
	let colData = props.editTable.getColValue(moduleId,'investmny');
	console.log(colData)

	// let { form: { setValue }, button: { setDisabled } } = props;
	// if (itemId === 'userName') {
	// 	if (value === 'liyxt') {
	// 		setValue('form1', { passWord: '123456a' });
	// 	} else if (value === '') {
	// 		setValue('form1', { passWord: '' });
	// 		setDisabled({ getValueButton: true });
	// 		setDisabled({ getValueButton: true });
	// 	} else {
	// 		setDisabled({ getValueButton: false });
	// 	}
	// }
}
