import React from 'react';

import "./CategoryBar.css"

import Beer from '../../API/Beer';

import { X, Home, Droplet, ChevronRight } from 'react-feather';

export default class CategoryBar extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			hidden: true,
			name: "",
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
				name: info.cat_name,
			}, _ => {
				Beer.findAllByCategory(info.cat_name).then(beers=> {
					this.setState({beers})
				})
			})
		}

		this.setState({ hidden: false, hasSearched: true })
	}

	render() {
		return (
			<>
				<div id="CategoryBar" className={this.state.hidden ? "hidden":null}>
					<div className="CategoryBarTitle">
						<Home size={25} />
						<span className="Title">{this.state.name}</span>
						<X onClick={this.close} size={25} />
					</div>

					<h2>Bière</h2>

					<div className="Beers">

						{this.state.beers.map((beer, i) => {
							return(
								<a key={i} href={"#beer"+beer.id} className="Beer">
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
						<div id="OpenCategoryBar" onClick={this.open} className={this.state.hidden ? "" : "hidden"}>
							Afficher les informations sur la catégorie
						</div>
					: null
				}
				
			</>
    	)
	}
}