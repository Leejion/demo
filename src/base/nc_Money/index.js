import React, { Component } from 'react';
import Input from '../nc_Input';
import NCButton from '../nc_Button';
import '../nc_Percent/index.less'

//-----------金额组件----------//

//金额是数字，可正可负，

//scale精度

//radio是金额比例换算，
//min 可输入的最小值
//max 可输入的最大值

//千分位
// let re=/(-?\d+)(\d{3})/;  
// while(re.test(strmny)){  
// 	strmny=strmny.replace(re,"$1,$2")  
// } 
// this.result= strmny;


class NCMoney extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	handleChange = (value) => {
		let { onChange, scale } = this.props;
		let flag = this.numCheck(value, scale);
		if(!flag && flag !== ''){
			return false
		}
		//千分位
		let re=/(-?\d+)(\d{3})/;  
		while(re.test(flag)){  
			flag=flag.replace(re,"$1,$2")  
		} 
		onChange && onChange(flag);
	};

	handleBlur = () => {
		let { onChange, onBlur, max, min, value } = this.props;
		let temp = value.replace(/\,/g,'');
		if (min < max) {
			if (Number(temp) < min) {
				value = String(min);
			}
			if (Number(temp) > max) {
				value = String(max);
			}
		}
		onChange && onChange(value);
		onBlur && onBlur(value);
	};

	numCheck = (num, scale = 0) => {
		num = num.replace(/\,/g,'');
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
		let { onChange, onBlur, scale, label='',unit, radio,...others } = this.props;

		return (
            <span className="double-wrapper">
                {label && <span className="double-label">{label}</span> }
                <Input 
					onChange={this.handleChange} 
					onBlur={this.handleBlur} 
					className='double-input'
					{...others} 
				/>
				<NCButton
					className="double-btn"
				>
					{unit}
				</NCButton>
            </span>
        )       
	}
}

export default NCMoney;
