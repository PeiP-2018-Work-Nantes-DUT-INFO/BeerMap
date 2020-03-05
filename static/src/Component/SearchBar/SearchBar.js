import React from 'react';

import "./SearchBar.css"

export default class SearchBar extends React.Component {

  render() {
    return (
      <div id="SearchBar">
        
        <input type="text" placeholder="Rechercher un biere, une brasserie, une ville, ..." />

      </div>
    )
  }
}