import { Form } from "react-router-dom";

export function SearchBar({action, query, setQuery}) {
  
  return (
    <Form action={action} onSubmit={ (event) => {
        if (query) {} else {
          event.preventDefault();
        }
      }}>
        <div className="level">
          <div className="level-item">
            <input name="search" className="input mr-1" type="text" placeholder="Find a movie" value={query} onChange={ event => setQuery(event.target.value) } />
            <button className="button is-success">Search</button>
          </div>
        </div>
    </Form>
  );
}