import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//import { createPage, ajax, base } from 'nc-lightapp-front';
import { createPage, ajax, base } from '../../../src';
//import 'nc-lightapp-front/build/index.css';
import { initTemplate } from './events';

class Card extends Component {
	constructor(props) {
		super(props);
		// this.state = {
		// 	status: this.getStatus()
		// };
		this.formId = 'formAreaId';
		this.tableId = 'revecont_b';
		this.ts = '';
	}

	componentDidMount() {
		// //查询单据详情
		// if (this.getStatus() != 'add') {
		// 	let data = { pk: this.getPageParam('id') };
		// 	ajax({
		// 		url: '/nccloud/reva/revecont/cardquery.do',
		// 		data: data,
		// 		success: (res) => {
		// 			if (res.data.head) {
		// 				this.props.form.setAllFormValue({ [this.formId]: res.data.head.head });
		// 				this.ts = res.data.head.head.rows[0].values.ts.value;
		// 			}
		// 			if (res.data.body) {
		// 				console.log(this.tableId, res.data.body.body);
		// 				this.props.editTable.setTableData(this.tableId, res.data.body.body);
		// 			}
		// 		}
		// 	});
		// }
	}

	//切换页面状态
	// toggleShow = (status) => {
	// 	if (!status) {
	// 		status = this.getStatus();
	// 	}
	// 	this.setState({
	// 		status: status
	// 	});
	// 	console.log(this.tableId);
	// 	console.log(this.props.meta.getMeta());
	// 	this.props.form.setFormStatus(this.formId, status);
	// 	// this.props.editTable.setStatus(this.tableId, status);
	// };

	//获取url的status参数值
	getStatus = () => {
		return window.location.hash.split('?')[1].split('&')[0].split('=')[1];
	};

	//获取指定url参数值
	getPageParam = (id) => {
		let param = window.location.hash.split('&');
		param.shift();
		let result;
		param.find((item) => {
			if (item.indexOf(id) != -1) {
				result = item.split('=')[1];
			}
		});
		return result;
	};

	//删除单据
	delConfirm = () => {
		let data = {
			pageid: '20521030',
			head: {
				head: {
					areaType: 'form',
					rows: [
						{
							values: {
								crevecontid: { value: this.getPageParam('id') },
								ts: { value: this.ts }
							}
						}
					]
				}
			}
		};
		ajax({
			url: '/nccloud/reva/revecont/delete.do',
			data: {
				id: this.getPageParam('id'),
				ts: this.ts
			},
			success: () => {
				this.props.changeUrl({ href: '/masterChildTable-revecontract/list' });
			}
		});
	};

	render() {
		const { editTable, form, button, modal } = this.props;
		const { createForm } = form;
		const { createEditTable } = editTable;
		const { createButton } = button;
		const { createModal } = modal;

		return (
			<div id="ncc-demo-reva-card">
				<div className="form-area">
					{createForm(this.formId)}
				</div>
				{/* <div className="table-area">
					<div>
						{this.state.status != 'browse' &&
							createButton('addSenBtn', {
								name: '新增',
								className: 'btn',
								onButtonClick: buttonClick.bind(this)
							})}
					</div>
					{createEditTable(this.tableId, {
						onAfterEvent: afterEvent.bind(this)
					})}
				</div> */}

				{createModal('delete', {
					title: '注意',
					content: '确定要删除吗?',
					beSureBtnClick: this.delConfirm
				})}
			</div>
		);
	}
}

export default createPage({
	initTemplate: initTemplate
})(Card);

// Card = createPage({
//     initTemplate: initTemplate,
// })(Card);

//ReactDOM.render(<Card />, document.querySelector('#app'));
