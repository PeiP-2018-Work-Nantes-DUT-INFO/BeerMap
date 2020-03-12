import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import SearchBar from './Component/SearchBar/SearchBar';
import CityBar from './Component/CityBar/CityBar';

import IP from './API/IP';

import ReactMapboxGl, {Layer, Feature} from 'react-mapbox-gl';

const Map = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoidGhlbmF0aGFuMzAiLCJhIjoiY2ozazU2MGtvMDAyYTJ3anZ1N21zY2preCJ9.FAwz_TGb' +
      'KlqROzSbx7qbww'
});

class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      center: [0.0, 0.0]
    }
  }

  componentDidMount(){
    IP.getIpLocation().then(data => {
      this.setMapCenter(data.lon, data.lat)
    })
  }

  setMapCenter(lon, lat) {
	this.setState({center: [lon, lat]})
  }

  onSearch = (city) => {

	console.log(city)
	this.setMapCenter(city.center.lon, city.center.lat)

  }

  render() {
    return (
      <div className="AppBlock">

        <SearchBar onSearch={this.onSearch} />

        <CityBar/>

        <Map
          style="mapbox://styles/mapbox/streets-v9"
          center={this.state.center}
          containerStyle={{
          display: "block",
          width: "100%",
          height: "100%"
        }}>
          <Layer
            type="symbol"
            id="marker"
            layout={{
            'icon-image': 'marker-15'
          }}>
            <Feature coordinates={[-0.481747846041145, 51.3233379650232]}/>
          </Layer>
        </Map>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));