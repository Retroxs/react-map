import styleJson from './map-config';

function getCenter() {
    const {ssApp, BMap, bMapInstance} = window;
    let geoCoder = new BMap.Geocoder();
    const point = bMapInstance.getCenter();
    geoCoder.getLocation(point, v => {
            let {province} = v.addressComponents;
            let {showType} = ssApp.state;
            if (showType === 'OVERVIEW') {
                ssApp.fetchOverview(province || 'xxx');
            }
            else if (showType === 'EFFECTIVE') {
                ssApp.fetchEffective(province || 'xxx')
            }
        }
    );
}

export const mapProps = {
    ak: 'MzVHyy4iZ6LVT8rqIYfpQQYHMRGwkzzU',
    // mapStyle: {styleJson},
    zoom: 5,
    // minZoom: 5,
    // maxZoom: 12,
    // mapClick: false,
    // doubleClickZoom: false,
    events: {
        zoomend: getCenter,
        moveend: getCenter,
        dragstart: e => console.log(e),
        touchstart: e => console.log(e),
        touchmove: e => console.log(e),
        touchend: e => console.log(e),
        longpress: e => console.log(e)
    }
};

export const navigationProps = {
    anchor: 'BMAP_ANCHOR_TOP_RIGHT',
    showZoomInfo:true
};

export const cityListProps = {
    offset: {width: 20, height: 20}
};

export const refreshProps = {
    anchor: 'BMAP_ANCHOR_BOTTOM_RIGHT',
    offset: {width: 20, height: 20}
};


export const infowindowProps = {
    offset: {width: 3, height: -3}, // 信息窗位置偏移值。
    width: 0, // 信息窗宽度，单位像素。取值范围：0, 220 - 730。如果您指定宽度为0，则信息窗口的宽度将按照其内容自动调整
    height: 0, // 信息窗高度，单位像素。取值范围：0, 60 - 650。如果您指定高度为0，则信息窗口的高度将按照其内容自动调整
    maxWidth: 250, // 信息窗最大化时的宽度，单位像素。取值范围：220 - 730
    autoPan: false, // 是否开启信息窗口打开时地图自动移动（默认开启）
    displayMessage: false // 是否在信息窗里显示短信发送按钮（默认开启）
};
