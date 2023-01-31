import { Link } from "react-router-dom";
import { TMDB } from '../helpers/TMDB';

export function TVCard({ result }) {

  return (
    <Link to={`../tv/${result.id}`}>
      <div className="card" >
        <div className="card-image">
          <figure className="image is-4by2">
            <img src={ TMDB.getFullAssetUrl(result.backdrop_path) } alt="Placeholder image" />
          </figure>
        </div>
        <div className="card-content">
          <div className="media">
            <div className="media-content card-title">
              <p className="title is-4">{result.name}</p>
            </div>
          </div>
          <div className="content">          
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
    </Link>
  );
}