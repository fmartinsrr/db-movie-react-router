import { Link } from "react-router-dom";
import { TMDB } from '../helpers/TMDB'

export function MovieCard({ result }) {

  return (
    <Link to={`../movie/${result.id}`}>
    <div className="card" >
      <div className="card-image">
        <figure className="image is-4by2">
          <img src={ TMDB.getFullAssetUrl(result.backdrop_path) } alt="Placeholder image" />
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-content card-title">
            <p className="title is-4">{result.title}</p>
          </div>
        </div>
        <div className="content">          
          <p className="card-description">
            { result.overview } 
          </p>
          <p>
            <b>Release date: </b>{ result.release_date}
          </p>
        </div> 
      </div>
    </div>
    </Link>
  );
}