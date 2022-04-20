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
  fetchMedia,
  fetchTrending,
  fetchSimilar,
  fetchRecommended,
  fetchPopular,
} from "../../api/requests";
import axios from "../../api/axios";
import { useLocation } from "react-router-dom";

export default function HomeScreen() {
  const [bannerMedia, setBannerMedia] = useState([]);
  const [similarMedia, setSimilarMedia] = useState([]);
  const [recommendedMedia, setRecommendedMedia] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTV, setTrendingTV] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [topRatedTV, setTopRatedTV] = useState([]);

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
        bannerMedia.bannerTitle = "Featured Series";
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
    async function fetchTrendingMovies(fetchURL) {
      const request = await axios.get(fetchURL);
      setTrendingMovies(request.data.results);
    }
    async function fetchTrendingTV(fetchURL) {
      const request = await axios.get(fetchURL);
      setTrendingTV(request.data.results);
    }
    async function fetchTopRatedMovies(fetchURL) {
      const request = await axios.get(fetchURL);
      setTopRatedMovies(request.data.results);
    }
    async function fetchTopRatedTV(fetchURL) {
      const request = await axios.get(fetchURL);
      setTopRatedTV(request.data.results);
    }

    if (bannerMedia.id) {
        fetchSimilarMedia(fetchSimilar(bannerMedia.media_type, bannerMedia.id));
        fetchRecommendedMedia(fetchRecommended(bannerMedia.media_type, bannerMedia.id));
        fetchTrendingMovies(fetchTrending("movie"));
        fetchTrendingTV(fetchTrending("tv"));
        fetchTopRatedMovies(fetchPopular("movie"));
        fetchTopRatedTV(fetchPopular("tv"));
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
              fetchURL={fetchMedia(bannerMedia.media_type, bannerMedia.id)}
            />
          )}
          <Row
            title={
              bannerMedia.media_type === "movie"
                ? "Similar Movies"
                : "Similar Series"
            }
            mediaDetails={similarMedia}
            mediaType={bannerMedia.media_type}
          />
          <Row
            title={
              bannerMedia.media_type === "movie"
                ? "Recommended Movies"
                : "Recommended Series"
            }
            mediaDetails={recommendedMedia}
            mediaType={bannerMedia.media_type}
          />
          <Row
            title={"Trending Movies"}
            mediaDetails={trendingMovies}
            mediaType={"movie"}
          />
          <Row
            title={"Trending Series"}
            mediaDetails={trendingTV}
            mediaType={"tv"}
          />
          <Row
            title={"Top Rated Movies"}
            mediaDetails={topRatedMovies}
            mediaType={"movie"}
          />
          <Row
            title={"Top Rated Series"}
            mediaDetails={topRatedTV}
            mediaType={"tv"}
          />
          <Row
            title={"My List"}
            mediaDetails={myList}
            mediaType={bannerMedia.media_type}
          />
          <Footer />
        </>
      )}
    </div>
  );
}
