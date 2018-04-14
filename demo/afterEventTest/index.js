import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//import { createPage, ajax, base } from 'nc-lightapp-front';
import { createPage, ajax, base } from '../../src';
//import 'nc-lightapp-front/build/index.css';
import initTemplate from './initTemplate';
import afterEvent from './afterEvent';
import btnClick from './btnClick';

class ExtCard extends Component {
    constructor(props) {
        super(props);
    }

    
    componentDidMount() {
        setTimeout(()=>{
            let table1 = {
                pageinfo: {
                    number: 0,
                    size: 10,
                    totalElements: 3,
                    totalPages: 1
                },
                rows: [
                    {
                        values:{
                            name2: { value: 'sdsad', display: null, scale: -1 },
                            mny2: { value: '4354', display: null, scale: -1 },
                            date2: { value: '2018-05-20', display: null, scale: -1},
                            sex2: { value: '1', display: '女', scale: -1}
                        }
                    }
                ]
            }
            let table2 = {
                pageinfo: {
                    number: 0,
                    size: 10,
                    totalElements: 3,
                    totalPages: 1
                },
                rows: [
                    {
                        values: {
                            name3: { value: 'sdsd', display: null, scale: -1 },
                            mny3: { value: '123232', display: null, scale: -1 },
                            date3: { value: '2018-04-20', display: null, scale: -1 },
                            sex3: { value: '0', display: '男', scale: -1 }
                        }
                    }
                ]
            }
            this.props.editTable.setTableData('table1', table1);
            this.props.editTable.setTableData('table2', table2);
        },100)
    }
    
    


    render() {
        const { editTable, form, button} = this.props;
        const { createForm } = form;
        const { createEditTable } = editTable;
        const { createButton } = button;

        return (
            <div id="ncc-demo-reva-card">
                {createButton('saveBtn', { name: '保存', onButtonClick: btnClick.bind(this)})}
                <div className="form-area">
                    {createForm('formid', {
                        onAfterEvent: afterEvent.bind(this)
                    })}
                </div>
                <div className="table-area">
                    {createButton('addBtn', { name: '新增', onButtonClick: btnClick.bind(this) })}
                    {createEditTable('table1', {
                        onAfterEvent: afterEvent.bind(this)
                    })}
                    {createEditTable('table2', {
                        onAfterEvent: afterEvent.bind(this)
                    })}

                </div>
            </div>
        );
    }
}

export default createPage({
    initTemplate: initTemplate
})(ExtCard);