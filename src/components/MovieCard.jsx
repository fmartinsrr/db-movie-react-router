import { Link } from "react-router-dom";
import { TMDB } from '../helpers/TMDB'

export function MovieCard({ movie }) {
  
  return (
    <Link to={`../movie/${movie.id}`}>
    <div className="card" >
      <div className="card-image">
        <figure className="image is-4by2">
          <img src={ TMDB.getFullAssetUrl(movie.backdrop_path) } alt="Placeholder image" />
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className="title is-4">{movie.title}</p>
          </div>
        </div>

        <div className="content">
          <p>
          { movie.overview } 
          </p>
          <b>Release date: </b>{ movie.release_date}
        </div> 
      </div>
    </div>
    </Link>
  );
}