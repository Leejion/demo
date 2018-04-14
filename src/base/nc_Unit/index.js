import React, { Component } from 'react';
import Input from '../nc_Input';
import NCButton from '../nc_Button';
import NCSelect from '../nc_Select';
const NCOption = NCSelect.NCOption;
import '../nc_Percent/index.less'

//-----------数量单位组件----------//
//数量，大于0

class NCUnit extends Component {
	constructor(props) {
		super(props);
	}

	componentWillReceiveProps(nextProps) {
		this.props = nextProps;
	}
	

	handleInput = (value) => {
		let { onChangeInput, scale } = this.props;
		let flag = this.numCheck(value, scale);
		if(!flag && flag !== ''){
			return false
		}
		onChangeInput && onChangeInput(flag);
	};

	ChangeUnit = (value) =>{
		let { onChangeUnit } = this.props;
		let display;
		this.props.options.find((item) => {
			if (item.value == value) {
				display = item.display;
			}
		});
		onChangeUnit && onChangeUnit(value,display);
	}

	handleBlur = () => {
		let { onChangeInput, onBlur, max, min, value } = this.props;
		if(max && min){
			if (min < max) {
				if (Number(value) < min) {
					value = String(min);
				}
				if (Number(value) > max) {
					value = String(max);
				}
			}
		}
		onChangeInput && onChangeInput(value);
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
		let { onChangeInput, onBlur, scale,label='',unit, options=[], radio,...others } = this.props;
		
		return (
            <span className="double-wrapper">
                 {label && <span className="double-label">{label}</span> }
                <Input 
					onChange={this.handleInput} 
					onBlur={this.handleBlur} 
					className='double-input'
					value={this.props.value||''}
					{...others} />
				{/* <NCButton
					className="double-btn"
				>
					{unit}
				</NCButton> */}
				 <NCSelect
					className="double-btn"
					value={this.props.unitValue}
					onChange={this.ChangeUnit}
				>
					{options.map((item,index)=>{
						return(
							<NCOption value={String(item.value)}>{item.display}</NCOption>
						)
					})}
				</NCSelect>
            </span>
        )
        
	}
}


export default NCUnit;
