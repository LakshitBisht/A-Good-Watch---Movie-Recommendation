import { useState, useEffect } from "react";
import Banner from "../../components/banner/Banner";
import Navbar from "../../components/navbar/Navbar";
import Row from "../../components/row/Row";
import Footer from "../../components/footer/Footer";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import Loading from "../../components/loading/Loading";
import "./Series.css";
import {
  fetchMedia,
  fetchTrending,
  fetchSimilar,
  fetchRecommended,
  fetchPopular,
  fetchTopRated,
  fetchAiringTodayTV,
  fetchOnAirTV,
} from "../../api/requests";
import axios from "../../api/axios";
import { useLocation } from "react-router-dom";

export default function Movies() {
  const [bannerMedia, setBannerMedia] = useState([]);
  const [similarMedia, setSimilarMedia] = useState([]);
  const [recommendedMedia, setRecommendedMedia] = useState([]);
  const [popularMedia, setPopularMedia] = useState([]);
  const [topRatedMedia, setTopRatedMedia] = useState([]);
  const [onAirTV, setOnAirTV] = useState([]);
  const [airingTodayTV, setAiringTodayTV] = useState([]);

  const user = useSelector(selectUser);
  const location = useLocation();

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchTrending("tv"));
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
        bannerMedia.bannerTitle = "Featured Series";
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
    async function fetchPopularMedia(fetchURL) {
      const request = await axios.get(fetchURL);
      setPopularMedia(request.data.results);
    }
    async function fetchTopRatedMedia(fetchURL) {
      const request = await axios.get(fetchURL);
      setTopRatedMedia(request.data.results);
    }
    async function fetchOnAirMedia(fetchURL) {
      const request = await axios.get(fetchURL);
      setOnAirTV(request.data.results);
    }
    async function fetchAiringTodayMedia(fetchURL) {
      const request = await axios.get(fetchURL);
      setAiringTodayTV(request.data.results);
    }

    if (bannerMedia.id) {
        fetchSimilarMedia(fetchSimilar(bannerMedia.media_type, bannerMedia.id));
        fetchRecommendedMedia(fetchRecommended(bannerMedia.media_type, bannerMedia.id));
        fetchPopularMedia(fetchPopular(bannerMedia.media_type));
        fetchTopRatedMedia(fetchTopRated(bannerMedia.media_type));
        fetchOnAirMedia(fetchOnAirTV);
        fetchAiringTodayMedia(fetchAiringTodayTV);

    }
    return () => {
      setSimilarMedia([]);
      setRecommendedMedia([]);
    };
  }, [bannerMedia]);

  return (
    <div className="movies">
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
            title={"Similar Series"}
            mediaDetails={similarMedia}
            mediaType={bannerMedia.media_type}
          />
          <Row
            title={"Recommended Series"}
            mediaDetails={recommendedMedia}
            mediaType={bannerMedia.media_type}
          />
          <Row
            title={"Popular Series"}
            mediaDetails={popularMedia}
            mediaType={bannerMedia.media_type}
          />
          <Row
            title={"Top Rated Series"}
            mediaDetails={topRatedMedia}
            mediaType={bannerMedia.media_type}
          />
          <Row
            title={"Currently On Air"}
            mediaDetails={onAirTV}
            mediaType={bannerMedia.media_type}
          />
          <Row
            title={"Airing Today"}
            mediaDetails={airingTodayTV}
            mediaType={bannerMedia.media_type}
          />
          <Footer />
        </>
      )}
    </div>
  );
}
