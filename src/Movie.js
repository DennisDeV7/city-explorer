import React from 'react';
import Card from 'react-bootstrap/Card';

class Movie extends React.Component{
  render() {

    let movieInfo = this.props.cityMovie.map((info, idx) => {
      return  (
        <Card.Text key={idx}>
          title: {info.title} 
          Overview: {info.overview}     
          Average Votes: {info.average_votes}
          Total Votes: {info.total_votes}
          Popularity: {info.popularity}
          Released: {info.released_on}
          <Card.Img
            src= {`https://image.tmdb.org/t/p/w500${info.image_url}`}
          />
        </Card.Text>
      )
    })

    return (
      <Card>              
        {movieInfo}
      </Card>
    )
  }
}

export default Movie;