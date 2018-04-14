import { Component } from 'react';
import { Button, Upload, Col, Modal, Icon } from 'tinper-bee';
import Ajax from '../../api/ajax';
import Axios from 'axios';
import toast  from '../../api/toast';
import './index.less';

import _DEFIMG from '../../static/images/fileImage/default.png';
import _EXCIMG from '../../static/images/fileImage/excel.png';
import _IMGIMG from '../../static/images/fileImage/image.png';
import _TXTIMG from '../../static/images/fileImage/txt.png';
import _PPTIMG from '../../static/images/fileImage/ppt.png';
import _PDFIMG from '../../static/images/fileImage/pdf.png';

// 文件图标选择
export function typeSwitch(params) {
	// 需要哪些后缀名 在添加
	let reg = new RegExp('^.*?.(jpg|jpeg|bmp|gif|xls|xlsx|doc|docx|txt|ppt|pdf|)$');
	if (reg.test(params)) {
		let typeSrc = _DEFIMG;
		if (params != '' && params) {
			let type = params.replace(/.+\./, '');
			if (type === 'jpg' || type === 'jpeg' || type === 'bmp' || type === 'gif') {
				typeSrc = _IMGIMG;
			} else if (type === 'xls' || type === 'xlsx') {
				typeSrc = _EXCIMG;
			} else if (type === 'doc' || type === 'docx' || type === 'txt') {
				typeSrc = _TXTIMG;
			} else if (type === 'ppt') {
				typeSrc = _PPTIMG;
			} else if (type === 'pdf') {
				typeSrc = _PDFIMG;
			}
		}
		return typeSrc;
	} else {
		return _DEFIMG;
	}
}

export default function Uploader( billID ) {
	return (
		<TmcUploader billID = { billID }/>
	)
}

class TmcUploader extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showFile: false, // 打开文件列表
			haveFile: false, // 有文件
			group: 'single', // 分组
			billID: props.billID, // 单据id
			tipInfo: '', // 文件上传状态反馈
			fileList: [], // 上传文件的队列
			showFileList: [], // 上传成功的文件队列
			fileInfo: {}, // 每个文件信息
			resUrl: '/',
			uploading: false,
			isEdit: true,
			showBtn: true,
			reqData: {}
		};
	}
	// 文件改变 ---- 上传中、完成、失败都会调用这个函数。
	handleChange = (info) => {
		let fileList = info.fileList;
		let fileInfo = info.file;
		let tipInfo = '';
		if (fileInfo.status === 'uploading') {
			tipInfo = 2;
		}
		fileList = fileList.slice(-2);
		fileList = fileList.map((file) => {
			if (file.response) {
				file.url = file.response.url;
			}
			return file;
		});
		this.setState({ fileList });
		fileList = fileList.filter((file) => {
			if (file.response) {
				return file.response.status === 1;
			}
			return true;
		});
		if (fileInfo.status === 'done') {
			if(fileInfo.response.success){
                let { data } = fileInfo.response;
                this.setState({ showFileList: [ ...data ] });
                tipInfo = 1;
			}else{
                tipInfo = 0;
			}
			// message.success(`${info.file.name} file uploaded successfully`);
		} else if (info.file.status === 'error') {
			tipInfo = 0;
		}
		this.setState({ tipInfo, fileInfo });
	};

	// 删除操作
	handleRemove = (fileInfo) => {
		let { billId, fullPath, pk_doc, name } = fileInfo;
		let { showFileList } = this.state;
		const _this = this;
		console.log(fileInfo)
		let data = {
            "billId": billId,
			"fullPath": fullPath,
			"pk_doc": pk_doc
		};
		Ajax({
			// url: 'http://tmc-file.app.yyuap.com/file/delete',
			url: '/nccloud/cplatform/attachment/delete.do',
			mode: 'normal',
			method: 'POST',
			data: data,
			success: function(res) {
				let resData = res.data;
				if (resData.success) {
					showFileList.splice(showFileList.findIndex((item) => item.pk_doc === pk_doc), 1);
					if (showFileList.length === 0) {
						_this.setState({ haveFile: false });
					}
					_this.setState({ showFileList });
                    let content = `附件：${name}删除成功 `;
					toast({ color: 'success', content: content });
				} else {
					let content = `附件：${name}删除失败`;
					toast({ color: 'danger', content: content });
				}
			}
		});
	};

	// 附件展示列
	showFileUploadList = () => {
		let { showFileList, isEdit } = this.state;
		if (showFileList.length === 0) {
			return null;
		}
		return (
			<div className='tmc_uploader_fileList'>
				{showFileList.map((fileItem, index) => {
					let Tscr = typeSwitch(fileItem.name);
					return (
						<div
                             onClick={this.handleDownload.bind(this, fileItem)} className='tmc_uploadr_item_content' title={fileItem.name}>
							<img  src={Tscr}
								className='tmc_file_ico'

							/>
							<span className='tmc_file_name'>{fileItem.name}</span>
							{isEdit ? (
								<i
									onClick={this.handleRemove.bind(this, fileItem)}
									className='uf uf-close tmc_uploader_del display_type'
								/>
							) : null}
						</div>
					);
				})}
			</div>
		);
	};

	// 下载文件
	handleDownload = ( fileInfo ) => {
		const _this = this;
		console.log(fileInfo)
		const {billId, fullPath, isdoc, name, pk_doc} = fileInfo;
		// const downURL = 'http://tmc-file.app.yyuap.com/file/download';
		const downURL = 'nccloud/cplatform/attachment/download.do';
		Ajax({
			url: downURL,
			mode: 'normal',
			method: 'POST',
			data:{
                isdoc:isdoc,
                pk_doc:pk_doc,
				name:name
			},
			// params: {
			// 	id: id,
			// 	stream: true,
			// 	permission: 'read'
			// },
			success: function(res) {
                const content = res.data;
                const blob = new Blob([content]);
                const fileName = name;
                if ('download' in document.createElement('a')) { // 非IE下载
                    const elink = document.createElement('a');
                    elink.download = fileName;
                    elink.style.display = 'none';
                    elink.href = URL.createObjectURL(blob);
                    document.body.appendChild(elink);
                    elink.click();
                    URL.revokeObjectURL(elink.href) ;// 释放URL 对象
                    document.body.removeChild(elink)
                } else { // IE10+下载
                    navigator.msSaveBlob(blob, fileName)
                }

				// let { data } = res;
				// if (data.status === 1) {
				// 	_this.windowDownload(downURL, id);
				// } else {
				// 	let msg = data.message;
				// 	let content = '附件：';
				// 	if (typeof msg === 'string') {
				// 		content += msg;
				// 	}
				// 	toast({ color: 'danger', content: content });
				// }
			},
			error:function (res) {
				alert(res)
            }
		});
	};

	windowDownload = (downURL, id) => {
		window.open(`${downURL}?id=${id}&permission=read`);
	};

	// 上传状态
	fileUploadtype = () => {
		let { tipInfo } = this.state;
		switch (tipInfo) {
			case -1:
				return '上传参数不正确';
				break;
			case 0:
				return '上传失败';
				break;
			case 1:
				return '上传成功';
				break;
			case 2:
				return '正在上传。。。';
				break;
			default:
				break;
		}
	};

	// 附件查询
	fileSearchFun = () => {
		let { billID, group } = this.state;
		const _this = this;
		let data = {
            "billId": billID
		};
		Ajax({
			// url: 'http://tmc-file.app.yyuap.com/file/query',
			url: '/nccloud/cplatform/attachment/query.do',
			// mode: 'normal',
			method: 'POST',
			data,
			success: function(res) {
				if (res.success) {
                    let resData = res.data;
					if (resData.length > 0) {
						_this.setState({
							haveFile: true,
							showFileList: resData
						});
					}
				} else {
					// let msg = resData.message;
					// let content = '附件：';
					// if (typeof msg === 'string') {
					// 	content += msg;
					// } else {
					// 	msg.map((item, index) => {
					// 		content += item.DefaultMessage;
					// 	});
					// }
					// toast({ color: 'danger', content: content });
				}
			},
			error:function (res) {
				alert(res)
            }
		});
	};

	componentWillReceiveProps(nextProps) {
		let { billID } = nextProps;
		if (JSON.stringify(this.state.billID) !== JSON.stringify(billID)) {
			this.setState(
				{
					billID: billID
				},
				() => {
					this.fileSearchFun();
				}
			);
		}
	}

	componentWillMount() {
		let { billID } = this.props;
		this.setState(
			{
				billID: billID
			},
			() => {
				this.fileSearchFun();
			}
		);
	}

	componentDidMount () {
		document.body.addEventListener('click', this.hiddenShowFile);
	}

	componentWillUnmount () {
		document.body.removeEventListener('click',this.hiddenShowFile);
	}

	hiddenShowFile = (e) => {
		if(!this.state.showFile) {
			return false;
		}
		if( !(e.target.matches(`.tmc_uploader_files`) 
			|| e.target.matches(`input`)
			|| e.target.matches(`img`)
			|| e.target.matches(`i`)
			|| e.target.matches(`.u-button`) 
			|| e.target.matches(`.content`) 
			|| e.target.matches(`.file_info_name`)
			|| e.target.matches(`.title`)
			|| e.target.matches(`.head`)
			|| e.target.matches(`.tmc_uploader_fileList`))
		){
			this.setState({showFile:false})
		}
	}

	render() {
		const { showFile, haveFile, fileList, billID, group, fileInfo, tipInfo } = this.state;
		const props = {
			// action: 'http://tmc-file.app.yyuap.com/file/upload',
			action: '/nccloud/cplatform/attachment/upload.do',
			data: {
				// filepath: billID,
                enctype:"multipart/form-data",
				billId: billID,
				// groupname: group,
				// url: false,
				// isencrypt: false,
				// thumbnail: '500w',
				// isreplace: false,
				// permission: 'read'
			},
			onRemove: this.handleRemove,
			onChange: this.handleChange,
			fileList: this.state.fileList,
			showUploadList: false
		};

		return (
			<div className='tmc_uploader_content'>
				<div
					className='tmc_uploader_open'
					onClick={() => {
						this.state.showFile = !showFile;
						this.state.fileInfo = {};
						this.state.tipInfo = '';
						if (this.state.showFile) {
							this.fileSearchFun();
						}
						this.setState({
							fileInfo: {},
							tipInfo: '',
							showFile: this.state.showFile
						});
					}}
				>
					<i className={haveFile ? 'iconfont icon-icon-fujian' : 'iconfont icon-wufujian'} />
				</div>
				{showFile ? (
					<div className='tmc_uploader_files'>
						<div className='head'>
							<div className='title'>附件</div>
							<Upload {...props}>
								<Button className='btn'>上传附件</Button>
							</Upload>
							<div className='info'>
								<span className="file_info_name">
									{fileInfo.name ? `${fileInfo.name} ` : null}
								</span>
								<span className={tipInfo === 0 ? 'info_msg error-color' : 'info_msg success-color'}>
									{this.fileUploadtype()}
								</span>
							</div>
							<i
								className='uf uf-close'
								onClick={() => {
									this.setState({
										fileInfo: {},
										tipInfo: '',
										showFile: false
									});
								}}
							/>
						</div>
						<div className='content'>{this.showFileUploadList()}</div>
					</div>
				) : null}
			</div>
		);
	}
}
