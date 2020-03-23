import React from 'react';

import "./CityBar.css"

import Weather from "../../API/Weather"
import Brewerie from '../../API/Brewerie';

import { X, Home, ChevronRight, Compass } from 'react-feather';

export default class CityBar extends React.Component {

	constructor(props) {
		super(props)
		/**
		 * Mise en place de l'état de l'objet, dès que l'état est modifié le composant sera rafraichi sur la page
		 * Les autres éléments correspondent aux informations de la ville
		 */
		this.state = {
			hidden: true,
			ville: {
				address: "",
				location: {
					x: 4,
					y: 44
				}
			},
			breweries: [],
			weather: {
				icon: ""
			},
			hasSearched: false
		}

	}

	searchWeather = _ => {
		// Recherche de la météo de la ville et mise à jour des informations affichées
		Weather
			.searchByGeoCord(this.state.ville.location.x, this.state.ville.location.y)
			.then(data => {
				this.setState({
					weather: {
						icon: "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png",
						temperature: data.main.temp,
						description: data.weather[0].description
					}
				})
			})
	}

	close = def => {
		// Ferme le panel
		this.setState({ hidden: true })

		if (def === true) {
			this.setState({ hasSearched: false })
		}
	}

	open = ({ ville }) => {

		if (ville !== undefined) { // Si les informations sur la ville sont existantes
			// Mise à jour des informations affichées par celles de la ville et recherche de la météo
			this.setState({ ville: ville }, _ => {
				Brewerie.findAllByCity(this.state.ville.address.split(",")[0]).then(data => {
					this.setState({ breweries: (Array.isArray(data) && data) || [] })
				})
				this.searchWeather()
			})
		}
		// Ouverture du panel
		this.setState({ hidden: false, hasSearched: true })
	}

	onBreweryClick = brewery => {
		// Si la personne clique sur une des brasseries affichées dans le panel, affichage des informations de la brasserie
		this.props.onBreweryClick(brewery)
	}

	render() {
		return (
			<>
				<div id="CityBar" className={this.state.hidden ? "hidden" : null}>
					<div className="CityBarTitle">
						<Compass size={25} />
						<span className="Title">{this.state.ville.address.split(",")[0]}</span>
						<X onClick={this.close} size={25} />
					</div>

					<h2>Météo</h2>

					<div className="Weather">
						<img src={this.state.weather.icon} alt="WeatherIcon" />
						<div className="WeatherInfo">
							<div className="Temperature">{this.state.weather.temperature}°C</div>
							<div className="Title">{this.state.weather.description}</div>
						</div>
					</div>

					<h2>Brasserie</h2>

					<div className="Breweries">

						{this.state.breweries.map((brewery, i) => {
							return (
								<a key={i} onClick={() => this.onBreweryClick(brewery)} href={"#brewery-" + brewery.id} className="Brewerie">

									<div className="left">
										<Home size={25} />
										{brewery.breweries}
									</div>

									<ChevronRight size={24} />
								</a>
							)
						})}

						{this.state.breweries.length === 0 ?
							<div className="zero">Aucune brasserie trouvée.</div>
							: null
						}

					</div>

				</div>
				{this.state.hasSearched ?
					<div id="OpenCityBar" onClick={this.open} className={this.state.hidden ? "" : "hidden"}>
						Afficher les informations sur la ville
						</div>
					: null
				}

			</>
		)
	}
}