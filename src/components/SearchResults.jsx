import { useEffect, useState, createContext, useReducer, useCallback } from "react";
import { SearchBar } from "../components/SearchBar";
import { ResultsRow } from "../components/ResultsRow";

export const SearchResultsContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_QUERY':
      return { ...state, query: action.payload.query };
    case 'SET_QUERY_TYPE':
      return { ...state, queryType: action.payload.queryType };
    case 'SET_RESULTS':
      return { ...state, results: action.payload.results };
    case 'SET_RESULTS_TYPE':
      return { ...state, resultsType: action.payload.resultsType };
    default:
      return state
  }
}

export function SearchResults({ title, action, searchResults, currentSearch, currentSearchType }) {

  const [state, dispatch] = useReducer(reducer, {query: currentSearch, queryType: currentSearchType, results: searchResults, resultsType: currentSearchType });
  const { query, queryType,  results, resultsType } = state;

  //const [ query, setQuery] = useState("");
  //const [ queryType, setQueryType] = useState(currentSearchType);

  //useEffect(() => {
  //  console.log("useEffect");
  //  setQuery(currentSearch || "");
  //  setQueryType(currentSearchType || "movie");
  //}, [])

  useEffect(()=> {
    setQuery(currentSearch)
  }, [currentSearch])

  useEffect(()=> {
    setQueryType(currentSearchType)
    setResultsType(currentSearchType)
  }, [currentSearchType])

  useEffect(()=> {
    setResults(searchResults)
  }, [searchResults])

  const setQuery = useCallback(
    (query) => {
      dispatch({ type: "SET_QUERY", payload: { query } });
    },
    [dispatch]
  );

  const setQueryType = useCallback(
    (queryType) => {
      dispatch({ type: "SET_QUERY_TYPE", payload: { queryType} });
    },
    [dispatch]
  );

  const setResults = useCallback(
    (results) => {
      dispatch({ type: "SET_RESULTS", payload: { results } });
    },
    [dispatch]
  );

  const setResultsType = useCallback(
    (resultsType) => {
      dispatch({ type: "SET_RESULTS_TYPE", payload: { resultsType: resultsType } });
    },
    [dispatch]
  );

  const context = {
    query,
    setQuery,
    queryType,
    setQueryType,
    results,
    resultsType
  };

  return (
    <SearchResultsContext.Provider value={context}>
      <div className="container mt-6">
        <SearchBar action={action}/>
        <ResultsRow title={title} emptyMsg="No movies" />
      </div>
    </SearchResultsContext.Provider>
  )
}