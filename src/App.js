import React from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      city: '',
      cityData: {},
    };
  }

  handleCityInput = (e) => {
    this.setState({
      city: e.target.value
    });
  };

  handleCitySubmit = async (e) => {
    e.preventDefault();
    // make my request to my API
    let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`;
    let cityInfo = await axios.get(url);
    console.log(cityInfo.data);
    this.setState({
      cityData: cityInfo.data[0],
    })
    
  }

  render() {

    return( 
      <>
        <h1>Test</h1>
        <form onSubmit={this.handleCitySubmit}>
          <label>Enter a City:
            <input type="text" onInput={this.handleCityInput} /> 
          </label>
          <button>Explore!</button>
        </form>
        <Card>
          <Card.Text>City: {this.state.cityData.display_name}</Card.Text>
          <Card.Text>Latitude: {this.state.cityData.lat}</Card.Text>
          <Card.Text>Longitude: {this.state.cityData.lon}</Card.Text>
        </Card>
      </>
    )  
  };
}

export default App;
