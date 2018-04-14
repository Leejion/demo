import React, { Component } from 'react';
import NCFormControl from '../../base/nc_FormControl';
import NCIcon from '../../base/nc_Icon';
import { setSimpleSearchValue } from './methods';
import refer from '../../containers/ReferDemo';
import './index.less';

export function createSimpleSearch(meta, { searchButtonClick }) {
	let { createButton } = this.button;
	if (!meta) return;
	let { id, title, buttons, content, refers, placeholder = '查询条件' } = meta || {};

	if (!this.state.simpleSearch.hasOwnProperty(id)) {
		//初始化
		this.state.simpleSearch[id] = { inputValue: '' };
	}
	let referitem = (refers && refer(refers.refcode, { placeholder: refers.label })) || null;
	referitem.props.onChange = (val) => {
		//新增refer onChange方法
		let finalValue;
		if (typeof val === 'boolean') {
			finalValue = {
				display: null,
				value: val
			};
		} else if (val instanceof Array) {
			// 多选参照
			finalValue = {
				display: val.map((e) => e.refname).join(','),
				value: val.map((e) => e.refpk).join(',')
			};
		} else if (val instanceof Object) {
			// 单选参照和select
			finalValue = {
				display: val.refname || val.label,
				value: val.refpk || val.key
			};
		} else {
			// 其他
			finalValue = {
				display: null,
				value: val
			};
		}
		this.setState({
			simpleSearch: {
				...this.state.simpleSearch,
				[refers.refcode]: finalValue
			}
		});
	};
	return (
		<div>
			{meta && (
				<div className="bd-header">
					<div className="bd-header-title">
						<span>{title}</span>
						{buttons &&
							buttons.map((item, key) => {
								return createButton(item.id, {
									name: item.name,
									onButtonClick: item.onButtonClick,
									colors: item.colors
								});
							})}
					</div>
					<div className="bd-header-search">
						{content ? content : null}
						{referitem}
						<NCFormControl
							type="search"
							onSearch={searchButtonClick.bind(this, this.state.simpleSearch, this.output)}
							placeholder={placeholder}
							value={this.state.simpleSearch[id].inputValue}
							onChange={(value) => {
								setSimpleSearchValue.call(this, id, value);
							}}
						/>
						<span
							className="uf uf-search searchbutton"
							onClick={searchButtonClick.bind(this, this.state.simpleSearch, this.output)}
						/>
						{/* <NCIcon type="uf-search" className="searchbutton" onClick={this.searchButtonClick.bind(this,{ ...this.props,table: this.table},this.state.simpleSearch[id].inputValue)}/> */}
					</div>
				</div>
			)}
		</div>
	);
}
