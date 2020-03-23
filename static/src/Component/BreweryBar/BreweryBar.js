import React from 'react';

import "./BreweryBar.css"

import Beer from '../../API/Beer';

import { X, Home, Droplet, ChevronRight } from 'react-feather';

export default class BreweryBar extends React.Component {

	constructor(props) {
		super(props)
		/**
		 * Mise en place de l'état de l'objet, dès que l'état est modifié le composant sera rafraichi sur la page
		 * Les autres éléments correspondent aux informations de la brasserie
		 */
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

	close = def => {
		// Ferme le panel de la brasserie
		this.setState({ hidden: true })

		if (def === true) {
			this.setState({ hasSearched: false })
		}
	}

	open = ({ info }) => {
		if (info !== undefined) { // Si les informations sont définies
			// Ouvre le panel de la brasserie et met à jour les informations affichées avec celles de la brasserie
			this.setState({
				bid: info.bid,
				name: info.breweries,
				address: info.address1 + " " + info.address2,
				city: (info.code ? info.code + " " : "") + info.city,
				state: info.state,
				country: info.country,
				phone: info.phone,
				website: info.website,
			}, _ => {
				Beer.findAllByBrewery(info.bid || info.id).then(beers => {
					this.setState({ beers })
				})
			})

		}
		// Affiche le panel
		this.setState({ hidden: false, hasSearched: true })
	}

	onBeerClick = beer => {
		// Affiche la modale de la bière
		this.props.onBeerClick(beer)
	}

	render() {
		return (
			<>
				<div id="BreweryBar" className={this.state.hidden ? "hidden" : null}>
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

						{Array.isArray(this.state.beers) && this.state.beers.map((beer, i) => {
							return (
								<a key={i} onClick={_ => this.onBeerClick(beer)} href={"#beer-" + beer.id} className="Beer">
									<div className="left">
										<Droplet size={25} />
										{beer.name}
									</div>

									<ChevronRight size={24} />
								</a>
							)
						})}

						{!Array.isArray(this.state.beers) || this.state.beers.length === 0 ?
							<div className="zero">Aucune bière trouvée.</div>
							: null
						}

					</div>

				</div>

				{this.state.hasSearched ?
					<div id="OpenBreweryBar" onClick={this.open} className={this.state.hidden ? "" : "hidden"}>
						Afficher les informations sur la brasserie
						</div>
					: null
				}

			</>
		)
	}
}