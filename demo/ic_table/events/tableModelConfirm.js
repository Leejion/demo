export default function (props, data, type) {
    console.log(props, data, type)
    if (type == 'add') {
        props.table.addRow('tableBank', data.tableBank)
    }
}