import React from 'react';

import "./BeerCard.css"

import Brewerie from '../../API/Brewerie';

import { X, Droplet } from 'react-feather';

export default class BeerCard extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
            hidden: true,
            name: "BeerCard"
		}
	}

	close = _ => {
		this.setState({ hidden: true })
	}

	open = (beer) => {
        console.log(beer)
        this.setState({ hidden: false, ...beer }, _ => {
            Brewerie.findById(beer.brewery_id).then(b => {
                this.setState({brasserie: b})
            })
        })
    }
    
    openBrasserie = _ => {
        this.close()
        this.props.onBreweryClick(this.state.brasserie)
    }

	render() {
		return (
            <div id="BeerCard" className={this.state.hidden ? "hidden" : null}>
                <div className="inside">
                    <div className="top">
                        <div className="left">
                            <Droplet size={25} />
                            <div className="Title">
                                {this.state.name}
                            </div>
                        </div>
                        <X onClick={this.close} size={25} />
                    </div>

                    <div className="main">

                        <div className="image">
                            <img src={this.state.filepath || "beer.png"} />
                        </div>

                        <div className="info">
                            <div className="line"><span className="title">Nom :</span>{this.state.name}</div>
                            <div className="line link" onClick={this.openBrasserie} ><span className="title">Brasserie :</span>{this.state.brewer}</div>

                            {this.state.alcohol_by_volume ? 
                                <div className="line"><span className="title">Alc / Vol :</span>{this.state.alcohol_by_volume}</div>
                            : null}
                            
                            {this.state.style ? 
                                <div className="line"><span className="title">Style :</span>{this.state.style}</div>
                            : null}
                            
                            {this.state.category ? 
                                <div className="line"><span className="title">Catégorie :</span>{this.state.category}</div>
                            : null}

                            {this.state.description ? 
                                <div className="line"><span className="title">Description :</span>{this.state.description}</div>
                            : null}

                            <div className="line"><span className="title">Ville :</span>{this.state.city}, {this.state.state}, {this.state.country}</div>
                        </div>

                    </div>

                </div>
            </div>
    	)
	}
}