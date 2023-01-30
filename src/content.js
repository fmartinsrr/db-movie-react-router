import axios from "axios"

function baseURL(path) {
  return "https://api.themoviedb.org/3" + path;
}

export async function getPopular() {
  const API_KEY = import.meta.env.VITE_API_KEY_TMDB_V3;
  
  try {
    const response = await axios.get(baseURL('/movie/popular'), {
      params: {
        api_key: API_KEY
      }
    });

    console.log(response);
  } catch (error) {
    console.error(error);
  }
}