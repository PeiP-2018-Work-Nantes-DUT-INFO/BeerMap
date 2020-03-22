import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import SearchBar from './Component/SearchBar/SearchBar';
import CityBar from './Component/CityBar/CityBar';
import BreweryBar from './Component/BreweryBar/BreweryBar';
import CategoryBar from './Component/CategoryBar/CategoryBar';

import Brewerie from './API/Brewerie';

import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';

const Map = ReactMapboxGl({
	accessToken: 'pk.eyJ1IjoidGhlbmF0aGFuMzAiLCJhIjoiY2ozazU2MGtvMDAyYTJ3anZ1N21zY2preCJ9.FAwz_TGbKlqROzSbx7qbww'
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
		this.BreweryBar = React.createRef()
		this.CategoryBar = React.createRef()
	}

	componentDidMount() {
		Brewerie.findAll().then(data => {
			this.setState({brewerie: data.slice(1)})
		}).catch(err => {
			console.error(err)
		})
	}

	setMapCenter = (lon, lat) => {
		this.setState({ center: [lon, lat], zoom: 11 })
	}

	onSearchResultClick = search_val => {

		switch (search_val.type) {
			case "city":
				this.CityBar.current.open({ville: search_val})
				this.setMapCenter(search_val.location.x, search_val.location.y)
				break;
			case "category":
				this.CategoryBar.current.open({info: search_val});
				break;
			case "brewery":
				this.BreweryBar.current.open({info: search_val});
				break;
			default:
				console.log(search_val.type)
		}
	}

	closeBlock = _ => {
		this.CityBar.current.close()
		this.CategoryBar.current.close()
		this.BreweryBar.current.close()
	}

	onBreweryClick = props => {
		const info = (props.feature && props.feature.properties) || props;

		const [y, x] = info.coordinates.split(",");

		this.setMapCenter(x, y);

		const ville = {
			location: {
				x: x,
				y: y
			},
			address: info.city
		}

		this.BreweryBar.current.open({info});

		this.CityBar.current.open({ville});
	}

	render() {
		return (
			<div className="AppBlock">

				<SearchBar closeBlock={this.closeBlock} onSearchResultClick={this.onSearchResultClick} />

				<CityBar ref={this.CityBar} onBreweryClick={this.onBreweryClick} />

				<BreweryBar ref={this.BreweryBar} />

				<CategoryBar ref={this.CategoryBar} />

				<Map
					style="mapbox://styles/mapbox/streets-v9"
					center={this.state.center}
					zoom={[this.state.zoom]}
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