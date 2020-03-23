import React from 'react';

import "./CategoryBar.css"

import Beer from '../../API/Beer';

import { X, Hexagon, Droplet, ChevronRight } from 'react-feather';

export default class CategoryBar extends React.Component {

	constructor(props) {
		super(props)
		/**
		 * Mise en place de l'état de l'objet, dès que l'état est modifié le composant sera rafraichi sur la page
		 * Les autres éléments correspondent aux informations de la catégorie
		 */
		this.state = {
			hidden: true,
			name: "",
			beers: []
		}
	}

	close = def => {
		// Ferme le panel
		this.setState({ hidden: true })

		if (def === true) {
			// Ferme la barre sur le côté
			this.setState({ hasSearched: false })
		}
	}

	open = ({ info }) => {

		if (info !== undefined) { // Si les informations de la catégories existent
			// Mise à jour des informations affichées par celles de la catégorie
			this.setState({
				name: info.cat_name,
			}, _ => {
				Beer.findAllByCategory(info.id).then(beers => {
					this.setState({ beers })
					console.log(beers)
				})
			})
		}
		// Ouverture du panel
		this.setState({ hidden: false })
	}

	render() {
		return (
			<>
				<div id="CategoryBar" className={this.state.hidden ? "hidden" : null}>
					<div className="CategoryBarTitle">
						<Hexagon size={25} />
						<span className="Title">{this.state.name}</span>
						<X onClick={this.close} size={25} />
					</div>

					<h2>Bière</h2>

					<div className="Beers">

						{Array.isArray(this.state.beers) && this.state.beers.map((beer, i) => {
							return (
								<a key={i} onClick={_ => this.props.onBeerClick(beer)} href={"#beer" + beer.id} className="Beer">
									<div className="left">
										<Droplet size={25} />
										{beer.name}
									</div>

									<ChevronRight size={24} />
								</a>
							)
						})}

						{Array.isArray(this.state.beers) == false || this.state.beers.length === 0 ?
							<div className="zero">Aucune bière trouvée.</div>
							: null
						}

					</div>

				</div>

			</>
		)
	}
}