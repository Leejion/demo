export default function (props, moduleId, key, value, changedrows, data, index) {
    if (key === 'isdefault') {
        props.editTable.setColValueByData(id, key, { value: false }, index)
    }
    console.log(changedrows)
    let cons = props.createBodyAfterEventData('20521030', 'head', 'body', moduleId, key, changedrows);
    // console.log(cons)
}