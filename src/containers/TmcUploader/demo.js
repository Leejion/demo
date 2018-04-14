import React, { Component } from 'react';
import TmcUploader from './index';

export default class UploadDemo extends Component{
    constructor(props){
        super(props);
        this.state = {
            
        };
    }
    render() {
        return (
            <div style={{
                width:'200px',
                height:'50px',
                margin: '0 auto'
            }}>
                <TmcUploader billID = 'code'/>
            </div>
        );
    }
}
