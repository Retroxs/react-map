import React from 'react';

export function contentGen(data) {
    let {isOnline, temperature, humidity, flowOfStorage, pressureOfStorage, addUpFlow} = data;
    let c1 = `<div> <span class="content-label">环境温度:</span>${temperature || '--'}</div>`;
    let c2 = `<div> <span class="content-label">环境湿度:</span>${humidity || '--'}</div>`;
    let c3 = `<div> <span class="content-label">储罐出口流量:</span>${flowOfStorage || '--'}</div>`;
    let c4 = `<div> <span class="content-label">储罐压力:</span>${pressureOfStorage || '--'}</div>`;
    let c5 = `<div> <span class="content-label">累计流量:</span>${addUpFlow || '--'}</div>`;
    let c6 = `<div> <span class="content-label">在线状态:</span>${isOnline ? '在线' : '离线'}</div>`;

    return c6 + c1 + c2 + c3 + c4 + c4 + c5

}

export function contentGenJsx(data) {
    let {isOnline, temperature, humidity, flowOfStorage, pressureOfStorage, addUpFlow} = data;
    return <div>
        <div><span className="content-label">环境温度:</span>{temperature || '--'}</div>
        <div><span className="content-label">环境湿度:</span>{humidity || '--'}</div>
        <div><span className="content-label">储罐出口流量:</span>{flowOfStorage || '--'}</div>
        <div><span className="content-label">储罐压力:</span>{pressureOfStorage || '--'}</div>
        <div><span className="content-label">累计流量:</span>{addUpFlow || '--'}</div>
        <div><span className="content-label">在线状态:</span>{isOnline ? '在线' : '离线'}</div>
    </div>
}
