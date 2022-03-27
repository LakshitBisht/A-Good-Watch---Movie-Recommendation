import React, { useEffect, useState } from 'react';
import './Banner.css';
import axios from '../../axios';
import requests from '../../requests';
import { InfoOutlined, PlayArrow } from "@material-ui/icons";

export default function Banner({type}) {

  const[bannerMovie, setBannerMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      const data = request.data.results[Math.floor(Math.random() * request.data.results.length-1)];
      setBannerMovie(data);
      return request;
    }
    fetchData();
    return setBannerMovie;
  },[setBannerMovie]);

  function truncate(string,n){
    return string?.length > n ? string.substring(0,n-1) + '...' : string;
  }

  return (
    <header className='banner' style={{backgroundImage: `url("https://image.tmdb.org/t/p/original/${bannerMovie?.backdrop_path}")`}}>
      <div className='banner-items'>
        {type && (
            <div className="category">
              <span>{type === "movie" ? "Movies" : "Series"}</span>
              <select name="genre" id="genre">
                <option>Genre</option>
                <option value="adventure">Adventure</option>
                <option value="comedy">Comedy</option>
                <option value="crime">Crime</option>
                <option value="fantasy">Fantasy</option>
                <option value="historical">Historical</option>
                <option value="horror">Horror</option>
                <option value="romance">Romance</option>
                <option value="sci-fi">Sci-fi</option>
                <option value="thriller">Thriller</option>
                <option value="western">Western</option>
                <option value="animation">Animation</option>
                <option value="drama">Drama</option>
                <option value="documentary">Documentary</option>
              </select>
            </div>
          )}

      {/* <img src={bannerMovie.imgTitle} alt="title-img" /> */}
        <h1 className='banner-title'>{bannerMovie?.title || bannerMovie?.name || bannerMovie?.original_name}</h1>
        <div className='banner-buttons'>
          <button className='banner-button-play'>
            <PlayArrow />
            <span>Play</span>
          </button>
          <button className='banner-button-info'>
            <InfoOutlined />
            <span>Info</span>
          </button>
        </div>
        <h1 className='banner-description'>
          {truncate(bannerMovie?.overview,150)}
        </h1>
      </div>
      <div className='banner-bottomFade' />
    </header>
  )
}
