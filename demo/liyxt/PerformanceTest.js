import React, { Component } from 'react';
import { Table } from 'tinper-bee';
var times = function() {
	var timing = performance.timing;
	var loadTime = timing.loadEventEnd - timing.navigationStart; //过早获取时,loadEventEnd有时会是0
	if (loadTime <= 0) {
		// 未加载完，延迟200ms后继续times方法，直到成功
		setTimeout(function() {
			times();
		}, 200);
		return;
	}
	var readyStart = timing.fetchStart - timing.navigationStart;
	var redirectTime = timing.redirectEnd - timing.redirectStart;
	var appcacheTime = timing.domainLookupStart - timing.fetchStart;
	var unloadEventTime = timing.unloadEventEnd - timing.unloadEventStart;
	var lookupDomainTime = timing.domainLookupEnd - timing.domainLookupStart;
	var connectTime = timing.connectEnd - timing.connectStart;
	var requestTime = timing.responseEnd - timing.requestStart;
	var initDomTreeTime = timing.domInteractive - timing.responseEnd;
	var domReadyTime = timing.domComplete - timing.domInteractive; //过早获取时,domComplete有时会是0
	var loadEventTime = timing.loadEventEnd - timing.loadEventStart;

	// 为console.table方法准备对象，包含耗时的描述和消耗的时间
	var allTimes = [
		{ 描述: '准备新页面时间耗时', '时间(ms)': readyStart },
		{ 描述: 'redirect 重定向耗时', '时间(ms)': redirectTime },
		{ 描述: 'Appcache 耗时', '时间(ms)': appcacheTime },
		{ 描述: 'unload 前文档耗时', '时间(ms)': unloadEventTime },
		{ 描述: 'DNS 查询耗时', '时间(ms)': lookupDomainTime },
		{ 描述: 'TCP连接耗时', '时间(ms)': connectTime },
		{ 描述: 'request请求耗时', '时间(ms)': requestTime },
		{ 描述: '请求完毕至DOM加载', '时间(ms)': initDomTreeTime },
		{ 描述: '解释dom树耗时', '时间(ms)': domReadyTime },
		{ 描述: 'load事件耗时', '时间(ms)': loadEventTime },
		{ 描述: '从开始至load总耗时', '时间(ms)': loadTime }
	];
	console.table(allTimes);
};
export default class PerformanceTest extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: []
		};
	}
	render() {
		var data = new Array(10000).fill({
			1: parseInt(Math.random() * 10000000),
			2: parseInt(Math.random() * 10000000),
			3: parseInt(Math.random() * 10000000),
			4: parseInt(Math.random() * 10000000),
			5: parseInt(Math.random() * 10000000),
			6: parseInt(Math.random() * 10000000),
			7: parseInt(Math.random() * 10000000),
			8: parseInt(Math.random() * 10000000),
			9: parseInt(Math.random() * 10000000),
			10: parseInt(Math.random() * 10000000),
			11: parseInt(Math.random() * 10000000),
			12: parseInt(Math.random() * 10000000),
			13: parseInt(Math.random() * 10000000),
			14: parseInt(Math.random() * 10000000),
			15: parseInt(Math.random() * 10000000),
			16: parseInt(Math.random() * 10000000),
			17: parseInt(Math.random() * 10000000),
			18: parseInt(Math.random() * 10000000),
			19: parseInt(Math.random() * 10000000),
			20: parseInt(Math.random() * 10000000)
		});
		return (
			<div>
				<button
					onClick={() => {
						this.setState({
							data: []
						});
					}}
				>
					重新渲染
				</button>
				<table>
					<thead>
						<tr>
							<th>一</th>
							<th>二</th>
							<th>三</th>
							<th>四</th>
							<th>五</th>
							<th>六</th>
							<th>七</th>
							<th>八</th>
							<th>九</th>
							<th>十</th>
							<th>十一</th>
							<th>十二</th>
							<th>十三</th>
							<th>十四</th>
							<th>十五</th>
							<th>十六</th>
							<th>十七</th>
							<th>十八</th>
							<th>十九</th>
							<th>二十</th>
						</tr>
					</thead>
					<tbody>
						{data.map((e, i) => {
							return (
								<tr key={i}>
									<td>{e[1]}</td>
									<td>{e[2]}</td>
									<td>{e[3]}</td>
									<td>{e[4]}</td>
									<td>{e[5]}</td>
									<td>{e[6]}</td>
									<td>{e[7]}</td>
									<td>{e[8]}</td>
									<td>{e[9]}</td>
									<td>{e[10]}</td>
									<td>{e[11]}</td>
									<td>{e[12]}</td>
									<td>{e[13]}</td>
									<td>{e[14]}</td>
									<td>{e[15]}</td>
									<td>{e[16]}</td>
									<td>{e[17]}</td>
									<td>{e[18]}</td>
									<td>{e[19]}</td>
									<td>{e[20]}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
			// <Table data={this.state.data} colunms={columns} />
		);
	}
	componentDidMount() {
		times();
	}
}
