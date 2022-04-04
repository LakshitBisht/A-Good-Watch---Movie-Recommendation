import { useState, useEffect } from "react";
import Banner from "../../components/banner/Banner";
import Navbar from "../../components/navbar/Navbar";
import Row from "../../components/row/Row";
import Footer from "../../components/footer/Footer";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { selectMyList } from "../../features/mylistSlice";
import Loading from "../../components/loading/Loading";
import "./HomeScreen.css";
import {
  fetchMovie,
  fetchTV,
  fetchTrending,
  fetchSimilarMovies,
  fetchRecommendedMovies,
  fetchRecommendedTV,
  fetchSimilarTV,
} from "../../api/requests";
import axios from "../../api/axios";
import { useLocation } from "react-router-dom";

export default function HomeScreen() {
  const [loading, setLoading] = useState(false);
  const [bannerMedia, setBannerMedia] = useState([]);
  const [similarMedia, setSimilarMedia] = useState([]);
  const [recommendedMedia, setRecommendedMedia] = useState([]);

  const user = useSelector(selectUser);
  const myList = useSelector(selectMyList);
  const location = useLocation();

  useEffect(() => {
    if (!user.displayName) {
      setTimeout(() => {
        window.location.reload();
      }, 4000);
      return user;
    }
  }, [user]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchTrending("all"));
      let bannerMedia;
      for (let i = 0; i < request.data.results.length; i++) {
        bannerMedia =
          request.data.results[
            Math.floor(Math.random() * request.data.results.length)
          ];
        if (bannerMedia.poster_path) {
          break;
        }
      }
      if (bannerMedia.media_type === "movie") {
        bannerMedia.bannerTitle = "Featured Movie";
      } else {
        bannerMedia.bannerTitle = "Featured TV Show";
      }
      setBannerMedia(bannerMedia);
      return request;
    }

    location?.state?.bannerMedia
      ? setBannerMedia(location.state.bannerMedia)
      : fetchData();

    return () => {
      setBannerMedia([]);
    };
  }, [location]);

  useEffect(() => {
    async function fetchSimilarMedia(fetchURL) {
      const request = await axios.get(fetchURL);
      setSimilarMedia(request.data.results);
    }
    async function fetchRecommendedMedia(fetchURL) {
      const request = await axios.get(fetchURL);
      setRecommendedMedia(request.data.results);
    }

    if (bannerMedia.id) {
      if (bannerMedia.media_type === "movie") {
        fetchSimilarMedia(fetchSimilarMovies(bannerMedia.id));
        fetchRecommendedMedia(fetchRecommendedMovies(bannerMedia.id));
      } else {
        fetchSimilarMedia(fetchSimilarTV(bannerMedia.id));
        fetchRecommendedMedia(fetchRecommendedTV(bannerMedia.id));
      }
    }
    return () => {
      setSimilarMedia([]);
      setRecommendedMedia([]);
    };
  }, [bannerMedia]);

  return (
    <div className="homeScreen">
      {!user.displayName ? (
        <Loading />
      ) : (
        <>
          <Navbar />
          {bannerMedia.id && (
            <Banner
              title={bannerMedia.bannerTitle}
              fetchURL={
                bannerMedia.media_type === "movie"
                  ? fetchMovie(bannerMedia.id)
                  : fetchTV(bannerMedia.id)
              }
            />
          )}
          <Row
            title={
              bannerMedia.media_type === "movie"
                ? "Similar Movies"
                : "Similar TV Shows"
            }
            mediaDetails={similarMedia}
            setBannerMedia={setBannerMedia}
            setLoading={setLoading}
            mediaType={bannerMedia.media_type}
          />
          <Row
            title={
              bannerMedia.media_type === "movie"
                ? "Recommended Movies"
                : "Recommended TV Shows"
            }
            mediaDetails={recommendedMedia}
            setBannerMedia={setBannerMedia}
            setLoading={setLoading}
            mediaType={bannerMedia.media_type}
          />
          <Row
            title={"My List"}
            mediaDetails={myList}
            setBannerMedia={setBannerMedia}
            setLoading={setLoading}
            mediaType={bannerMedia.media_type}
          />
          <Footer />
        </>
      )}
    </div>
  );
}
