import React, { Component } from 'react';
import Form from 'bee-form';
import Modal from '../../base/nc_Modal';
import Button from '../../base/nc_Button';
import FormControl from '../../base/nc_FormControl';
// import Form from '../../base/nc_Form';
import Number from '../../base/nc_Number';
import Checkbox from '../../base/nc_Checkbox';
import DatePicker from '../../base/nc_DatePicker';
import Select from '../../base/nc_Select';
import Switch from '../../base/nc_Switch';
import Radio from '../../base/nc_Radio';
import toast from '../../api/toast';
import refer from '../../containers/ReferDemo';

import zhCN from "rc-calendar/lib/locale/zh_CN";
import moment from 'moment';
import { isObj, isWrong, isDisplay, undefinedOrTrue, undefinedOrfalse } from '../../public';
import CONFIG from '../../public/config';

const FormItem = Form.FormItem;
const Option = Select.Option;

export default class ModelForm extends Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            modelDatas: nextProps.modelDatas,
            tableModeldata: nextProps.tableModeldata
        })
    }

    handleDoSave = () => {
        var tempObj = {},
            moduleId = this.props.moduleId,
            type = this.props.type,
            tableModeldata = this.props.tableModeldata;
        // TODO
        let tempArr = this.props.modelDatas.modelColumn
            .forEach(item => {
                let key = item.attrcode;
                // 过滤操作列和序号列
                if (key != 'customer') {
                    tempObj[key] = {
                        display: isObj(tableModeldata[key]) ? (tableModeldata[key].display || null) : null,
                        scale: isObj(tableModeldata[key]) ? this.handleScale(tableModeldata[key].scale) : 0,
                        value: isObj(tableModeldata[key]) ? this.handleValue(key, type, tableModeldata[key].value) : null,
                    }
                }
            })


        let dist = {
            [moduleId]: {
                areaType: 'table',
                pageInfo: {},
                rows: [{
                    rowId: this.props.modelDatas.rowId || String(new Date().getTime()).slice(-5) + Math.random().toString(12),
                    status: type == 'add' ? 2 : 1,
                    values: { ...tempObj }
                }]
            }
        }
        this.props.tableModelConfirm(dist, this.props.type)
        this.props.closeModel(moduleId)
    }

    handleScale = (data) => {
        if (typeof data == 'undefined' || data == null) {
            return 0
        }
        return +data;
    }

    handleValue = (key, type, data) => {
        if (key == 'ts' && type == 'add') {
            return null
        }
        return ((typeof data == 'undefined' || data == '') ? null : data)
    }

    handleSubmit = () => {
        let { flag, errorIndex, errorTitle, errorInfo, errorType, max } = this.checkSubmitRule()
        if (flag) {
            // console.log(flag, errorIndex, errorTitle, errorInfo, errorType, max)
            let content = {
                '1': `请${errorInfo + errorTitle}`,
                '2': `${errorTitle}的最大长度为${max.toString()}`
            }
            toast({ content: content[errorType], color: 'danger' });
        } else {
            // 保存
            this.handleDoSave();
        }
    }

    HanlderCheckInput = (n, slected) => {
        let { value } = slected
        let len = String(value).length;
        if ((!n && len > 0) || (len > 0 && len <= n)) {
            return true;
        }
        return false;
    }


    HanlderCheckNumber = (max = Infinity, slected) => {
        let { value } = slected
        if (value && value <= max) {
            return true;
        }
        return false;
    }

    // 只检测了为空 还要检测长度
    checkSubmitRule = () => {
        var [errorIndex, errorTitle, errorInfo, errorType, max] = [-1];
        // TODO 区分必输和长度限制
        let distCol = this.props.modelDatas.modelColumn.filter(item => !!item.itemtype && item.itemtype !== 'label' && item.itemtype !== 'customer' && !!item.required);

        let checkEmpty = distCol.some((item, index) => {
            errorIndex = index;
            errorTitle = item.label;
            errorInfo = CONFIG.displayTypes.includes(item.itemtype) ? '选择' : '输入';
            errorType = null;
            max = '';
            let checkVal = this.props.tableModeldata[item.attrcode];
            // item.value == '' 为空   错误类型1
            // item.maxlength 超出     错误类型2
            // console.log(this.props.tableModeldata[item.attrcode])
            if (checkVal == '' || checkVal == null || checkVal == undefined) {
                errorType = '1'
                return true;
            }
            if (item.maxlength && String(checkVal).length > item.maxlength) {
                errorType = '2'
                max = item.maxlength
                return true;
            }
            return false
        })
        if (checkEmpty) {
            return { flag: true, errorIndex, errorTitle, errorInfo, errorType, max }
        }
        return { flag: false };
    }

    close = () => {
        this.props.closeModel(this.props.moduleId)
    }

    afterEvent = (attrcode, changedrows, val, index, record) => {
        if (typeof this.props.afterEvent == 'function') {
            this.props.afterEvent(
                this.props.moduleId,
                attrcode,
                changedrows,
                val,
                index,
                record
            );
        }
    }

    render() {
        const { showModal, data, type, renderItem, tableModeldata, moduleId, modelDatas } = this.props;
        let title = '标题';
        switch (type) {
            case 'add':
                title = '新增'
                break;
            case 'edit':
                title = '编辑'
                break;
            default:
                break;
        }
        let formMeta = modelDatas.modelColumn
            .filter(item => !!item.itemtype && item.itemtype !== 'label' && item.itemtype !== 'customer')

        // console.log(formMeta, modelDatas, this.props.tableModeldata)
        return (
            <Modal
                id="tableModal"
                show={showModal}
                className="table-modal"
                backdrop="static"
                animation={false}
                onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form
                        showSubmit={false}
                        useRow={true}
                        className="table-modal-form">
                        {formMeta.length ? formMeta.map((item, i) => {
                            // console.log(tableModeldata[item.attrcode])
                            if (renderItem && renderItem[item.attrcode]) {
                                let val = {
                                    refname: tableModeldata[item.attrcode] ? tableModeldata[item.attrcode].display : null,
                                    refpk: tableModeldata[item.attrcode] ? tableModeldata[item.attrcode].value : null,
                                }
                                return (<FormItem
                                    key={i}
                                    inline={true}
                                    labelMd={4}
                                    md={8}
                                    valuePropsName={'value'}
                                    showMast={!!item.required}
                                    isRequire={!!item.required}
                                    method="blur"
                                    labelName={item.label}>
                                    {{
                                        ...renderItem[item.attrcode],
                                        key: item.attrcode,
                                        props: {
                                            ...renderItem[item.attrcode].props,
                                            value: val,
                                            disabled: !!item.disabled,
                                            onChange: (value) => {
                                                this.props.output.table.setTableValueBykey(moduleId, item.attrcode, value, 'refer')
                                                let changedrows = [];
                                                changedrows.push({
                                                    rowid: modelDatas.rowId || String(new Date().getTime()).slice(-5) + Math.random().toString(12),
                                                    newvalue: {
                                                        value
                                                    },
                                                    oldvalue: {
                                                        value: 'value'// this.editTableInitValue[`${i}**${item.attrcode}`]
                                                    }
                                                })
                                                this.afterEvent(item.attrcode, changedrows, value, modelDatas.index, modelDatas.record)
                                            }
                                        }
                                    }}
                                </FormItem>)
                            } else {
                                switch (item.itemtype) {
                                    case 'input':
                                        return (
                                            <FormItem
                                                key={i}
                                                inline={true}
                                                labelMd={4}
                                                md={8}
                                                valuePropsName={'value'}
                                                showMast={!!item.required}
                                                isRequire={!!item.required}
                                                method="blur"
                                                asyncCheck={this.HanlderCheckInput.bind(this, item.maxlength)}
                                                labelName={item.label}
                                                errorMessage={item.maxlength ? `${item.label}最大长度为${item.maxlength.toString()}` : `请输入${item.label}`}
                                            >
                                                <FormControl
                                                    placeholder="请输入..."
                                                    name={item.attrcode}
                                                    disabled={!!item.disabled}
                                                    value={tableModeldata[item.attrcode] ? tableModeldata[item.attrcode].value : null}
                                                    onChange={(val) => {
                                                        this.props.output.table.setTableValueBykey(moduleId, item.attrcode, val)
                                                    }}
                                                    onBlur={(val) => {
                                                        let changedrows = [];
                                                        changedrows.push({
                                                            rowid: modelDatas.rowId || String(new Date().getTime()).slice(-5) + Math.random().toString(12),
                                                            newvalue: {
                                                                value: val
                                                            },
                                                            oldvalue: {
                                                                value: 'value'// this.editTableInitValue[`${i}**${item.attrcode}`]
                                                            }
                                                        })
                                                        this.afterEvent(item.attrcode, changedrows, val, modelDatas.index, modelDatas.record)
                                                    }} />

                                            </FormItem>
                                        );
                                    case 'number':
                                        return (
                                            <FormItem
                                                key={i}
                                                inline={true}
                                                labelMd={4}
                                                md={8}
                                                valuePropsName={'value'}
                                                showMast={!!item.required}
                                                isRequire={!!item.required}
                                                method="blur"
                                                asyncCheck={this.HanlderCheckNumber.bind(this, item.max)}
                                                labelName={item.label}
                                                errorMessage={item.max ? `${item.label}最大值为${item.max}` : `请输入${item.label}`}
                                            >
                                                <Number
                                                    placeholder="请输入..."
                                                    name={item.attrcode}
                                                    scale={tableModeldata[item.attrcode] ? tableModeldata[item.attrcode].scale : (item.scale || 0)}
                                                    disabled={!!item.disabled}
                                                    value={tableModeldata[item.attrcode] ? tableModeldata[item.attrcode].value : null}
                                                    onChange={(val) => {
                                                        this.props.output.table.setTableValueBykey(moduleId, item.attrcode, val)
                                                    }}
                                                    onBlur={(val) => {
                                                        let changedrows = [];
                                                        changedrows.push({
                                                            rowid: modelDatas.rowId || String(new Date().getTime()).slice(-5) + Math.random().toString(12),
                                                            newvalue: {
                                                                value: val
                                                            },
                                                            oldvalue: {
                                                                value: 'value'// this.editTableInitValue[`${i}**${item.attrcode}`]
                                                            }
                                                        })
                                                        this.afterEvent(item.attrcode, changedrows, val, modelDatas.index, modelDatas.record)
                                                    }} />
                                            </FormItem>
                                        );
                                    case 'refer':
                                        return (
                                            <FormItem
                                                key={i}
                                                inline={true}
                                                labelMd={4}
                                                md={8}
                                                valuePropsName={'value'}
                                                showMast={!!item.required}
                                                isRequire={!!item.required}
                                                method="blur"
                                                labelName={item.label}
                                            >
                                                {refer(item.refcode, {
                                                    disabled: !!item.disabled,
                                                    value: {
                                                        refname: tableModeldata[item.attrcode] ? tableModeldata[item.attrcode].display : null,
                                                        refpk: tableModeldata[item.attrcode] ? tableModeldata[item.attrcode].value : null
                                                    },
                                                    onChange: (val) => {
                                                        this.props.output.table.setTableValueBykey(moduleId, item.attrcode, val, 'refer')
                                                        let changedrows = [];
                                                        changedrows.push({
                                                            rowid: modelDatas.rowId || String(new Date().getTime()).slice(-5) + Math.random().toString(12),
                                                            newvalue: {
                                                                value: val
                                                            },
                                                            oldvalue: {
                                                                value: 'value'// this.editTableInitValue[`${i}**${item.attrcode}`]
                                                            }
                                                        })
                                                        this.afterEvent(item.attrcode, changedrows, val, modelDatas.index, modelDatas.record)
                                                    }
                                                })}
                                            </FormItem>
                                        );
                                    case 'select':
                                        return (
                                            <FormItem
                                                key={i}
                                                inline={true}
                                                labelMd={4}
                                                md={8}
                                                method="blur"
                                                showMast={!!item.required}
                                                isRequire={!!item.required}
                                                labelName={item.label}
                                                errorMessage={`请选择${item.label}`}
                                            >
                                                <Select
                                                    type="customer"
                                                    disabled={!!item.disabled}
                                                    value={tableModeldata[item.attrcode] ? tableModeldata[item.attrcode].value : ''}
                                                    onChange={(val) => {
                                                        this.props.output.table.setTableValueBykey(moduleId, item.attrcode, String(val))
                                                        let changedrows = [];
                                                        changedrows.push({
                                                            rowid: modelDatas.rowId || String(new Date().getTime()).slice(-5) + Math.random().toString(12),
                                                            newvalue: {
                                                                value: String(val)
                                                            },
                                                            oldvalue: {
                                                                value: 'value'// this.editTableInitValue[`${i}**${item.attrcode}`]
                                                            }
                                                        })
                                                        this.afterEvent(item.attrcode, changedrows, String(val), modelDatas.index, modelDatas.record)
                                                    }}
                                                    getPopupContainer={() => document.querySelector('#tableModal')}
                                                    dropdownStyle={{ zIndex: 18000 }}>
                                                    {
                                                        item.options.length && item.options.map((one, i) => <Option value={String(one.value)} key={i} > {one.display} </Option>)
                                                    }
                                                </Select>
                                            </FormItem>
                                        );
                                    case 'datepicker':
                                        return (
                                            <FormItem
                                                key={i}
                                                inline={true}
                                                labelMd={4}
                                                md={8}
                                                showMast={!!item.required}
                                                isRequire={!!item.required}
                                                labelName={item.label}
                                                errorMessage={`请选择${item.label}`}
                                            >
                                                <DatePicker
                                                    type="customer"
                                                    format="YYYY-MM-DD"
                                                    disabled={!!item.disabled}
                                                    getCalendarContainer={() => document.querySelector('#tableModal')}
                                                    locale={zhCN}
                                                    value={tableModeldata[item.attrcode] ? moment(tableModeldata[item.attrcode].value) : null}
                                                    onChange={(val) => {
                                                        this.props.output.table.setTableValueBykey(moduleId, item.attrcode, val)
                                                        let changedrows = [];
                                                        changedrows.push({
                                                            rowid: modelDatas.rowId || String(new Date().getTime()).slice(-5) + Math.random().toString(12),
                                                            newvalue: {
                                                                value: val
                                                            },
                                                            oldvalue: {
                                                                value: 'value'// this.editTableInitValue[`${i}**${item.attrcode}`]
                                                            }
                                                        })
                                                        this.afterEvent(item.attrcode, changedrows, val, modelDatas.index, modelDatas.record)
                                                    }}
                                                    placeholder={'选择日期时间'}
                                                />
                                            </FormItem>
                                        );
                                    case 'textarea':
                                        return (
                                            <FormItem
                                                key={i}
                                                inline={true}
                                                labelMd={4}
                                                md={8}
                                                showMast={true}
                                                labelName={item.label}
                                            >
                                                <textarea
                                                    placeholder="请输入..."
                                                    disabled={!!item.disabled}
                                                    name={item.attrcode}
                                                    value={tableModeldata[item.attrcode] ? tableModeldata[item.attrcode].value : null}
                                                    onChange={(val) => {
                                                        this.props.output.table.setTableValueBykey(moduleId, item.attrcode, val)
                                                        let changedrows = [];
                                                        changedrows.push({
                                                            rowid: modelDatas.rowId || String(new Date().getTime()).slice(-5) + Math.random().toString(12),
                                                            newvalue: {
                                                                value: val
                                                            },
                                                            oldvalue: {
                                                                value: 'value'// this.editTableInitValue[`${i}**${item.attrcode}`]
                                                            }
                                                        })
                                                        this.afterEvent(item.attrcode, changedrows, val, modelDatas.index, modelDatas.record)
                                                    }} >
                                                </textarea>
                                            </FormItem>
                                        );
                                    case 'radio':
                                        return (
                                            <FormItem
                                                key={i}
                                                inline={true}
                                                labelMd={4}
                                                md={8}
                                                showMast={true}
                                                labelName={item.label}
                                            >
                                                <Radio.RadioGroup
                                                    type="customer"
                                                    name={item.attrcode}
                                                    disabled={!!item.disabled}
                                                    selectedValue={tableModeldata[item.attrcode] ? String(tableModeldata[item.attrcode].value) : null}
                                                    onChange={(val) => {
                                                        this.props.output.table.setTableValueBykey(moduleId, item.attrcode, String(val))
                                                        let changedrows = [];
                                                        changedrows.push({
                                                            rowid: modelDatas.rowId || String(new Date().getTime()).slice(-5) + Math.random().toString(12),
                                                            newvalue: {
                                                                value: String(val)
                                                            },
                                                            oldvalue: {
                                                                value: 'value'// this.editTableInitValue[`${i}**${item.attrcode}`]
                                                            }
                                                        })
                                                        this.afterEvent(item.attrcode, changedrows, String(val), modelDatas.index, modelDatas.record)
                                                    }}>
                                                    {
                                                        item.options.length && item.options.map((one, i) => <Radio value={String(one.value)} key={i} > {one.display} </Radio>)
                                                    }
                                                </Radio.RadioGroup>
                                            </FormItem>
                                        );
                                    case 'switch':
                                        return (
                                            <FormItem
                                                key={i}
                                                inline={true}
                                                labelMd={4}
                                                md={8}
                                                showMast={true}
                                                labelName={item.label}
                                            >
                                                <Switch
                                                    checked={tableModeldata[item.attrcode] ? !!tableModeldata[item.attrcode].value : false}
                                                    disabled={!!item.disabled}
                                                    onChange={(val) => {
                                                        this.props.output.table.setTableValueBykey(moduleId, item.attrcode, val)
                                                        let changedrows = [];
                                                        changedrows.push({
                                                            rowid: modelDatas.rowId || String(new Date().getTime()).slice(-5) + Math.random().toString(12),
                                                            newvalue: {
                                                                value: val
                                                            },
                                                            oldvalue: {
                                                                value: 'value'// this.editTableInitValue[`${i}**${item.attrcode}`]
                                                            }
                                                        })
                                                        this.afterEvent(item.attrcode, changedrows, val, modelDatas.index, modelDatas.record)
                                                    }}
                                                />
                                            </FormItem>
                                        );

                                    case 'rangepicker':
                                        return (
                                            <FormItem
                                                key={i}
                                                inline={true}
                                                labelMd={4}
                                                md={8}
                                                showMast={true}
                                                labelName={item.label}
                                            >
                                                <div>rangepicker</div>
                                            </FormItem>
                                        );
                                    default:
                                        return null;
                                }
                            }
                        }) : <FormItem><div>No Data</div></FormItem>}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn-2" onClick={this.handleSubmit}>
                        确认
                        </Button>
                    <Button className="btn-2 btn-cancel" onClick={this.close} shape="border">
                        取消
                        </Button>
                </Modal.Footer>

            </Modal>
        );
    }
}
