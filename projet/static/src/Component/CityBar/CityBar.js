import React from 'react';

import "./CityBar.css"

import Weather from "../../API/Weather"

import { X, Home, ChevronRight, Compass } from 'react-feather';

export default class CityBar extends React.Component {

	constructor(props) {
		super(props)
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
			hasSearched:false
		}
	}

	searchWeather = _ => {
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

	close = _ => {
		this.setState({ hidden: true })
	}

	open = ({ville}) => {

		if(ville !== undefined){
			this.setState({ ville: ville }, this.searchWeather)
		}

		this.setState({ hidden: false, hasSearched: true })
	}

	render() {
		return (
			<>
				<div id="CityBar" className={this.state.hidden && "hidden"}>
					<div className="CityBarTitle">
						<Compass size={25} />
						<span className="Title">{this.state.ville.address.split(",")[0]}</span>
						<X onClick={this.close} size={25} />
					</div>

					<h2>Météo</h2>

					<div className="Weather">
						<img src={this.state.weather.icon} alt="WeatherIcon"/>
						<div className="WeatherInfo">
							<div className="Temperature">{this.state.weather.temperature}°C</div>
							<div className="Title">{this.state.weather.description}</div>
						</div>
					</div>

					<h2>Brasserie</h2>

					<div className="Breweries">

						{this.state.breweries.map((brewerie, i) => {
							return(
								<a key={i} href={"#brewerie-"+brewerie.id} className="Brewerie">
									<div className="left">
										<Home size={25}/>
										{brewerie.name}
									</div>

									<ChevronRight size={24} />
								</a>
							)
						})}

					</div>

				</div>
				{	this.state.hasSearched ?
						<div id="OpenCityBar" onClick={this.open} className={this.state.hidden ? "" : "hidden"}>
							Afficher les informations sur la ville
						</div>
					: null
				}
				
			</>
    	)
	}
}