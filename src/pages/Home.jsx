import { useLoaderData } from "react-router-dom";
import { TMDB } from '../helpers/TMDB'
import { SearchResults } from '../components/SearchResults';

export async function loader() {
  const response = await TMDB.getPopularMovies();
  const status = response.status;
  const results = (status === 200 ? response.data.results : []);
  return { results, status };
}

export default function Home() {
  const { results, status } = useLoaderData();
  
  return (
    <SearchResults 
      action="results" 
      results={results} 
      currentSearch=""
      currentSearchType="movie"
    />
  );
}