import React from 'react';

import { Hexagon } from 'react-feather';

export default function CategoryResult(props) {
	return (
		<a href={"#search" + props.cat_name} onClick={_ => props.onClick(props)} className="SearchBarItem Category">
			<Hexagon size={25} />
			<span className="SubTitle">Catégorie :</span>
			<span className="Value">{props.cat_name}</span>
		</a>
	)
}