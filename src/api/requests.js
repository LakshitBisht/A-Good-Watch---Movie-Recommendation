const API_key = "6dfe6f5b337d2ab5c1759e43e9de375e";
const requests = {
  fetchNetflixOriginals: `/discover/tv?api_key=${API_key}&with_networks=213`,
  fetchTopRated: `/movie/top_rated?api_key=${API_key}&language=en-US`,
};

const fetchTrending = (mediaType) => {
  return `/trending/${mediaType}/week?api_key=${API_key}&language=en-US`;
};

const fetchMovie = (id) => {
  return `/movie/${id}?api_key=${API_key}&append_to_response=videos,release_dates`;
};
const fetchTV = (id) => {
  return `/tv/${id}?api_key=${API_key}&append_to_response=videos,content_ratings`;
};
const fetchSearchQuery = (query) => {
  let queryString = encodeURIComponent(query);
  return `/search/multi?api_key=${API_key}&language=en-US&query=${queryString}&page=1&include_adult=false`;
};
const fetchRecommendedMovies = (id) => {
  return `/movie/${id}/recommendations?api_key=${API_key}&language=en-US&page=1`;
};
const fetchRecommendedTV = (id) => {
  return `/tv/${id}/recommendations?api_key=${API_key}&language=en-US&page=1`;
};
const fetchSimilarMovies = (id) => {
  return `/movie/${id}/similar?api_key=${API_key}&language=en-US&page=1`;
};
const fetchSimilarTV = (id) => {
  return `/tv/${id}/similar?api_key=${API_key}&language=en-US&page=1`;
};
const fetchMoviesWithGenre = (id) => {
  return `/discover/movie?api_key=${API_key}&with_genres=${id}`;
};
const fetchTVWithGenre = (id) => {
  return `/discover/tv?api_key=${API_key}&with_genres=${id}`;
};

const fetchAvatarImg = (email) => {
  return `https://avatars.dicebear.com/api/adventurer-neutral/${email}.svg`;
};

export {
  fetchTrending,
  fetchMovie,
  fetchTV,
  fetchSearchQuery,
  fetchRecommendedMovies,
  fetchRecommendedTV,
  fetchSimilarMovies,
  fetchSimilarTV,
  fetchMoviesWithGenre,
  fetchTVWithGenre,
  fetchAvatarImg,
};
export default requests;
