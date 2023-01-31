/**  
 * API Used: The Movie Database API 3
 * Official documentation:
 * https://developers.themoviedb.org/3/getting-started/introduction
*/

import axios from "axios"

async function performRequest(path, params) {
  const API_KEY = import.meta.env.VITE_API_KEY_TMDB_V3;
  const url = "https://api.themoviedb.org/3" + path;
  try {
    const response = await axios.get(url, {
      params: { ...params, api_key: API_KEY }
    });
    return response;
  } 
  catch (error) {
    console.error(error);
    return { status: 404 };
  }
}

export const TMDB = {
  getPopularMovies: async function() {
    // https://developers.themoviedb.org/3/movies/get-popular-movies
    return performRequest('/movie/popular');
  },
  searchMovies: async function(query) {
    // https://developers.themoviedb.org/3/search/search-movies
    return query ? performRequest('/search/movie', { query }) : { status: 204 };
  },
  searchTV: async function(query) {
    // https://developers.themoviedb.org/3/search/search-tv-shows
    return query ? performRequest('/search/tv', { query }) : { status: 204 };
  },
  searchPerson: async function(query) {
    // https://developers.themoviedb.org/3/search/search-people
    return query ? performRequest('/search/person', { query }) : { status: 204 };
  },
  searchAny: async function(query) {
    // https://developers.themoviedb.org/3/search/multi-search
    return query ? performRequest('/search/multi', { query }) : { status: 204 };
  },
  getMovieDetails: async function(movieId) {
    // https://developers.themoviedb.org/3/movies/get-movie-details
    return performRequest('/movie/'+movieId);
  },
  getTVDetails: async function(tvId) {
    // https://developers.themoviedb.org/3/movies/get-movie-details
    return performRequest('/tv/'+tvId);
  },
  getPersonDetails: async function(personId) {
    // https://developers.themoviedb.org/3/movies/get-movie-details
    return performRequest('/person/'+personId);
  },
  getFullAssetUrl: function(path, original) {
    if (path) {
      original = (original === undefined ? false : original);
      const API_KEY = import.meta.env.VITE_API_KEY_TMDB_V3;
      return "https://image.tmdb.org/t/p/" + (original ? "original" : "w500")  + path;
    }
    else {
      // To get\generate custom placeholders easily.
      // return "https://via.placeholder.com/250x140?text=";
      return "/src/assets/250x140.png";
    }
  }
}