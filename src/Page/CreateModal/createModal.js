/**
 * Created by wangshhj on 2018/3/13.
 */
import React, {Component} from 'react';

import {FormControl, Con, Row, Col, Select } from 'tinper-bee';
import NCIcon from '../../base/nc_Icon';
import { NCCheckbox , NCSwitch, NCNumber, NCModal, NCButton } from '../../base';

import './createModal.less';

export default function createModal(id,{title, content, beSureBtnClick, leftBtnName = '关闭', rightBtnName = '确认', noFooter = false} = {}) {
    if(!this.state.modal.hasOwnProperty(id)){
        this.state.modal[id] = {
            showModal:false,
        }
    }
    let modalData = this.state.modal[id];
    modalData.title = title?title:modalData.title;
    modalData.content = content?content:modalData.content;
    modalData.beSureBtnClick = beSureBtnClick?beSureBtnClick:modalData.beSureBtnClick;
    modalData.leftBtnName = leftBtnName;
    modalData.rightBtnName = rightBtnName;


    //关闭模态框
    let close = () => {
        modalData.showModal = false;
        this.setState({
            modal:this.state.modal
        })
    };

    //确认按钮事件
    let beSureClick = () => {
        close();
        if(typeof modalData.beSureBtnClick == 'function'){
            modalData.beSureBtnClick.call(this);
        }
    };

    return (
        <div className = "simpleModal" id = {id}>
            <NCModal
                show = { modalData.showModal }
                onHide = { close.bind(this) } >
                <NCModal.Header closeButton>
                    <NCModal.Title>{ modalData.title }</NCModal.Title>
                </NCModal.Header>

                <NCModal.Body>
                    { modalData.content }
                </NCModal.Body>

                {
                    !noFooter?   <NCModal.Footer>
                        <NCButton onClick={ close.bind(this) } shape="border" style={{marginRight: 50}}>{  modalData.leftBtnName }</NCButton>
                        <NCButton onClick={ beSureClick.bind(this) } colors="primary">{ modalData.rightBtnName }</NCButton>
                    </NCModal.Footer>:null
                }

            </NCModal>
        </div>
    )
}