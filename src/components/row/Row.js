import React from 'react'
import './Row.css'
import axios from '../../axios'
import { useState, useEffect } from 'react';

export default function Row(props) {

  const [movieDetails, setMovieDetails] = useState([]);
  
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(props.fetchURL);
      setMovieDetails(request.data.results);
      return request;
    }
    fetchData();
    return setMovieDetails;
  }, [props.fetchURL, setMovieDetails]);


  return (
    <div className='row'>
        <h2>{props.title}</h2>
        <div className='row-movies'>
          {movieDetails.map(movie => (
            (movie.poster_path && movie.backdrop_path) &&
            <img className= {`row-movie-image-${props.rowSize}`} 
              key={movie.id}
              src={`https://image.tmdb.org/t/p/original/${props.rowSize==="large"? movie.poster_path : movie.backdrop_path}`}
              alt={movie.name}
            />
          ))}
        </div>
    </div>
  )
}
