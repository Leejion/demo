import React, { Component } from 'react';
import { createPage, date } from '../../src';
import { getAfterDay, } from '../../src/api/date';
import './index.less'
import { afterEvent, buttonClick } from './events';
import NCAffix from '../../src/base/nc_Affix';
import { Element as ScrollElement, Link as ScrollLink } from 'react-scroll';
//const NCTabPane = NCTabs.NCTabPane;
// console.warn(getAfterDay, '问题1：渲染其他页面为什么要走这里？？？？？？效率低下！！！！');
class TestAnchor1 extends Component {
    // react：构造函数
    constructor(props) {
        super(props);
    }
    getTabConf = () => {
        let { createForm } = this.props.form;
        const tabsConf = {
            //activeTab:"3", 
            items: [
                { title: "页签一", content: createForm('form1') },
                { title: "页签二", content: createForm('form2') },
                { title: "页签三", content: createForm('form2') }
            ]
        };
        return tabsConf;
    }
    // react：界面渲染函数
    render() {
        // let { form, button ,tabs,anchorNav} = this.props;
        // let { createForm } = form;
        // let { createButton } = button;
        // let { createTabs } = tabs;
        // let {createAnchorNav} = anchorNav;target={(value) => { return }}
        let dateData = getAfterDay('12/25/1995', -11, "MM-DD-YYYY");
        console.log(dateData);
        return (
            <div className="test-wrapper">
                <NCAffix>
                    <div className="test-nav">
                        <div className="middle">
                            <ul>
                                <ScrollLink
                                    to='forminfo'
                                    spy={true}
                                    smooth={true}
                                    duration={300}
                                    offset={-50}
                                >
                                    <li>表单信息</li>
                                </ScrollLink>
                                <ScrollLink
                                    to='businfo'
                                    spy={true}
                                    smooth={true}
                                    duration={300}
                                    offset={-50}
                                >
                                    <li>业务信息</li>
                                </ScrollLink>
                                <ScrollLink
                                    to='otherinfo'
                                    spy={true}
                                    smooth={true}
                                    duration={300}
                                    offset={-50}
                                >
                                    <li>其他信息</li>
                                </ScrollLink>
                            </ul>
                        </div>
                    </div>
                </NCAffix>
                <div className="content">
                    <ScrollElement name='forminfo'>
                        <section style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '20px' }}>
                            <h1>表单信息</h1>
                            <div style={{ width: '100%', height: '500px', backgroundColor: 'red', fontSize: '24px', lineHeight: '500px', textAlign: 'center' }}>表单信息内容</div>
                        </section>
                    </ScrollElement>

                    <ScrollElement name='businfo'>
                        <section style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '20px', marginTop: '20px' }}>
                            <div>业务信息</div>

                            <div style={{ width: '100%', height: '500px', backgroundColor: 'blue', fontSize: '24px', lineHeight: '500px', textAlign: 'center' }}>业务信息内容</div>
                        </section>
                    </ScrollElement>

                    <ScrollElement name='otherinfo'>
                        <section style={{ height: 700, border: '1px solid #ccc', padding: '20px', marginBottom: '20px', marginTop: '20px' }}>
                            <h1>其他信息</h1>
                            <div style={{ width: '100%', height: '500px', backgroundColor: 'green', fontSize: '24px', lineHeight: '500px', textAlign: 'center' }}>其他信息内容</div>
                        </section>
                    </ScrollElement>
                </div>
            </div>
        );
    }
}

export default createPage({
    //模板id
    moduleId: '100', //或者 [ '001', '002', '003' ]
    // 编辑后事件
    onAfterEvent: afterEvent,
    // 按钮点击事件
    onButtonClick: buttonClick
})(TestAnchor1);