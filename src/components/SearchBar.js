import React from "react";

class SearchBar extends React.Component {
  state = {text: "", country: "US"};

  submitForm = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.text, this.state.country);
  };

  textChange = event => {
    this.setState({text: event.target.value});
  };

  countryChange = event => {
    this.setState({country: event.target.value});
  };

  render() {
    return (
      <form onSubmit={this.submitForm}>
        <label className="ui header large"> Enter Zipcode or City </label>
        <div
          style={{width: "80%", marginTop: "20px"}}
          className="ui icon input"
        >
          <input
            className="input"
            value={this.state.text}
            onChange={event => this.textChange(event)}
          />
          <i
            onClick={e => this.submitForm(e)}
            className="circular search link icon"
          />
        </div>
        <div
          style={{marginLeft: "10px", width: "6%", marginTop: "20px"}}
          className="ui action input"
        >
          <input
            value={this.state.country}
            className="input"
            onChange={event => this.countryChange(event)}
          />
          <label className="ui label red">Country</label>
        </div>
        <div style={{marginTop: "10px"}} className="ui">
          <button
            style={{width: "15%"}}
            className="ui button black"
            onClick={e => this.submitForm(e)}
          >
            Search
          </button>
        </div>
      </form>
    );
  }
}

export default SearchBar;
