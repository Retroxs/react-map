/** documentation
 * @link rc-bmap库: https://bmap.jser-club.com/guide/getting-started.html
 * @link 百度地图: http://lbsyun.baidu.com/index.php?title=jspopular3.0
 */
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { CityList, Map, Marker, MarkerClusterer, Navigation } from "rc-bmap";
import {
  cityListProps,
  mapProps,
  navigationProps,
  refreshProps
} from "./config/mapProps";
import { Dashboard, RefreshNavigation } from "./components";
import { fetchInfo, fetchMarkers } from "./lib/resolver";
import "./index.css";

class App extends Component {
  state = {
    points: [],
    point: {}
  };

  events(id) {
    return {
      click: async e => {
        // const {point} = e;
        let { data } = await fetchInfo(id);
        window.ssApp.setState({ index: 2, showType: "INFO", info: data || {} });
      }
    };
  }

  async fetchData() {
    const { region } = this.state;
    let { data } = await fetchMarkers(region);
    this.setState({ points: data || [] });
  }

  componentDidMount() {
    this.fetchData();
  }

  handleRefresh = () => {
    window.bMapInstance.setCenter("北京");
    window.bMapInstance.setZoom(10);
    this.fetchData();
  };

  render() {
    const { points } = this.state;
    return (
      <div className="app">
        <div className="map-view">
          <Map {...mapProps}>
            <Navigation {...navigationProps} />
            <CityList {...cityListProps} />
            <RefreshNavigation
              {...refreshProps}
              onRefresh={this.handleRefresh}
            />
            <MarkerClusterer>
              {points.map(point => (
                <Marker
                  key={point.id}
                  events={this.events(point.id)}
                  point={{ lng: point.lng, lat: point.lat }}
                />
              ))}
            </MarkerClusterer>
          </Map>
        </div>
        <Dashboard />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
