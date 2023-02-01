import { Link } from "react-router-dom";
import { TMDB } from '../helpers/TMDB';

export function PersonCard({ result }) {

  return (
    <div className="card full-card" >
      <Link to={`../person/${result.id}`}>
      <div className="card-image">
        <figure className="image is-4by2">
          <img className="card-avatar" src={ TMDB.getFullAssetUrl(result.profile_path) } alt="Placeholder image" />
        </figure>
      </div>
      </Link>
      <div className="card-content">
        <Link to={`../person/${result.id}`}>
        <div className="media">
          <div className="media-content card-title">
            <p className="title is-4">{result.name}</p>
          </div>
        </div>
        </Link>
        <div className="content">          
          <p>
            <b>Known for:</b>
          </p>
          {
            result.known_for.slice(0, 3).map( (known) => {
              return known.media_type === "movie" ?
                <Link key={known.id} to={`../movie/${known.id}`}>
                  <p>{known.title}</p>
                </Link>
                :
                <Link key={known.id} to={`../tv/${known.id}`}>
                  <p>{known.name}</p>
                </Link>
            })
          }
        </div> 
      </div>
    </div>
  );
}