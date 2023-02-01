import { useEffect, useState, createContext } from "react";
import { SearchBar } from "../components/SearchBar";
import { ResultsRow } from "../components/ResultsRow";

export const SearchResultsContext = createContext();

export function SearchResults({ action, results, currentSearch, currentSearchType }) {

  const [ query, setQuery] = useState("");
  const [ queryType, setQueryType] = useState(currentSearchType);

  useEffect(() => {
    console.log("useEffect");
    setQuery(currentSearch || "");
    setQueryType(currentSearchType || "movie");
  }, [])

  const context = {
    query,
    setQuery,
    queryType,
    setQueryType,
    results,
    resultsType: currentSearchType
  };

  return (
    <SearchResultsContext.Provider value={context}>
      <div className="container mt-6">
        <SearchBar action={action}/>
        <ResultsRow title="Search Result" emptyMsg="No movies" />
      </div>
    </SearchResultsContext.Provider>
  )
}