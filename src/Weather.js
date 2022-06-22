import React from 'react';
import Card from 'react-bootstrap/Card';


class Weather extends React.Component{
  render() {

    let weatherInfo = this.props.cityWeather.map((info, idx) => {
      return  (
        <Card.Text key={idx}>Date: {info.date} Description: {info.desc}        
        </Card.Text>
      )
    })

    return (
      <Card>
        {weatherInfo}
      </Card>
    )
  }
}

export default Weather;