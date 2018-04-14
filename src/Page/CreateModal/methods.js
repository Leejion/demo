/**
 * Created by wangshhj on 2018/3/13.
 */

export function show(id, {title, content, beSureBtnClick} = {}) {
    if(!this.state.modal.hasOwnProperty(id)){
        return false
    }
    let modalData = this.state.modal[id];
    modalData.title = title?title:modalData.title;
    modalData.content = content?content:modalData.content;
    modalData.beSureBtnClick = beSureBtnClick?beSureBtnClick:modalData.beSureBtnClick;
    modalData.showModal = true;
    this.setState({
        modal:this.state.modal
    })


}