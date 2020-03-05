import React from 'react';

import SearchBar from './Component/SearchBar/SearchBar';

import ReactMapboxGl, {Layer, Feature} from 'react-mapbox-gl';

const Map = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoidGhlbmF0aGFuMzAiLCJhIjoiY2ozazU2MGtvMDAyYTJ3anZ1N21zY2preCJ9.FAwz_TGb' +
      'KlqROzSbx7qbww'
});

export default class App extends React.Component {

  render() {
    return (
      <div className="AppBlock">
        <SearchBar/>
        <Map
          style="mapbox://styles/mapbox/streets-v9"
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