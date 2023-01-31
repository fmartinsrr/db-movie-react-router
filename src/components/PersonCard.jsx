import { Link } from "react-router-dom";
import { TMDB } from '../helpers/TMDB';

export function PersonCard({ result }) {
  console.log(result);

  return (
    <div className="card" >
      <div className="card-image">
        <figure className="image is-4by2">
          <img src={ TMDB.getFullAssetUrl(result.profile_path) } alt="Placeholder image" />
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-content card-title">
            <p className="title is-4">{result.name}</p>
          </div>
        </div>
        <div className="content">          
          <p>
            <b>Known for:</b>
          </p>
          {
            result.known_for.map( (known) => {
              return known.media_type === "movie" ?
                <Link key={known.id} to={`../movie/${known.id}`}>
                  <p>{known.title}</p>
                </Link>
                :
                <p>{known.name}</p>
            })
          }
        </div> 
      </div>
    </div>
  );
}