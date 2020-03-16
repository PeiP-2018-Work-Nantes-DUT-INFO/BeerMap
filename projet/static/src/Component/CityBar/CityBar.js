import React from 'react';

import "./CityBar.css"

import Weather from "../../API/Weather"

import { Search, X, Droplet, Home, ChevronRight, Compass } from 'react-feather';

export default class CityBar extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			hidden: false,
			breweries: [
				{
					id: "1",
					name: "La taverne"
				},
				{
					id: "2",
					name: "Conclave"
				},
				{
					id: "3",
					name: "Un nom"
				},
				{
					id: "3",
					name: "Un nom"
				},
				{
					id: "3",
					name: "Un nom"
				},
				{
					id: "3",
					name: "Un nom"
				},
				{
					id: "3",
					name: "Un nom"
				},
				{
					id: "3",
					name: "Un nom"
				},
				{
					id: "3",
					name: "Un nom"
				}
			],
			weather: {
				icon: ""
			}
		}
	}

	componentDidMount() {
		Weather
			.searchByGeoCord(44.1333, 4.0833)
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

	open = _ => {
		this.setState({ hidden: false })
	}

	render() {
		return (
			<>
				<div id="CityBar" className={this.state.hidden && "hidden"}>
					<div className="CityBarTitle">
						<Compass size={25} />
						<span className="Title">Ales</span>
						<X onClick={this.close} size={25} />
					</div>

					<h2>Météo</h2>

					<div className="Weather">
						<img src={this.state.weather.icon} />
						<div className="WeatherInfo">
							<div className="Temperature">{this.state.weather.temperature}°C</div>
							<div className="Title">{this.state.weather.description}</div>
						</div>
					</div>

					<h2>Brasserie</h2>

					<div className="Breweries">

						{this.state.breweries.map(brewerie => {
							return(
								<a href={"#brewerie-"+brewerie.id} className="Brewerie">
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
				<div id="OpenCityBar" onClick={this.open} className={(!this.state.hidden) && "hidden"}>
					Afficher les informations
				</div>
			</>
    	)
	}
}