import { useState, useEffect } from "react";
import "./Banner.css";
import ReactReadMoreReadLess from "react-read-more-read-less";
import Rating from "@material-ui/lab/Rating";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Button from "@material-ui/core/Button";
import numeral from "numeral";
import axios from "../../api/axios";
import ModalVideo from "react-modal-video";
import Grow from "@material-ui/core/Grow";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import {
  addToList,
  removeFromList,
  selectMyList,
} from "../../features/mylistSlice";

export default function Banner({ title, fetchURL }) {
  const [bannerMedia, setBannerMedia] = useState([]);
  const [mediaCertification, setMediaCertification] = useState("NA");
  const [playTrailer, setPlayTrailer] = useState(false);
  const [videoId, setVideoId] = useState("");

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
        setBannerMedia(response.data);
        let releaseDates = response.data.release_dates.results;
        for (let i = 0; i < releaseDates.length; i++) {
          if (
            releaseDates[i].iso_3166_1 === "US" ||
            releaseDates[i].iso_3166_1 === "IN"
          ) {
            releaseDates[i].release_dates[0].certification &&
              setMediaCertification(
                releaseDates[i].release_dates[0].certification
              );
            break;
          }
        }
      } else {
        response.data.media_type = "tv";
        setBannerMedia(response.data);
        let contentRating = response.data.content_ratings.results;
        for (let i = 0; i < contentRating.length; i++) {
          if (contentRating[i].iso_3166_1 === "US") {
            contentRating[i].rating &&
              setMediaCertification(contentRating[i].rating);
            break;
          }
        }
      }
      return response;
    }
    fetchURL && fetchData();
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 10);

    return () => {
      setBannerMedia([]);
      setMediaCertification("NA");
      setVideoId("");
    };
  }, [fetchURL, setBannerMedia, setMediaCertification, title]);

  const getReleaseYear = (date) => {
    let year = new Date(date);
    return year.getFullYear();
  };

  const addToWatchList = async (e) => {
    e.preventDefault();
    dispatch(addToList(bannerMedia));
    toast.success("Added to My List!");
  };

  const removeFromWatchList = async (e) => {
    e.preventDefault();
    dispatch(
      removeFromList({ id: bannerMedia.id, media_type: bannerMedia.media_type })
    );
    toast.success("Removed from My List!");
  };

  return (
    <>
      {bannerMedia.backdrop_path && (
        <header
          className="banner"
          style={{
            backgroundImage: `url("https://image.tmdb.org/t/p/original/${bannerMedia?.backdrop_path}")`,
          }}
        >
          <div className="banner-items">
            {videoId !== "" && (
              <Grow in={playTrailer} mountOnEnter unmountOnExit>
                <ModalVideo
                  channel="youtube"
                  autoplay={true}
                  isOpen={true}
                  videoId={videoId}
                  onClose={() => setPlayTrailer(false)}
                />
              </Grow>
            )}

            <p className="banner-featuredInfo">{title}</p>
            <h2 className="banner-featuredTitle">
              {bannerMedia.title ||
                bannerMedia.original_title ||
                bannerMedia.name ||
                bannerMedia.original_name}
              <span className="banner-featuredYear">
                (
                {getReleaseYear(
                  bannerMedia.release_date || bannerMedia.first_air_date
                )}
                )
              </span>
            </h2>
            <p className="banner-featuredGenres">
              <span className="banner-featuredCert">{mediaCertification}</span>
              {bannerMedia?.genres?.slice(0, 3).map((genre) => (
                <span className="banner-featuredGenre" key={genre.id}>
                  {genre.name}
                </span>
              ))}
            </p>
            <div className="banner-featuredDesc">
              {" "}
              <ReactReadMoreReadLess
                charLimit={100}
                readMoreText="[Read More]"
                readMoreClassName="Desc-readMore"
                readLessText="[Read Less]"
                readLessClassName="Desc-readLess"
              >
                {bannerMedia.overview
                  ? bannerMedia.overview
                  : "No Description Available."}
              </ReactReadMoreReadLess>
            </div>

            {bannerMedia.number_of_seasons && (
              <p className="banner-seriesSeasons">
                {bannerMedia.number_of_seasons} Seasons,{" "}
                {bannerMedia.number_of_episodes} Episodes
              </p>
            )}
            <div className="banner-featuredRating">
              <Rating
                name="media-rating"
                value={bannerMedia.vote_average / 2}
                precision={0.5}
                icon={<StarRoundedIcon fontSize="inherit" readOnly />}
              />
              <p className="banner-featuredLikes">
                {numeral(bannerMedia.vote_average / 2).format("0.0")}
                <small>({numeral(bannerMedia.vote_count).format("0,0")})</small>
              </p>
            </div>
            <Button
              className="banner-button"
              variant="contained"
              onClick={() => setPlayTrailer(true)}
              startIcon={<PlayArrowRoundedIcon />}
              disabled={videoId === ""}
            >
              Play Trailer
            </Button>
            {myList.some(
              (media) =>
                media.id === bannerMedia.id &&
                media.media_type === bannerMedia.media_type
            ) ? (
              <Button
                className="banner-button remove"
                variant="contained"
                onClick={removeFromWatchList}
                startIcon={<RemoveIcon />}
              >
                Remove From List
              </Button>
            ) : (
              <Button
                className="banner-button"
                variant="contained"
                onClick={addToWatchList}
                startIcon={<AddIcon />}
              >
                Add To List
              </Button>
            )}
          </div>
          <div className="banner-bottomFade" />
        </header>
      )}
    </>
  );
}
