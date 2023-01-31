import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { TMDB } from '../helpers/TMDB'
import { SearchBar } from "../components/SearchBar";
import { ResultsRow } from "../components/ResultsRow";

export async function loader({ request }) {
  const url = new URL(request.url);
  const search = url.searchParams.get("search");
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

export default function Results() {
  const { results, status, search, type } = useLoaderData();
  const [ query, setQuery] = useState("");
  const [ selected, setSelected] = useState("movie");
  
  useEffect(() => {
    setQuery(search ? search : "");
    setSelected(type ? type : "movie");
  }, [search, type])
  
  return (
    <div className="container mt-6">
      <SearchBar action="../results" query={query} setQuery={setQuery} selected={selected} setSelected={setSelected}/>
      <ResultsRow title="Search Result" results={results} type={type} emptyMsg="No movies found" />
    </div>
  )
}