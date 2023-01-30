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
    return null;
  }
}

// https://developers.themoviedb.org/3/movies/get-popular-movies
export async function getPopular() {
  return performRequest('/movie/popular');
}