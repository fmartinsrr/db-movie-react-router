import { TMDB } from '../helpers/TMDB'

export function MovieCard({ movie }) {
  console.log(movie);

  return (
    <div className="card">
      <div className="card-image">
        <figure className="image is-4by3">
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
          { movie.overview } 
          <br/>
          <br/>
          <b>Release date: </b>{ movie.release_date}
        </div> 
      </div>
    </div>
  );
}