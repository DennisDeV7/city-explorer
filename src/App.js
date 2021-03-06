import React from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import './App.css';
import Weather from './Weather';
import Movie from './Movie';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      city: '',
      cityData: {},
      error: false,
      errorMessage: '',
      cityWeatherData: [],
      cityMovieInfo: []
    };
  }

  handleCityInput = (e) => {
    this.setState({
      city: e.target.value
    });
  };

  handleCitySubmit = async (e) => {
    e.preventDefault();
    try{    
      // make my request to my API
      let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`;
      let cityInfo = await axios.get(url);
      let cityMap = await `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${cityInfo.data[0].lat},${cityInfo.data[0].lon}&zoom=11`;
      console.log(cityInfo.data);
      this.setState({
        cityData: cityInfo.data[0],
        cityMap: cityMap
      });
    }
    catch(error){
      this.setState({
        error: true,
        errorMessage: `An Error occurred: ${error.response.status}`
      })
    }
    this.handleGetWeather();
    this.handleGetMovies();
  }

  handleGetWeather = async () => {
    let url = (`${process.env.REACT_APP_SERVER}/weather?searchQuery=${this.state.city}&lat=${this.state.cityData.lat}&lon=${this.state.cityData.lon}`)
    try{
      let weatherData = await axios.get(url)
      console.log(weatherData.data);
      this.setState({
        cityWeatherData: weatherData.data,
      })
    } catch (error) {
      console.log(error);
    }
  }

  handleGetMovies = async () => {
    let url = (`${process.env.REACT_APP_SERVER}/movies?searchQuery=${this.state.city}`)
    try {
      let movieData = await axios.get(url);
      this.setState({
        cityMovieInfo: movieData.data
      })
    } catch (error) {
      console.log(error);
    }
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
        {this.state.error?<Alert variant="danger">{this.state.errorMessage}</Alert>:
        <Card>
          <Card.Text>City: {this.state.cityData.display_name}</Card.Text>
          <Card.Text>Latitude: {this.state.cityData.lat}</Card.Text>
          <Card.Text>Longitude: {this.state.cityData.lon}</Card.Text>
          <Card.Img src={this.state.cityMap}/>
        </Card>}
        <Weather
          cityWeather={this.state.cityWeatherData}
        />
        <Movie
          cityMovie={this.state.cityMovieInfo}
        />
      </>
    )  
  };
}

export default App;
