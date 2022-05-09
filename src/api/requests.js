const fetchTrending = (mediaType) => {
  return `/trending/${mediaType}/week?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`;
};
const fetchMedia = (mediaType,id) => {
  let append_to_response = mediaType === "movie" ? "videos,credits,release_dates" : "videos,content_ratings";
  return `/${mediaType}/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=${append_to_response}&language=en-US`;
};
const fetchSearchQuery = (query, pgNo=1) => {
  let queryString = encodeURIComponent(query);
  return `/search/multi?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&query=${queryString}&page=${pgNo}&include_adult=false`;
};
const fetchRecommended = (mediaType,id) => {
  return `/${mediaType}/${id}/recommendations?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`;
};
const fetchSimilar = (mediaType,id) => {
  return `/${mediaType}/${id}/similar?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`;
};
const fetchPopular = (mediaType) => {
  return `/${mediaType}/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`;
};
const fetchTopRated = (mediaType) => {
  return `/${mediaType}/top_rated?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`;
};
const fetchWithGenre = (mediaType,id) => {
  return `/discover/${mediaType}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_genres=${id}`;
};



const fetchNowPlayingMovies = `/movie/now_playing?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`;
const fetchUpcomingMovies = `/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`;
const fetchAiringTodayTV = `/tv/airing_today?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`;
const fetchOnAirTV = `/tv/on_the_air?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`;


export {
  fetchTrending,
  fetchMedia,
  fetchSearchQuery,
  fetchRecommended,
  fetchSimilar,
  fetchPopular,
  fetchTopRated,
  fetchWithGenre,
  fetchNowPlayingMovies,
  fetchUpcomingMovies,
  fetchOnAirTV,
  fetchAiringTodayTV
};

