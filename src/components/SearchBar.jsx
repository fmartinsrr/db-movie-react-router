import { Form } from "react-router-dom";
import { useNavigation } from "react-router-dom";

export function SearchBar({action, query, setQuery, selected, setSelected}) {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <Form action={action} onSubmit={ (event) => {
        if (query) {} else {
          event.preventDefault();
        }
      }}>
        <div className="level">
          <div className="level-item">
            <div className={"control" + (isLoading ? " is-loading" : "")}>
              <input name="search" className="input mr-1" type="text" placeholder="Search for" value={query} onChange={ event => setQuery(event.target.value) } />
            </div>
            <div className="select mr-1">
              <select name="by" value={selected} onChange={ event => setSelected(event.target.value )}>
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