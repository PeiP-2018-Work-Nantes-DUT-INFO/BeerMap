import React from 'react';

import { Home } from 'react-feather';

export default function BreweryResult(props) {
	return (
		<a href={"#search" + props.breweries} onClick={_ => props.onClick(props)} className="SearchBarItem Brewery">
			<Home size={25} />
			<span className="SubTitle">Brasserie :</span>
			<span className="Value">{props.breweries}</span>
		</a>
	)
}