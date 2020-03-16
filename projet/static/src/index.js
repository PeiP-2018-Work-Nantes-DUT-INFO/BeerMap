import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import SearchBar from './Component/SearchBar/SearchBar';
import CityBar from './Component/CityBar/CityBar';

import IP from './API/IP';
import Brewerie from './API/Brewerie';

import ReactMapboxGl, { Layer, Marker, Popup } from 'react-mapbox-gl';
import { search } from './API/Search';

const Map = ReactMapboxGl({
	accessToken: 'pk.eyJ1IjoidGhlbmF0aGFuMzAiLCJhIjoiY2ozazU2MGtvMDAyYTJ3anZ1N21zY2preCJ9.FAwz_TGb' +
		'KlqROzSbx7qbww'
});

class App extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			center: [0.0, 0.0],
			zoom: 11
		}

		this.map_ref = React.createRef()
	}

	componentDidMount() {
		IP.getIpLocation().then(data => {
			this.setMapCenter(data.lon, data.lat)
		}).catch(err => {
			console.error("Erreur lors de l'obtention de la position géographique du client")
		})
	}

	setMapCenter(lon, lat) {
		this.setState({ center: [lon, lat], zoom: 11 })
	}

	onSearchResultClick = search_val => {
		switch (search_val.type) {
			case "city":
				this.setMapCenter(search_val.location.x, search_val.location.y)
				break;
		}
	}

	render() {
		console.log(this.map_ref)
		return (
			<div className="AppBlock">

				<SearchBar onSearchResultClick={this.onSearchResultClick} />

				<CityBar />

				<Map
					style="mapbox://styles/mapbox/streets-v9"
					center={this.state.center}
					zoom={[this.state.zoom]}
					ref={this.map_ref}
					containerStyle={{
						display: "block",
						width: "100%",
						height: "100%"
					}}>
					<Popup
						coordinates={[-0.13235092163085938, 51.518250335096376]}
						offset={{
							'bottom-left': [12, -38], 'bottom': [0, -38], 'bottom-right': [-12, -38]
						}}>
						<h1>Popup</h1>
					</Popup>

					<Marker
						coordinates={[-0.2416815, 51.5285582]}
						anchor="bottom">
						<img src={"pin.png"} />
					</Marker>
				</Map>
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('root'));