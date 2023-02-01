import { useState, createContext } from 'react';
import { useLoaderData } from "react-router-dom";
import { TMDB } from '../helpers/TMDB'
import { SearchBar } from "../components/SearchBar";
import { ResultsRow } from '../components/ResultsRow';

export async function loader() {
  const response = await TMDB.getPopularMovies();
  const status = response.status;
  const results = (status === 200 ? response.data.results : []);
  return { results, status };
}

export const HomeContext = createContext();

export default function Home() {
  const { results, status } = useLoaderData();
  const [ query, setQuery] = useState("");
  const [ selected, setSelected] = useState("movie");

  const context = {
    query,
    setQuery,
    selected,
    setSelected,
    results,
    resultsType: "movie"
  };

  return (
    <HomeContext.Provider value={context}>
    <div className="container mt-6">
      <SearchBar action="results" context={HomeContext}/>
      <ResultsRow title="Popular Movies" emptyMsg="No movies" context={HomeContext} />
    </div>
    </HomeContext.Provider>
  )
}