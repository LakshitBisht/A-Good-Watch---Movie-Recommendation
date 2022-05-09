import "./Row.css";
import { useState, useRef, useEffect } from "react";
import { ArrowForwardIosOutlined, ArrowBackIosOutlined} from "@material-ui/icons";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import Rating from "@material-ui/lab/Rating";
import TextTruncate from "react-text-truncate";
import numeral from "numeral";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../api/axios";

export default function Row({
  title,
  fetchURL,
  mediaList,
  mediaType,
}) {

  const [mediaDetails, setMediaDetails] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [rowItemsPosition, setRowItemsPosition ] = useState("first");
  const [isScrollable, setIsScrollable] = useState(false);

  const mediaRowRef = useRef();
  
    useEffect(() => {
      async function fetchMedia(fetchURL) {
        const request = await axios.get(fetchURL);
        setMediaDetails(request.data.results);
      }
  
      mediaList? setMediaDetails(mediaList) : fetchMedia(fetchURL);

      return () => {
        setMediaDetails([]);
      }
    }, [fetchURL, mediaList]);

  useEffect(() => {
    let width = window.innerWidth;
    let maxMedia = width/300;
    if(mediaDetails.length > maxMedia){
      setIsScrollable(true);
    }

    return () => {
      setIsScrollable(false);
    }
  }, [mediaDetails]);

  const handleClick = (media) => {
    if (!media.media_type) {
      media.media_type = mediaType;
    }
    if(!media.bannerTitle){
    if (media.media_type === "movie") {
      media.bannerTitle = "Selected Movie";
    } else {
      media.bannerTitle = "Selected Series";
    }}
    navigate(`${location.pathname}`, {state: {bannerMedia : media}});
  };

  const getReleaseYear = (date) => {
    let year = new Date(date);
    return year.getFullYear();
  };

  const handleScroll = (e) => {
    e.preventDefault();
    if(Math.floor(e.target.scrollLeft)===0)
    {
      setRowItemsPosition("first");
    }
    else if(Math.ceil(e.target.scrollLeft)===e.target.scrollWidth-e.target.offsetWidth)
    {
      setRowItemsPosition("last");
    }
    else{
      setRowItemsPosition("middle");
    }
  }

  const handleSlider = (slider) => {
    let distance = mediaRowRef.current.scrollLeft;
    if(slider === "prev")
    {
      mediaRowRef.current.scrollTo({left: distance-300<0?0:distance-300, behavior: "smooth"});
    }
    else if(slider === "next")
    {
      mediaRowRef.current.scrollTo({left: distance+300>mediaRowRef.current.scrollWidth-mediaRowRef.current.offsetWidth?mediaRowRef.current.scrollWidth-mediaRowRef.current.offsetWidth:distance+300, behavior: "smooth"});
    }
  }

  return (
    <>
    {mediaDetails.length > 0 && (
    <div className="row">
      <ArrowBackIosOutlined className="slider-arrow back" onClick={()=>handleSlider("prev")} style={rowItemsPosition==="first" ? {opacity:0}:{}}/>
      <div className={`row-list ${rowItemsPosition!=="last"?"fade-right":""}`}>
        <h4>{title}</h4>
        <div className={`list-items ${rowItemsPosition!=="first"?"fade-left":""}`} ref={mediaRowRef} onScroll={handleScroll}>
          {mediaDetails?.map(
            (media) =>
              media.poster_path &&
              media.backdrop_path && (
                <div
                  className="list-item"
                  key={media.id}
                  onClick={() => handleClick(media)}
                >
                  <img
                    loading="lazy"
                    key={media.id}
                    src={`https://image.tmdb.org/t/p/original/${
                      media.backdrop_path || media.poster_path
                    }`}
                    alt={media.name}
                  />
                  <div className="list-itemInfo">
                    <h5 className="list-itemTitle">
                      {media.title ||
                        media.original_title ||
                        media.name ||
                        media.original_name}
                      <span className="list-itemYear">
                        (
                        {getReleaseYear(
                          media.release_date || media.first_air_date
                        )}
                        )
                      </span>
                    </h5>
                    <TextTruncate
                      line={2}
                      element="p"
                      containerClassName="list-itemOverview"
                      truncateText="…"
                      text={media.tagline || media.overview}
                    />
                    <div className="list-rating">
                      <Rating
                        name="media-rating"
                        className="mediaRating"
                        value={media.vote_average / 2 || 0}
                        precision={0.5}
                        icon={<StarRoundedIcon fontSize="inherit" readOnly />}
                      />
                      <small className="list-likes">
                        {numeral(media.vote_average / 2).format("0.0")}
                      </small>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
      <ArrowForwardIosOutlined className="slider-arrow forward" onClick={()=>handleSlider("next")} style={rowItemsPosition==="last" || !isScrollable  ? {opacity:0}:{}}/>
    </div>
    )}
    </>
  );
}
