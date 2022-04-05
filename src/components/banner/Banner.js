// import "./Banner.css";
import { useState, useEffect } from "react";
import TextTruncate from "react-text-truncate";
import Rating from "@material-ui/lab/Rating";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Button from "@material-ui/core/Button";
import numeral from "numeral";
import axios from "../../api/axios";
import ModalVideo from "react-modal-video";
import Grow from "@material-ui/core/Grow";
import {toast} from 'react-toastify';

import {useDispatch, useSelector} from 'react-redux';
import {addToList, removeFromList, selectMyList} from '../../features/mylistSlice';


export default function Banner({ title, fetchURL }) {
  const [bannerMovie, setBannerMovie] = useState([]);
  const [movieCertification, setMovieCertification] = useState("NA");
  const [playTrailer, setPlayTrailer] = useState(false);
  const [videoId, setVideoId] = useState("");
  const [truncLine, setTruncLine] = useState(2);

  const myList = useSelector(selectMyList);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(fetchURL);
      response.data.bannerTitle = title;
      
      for (let i = 0; i < response.data.videos.results.length; i++) {
        if (response.data.videos.results[i].type === "Trailer") {
          setVideoId(response.data.videos.results[i].key);
          break;
        }
      }
      
      if (title === "Featured Movie" || title === "Selected Movie") {
        response.data.media_type = "movie";
        setBannerMovie(response.data);
        let releaseDates = response.data.release_dates.results;
        for (let i = 0; i < releaseDates.length; i++) {
          if (
            releaseDates[i].iso_3166_1 === "US" ||
            releaseDates[i].iso_3166_1 === "IN"
            ) {
              releaseDates[i].release_dates[0].certification &&
              setMovieCertification(
                releaseDates[i].release_dates[0].certification
                );
                break;
              }
            }
          } else {
            response.data.media_type = "tv";
        setBannerMovie(response.data);
        let contentRating = response.data.content_ratings.results;
        for (let i = 0; i < contentRating.length; i++) {
          if (contentRating[i].iso_3166_1 === "US") {
            contentRating[i].rating &&
              setMovieCertification(contentRating[i].rating);
            break;
          }
        }
      }
      return response;
    }
    window.scrollTo(0, 0);
    fetchURL && fetchData();
    
    return () => {
      setBannerMovie([]);
      setMovieCertification("NA");
      setVideoId("");
    };
  }, [fetchURL, setBannerMovie, setMovieCertification, title]);

  const readMore = (e) => {
    e.preventDefault();
    setTruncLine(0);
    e.target.style.display = "none";
  };

  const getReleaseYear = (date) => {
    let year = new Date(date);
    return year.getFullYear();
  };

  const addToWatchList = async (e) => {
    e.preventDefault();
    dispatch(addToList(bannerMovie));
    toast.success("Added to My List!");
  }

  const removeFromWatchList = async (e) => {
    e.preventDefault();
    dispatch(removeFromList({id:bannerMovie.id, media_type:bannerMovie.media_type}));
    toast.success("Removed from My List!");
  }

  return (
    <>
      {bannerMovie.backdrop_path && (
        <header
          className="banner"
          style={{
            backgroundImage: `url("https://image.tmdb.org/t/p/original/${bannerMovie?.backdrop_path}")`,
          }}
        >
          <div className="banner-items">
            {videoId!=="" && (
              <Grow in={playTrailer} mountOnEnter unmountOnExit>
                <ModalVideo
                  channel="youtube"
                  isOpen="true"
                  videoId={videoId}
                  onClose={() => setPlayTrailer(false)}
                />
              </Grow>
            )}

            <p className="app__featuredInfo">{title}</p>
            <h2 className="app__featuredTitle">
              {bannerMovie.title ||
                bannerMovie.original_title ||
                bannerMovie.name ||
                bannerMovie.original_name}
              <span className="app__featuredYear">
                (
                {getReleaseYear(
                  bannerMovie.release_date || bannerMovie.first_air_date
                )}
                )
              </span>
            </h2>
            <p className="app__featuredGenres">
              <span className="app__featuredCert">{movieCertification}</span>
              {bannerMovie?.genres?.slice(0, 3).map((genre) => (
                <span className="app__featuredGenre" key={genre.id}>
                  {genre.name}
                </span>
              ))}
            </p>
            <TextTruncate
              line={truncLine}
              element="p"
              containerClassName="app__featuredDesc"
              textTruncateChild={<small onClick={readMore}>[more]</small>}
              truncateText="…"
              text={bannerMovie.overview}
            />
            {bannerMovie.number_of_seasons && (
              <p className="app__seriesSeasons">
                {bannerMovie.number_of_seasons} Seasons,{" "}
                {bannerMovie.number_of_episodes} Episodes
              </p>
            )}
            <div className="app__featuredRating">
              <Rating
                name="movie-rating"
                value={bannerMovie.vote_average / 2}
                precision={0.5}
                icon={<StarRoundedIcon fontSize="inherit" readOnly />}
              />
              <p className="app__featuredLikes">
                {numeral(bannerMovie.vote_average / 2).format("0.0")}
                <small>
                  ({numeral(bannerMovie.vote_count).format("0,0")})
                </small>
              </p>
            </div>
            <Button
              className="app__button"
              variant="contained"
              onClick={() => setPlayTrailer(true)}
              startIcon={<PlayArrowRoundedIcon />}
              disabled={videoId === ""}
            >
              Play Trailer
            </Button>
            { myList.some(media => media.id === bannerMovie.id && media.media_type === bannerMovie.media_type) ? 
            <Button
            className="app__button"
            variant="contained"
            onClick={removeFromWatchList}
            startIcon={<RemoveIcon />}>
            Remove From List
          </Button>
            :
            <Button
              className="app__button"
              variant="contained"
              onClick={addToWatchList}
              startIcon={<AddIcon />}>
              Add To List
            </Button>
    } 
          </div>
          <div className="banner-bottomFade" />
        </header>
      )}
    </>
  );
}
