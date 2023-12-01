// WeatherClass.js
import React, { Component } from 'react';
import axios from 'axios';
import Search from './Search'; // Import the Search component

class WeatherClass extends Component {
  state = {
    weatherData: {},
    city: 'Toronto',
  };

  componentDidMount() {
    this.fetchWeatherData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.city !== this.state.city) {
      this.fetchWeatherData();
    }
  }

  fetchWeatherData = async () => {
    try {
      const { data } = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=d3fdaf7af99d11ebe046dc55b378d00f`
      );
      console.log('API Response:', data);
      this.setState({ weatherData: data });
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  handleCityChange = (e) => {
    this.setState({ city: e.target.value });
  };

  handleSearch = (city) => {
    this.setState({ city }, this.fetchWeatherData);
  };

  render() {
    const { weatherData, city } = this.state;
    

    return (
      <div className="weather-container">
        <h1>Weather App</h1>
        <Search
          city={city}
          onCityChange={this.handleCityChange}
          onSearch={this.handleSearch}
        />
        {Object.keys(weatherData).length !== 0 && (
          <div className="weather-info">
            <h2>{weatherData.name}</h2>
            
            <p>
              Description: {weatherData.weather && weatherData.weather[0].description}
            </p>
            <p>Temperature: {weatherData.main && weatherData.main.temp} K</p>
            <p>Humidity: {weatherData.main && weatherData.main.humidity}</p>
            <p>Wind Speed: {weatherData.wind && weatherData.wind.speed}</p>
          </div>
        )}
      </div>
    );
  }
}

export default WeatherClass;
