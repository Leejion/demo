import React, { Component } from 'react';
import NCFormControl  from '../../base/nc_FormControl';
import NCIcon from '../../base/nc_Icon';
import NCButton from '../../base/nc_Button'
import {setFuzzySearchValue} from './methods'
import './index.less'
// import createButton from '../Button';
export function createFuzzySearch(searchModelValue) {
    let { createButton } = this.button;
    var meta = searchModelValue;
    if(!meta) return;
    let {
        id,
        title,
        placeholder="查询条件",
    } = meta|| {};
    
    if (!this.state.simpleSearch.hasOwnProperty(id)) {
		//初始化
		this.state.simpleSearch[id]={"inputValue":""};
    }
    return (
        <div className="fuzzy-search">
        {meta&&<div>
            <div className="fuzzy-search-title">{title}</div>
            <span className="fuzzy-search-search">
                <NCFormControl type="text"
                    className = "search-input"
                    onSearch={this.searchButtonClick.bind(this,
                        { ...this.props,table: this.table},
                        this.state.simpleSearch[id].inputValue)
                        }
                    placeholder={placeholder} 
                    value={this.state.simpleSearch[id].inputValue}
                    onChange={(value)=>{setFuzzySearchValue.call(this,id,value)}}
                />
                {/* <span 
                    className="uf uf-search searchbutton" 
                    onClick={this.searchButtonClick.bind(
                        this,
                        { ...this.props,table: this.table},
                        this.state.simpleSearch[id].inputValue
                    )}
                >
                </span> */}
                <NCButton
                    className="search-button" 
                    onClick={this.searchButtonClick.bind(
                        this,
                        { ...this.props,table: this.table},
                        this.state.simpleSearch[id].inputValue
                    )}
                >搜索</NCButton>
            </span>
            </div>
        }
        </div>
    )
}