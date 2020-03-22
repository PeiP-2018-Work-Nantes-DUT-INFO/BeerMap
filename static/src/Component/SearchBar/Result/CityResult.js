import React from 'react';

import { Compass } from 'react-feather';

export default function CityResult(props) {
	return (
		<a href={"#search" + props.address} onClick={_ => props.onClick(props)} className="SearchBarItem City">
			<Compass size={25} />
			<span className="SubTitle">Ville :</span>
			<span className="Value">{props.address}</span>
		</a>
	)
}