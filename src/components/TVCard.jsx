import { Link } from "react-router-dom";
import { TMDB } from '../helpers/TMDB';

export function TVCard({ result }) {

  return (
      <div className="card full-card" >
        <Link to={`../tv/${result.id}`}>
        <div className="card-image">
          <figure className="image is-4by2">
            <img src={ TMDB.getFullAssetUrl(result.backdrop_path) } alt="Placeholder image" />
          </figure>
        </div>
        </Link>
        <div className="card-content">
          <Link to={`../tv/${result.id}`}>
          <div className="media">
            <div className="media-content card-title">
              <p className="title is-4">{result.name}</p>
            </div>
          </div>
          </Link>
          <div className="content mt-3">
            <p className="card-description">
              { result.overview } 
            </p>
            <b>First air date: </b>
            <p>
              { result.first_air_date}
            </p>
          </div> 
        </div>
      </div>
  );
}