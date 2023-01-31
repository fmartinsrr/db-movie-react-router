import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { TMDB } from '../helpers/TMDB'
import { SearchBar } from "../components/SearchBar";
import { ResultsRow } from "../components/ResultsRow";

export async function loader({ request }) {
  const url = new URL(request.url);
  const search = url.searchParams.get("search");
  const response = await TMDB.searchMovies(search);
  const status = response.status;
  const movies = (status === 200 ? response.data.results : []);
  return { movies, status, search };
}

export default function Results() {
  const { movies, status, search } = useLoaderData();
  const [ query, setQuery] = useState("");
  
  useEffect(() => {
    setQuery(search ? search : "");
  }, [search])
  
  return (
    <div className="container mt-6">
      <SearchBar action="../results" query={query} setQuery={setQuery}/>
      <ResultsRow title="Search Result" results={movies} emptyMsg="No movies found" />
    </div>
  )
}