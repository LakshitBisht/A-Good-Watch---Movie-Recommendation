import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import BigCards from "../../components/bigcards/BigCards";
import Navbar from "../../components/navbar/Navbar";
import "./SearchResult.css";
import axios from "../../api/axios";
import { fetchSearchQuery } from "../../api/requests";
import { toast } from "react-toastify";
import Footer from "../../components/footer/Footer";
import LoadingBar from "react-top-loading-bar";
import InfiniteScroll from "react-infinite-scroll-component";
import PulseLoader from "react-spinners/PulseLoader";

function SearchResult() {
  const [searchQueryUrl, setSearchQueryUrl] = useSearchParams();
  const [searchResults, setSearchResults] = useState([]);
  const [loadingProgress, setLoadingProgress] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);

  useEffect(() => {
    async function fetchData() {
      const request = await axios
        .get(fetchSearchQuery(searchQueryUrl.get("q")))
        .then((response) => {
          setTotalPages(response.data.total_pages);
          setSearchResults(response.data.results);
        })
        .catch((error) => {
          setTotalPages(0);
          toast.error(error.message);
        });
      setLoadingProgress(100);
      return request;
    }
    setLoadingProgress(40);
    fetchData();
    return () => {
      setSearchResults([]);
    };
  }, [searchQueryUrl, setSearchResults]);

  const fetchNextPage = async () => {
    if (currentPage < totalPages) {
      setLoadingProgress(30);
      await axios
        .get(fetchSearchQuery(searchQueryUrl.get("q"), currentPage + 1))
        .then((response) => {
          setSearchResults([...searchResults, ...response.data.results]);
          setCurrentPage(currentPage + 1);
          setLoadingProgress(60);
        })
        .catch((error) => {
          toast.error(error.message);
        });
      setLoadingProgress(100);
    }
  };

  return (
    <div className="searchResult">
      <LoadingBar
        color="#3cb19f"
        progress={loadingProgress}
        onLoaderFinished={() => setLoadingProgress(0)}
      />
      <Navbar
        searchNavigate={false}
        searchQueryUrl={searchQueryUrl.get("q")}
        setSearchQueryUrl={setSearchQueryUrl}
      />
      <InfiniteScroll
        dataLength={searchResults.length}
        next={fetchNextPage}
        hasMore={currentPage < totalPages}
        loader={<div style={{textAlign:"center"}}><PulseLoader color="#3cb19f"/></div>}
        endMessage={
          searchResults?.length > 0 ? (
            <div className="search-message">
              <h2>Yay! You have seen it all</h2>
            </div>
          ) : (
            <div className="search-message">
              <h2>No Results Found</h2>
            </div>
          )
        }
      >
        <BigCards title={"Search Results"} media={searchResults} />
      </InfiniteScroll>
      <Footer />
    </div>
  );
}

export default SearchResult;
