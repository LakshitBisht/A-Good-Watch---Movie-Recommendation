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
import LoadingBar from "react-top-loading-bar";

export default function Movies() {
  const [bannerMedia, setBannerMedia] = useState([]);
  const [loadingProgress, setLoadingProgress] = useState(10);

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

  return (
    <div className="series">
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
            {bannerMedia.id && (
              <Banner
                title={bannerMedia.bannerTitle}
                fetchURL={fetchMedia(bannerMedia.media_type, bannerMedia.id)}
                setLoadingProgress={setLoadingProgress}
              />
            )}
            <Row
              title={"Similar Series"}
              fetchURL={fetchSimilar(bannerMedia.media_type, bannerMedia.id)}
              mediaType={bannerMedia.media_type}
            />
            <Row
              title={"Recommended Series"}
              fetchURL={fetchRecommended(
                bannerMedia.media_type,
                bannerMedia.id
              )}
              mediaType={bannerMedia.media_type}
            />
            <Row
              title={"Popular Series"}
              fetchURL={fetchPopular(bannerMedia.media_type)}
              mediaType={bannerMedia.media_type}
            />
            <Row
              title={"Top Rated Series"}
              fetchURL={fetchTopRated(bannerMedia.media_type)}
              mediaType={bannerMedia.media_type}
            />
            <Row
              title={"Currently On Air"}
              fetchURL={fetchOnAirTV}
              mediaType={bannerMedia.media_type}
            />
            <Row
              title={"Airing Today"}
              fetchURL={fetchAiringTodayTV}
              mediaType={bannerMedia.media_type}
            />
            <Footer />
          </>
        )
      )}
    </div>
  );
}
