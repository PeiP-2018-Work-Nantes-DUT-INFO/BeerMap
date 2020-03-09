import React from 'react';

import "./CityBar.css"

import Weather from "../../API/Weather"

import {Search, X, Droplet, Home, Compass} from 'react-feather';

export default class CityBar extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      weather: {
        icon: ""
      }
    }
  }

  componentDidMount() {
    Weather
      .searchByGeoCord(44.1333, 4.0833)
      .then(data => {
        console.log(data)
        this.setState({
          weather: {
            icon: "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png",
            temperature: data.main.temp,
            description: data.weather[0].description
          }
        })
      })
  }

  close = _ => {
    window.alert("Close")
  }

  render() {
    return (
      <div id="CityBar">
        <div className="CityBarTitle">
          <Compass size={25}/>
          <span className="Title">Ales</span>
          <X onClick={this.close} size={25}/>
        </div>

        <h2>Météo</h2>  

        <div className="Weather">
          <img src={this.state.weather.icon}/>
          <div className="WeatherInfo">
            <div className="Temperature">{this.state.weather.temperature}°C</div>
            <div className="Title">{this.state.weather.description}</div>
          </div>
        </div>

        <h2>Brasserie</h2>  


      </div>
    )
  }
}