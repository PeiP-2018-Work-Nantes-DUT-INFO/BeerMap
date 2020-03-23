import React from 'react';
import { searchResult, search } from "../../API/Search";

import "./SearchBar.css"
import { Search, X } from 'react-feather';

import BeerResult from "./Result/BeerResult"
import BreweryResult from "./Result/BreweryResult"
import CategoryResult from "./Result/CategoryResult"
import CityResult from "./Result/CityResult"

export default class SearchBar extends React.Component {

	constructor(props) {
		super(props)
		/**
		 * Mise en place de l'état de l'objet, dès que l'état est modifié le composant sera rafraichi sur la page
		 * Value : Correspond à ce que la personne a écrit dans la search bar
		 */
		this.state = {
			result: [],
			value: ""
		}

		this.input = React.createRef()
		this.timer = null
	}

	componentDidMount() {
		// Recherche des villes, bières, brasseries et catégories correspondantes à ce que la personne recherche et mise à jour des informations affichées
		searchResult(data => {
			var city = Array.isArray(data.city) ? data.city.map(el => { el.type = "city"; return el }) : []
			var beer = Array.isArray(data.beer) ? data.beer.map(el => { el.type = "beer"; return el }) : []
			var brewery = Array.isArray(data.brewery) ? data.brewery.map(el => { el.type = "brewery"; return el }) : []
			var category = Array.isArray(data.category) ? data.category.map(el => { el.type = "category"; return el }) : []

			this.setState({ result: [...city, ...beer, ...brewery, ...category] })
		});
	}


	clear = _ => {
		// Remet à 0 la search bar
		this.setState({ value: "", result: [] })
	}

	onSearchChange = e => {
		// Quand l'input est modifié
		clearTimeout(this.timer) // Clear du timer
		//On met à jour la valeur de l'input
		this.setState({ value: e.target.value })
		// Si la valeur est supérieure à 4 caractères (pour éviter le spam de requêtes)
		if (e.target.value.length > 4) {
			// Mise à jour du timer et recherche des résultats
			this.timer = setTimeout(_ => {
				this.onSearch({ charCode: 13 })
			}, 500)
		}
	}

	onSearch = e => {
		// Quand l'utilisateur appuie sur entrée et que la valeur est supérieure à 4 caractères (pour éviter le spam de requêtes)
		if (e.charCode === 13 && this.input.current.value.length > 3) {
			// Ferme tous les blocks étant sur la carte
			this.props.closeBlock() // Fait appel a la fonction de index.js (Composant parent) 
			// Recherche effectuée
			search(this.input.current.value);
		}
	}

	onSearchResultClick = data => {
		// Remise à 0 de la search bar
		this.clear()
		// Affiche le panel correspondant à ce que l'utilisateur a cliqué
		this.props.onSearchResultClick(data)
	}

	render() {
		return (
			<div id="SearchBar">
				<div className="SearchBarInput">

					<input
						ref={this.input}
						value={this.state.value}
						onChange={this.onSearchChange}
						onKeyPress={this.onSearch}
						type="text"
						placeholder="Rechercher une bière, une brasserie, une ville, ..." />

					{this.state.value
						? <X onClick={this.clear} size={20} />
						: <Search onClick={_ => this.onSearch({ charCode: 13 })} size={20} />}

				</div>

				{
					this.state.result.map((item, i) => {
						switch (item.type) {
							case "city":
								return <CityResult onClick={this.onSearchResultClick} key={"res" + i} {...item} />
							case "beer":
								return <BeerResult onClick={this.onSearchResultClick} key={"res" + i} {...item} />
							case "brewery":
								return <BreweryResult onClick={this.onSearchResultClick} key={"res" + i} {...item} />
							case "category":
								return <CategoryResult onClick={this.onSearchResultClick} key={"res" + i} {...item} />
							default:
								return null
						}
					})
				}
			</div>
		)
	}
}