import React from 'react';

import "./BreweryBar.css"

import Beer from '../../API/Beer';

import { X, Home, Droplet, ChevronRight } from 'react-feather';

export default class BreweryBar extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			hidden: true,
			name: "",
			address: "",
			city: "",
			state: "",
			country: "",
			phone: "",
			website: "",
			bid: -1,
			beers: [],
			hasSearched: false
		}
	}

	close = _ => {
		this.setState({ hidden: true })
	}

	open = ({info}) => {

		if(info !== undefined){

			this.setState({
				bid: info.id,
				name: info.breweries,
				address: info.address1 + " " + info.address2,
				city: (info.code ? info.code + " " : "") + info.city,
				state: info.state,
				country: info.country,
				phone: info.phone,
				website: info.website,
			}, _ => {
				Beer.findAllByBrewery(info.id).then(beers=> {
					this.setState({beers})
				})
			})
		}

		this.setState({ hidden: false, hasSearched: true })
	}

	render() {
		return (
			<>
				<div id="BreweryBar" className={this.state.hidden ? "hidden":null}>
					<div className="BreweryBarTitle">
						<Home size={25} />
						<span className="Title">{this.state.name}</span>
						<X onClick={this.close} size={25} />
					</div>

					<h2>Information</h2>	

					<div className="Info">
						<strong>Adresse :</strong>{this.state.address}
					</div>
					<div className="Info">
						<strong>Ville :</strong> {this.state.city}
					</div>

					{this.state.state !== "" ? 
						<div className="Info">
							<strong>État :</strong> {this.state.state}
						</div>
					: null}

					<div className="Info">
						<strong>Pays :</strong> {this.state.country}
					</div>
					<div className="Info">
						<strong>Téléphone :</strong> {this.state.phone}
					</div>

					{this.state.website !== "" ? 
						<div className="Info">
							<strong>Site web :</strong><a href={this.state.website} rel="noopener noreferrer" target="_blank">{this.state.website}</a>
						</div>
					: null}

					<h2>Bière</h2>

					<div className="Beers">

						{this.state.beers.map((beer, i) => {
							return(
								<a key={i} href={"#brewerie-"+beer.id} className="Beer">
									<div className="left">
										<Droplet size={25}/>
										{beer.name}
									</div>

									<ChevronRight size={24} />
								</a>
							)
						})}

						{this.state.beers.length === 0 ?
							<div className="zero">Aucune bière trouvée.</div>
							: null
						}

					</div>

				</div>
				{	this.state.hasSearched ?
						<div id="OpenBreweryBar" onClick={this.open} className={this.state.hidden ? "" : "hidden"}>
							Afficher les informations sur la brasserie
						</div>
					: null
				}
				
			</>
    	)
	}
}