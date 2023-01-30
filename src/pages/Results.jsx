import { useEffect } from "react";
import { Form, useLoaderData, useNavigation } from "react-router-dom";
import { TMDB } from '../helpers/TMDB'
import { MovieCard } from "../components/MovieCard";

export async function loader({ request, params }) {
  const url = new URL(request.url);
  const query = url.searchParams.get("search");
  const response = await TMDB.searchMovies(query);
  const status = response.status;
  const movies = (status === 200 ? response.data.results : []);
  return { movies, status, query };
}

export default function Results() {
  const { movies, status, query } = useLoaderData();
  const navigation = useNavigation();

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has(
      "search"
    );

  useEffect(() => {
    document.getElementById("search").value = query;
  }, [query]);

  return (
    <div className="container mt-6">
      <Form onSubmit={ (event) => {
        if (query) {} else {
          event.preventDefault();
        }
      }}>
        <div className="level">
          <div className="level-item">
            <input id="search" name="search" className="input mr-1" type="text" placeholder="Find a movie" />
            <button className="button is-success">Search</button>
          </div>
        </div>
      </Form>
      <p className="title is-4 mt-6">Search Result</p>
      { movies.length ? (
        <div className="columns">
          { movies.slice(0, 5).map((movie) => {
            return <div key={movie.id} className="column">
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