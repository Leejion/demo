/**
 * Created by wangshhj on 2018/2/27.
 * 审批状态流程图
 */
import React, {Component} from 'react';
import './approveDetailCom.less';
import {FormControl,Button } from 'tinper-bee';

export default class ApproveDetailCom extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.currentIndex = null;
        this.state = {
            value:''
        }
    }

    componentDidMount () {
        let wid = this.dom.offsetWidth;
        let parentWid = this.dom.parentElement.offsetWidth;
        if( wid > parentWid && Math.ceil(this.currentIndex * 300) > parentWid){
            this.dom.parentElement.scrollTo(wid - parentWid + 100, 0)
        }
    }


    //创建驳回意见行
    createDisallowance = () => {
        return (
            <div className="optionArea">
                <FormControl
                    className="optionInput"
                    placeholder="请输入意见"
                    value={this.state.value}
                    onChange={this.onChange}
                />
                <Button colors="danger" className="approveBtn" onClick = {this.approveBtnClick}>审批通过</Button>
                <Button colors="default" className="disallowanceBtn" onClick = {this.disallowanceBtnClick}>驳回</Button>
            </div>
        )
    };

    //意见框输入监听事件
    onChange = (val) => {
          this.setState({
              value:val
          })
    };

    //审批通过按钮事件
    approveBtnClick = () => {
        this.props.approveBtnClick(this.state.value)
    };

    //驳回按钮事件
    disallowanceBtnClick = () => {
        this.props.disallowanceBtnClick(this.state.value)
    };

    //创建审批状态流程图
    createDom = () => {
        let that = this;
        let data = this.props.data;
        return (
            data.map((val, index) => {
                if( data[index + 1] && data[index + 1].current ){
                    that.currentIndex = index + 1;
                }
                return (
                    <div className={["approveDetail", data[index + 1] && data[index + 1].current?'currentStatus':null].join(' ')} key={index} >
                        <div className="detail_1">
                            <span className="detailIcon"></span>
                            <span className="detailName">{val.approveresult?val.approveresult:val.approvestatus}</span>

                            {index == data.length - 1?null:<span className="detailBorder"></span>}
                        </div>
                        <div className="detailDate">{val.dealdate}</div>
                        <div className="detail_2">
                            {/*<span>{val.position}:</span>*/}
                            <span>{val.dealman}</span>
                        </div>
                    </div>
                )
            })
        )
    };

    render() {
        return (
            <div className="approveDetailBox">
                {this.props.needInput?this.createDisallowance():null}
                <div className="approveDetailPicture">
                    <div className="approveDetailAuto" ref = {(dom) => {this.dom = dom}}>
                        {this.createDom()}
                    </div>
                </div>
            </div>
        )
    }
}