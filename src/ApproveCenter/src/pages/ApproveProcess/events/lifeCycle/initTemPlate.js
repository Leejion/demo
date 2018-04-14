
export default function(props) {
    console.log(meta,"meta------------")
     let meta = {
        tableApprove: {
            moduleType: 'table',
            pagination: false,
            columns: [
				{
					label: '业务编码',
					key: 'busiTypeCode',
					width: 300
				},
				{
					label: '业务类型名称',
					key: 'busiTypeName',
					width: 300
				},
				{
					label: '流程名称',
					key: 'flowName',
					width: 200
				}
			]
        }
     };

     let tableMeta = meta.tableApprove;
     if (tableMeta) {
        let event = {
            label: "操作",
            key: "opr",
            itemType: 'label',
            render(text, record, index) {
                return (
                    <a className="ahover" href="">
                        流程配置
                    </a>
                );

            }
        };
        tableMeta.columns.push(event);
        meta.tableApprove = tableMeta;
     }
    
     return meta;
 
 }