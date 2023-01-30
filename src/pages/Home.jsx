import { useLoaderData } from "react-router-dom";
import { TMDB } from '../helpers/TMDB'
import { MovieCard } from "../components/MovieCard";

export async function loader() {
  const response = await TMDB.getPopularMovies();
  const status = response.status;
  const movies = (status === 200 ? response.data.results : []);
  return { movies, status };
}

export default function Home() {
  const { movies, status } = useLoaderData();
  
  return (
    <div className="container mt-6">
      <div className="level">
        <div className="level-item">
          <input className="input mr-1" type="text" placeholder="Find a movie" />
          <button className="button is-success">Search</button>
        </div>
      </div>
      <p className="title is-4 mt-6">Popular Movies</p>
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
          <i>No movies</i>
        </p>
      )}
    </div>
  )
}