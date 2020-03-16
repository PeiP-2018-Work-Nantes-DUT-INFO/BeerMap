import React from 'react';
import { searchResult, search } from "../../API/Search";

import "./SearchBar.css"
import { Search, X, Droplet, Home, Compass } from 'react-feather';

function CityResult(props) {
	return (
		<a href={"#search" + props.name} onClick={_ => props.onClick(props)} className="SearchBarItem City">
			<Compass size={25} />
			<span className="SubTitle">Ville :</span>
			<span className="Value">{props.name}</span>
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
		<a href={"#search" + props.name} onClick={_ => props.onClick(props)} className="SearchBarItem Brewery">
			<Home size={25} />
			<span className="SubTitle">Brasserie :</span>
			<span className="Value">{props.name}</span>
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
			console.log("WEBSOCKET RESPONSE", data)

			var city = Array.isArray(data.city) ? data.city.map(el => { el.type = "city"; return el }) : []
			var beer = Array.isArray(data.beer) ? data.beer.map(el => { el.type = "beer"; return el }) : []
			var brewery = Array.isArray(data.brewery) ? data.brewery.map(el => { el.type = "brewery"; return el }) : []

			this.setState({result: [...city, ...beer, ...brewery] })

			console.log(this.state)

		});
	}


	clear = _ => {
		this.setState({ value: "", result: [] })
	}

	onSearchChange = e => {
		clearTimeout(this.timer)

		this.setState({ value: e.target.value })

		this.timer = setTimeout(_ => {
			this.onSearch({ charCode: 13 })
		}, 500)
	}

	onSearch = e => {
		if (e.charCode == 13) {
			search(this.input.current.value);
		}
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
									return <CityResult onClick={this.props.onSearch} key={"res" + i} {...item} />
									break;
								case "beer":
									return <BeerResult onClick={this.props.onSearch} key={"res" + i} {...item} />
									break;
								case "brewery":
									return <BreweryResult onClick={this.props.onSearch} key={"res" + i} {...item} />
									break;
							}
						})
				}
			</div>
		)
	}
}