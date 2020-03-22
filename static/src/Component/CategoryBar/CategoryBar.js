import React from 'react';

import "./CategoryBar.css"

import Beer from '../../API/Beer';

import { X, Hexagon, Droplet, ChevronRight } from 'react-feather';

export default class CategoryBar extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			hidden: true,
			name: "",
			beers: []
		}
	}

	close = def => {
		this.setState({ hidden: true })
	
		if(def === true){
			this.setState({ hasSearched: false })
		}
	}

	open = ({info}) => {

		if(info !== undefined){
			console.log(info)
			this.setState({
				name: info.cat_name,
			}, _ => {
				Beer.findAllByCategory(info.id).then(beers=> {
					this.setState({beers})
					console.log(beers)
				})
			})
		}

		this.setState({ hidden: false })
	}

	render() {
		return (
			<>
				<div id="CategoryBar" className={this.state.hidden ? "hidden":null}>
					<div className="CategoryBarTitle">
						<Hexagon size={25} />
						<span className="Title">{this.state.name}</span>
						<X onClick={this.close} size={25} />
					</div>

					<h2>Bière</h2>

					<div className="Beers">

						{Array.isArray(this.state.beers) && this.state.beers.map((beer, i) => {
							return(
								<a key={i} onClick={_ => this.props.onBeerClick(beer)} href={"#beer"+beer.id} className="Beer">
									<div className="left">
										<Droplet size={25}/>
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