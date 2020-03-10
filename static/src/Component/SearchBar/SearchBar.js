import React from 'react';

import "./SearchBar.css"
import {Search, X, Droplet, Home, Compass} from 'react-feather';

import Map from "../../API/Map"

function CityResult(props) {
  return (
    <a href={"#search" + props.name} className="SearchBarItem City">
      <Compass size={25}/>
      <span className="SubTitle">Ville :</span>
      <span className="Value">{props.name}</span>
    </a>
  )
}
function BeerResult(props) {
  return (
    <a href={"#search" + props.name} className="SearchBarItem Beer">
      <Droplet size={25}/>
      <span className="SubTitle">Bière :</span>
      <span className="Value">{props.name}</span>
    </a>
  )
}
function BreweryResult(props) {
  return (
    <a href={"#search" + props.name} className="SearchBarItem Brewery">
      <Home size={25}/>
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

  clear = _ => {
    this.setState({value: "", result:[]})
  }

  onSearchChange = e => {
    clearTimeout(this.timer)

    this.setState({value: e.target.value})

    this.timer = setTimeout(_ => {
      this.onSearch({charCode: 13})
    }, 500)
  }

  onSearch = e => {
    if (e.charCode == 13) {

      const search = this.input.current.value

      // TODO: APPEL API
      console.log("Search : ", search)

      Map.searchByName(search).then(d => {
        console.log(d)
      }).catch(err => {
        console.error(err)
      })

      this.setState({
        result: [
          {
            type: "city",
            name: "Ales"
          }, {
            type: "beer",
            name: "Skoll"
          }, {
            type: "brewery",
            name: "La Taverne Royale"
          }
        ]
      })

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
            placeholder="Rechercher une bière, une brasserie, une ville, ..."/>

			{ this.state.value
            ? <X onClick={this.clear} size={20}/>
            : <Search onClick={_ => this.onSearch({charCode: 13})} size={20}/> }

        </div>

		{
			this.state.result
				.map((item, i) => {
					switch (item.type) {
					case "city":
						return <CityResult key={"res" + i} {...item}/>
						break;
					case "beer":
						return <BeerResult key={"res" + i} {...item}/>
						break;
					case "brewery":
						return <BreweryResult key={"res" + i} {...item}/>
						break;
					}
				})
		}
      </div>
    )
  }
}