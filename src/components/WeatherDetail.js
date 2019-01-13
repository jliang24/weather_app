import React from "react";

class WeatherDetail extends React.Component {
  render() {
    const createLabel = (name, label, degree = "") => {
      return (
        <div className="statistic">
          <div style={{textTransform: "capitalize"}} className={`value text`}>
            {name} {degree}
          </div>
          <div className="text label">{label}</div>
        </div>
      );
    };

    if (this.props.error) {
      return <div>{this.props.error}</div>;
    }

    if (this.props.weather === null) {
      return <div />;
    }

    const {temp, humidity, temp_min, temp_max} = this.props.weather.main;
    const {description, icon} = this.props.weather.weather[0];

    return (
      <div className="ui segment">
        <div className="ui statistics">
          {createLabel(this.props.weather.name, "CITY")}
          {createLabel(Math.round(temp), "TEMPERATURE", "\u00b0F")}
          {createLabel(humidity, "HUMIDITY", "%")}
          {createLabel(Math.round(temp_min), "LOW TEMP", "\u00b0F")}
          {createLabel(Math.round(temp_max), "HIGH TEMP", "\u00b0F")}
          {createLabel(description, "DESCRIPTION")}
          <img
            alt="weather"
            className="ui tiny image"
            src={`http://openweathermap.org/img/w/${icon}.png`}
          />
        </div>
      </div>
    );
  }
}

export default WeatherDetail;
