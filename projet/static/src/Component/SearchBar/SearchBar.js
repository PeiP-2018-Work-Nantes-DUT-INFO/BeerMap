import React from 'react';
import { searchResult, search } from "../../API/Search";

import "./SearchBar.css"
import { Search, X, Droplet, Home, Compass } from 'react-feather';

function CityResult(props) {
	return (
		<a href={"#search" + props.address} onClick={_ => props.onClick(props)} className="SearchBarItem City">
			<Compass size={25} />
			<span className="SubTitle">Ville :</span>
			<span className="Value">{props.address}</span>
		</a>
	)
}
function BeerResult(props) {
	return (
		<a href={"#search" + props.name} onClick={_ => props.onClick(props)} className="SearchBarItem Beer">
			<Droplet size={25} />
			<span className="SubTitle">Bière :</span>
			<span className="Value">{props.name}</span>
		</a>
	)
}
function BreweryResult(props) {
	return (
		<a href={"#search" + props.breweries} onClick={_ => props.onClick(props)} className="SearchBarItem Brewery">
			<Home size={25} />
			<span className="SubTitle">Brasserie :</span>
			<span className="Value">{props.breweries}</span>
		</a>
	)
}

function CategoryResult(props) {
	return (
		<a href={"#search" + props.cat_name} onClick={_ => props.onClick(props)} className="SearchBarItem Category">
			<Home size={25} />
			<span className="SubTitle">Catégorie :</span>
			<span className="Value">{props.cat_name}</span>
		</a>
	)
}

export default class SearchBar extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			result: [],
			value: ""
		}

		this.input = React.createRef()
		this.timer = null
	}

	componentDidMount() {
		searchResult(data => {

			console.log(data)

			var city = Array.isArray(data.city) ? data.city.map(el => { el.type = "city"; return el }) : []
			var beer = Array.isArray(data.beer) ? data.beer.map(el => { el.type = "beer"; return el }) : []
			var brewery = Array.isArray(data.brewery) ? data.brewery.map(el => { el.type = "brewery"; return el }) : []
			var category = Array.isArray(data.category) ? data.category.map(el => { el.type = "category"; return el }) : []

			this.setState({result: [...city, ...beer, ...brewery, ...category] })
		});
	}


	clear = _ => {
		this.setState({ value: "", result: [] })
	}

	onSearchChange = e => {
		clearTimeout(this.timer)

		this.setState({ value: e.target.value })

		if(e.target.value.length > 4) {
			this.timer = setTimeout(_ => {
				this.onSearch({ charCode: 13 })
			}, 500)
		}
	}

	onSearch = e => {
		if (e.charCode === 13 && this.input.current.value.length > 4) {

			this.props.closeCity()

			search(this.input.current.value);
		}
	}

	onSearchResultClick = data => {

		this.clear()

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
					this.state.result
						.map((item, i) => {
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