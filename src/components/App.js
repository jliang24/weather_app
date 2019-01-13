import React from "react";
import weatherapi from "../api/weatherapi";
import SearchBar from "./SearchBar";
import WeatherDetail from "./WeatherDetail";
import DaysList from "./DaysList";
const key = process.env.REACT_APP_KEY;
console.log(key);

class App extends React.Component {
  state = {weather: null, error: null, forecast: null, coords: null};

  componentDidMount() {
    const callSubmitFunction = async () => {
      if (this.state.coords) {
        const lat = Math.round(this.state.coords.latitude * 100000) / 100000;
        const long = Math.round(this.state.coords.longitude * 100000) / 100000;
        const response = await weatherapi.get(
          `/weather?lat=${lat}&lon=${long}&APPID=${key}&units=imperial`
        );
        const forecast = await weatherapi.get(
          `/forecast?lat=${lat}&lon=${long}&APPID=${key}&units=imperial`
        );
        this.setState({weather: response.data, forecast: forecast.data});
      }
    };

    window.navigator.geolocation.getCurrentPosition(response => {
      this.setState({coords: response.coords});
      callSubmitFunction();
    });
  }

  onSubmit = async (text, country) => {
    if (this.state.error) {
      this.setState({error: null});
      this.setState({forecast: null});
    }

    const determineResponse = text => {
      return /\d/.test(text) ? "zip=" : `q=`;
    };

    try {
      const response = await weatherapi.get(
        `/weather?${determineResponse(
          text
        )}${text},${country}&APPID=${key}&units=imperial`
      );
      const forecast = await weatherapi.get(
        `/forecast?${determineResponse(
          text
        )}${text},${country}&APPID=${key}&units=imperial`
      );
      this.setState({weather: response.data, forecast: forecast.data});
    } catch (error) {
      this.setState({error: "No city found"});
    }
  };

  render() {
    return (
      <div style={{marginTop: "20px"}} className='ui container'>
        <div className='ui segment'>
          <SearchBar onSubmit={this.onSubmit} />
        </div>
        <WeatherDetail error={this.state.error} weather={this.state.weather} />
        <DaysList error={this.state.error} forecast={this.state.forecast} />
      </div>
    );
  }
}

export default App;
