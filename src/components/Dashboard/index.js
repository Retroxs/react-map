import React, {Component} from 'react';
import classnames from 'classnames'
import {Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis} from 'recharts';
import {fetchEffective, fetchOverview} from '../../lib/resolver';

function _safeData(obj = {}) {
    const keys = Object.keys(obj);
    keys.forEach(key => {
        if (obj[key] === 0) obj[key] = '0'
    });
    return obj
}

const ShowType = {
    INFO: 'INFO',
    OVERVIEW: 'OVERVIEW',
    EFFECTIVE: 'EFFECTIVE'
};

function barChart(type, data) {
    return <div>
        <h2 className="bar-title">{type}</h2>
       <BarChart width={600} height={200} data={data}>
             <CartesianGrid strokeDasharray="3 3"/>
            <XAxis/>
            <YAxis/>
            <Bar dataKey='effective' fill='#8884d8' maxBarSize={30}/>
        </BarChart>
    </div>
}

function block(type, props) {
    const {info, overview, effective} = props;
    const ccc = [{runtime:"",oxygenConcentration:""}];
    if (type === ShowType.INFO) {
        let {
            name, position, isOnline, temperature, humidity, flowOfStorage,
            pressureOfStorage, addUpFlow, crewDatas = ccc, instantFlows = []
        } = info;
        return <div>
            <div><span className="content-label">名称:</span>{name || '--'}</div>
            <div><span className="content-label">位置:</span>{position || '--'}</div>
            <div><span className="content-label">在线状态:</span>{isOnline ? '在线' : '离线'}</div>
            <div><span className="content-label">环境温度:</span>{temperature || '--'}</div>
            <div><span className="content-label">环境湿度:</span>{humidity || '--'}</div>
            <div><span className="content-label">储罐出口流量:</span>{flowOfStorage || '--'}</div>
            <div><span className="content-label">储罐压力:</span>{pressureOfStorage || '--'}</div>
            <div><span className="content-label">累计流量:</span>{addUpFlow || '--'}</div>
            {
                crewDatas.map((crew,index) => <div>
                    <h3>机组{index+1}数据</h3>
                    <div><span className="content-label">运行时间:</span>{crew.runtime || '--'}</div>
                    <div><span className="content-label">氧气浓度:</span>{crew.oxygenConcentration || '--'}</div>
                </div>)
            }
            <h3>瞬时流量24小时曲线图</h3>
            <LineChart width={600} height={200} data={instantFlows}>
                <XAxis dataKey="hour"/>
                <YAxis/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Line type="monotone" dataKey="flow" stroke="#8884d8"/>
            </LineChart>
        </div>
    }
    else if (type === ShowType.OVERVIEW) {
        let {total, crewTotal, addUpFlowTotal} = overview;
        return <div>
            <div><span className="content-label">总安装制氧机站数量:</span>{total || '--'}</div>
            <div><span className="content-label">安装制氧机总台数:</span>{crewTotal || '--'}</div>
            <div><span className="content-label">总制氧机累计流量总数量:</span>{addUpFlowTotal || '--'}</div>
        </div>
    }
    else if (type === ShowType.EFFECTIVE) {
        const {days = [], months = [], years = []} = effective;
        return <div>
            {barChart('日产氧有效率', days)}
            {barChart('月产氧有效率', months)}
            {barChart('年产氧有效率', years)}
        </div>

    }
}

class Dashboard extends Component {
    state = {
        showType: ShowType.OVERVIEW,
        index:1,
        region: '',
        info: {},
        overview: {},
        effective: {}
    };


    fetchOverview = async (region = '') => {
        if (region) this.setState({region});
        let {data} = await fetchOverview(this.state.region);
        this.setState({index:1,overview: _safeData(data) || {}});
    };

    fetchEffective = async (region = '') => {
        if (region) this.setState({region});
        let {data} = await fetchEffective(this.state.region);
        this.setState({index:1,effective: _safeData(data) || {}})
    };


    changeType = showType => {
        if (showType === ShowType.OVERVIEW) {
            this.fetchOverview()
        }
        else if (showType === ShowType.EFFECTIVE) {
            this.fetchEffective()
        }
        this.setState({showType})
    };

    componentDidMount() {
        window.ssApp = this;
    }

    render() {
        const p = this.state;
        const {showType,index} = this.state;
        const data = [
            {name: 'Page A', uv: 4000, hour: 1, amt: 2400},
            {name: 'Page B', uv: 3000, hour: 2, amt: 2210},
            {name: 'Page C', uv: 2000, hour: 3, amt: 2290},
            {name: 'Page D', uv: 2780,hour: 4, amt: 2000},
            {name: 'Page E', uv: 1890, hour: 5, amt: 2181},
            {name: 'Page F', uv: 2390, hour: 6, amt: 2500},
            {name: 'Page G', uv: 3490, hour: 7, amt: 2100},
        ];
        if(index === 1){
            return (
                <div className="data-view">
                    <div>
                        <button className={classnames("action-button",{'red':showType === ShowType.OVERVIEW})}
                                onClick={() => this.changeType(ShowType.OVERVIEW)}>概览
                        </button>
                        <button className={classnames("action-button",{'red':showType === ShowType.EFFECTIVE})}
                                onClick={() => this.changeType(ShowType.EFFECTIVE)}>产氧有效率
                        </button>
                    </div>
                    {block(showType, p)}
                </div>
            );
        }
        else if(index === 2){
            return (
                <div className="data-view">
                    <button className={classnames("action-button")}
                            onClick={() => this.changeType(ShowType.OVERVIEW)}>返回
                    </button>
                    {block(showType,p)}
                </div>
            );
        }

    }
}

export default Dashboard;
