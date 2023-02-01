import { Link } from "react-router-dom";
import { TMDB } from '../helpers/TMDB'

export function MovieCard({ result }) {

  return (
    <div className="card full-card" >
      <Link to={`../movie/${result.id}`}>
      <div className="card-image">
        <figure className="image is-4by2">
          <img src={ TMDB.getFullAssetUrl(result.backdrop_path) } alt="Placeholder image" />
        </figure>
      </div>
      </Link>
      <div className="card-content">
        <Link to={`../movie/${result.id}`}>
        <div className="media">
          <div className="media-content card-title">
            <p className="title is-4">{result.title}</p>
          </div>
        </div>
        </Link>
        <div className="content mt-3">          
          <p className="card-description">
            { result.overview } 
          </p>
          <b>Release date: </b>
          <p>
            {result.release_date}
          </p>
        </div> 
      </div>
    </div>
  );
}