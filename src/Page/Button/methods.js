import { isObj, warningOnce } from '../../public';

// 设置按钮可用性
export function setButtonDisabled(values) {
	for (let key of Object.keys(values)) {
		if (key) {
			this.state.button[key].disabled = values[key];
		}
	}
	this.setState({ button: this.state.button });
}

// 获取按钮可用性
export function getButtonDisabled(id) {
	return this.state.button[id].disabled;
}

// 设置按钮的显隐性
export function setButtonVisible(buttonId, flag) {
	if (typeof buttonId == 'string' && this.state.button[buttonId]) {
		this.state.button[buttonId].visible = flag;
	} else if (buttonId instanceof Array) {
		for (let i = 0; i < buttonId.length; i++) {
			let id = buttonId[i];
			if (this.state.button[id]) {
				this.state.button[id].visible = flag;
			}
		}
	}
	this.setState({
		button: this.state.button
	});
}

export function setButtonsVisible(obj) {
	if (isObj(obj)) {
		for (let key in obj) {
			if (typeof key == 'string' && this.state.button[key]) {
				this.state.button[key].visible = !!obj[key];
			}
		}
		this.setState({
			button: this.state.button
		});
	}
	warningOnce(isObj(obj), '须传入对象枚举，键是id，值是true/false');
}
