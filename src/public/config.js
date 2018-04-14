
// 总配置项
export default {
    allTypes: ['input', 'number', 'textarea', 'datepicker', 'rangepicker', 'switch', 'select', 'checkbox', 'radio', 'refer', 'customer', 'label'],
    displayTypes: ['select', 'radio', 'checkbox', 'refer'],
    string: ['input', 'textarea', 'datepicker', 'select', 'checkbox', 'radio', 'refer'],
    boolean: ['switch'],
    number: ['number'],
    changeTypes: ['datepicker', 'rangepicker', 'switch', 'select', 'checkbox', 'radio', 'refer'],
    blurTypes: ['input', 'number', 'textarea'],
    noEditType: ['lebel', 'customer'],
    getDisplay: ['select', 'radio', 'checkbox'],
    status: {
        origin: '0',
        edit: '1',
        add: '2',
        delete: '3'
    },
}


