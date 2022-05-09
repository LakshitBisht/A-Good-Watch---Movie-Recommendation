import "./History.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { useSelector } from "react-redux";
import {
  selectHistory,
  selectUser,
  clearHistoryDB,
  removeHistoryDB,
} from "../../features/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import InfiniteScroll from "react-infinite-scroll-component";
import PulseLoader from "react-spinners/PulseLoader";
import { useEffect, useState } from "react";

function History() {
  const user = useSelector(selectUser);
  const totalHistory = useSelector(selectHistory);
  const dispatch = useDispatch();
  const [watchHistory, setWatchHistory] = useState([]);

  const navigate = useNavigate();

  const handleClick = (media) => {
    if (!media.bannerTitle) {
      if (media.media_type === "movie") {
        media.bannerTitle = "Selected Movie";
      } else {
        media.bannerTitle = "Selected Series";
      }
    }
    navigate("/browse", { state: { bannerMedia: media } });
  };

  const getReleaseYear = (date) => {
    let year = new Date(date);
    return year.getFullYear();
  };

  const fetchNextData = async () => {
    if (watchHistory.length < totalHistory.length) {
      totalHistory.length - watchHistory.length >= 20
        ? setWatchHistory([
            ...watchHistory,
            ...totalHistory.slice(
              watchHistory.length,
              watchHistory.length + 20
            ),
          ])
        : setWatchHistory([
            ...watchHistory,
            ...totalHistory.slice(watchHistory.length, totalHistory.length),
          ]);
    }
  };

  useEffect(() => {
    totalHistory.length >= 20
      ? setWatchHistory(totalHistory.slice(0, 20))
      : setWatchHistory(totalHistory);
  }, [totalHistory]);

  return (
    <div className="history">
      <Navbar />
      <div className="history-heading">
        <h4>Watch History</h4>
        <Button
          className="history-button"
          variant="contained"
          onClick={() => {
            dispatch(clearHistoryDB({ email: user.email }));
          }}
          startIcon={<DeleteIcon />}
        >
          Clear History
        </Button>
      </div>
      <InfiniteScroll
        dataLength={watchHistory.length}
        next={fetchNextData}
        hasMore={watchHistory.length < totalHistory.length}
        loader={
          <div style={{ textAlign: "center" }}>
            <PulseLoader color="#3cb19f" />
          </div>
        }
        endMessage={
          watchHistory?.length > 0 ? (
            <div className="history-message">
              <h2>That's All!</h2>
            </div>
          ) : (
            <div className="history-message">
              <h2>No History Found</h2>
            </div>
          )
        }
      >
        <div className="history-list">
          {watchHistory?.map(
            (media, index) =>
              media.media_type !== "person" &&
              (media.poster_path || media.backdrop_path) && (
                <div className="history-list-item" key={index}>
                  <img
                    loading="lazy"
                    src={`https://image.tmdb.org/t/p/original/${
                      media.backdrop_path || media.poster_path
                    }`}
                    alt={media.name || media.title}
                    onClick={() => handleClick(media)}
                  />
                  <div
                    className="history-list-itemInfo"
                    onClick={() => handleClick(media)}
                  >
                    <h5 className="history-list-itemTitle">
                      {media.title ||
                        media.original_title ||
                        media.name ||
                        media.original_name}{" "}
                      <small className="history-list-itemYear">
                        (
                        {getReleaseYear(
                          media.release_date || media.first_air_date
                        )}
                        )
                      </small>
                    </h5>
                    <div className="history-list-rating">
                      <small>
                        {media.media_type[0].toUpperCase() +
                          media.media_type.substring(1)}
                      </small>
                      <small className="history-list-likes">
                        {media.vote_average / 2}
                        <StarRoundedIcon fontSize="inherit" />
                      </small>
                    </div>
                  </div>
                  <div className="history-list-date-time">
                    <small>{media.history_date_time[0]}</small>
                    <h5>{media.history_date_time[1]}</h5>
                  </div>
                  <div
                    className="history-list-itemDelete"
                    onClick={() => {
                      dispatch(
                        removeHistoryDB({ media: media, email: user.email })
                      );
                    }}
                  >
                    <DeleteIcon />
                  </div>
                </div>
              )
          )}
        </div>
      </InfiniteScroll>
      <Footer />
    </div>
  );
}

export default History;
