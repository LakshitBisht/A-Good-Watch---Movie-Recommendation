const API_key = "6dfe6f5b337d2ab5c1759e43e9de375e";

const fetchTrending = (mediaType) => {
  return `/trending/${mediaType}/week?api_key=${API_key}&language=en-US`;
};
const fetchMedia = (mediaType,id) => {
  return `/${mediaType}/${id}?api_key=${API_key}&append_to_response=videos,release_dates`;
};
const fetchSearchQuery = (query) => {
  let queryString = encodeURIComponent(query);
  return `/search/multi?api_key=${API_key}&language=en-US&query=${queryString}&page=1&include_adult=false`;
};
const fetchRecommended = (mediaType,id) => {
  return `/${mediaType}/${id}/recommendations?api_key=${API_key}&language=en-US&page=1`;
};
const fetchSimilar = (mediaType,id) => {
  return `/${mediaType}/${id}/similar?api_key=${API_key}&language=en-US&page=1`;
};
const fetchPopular = (mediaType) => {
  return `/${mediaType}/popular?api_key=${API_key}&language=en-US`;
};
const fetchTopRated = (mediaType) => {
  return `/${mediaType}/top_rated?api_key=${API_key}&language=en-US`;
};
const fetchWithGenre = (mediaType,id) => {
  return `/discover/${mediaType}?api_key=${API_key}&with_genres=${id}`;
};

const fetchAvatarImg = (email) => {
  return `https://avatars.dicebear.com/api/adventurer-neutral/${email}.svg`;
};

const fetchNowPlayingMovies = `/movie/now_playing?api_key=${API_key}&language=en-US`;
const fetchUpcomingMovies = `/movie/upcoming?api_key=${API_key}&language=en-US`;
const fetchAiringTodayTV = `/tv/airing_today?api_key=${API_key}&language=en-US`;
const fetchOnAirTV = `/tv/on_the_air?api_key=${API_key}&language=en-US`;


export {
  fetchAvatarImg,
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

