import React from 'react';

import { Droplet } from 'react-feather';

export default function BeerResult(props) {
	return (
		<a href={"#search" + props.name} onClick={_ => props.onClick(props)} className="SearchBarItem Beer">
			<Droplet size={25} />
			<span className="SubTitle">Bière :</span>
			<span className="Value">{props.name}</span>
		</a>
	)
}