import { useEffect, useState } from "react";
import { Form, useLoaderData } from "react-router-dom";
import { TMDB } from '../helpers/TMDB'
import { MovieCard } from "../components/MovieCard";

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
    setQuery(search);
  }, [search])
  
  return (
    <div className="container mt-6">
      <Form onSubmit={ (event) => {
        if (query) {} else {
          event.preventDefault();
        }
      }}>
        <div className="level">
          <div className="level-item">
            <input name="search" className="input mr-1" type="text" placeholder="Find a movie" value={query} onChange={(e) => setQuery(e.target.value) }/>
            <button className="button is-success">Search</button>
          </div>
        </div>
      </Form>
      <p className="title is-4 mt-6">Search Result</p>
      { movies.length ? (
        <div className="columns">
          { movies.slice(0, 5).map((movie) => {
            return <div key={movie.id} className="column" >
              <MovieCard movie={movie}/>
            </div>
          })}
        </div>
      ) : (
        <p>
          <i>No movies found</i>
        </p>
      )}
    </div>
  )
}