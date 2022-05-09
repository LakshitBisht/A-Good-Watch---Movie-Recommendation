import { useState, useEffect } from "react";
import Banner from "../../components/banner/Banner";
import Navbar from "../../components/navbar/Navbar";
import Row from "../../components/row/Row";
import Footer from "../../components/footer/Footer";
import { useSelector } from "react-redux";
import { selectUser, selectMyList } from "../../features/userSlice";
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
import LoadingBar from "react-top-loading-bar";

export default function HomeScreen() {
  const [bannerMedia, setBannerMedia] = useState([]);
  const [loadingProgress, setLoadingProgress] = useState(10);

  const user = useSelector(selectUser);
  const myList = useSelector(selectMyList);
  const location = useLocation();

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchTrending("all"));
      let media;
      for (let i = 0; i < request.data.results.length; i++) {
        media =
          request.data.results[
            Math.floor(Math.random() * request.data.results.length)
          ];
        if (media.poster_path) {
          break;
        }
      }
      if (media.media_type === "movie") {
        media.bannerTitle = "Featured Movie";
      } else {
        media.bannerTitle = "Featured Series";
      }
      setBannerMedia(media);
      return request;
    }

    location?.state?.bannerMedia
      ? setBannerMedia(location.state.bannerMedia)
      : fetchData();

    return () => {
      setBannerMedia([]);
    };
  }, [location?.state?.bannerMedia]);

  return (
    <div className="homeScreen">
      {!user.displayName ? (
        <Loading />
      ) : (
        bannerMedia.id && (
          <>
            <LoadingBar
              color="#3cb19f"
              progress={loadingProgress}
              onLoaderFinished={() => setLoadingProgress(0)}
            />
            <Navbar />
            <Banner
              title={bannerMedia.bannerTitle}
              fetchURL={fetchMedia(bannerMedia.media_type, bannerMedia.id)}
              setLoadingProgress={setLoadingProgress}
            />
            <Row
              title={
                bannerMedia.media_type === "movie"
                  ? "Similar Movies"
                  : "Similar Series"
              }
              fetchURL={fetchSimilar(bannerMedia.media_type, bannerMedia.id)}
              mediaType={bannerMedia.media_type}
            />
            <Row
              title={
                bannerMedia.media_type === "movie"
                  ? "Recommended Movies"
                  : "Recommended Series"
              }
              fetchURL={fetchRecommended(
                bannerMedia.media_type,
                bannerMedia.id
              )}
              mediaType={bannerMedia.media_type}
            />
            <Row
              title={"Trending Movies"}
              fetchURL={fetchTrending("movie")}
              mediaType={"movie"}
            />
            <Row
              title={"Trending Series"}
              fetchURL={fetchTrending("tv")}
              mediaType={"tv"}
            />
            <Row
              title={"Popular Movies"}
              fetchURL={fetchPopular("tv")}
              mediaType={"movie"}
            />
            <Row
              title={"Popular Series"}
              fetchURL={fetchPopular("tv")}
              mediaType={"tv"}
            />
            <Row
              title={"My List"}
              mediaList={myList}
              mediaType={bannerMedia.media_type}
            />
            <Footer />
          </>
        )
      )}
    </div>
  );
}
