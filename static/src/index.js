import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import SearchBar from './Component/SearchBar/SearchBar';
import CityBar from './Component/CityBar/CityBar';
import BreweryBar from './Component/BreweryBar/BreweryBar';
import CategoryBar from './Component/CategoryBar/CategoryBar';
import BeerCard from './Component/BeerCard/BeerCard';

import Brewerie from './API/Brewerie';

import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';

const Map = ReactMapboxGl({
	accessToken: 'pk.eyJ1IjoidGhlbmF0aGFuMzAiLCJhIjoiY2ozazU2MGtvMDAyYTJ3anZ1N21zY2preCJ9.FAwz_TGbKlqROzSbx7qbww'
});

class App extends React.Component {

	constructor(props) {
		super(props)

		// Modèle de donnée utilisé pour ce composant
		// Par défaut, la carte est centrée sur la France
		this.state = {
			center: [2, 47],
			zoom: 5,
			brewerie: []
		}

		// Référence utilisée pour faire appel au fonction des composants
		this.CityBar = React.createRef()
		this.BreweryBar = React.createRef()
		this.CategoryBar = React.createRef()
		this.BeerCard = React.createRef()
	}

	componentDidMount() {
		// Lorsque ce composant est pret, on récupère toutes les brasseries disponible est on les affiches
		Brewerie.findAll().then(data => {
			this.setState({ brewerie: data.slice(1) })
		}).catch(err => {
			console.error(err)
		})
	}

	// Méthode permettant de centrer la carte sur un point géographique
	setMapCenter = (lon, lat) => {
		this.setState({ center: [lon, lat], zoom: 11 })
	}

	// Méthode appelé lorsqu'il y a une recherche
	// Elle est passé en propriété pour la SearchBar
	onSearchResultClick = search_val => {
		switch (search_val.type) {
			case "city":
				this.CityBar.current.open({ ville: search_val })
				this.setMapCenter(search_val.location.x, search_val.location.y)
				break;
			case "category":
				this.CategoryBar.current.open({ info: search_val });
				break;
			case "brewery":
				this.onBreweryClick(search_val);
				break;
			case "beer":
				this.onBeerClick(search_val)
			default:
				console.log(search_val.type)
		}
	}

	// Méthode permettant de fermer tous les blocs ouvert ainsi que les barres pour reouvrir les blocs
	closeBlock = _ => {
		this.CityBar.current.close(true)
		this.CategoryBar.current.close(true)
		this.BreweryBar.current.close(true)
	}

	// Méthode permettant d'ouvrir le bloc Brasserie, Ville, et de centrer la carte
	onBreweryClick = props => {

		// On récupère les informations
		const info = (props.feature && props.feature.properties) || props;

		// On parse les coordonnées et on centre la carte
		const [y, x] = info.coordinates.split(",");
		this.setMapCenter(x, y);

		// On construit l'objet représentant une ville
		const ville = {
			location: {
				x: x,
				y: y
			},
			address: info.city
		}

		// On affiche le bloc Brasserie
		this.BreweryBar.current.open({ info });

		// On affiche le bloc ville
		this.CityBar.current.open({ ville });
	}

	// Méthode permettant d'ouvrir le modale d'une bière
	onBeerClick = beer => {
		this.BeerCard.current.open(beer)
	}

	// Méthode permettant le rendu
	render() {
		return (
			<>
				<SearchBar closeBlock={this.closeBlock} onBeerClick={this.onBeerClick} onSearchResultClick={this.onSearchResultClick} />

				<CityBar ref={this.CityBar} onBreweryClick={this.onBreweryClick} />

				<BreweryBar ref={this.BreweryBar} onBeerClick={this.onBeerClick} />

				<CategoryBar ref={this.CategoryBar} onBeerClick={this.onBeerClick} />

				<BeerCard ref={this.BeerCard} onBreweryClick={this.onBreweryClick} />

				<Map
					style="mapbox://styles/mapbox/streets-v9"
					center={this.state.center}
					zoom={[this.state.zoom]}>

					<Layer
						type="symbol"
						layout={{ "icon-image": "beer-15" }}>

						{/* Boucle pour afficher tous les icones de bière qui représente les brasseries */}
						{this.state.brewerie.map((el, i) => {
							return <Feature key={i} onClick={this.onBreweryClick} properties={el} coordinates={[el.coordinates.split(",")[1], el.coordinates.split(",")[0]]} />
						})}

					</Layer>

				</Map>
			</>
		)
	}
}

// On fais le rendu de l'application dans la div#BeerMap
ReactDOM.render(<App />, document.getElementById('BeerMap'));