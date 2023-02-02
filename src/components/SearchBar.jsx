import { Form } from "react-router-dom";
import { useNavigation } from "react-router-dom";
import { useContext } from "react";
import { SearchResultsContext } from "./SearchResults"

export function SearchBar() {
  const navigation = useNavigation();
  const { query, setQuery, queryType, setQueryType } = useContext(SearchResultsContext);

  const isLoading = navigation.state === "loading";

  return (
    <Form action="/results" onSubmit={ (event) => {
        if (query) {} else {
          event.preventDefault();
        }
      }}>
        <div className="level">
          <div className="level-item">
            <div className={"control mr-1" + (isLoading ? " is-loading" : "")}>
              <input name="search" className="input" type="text" placeholder="Search for" value={query} onChange={ event => setQuery(event.target.value) } />
            </div>
            <div className="select mr-1">
              <select name="by" value={queryType} onChange={ event => setQueryType(event.target.value )}>
                <option value="movie">Movie</option>
                <option value="tv">TV Series</option>
                <option value="person">Person</option>
                <option value="any">Any</option>
              </select>
            </div>
            <button className="button is-success">Search</button>
          </div>
        </div>
    </Form>
  );
}