/**
 * Created by wangshhj on 2018/2/5.
 */
import React, {Component} from 'react';
import NCModal from '../../../base/nc_Modal';
import NCButton from '../../../base/nc_Button';
import './rejectModal.less'
export default class RejectModal extends Component{
    constructor (props){
        super(props)
        this.props = props;
        this.state = {
            main:''
        }
    }

    //关闭模态框
    close() {
       this.props.closeModal();
        this.setState({
            main:''
        })
    }

    //确定按钮
    beSureEve(){
        this.props.closeModal();
        this.props.beSureEve(this.state.main);
        this.setState({
            main:''
        })
    }

    shouldComponentUpdate (newProps) {
        return true;
    }

    //输入监听
    inputEve (val){
        if(val.target.value.length > 100){
            alert('最多输入100个字符')
        }else{
            this.setState({
                main:val.target.value
            })
        }
    }

    render () {
        return (
            <NCModal
                className = "rejectModal"
                show = { this.props.showModal }
                onHide = { this.close.bind(this) } >
                <NCModal.Header>
                    <span className="modalTitle">驳回</span>
                    <span className="closeBtn" onClick={this.close.bind(this)}>×</span>
                </NCModal.Header>

                <NCModal.Body>
                    <span className="mainName">驳回意见：</span>
                    <textarea className="mainBox" onChange={this.inputEve.bind(this)} value={this.state.main}/>
                    <span className="mainLength">{this.state.main.length}/100</span>
                </NCModal.Body>

                <NCModal.Footer>
                    <NCButton onClick={ this.beSureEve.bind(this) } key={1} className="beSureBtn" colors="danger">确认</NCButton>
                    <NCButton onClick={ this.close.bind(this) } key={0} className="cancelBtn" shape="border" style={{marginLeft: 10}}>取消</NCButton>
                </NCModal.Footer>
            </NCModal>
        )

    }
}