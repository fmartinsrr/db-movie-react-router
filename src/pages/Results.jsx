import { useLoaderData } from "react-router-dom";
import { TMDB } from '../helpers/TMDB'
import { SearchResults } from '../components/SearchResults';

export async function loader({ request }) {
  const url = new URL(request.url);
  const search = url.searchParams.get("search");
  if (search) {
    let type = url.searchParams.get("by");
    let response;
    switch (type) {
      case 'movie':
        response = await TMDB.searchMovies(search);
        break;
      case 'tv':
        response = await TMDB.searchTV(search);
        break;
      case 'person':
        response = await TMDB.searchPerson(search);
        break;
      default:
        response = await TMDB.searchAny(search);
        type = "any";
        break;
    }
    const status = response.status;
    const results = (status === 200 ? response.data.results : []);
    return { results, status, search, type };
  }
  else {
    return { results: [], status: 404, search: "", type: "movie" }
  }
}

export default function Results() {
  const { results, status, search, type } = useLoaderData();
  
  return (
    <SearchResults 
      title="Search Results"
      searchResults={results} 
      statusCode={status}
      currentSearch={search}
      currentSearchType={type}
    />
  );
}