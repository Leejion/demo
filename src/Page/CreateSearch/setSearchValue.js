//设置查询区数据
export default function setSearchValue (id,data) {
    let items = this.state.meta[id].items;
    items.map((val,index) => {
        val.initialvalue.value = data[index].value;
    });
    this.state.meta[id].items = items;
    this.setState({
        meta:this.state.meta
    })
}