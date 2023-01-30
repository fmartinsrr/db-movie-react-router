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
    return performRequest('/search/movie', { query });
  },
  getFullAssetUrl: function(path, original=false) {
    const API_KEY = import.meta.env.VITE_API_KEY_TMDB_V3;
    return "https://image.tmdb.org/t/p/" + (original ? "original" : "w500")  + "/" + path;
  }
}