import React from 'react';
import './BigCards.css';
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import Rating from "@material-ui/lab/Rating";
import TextTruncate from "react-text-truncate";
import { useNavigate } from 'react-router-dom';


function BigCards({title, media}) {

    const navigate = useNavigate();
    const handleClick = (movie) => {
		if(!movie.media_type){
        if(movie.media_type === 'movie') {
            movie.bannerTitle = "Selected Movie";
                } else {
            movie.bannerTitle = "Selected TV Show";
                }}
        navigate('/browse', {state: {bannerMedia : movie}});
      }
    
      const getReleaseYear = (date) => {
        let year = new Date(date);
        return year.getFullYear();
      }

  return (
    <div className="big-cards">
        <h4>{title}</h4>
			<div className="results__list">
				{ media?.map((movie) => movie.media_type !== 'person' && (movie.poster_path || movie.backdrop_path) &&
					(<div className="list__item" key={movie.id} onClick={() => handleClick(movie)}>
						<img 
                            loading="lazy"
                            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path || movie.poster_path}`}
                            alt={movie.name}
                        />
						<h5 className="list__itemType">{movie.media_type}</h5>
						<div className="list__itemInfo">
							<h5 className="list__itemTitle">{movie.title || movie.original_title || movie.name || movie.original_name}<span className="list__itemYear">({getReleaseYear(movie.release_date || movie.first_air_date)})</span></h5>
							<TextTruncate
								line={2}
								element="p"
								containerClassName="list__itemOverview"
								truncateText="…"
								text={movie.overview}
							/>
							<div className="list__rating">
								<Rating name="movie-rating" className="movieRating" value={(movie.vote_average / 2) || 0} precision={0.5} icon={<StarRoundedIcon fontSize="inherit" readOnly />}/>
								<small className="list__likes">{movie.vote_average / 2}</small>
							</div>
						</div>
					</div> )
				)}
			</div>
		</div>
  )
}

export default BigCards