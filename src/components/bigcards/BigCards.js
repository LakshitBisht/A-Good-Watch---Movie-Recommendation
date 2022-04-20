import React from 'react';
import './BigCards.css';
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import Rating from "@material-ui/lab/Rating";
import TextTruncate from "react-text-truncate";
import { useNavigate } from 'react-router-dom';


function BigCards({title, media}) {

    const navigate = useNavigate();
	
    const handleClick = (media) => {
		if(!media.bannerTitle){
        if(media.media_type === 'movie') {
            media.bannerTitle = "Selected Movie";
                } else {
            media.bannerTitle = "Selected Series";
                }}
        navigate('/browse', {state: {bannerMedia : media}});
      }
    
      const getReleaseYear = (date) => {
        let year = new Date(date);
        return year.getFullYear();
      }

  return (
    <div className="big-cards">
        <h4>{title}</h4>
			<div className="big-list">
				{ media?.map((media) => media.media_type !== 'person' && (media.poster_path || media.backdrop_path) &&
					(<div className="big-list-item" key={media.id} onClick={() => handleClick(media)}>
						<img 
                            loading="lazy"
                            src={`https://image.tmdb.org/t/p/original/${media.poster_path || media.backdrop_path}`}
                            alt={media.name}
                        />
						<h5 className="big-list-itemType">{media.media_type}</h5>
						<div className="big-list-itemInfo">
							<h5 className="big-list-itemTitle">{media.title || media.original_title || media.name || media.original_name}{" "}<span className="big-list-itemYear">({getReleaseYear(media.release_date || media.first_air_date)})</span></h5>
							<TextTruncate
								line={2}
								element="p"
								containerClassName="big-list-itemOverview"
								truncateText="…"
								text={media.tagline||media.overview}
							/>
							<div className="big-list-rating">
								<Rating name="media-rating" className="mediaRating" value={(media.vote_average / 2) || 0} precision={0.5} icon={<StarRoundedIcon fontSize="inherit" readOnly />}/>
								<small className="big-list-likes">{media.vote_average / 2}</small>
							</div>
						</div>
					</div> )
				)}
			</div>
		</div>
  )
}

export default BigCards