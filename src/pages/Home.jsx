import { useState } from 'react';
import { useLoaderData } from "react-router-dom";
import { TMDB } from '../helpers/TMDB'
import { SearchBar } from "../components/SearchBar";
import { ResultsRow } from '../components/ResultsRow';

export async function loader() {
  const response = await TMDB.getPopularMovies();
  const status = response.status;
  const movies = (status === 200 ? response.data.results : []);
  return { movies, status };
}

export default function Home() {
  const { movies, status } = useLoaderData();
  const [ query, setQuery] = useState("");

  return (
    <div className="container mt-6">
      <SearchBar action="results" query={query} setQuery={setQuery}/>
      <ResultsRow title="Popular Movies" results={movies} type="movie" emptyMsg="No movies" />
    </div>
  )
}