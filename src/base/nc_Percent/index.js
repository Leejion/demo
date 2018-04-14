import React, { Component } from 'react';
import Input from '../nc_Input';
import NCButton from '../nc_Button';
import './index.less';

//-----------百分数组件----------//
//百分数是数字，取值范围-100~100 
//radio是0.01
//radio是0.001 千分数  
//取值范围-1000~1000 

//min max 最大值最小值

//scale精度

class NCPercent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value:this.props.value||''
		};
	}

	handleChange = (value) => {
		let { onChange, scale } = this.props;
		let flag = this.numCheck(value, scale);
		if(!flag && flag !== ''){
			return false;
		}
		onChange && onChange(flag);
	};

	handleBlur = () => {
		let { onChange, onBlur, max, min, value } = this.props;
		if (min < max) {
			if (Number(value) < min) {
				value = String(min);
			}
			if (Number(value) > max) {
				value = String(max);
			}
		}
		onChange && onChange(value);
		onBlur && onBlur(value);
	};

	numCheck = (num, scale = 0) => {
		if(num !== '-' && num !== '' && !Number(num) && Number(num) !== 0){
			return false;
		}
        let reg = new RegExp(`^\\-?\\d+\\.?\\d{0,${parseInt(scale)}}$`, 'g');
		let flag = reg.test(num);
		if(num === '-'){
			return num;
		}else if(!flag && Number(num) !== 0){
			return Number(num).toFixed(scale);	
		}else{
			return num;	
		}
	};

	render() {
		let { onChange, onBlur, scale,label='',unit, radio,...others } = this.props;

		return (
            <span className="double-wrapper">
                {label && <span className="double-label">{label}</span> }
                <Input 
					onChange={this.handleChange} 
					onBlur={this.handleBlur} 
					value={this.state.value}
					className='double-input'
					{...others} />
				<NCButton
					className="double-btn"
				>
					{unit}
				</NCButton>
            </span>
            
        )
        
	}
}

export default NCPercent;
