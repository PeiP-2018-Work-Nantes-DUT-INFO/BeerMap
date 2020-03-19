import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import SearchBar from './Component/SearchBar/SearchBar';
import CityBar from './Component/CityBar/CityBar';

import Brewerie from './API/Brewerie';

import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';

const Map = ReactMapboxGl({
	accessToken: 'pk.eyJ1IjoidGhlbmF0aGFuMzAiLCJhIjoiY2ozazU2MGtvMDAyYTJ3anZ1N21zY2preCJ9.FAwz_TGb' +
		'KlqROzSbx7qbww'
});

class App extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			center: [2, 47],
			zoom: 5,
			brewerie: []
		}

		this.CityBar = React.createRef()
		this.map_ref = React.createRef()
	}

	componentDidMount() {
		Brewerie.findAll().then(data => {
			this.setState({brewerie: data.slice(1)})
		}).catch(err => {
			console.error(err)
		})
	}

	setMapCenter(lon, lat) {
		this.setState({ center: [lon, lat], zoom: 11 })
		this.forceUpdate()
	}

	onSearchResultClick = search_val => {
		this.CityBar.current.open({ville: search_val})

		switch (search_val.type) {
			case "city":
				this.setMapCenter(search_val.location.x, search_val.location.y)
				break;
			default:
				console.log(search_val.type)
		}
	}

	closeCity = _ => {
		this.CityBar.current.close()
	}


	onBreweryClick = props => {
		let properties = props.feature.properties;
		let id = properties.bid;
		let coordinates = properties.coordinates;
		console.log(props)
	}

	render() {
		return (
			<div className="AppBlock">

				<SearchBar closeCity={this.closeCity} onSearchResultClick={this.onSearchResultClick} />

				<CityBar ref={this.CityBar} />

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

					<Layer
						type="symbol"
						layout={{ "icon-image": "beer-15" }}>

							{this.state.brewerie.map((el, i) => {
								return <Feature key={i} onClick={this.onBreweryClick} properties={el} coordinates={[el.coordinates.split(",")[1], el.coordinates.split(",")[0]]}  />
							})}

					</Layer>
					
				</Map>
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('root'));