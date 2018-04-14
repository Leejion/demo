
import { NCIcon } from '../../src/base';
export default function(props) {
	let meta = {
		treeTable: {
			moduleType: 'treeTable',
			items: [
				{
				   attrcode: 'organ',
				   itemtype: 'input',
				   label:"组织",
				   visible: true,
				},{
					attrcode: 'code',
					itemtype: 'input',
					label:"编码",
					visible: true,
				},{
					attrcode: 'name',
					itemtype: 'input',
					label:"名称",
					visible: true,
				},{
					attrcode: 'parentName',
					itemtype: 'input',
					label:"上级分类",
					disabled: true,
					visible: true,
				}
			]
		},
		listTable: {
			moduleType: 'table',
			pagination: {
				pageSize: 10
			},
			items: [
				{
					attrcode: 'organ',
					itemtype: 'input',
					label:"组织",
					visible: true,
				},
				{
					attrcode: 'code',
					itemtype: 'input',
					label:"编码",
					visible: true,
				},{
					attrcode: 'name',
					itemtype: 'label',
					label:"名称",
					visible: true,
				}
			]
		}
	}

	//修改meta
	let tableMeta = meta.listTable;
	if (tableMeta) {
		//添加表格操作列
		let event = {
			label: '操作',
			attrcode: 'opr',
			visible: true,
			render(text, record, index) {
				return (
					<span>
						<i
							className="icon iconfont icon-bianji"
							onClick ={()=>{
								props.table.openModel('listTable', 'edit', record);
							}}
						>
						</i>
						{record.use.value ?(<i
                            className="icon iconfont icon-jianshao"
                            onClick ={()=>{
                               props.table.setTableValueByKeyAndRecord('listTable', record, {use:{value:false}})
                            }}
                        >
                        </i>):(
							<NCIcon type="uf-play-o"
								onClick ={()=>{
									props.table.setTableValueByKeyAndRecord('listTable', record, {use:{value:true}})
								}}
							>
							</NCIcon>
						)}
					</span>
				);
			}
		};
		tableMeta.items.push(event);
	}

	props.meta.setMeta(meta);
}
