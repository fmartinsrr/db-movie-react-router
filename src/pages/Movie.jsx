import { useLoaderData, useNavigate } from "react-router-dom";
import { TMDB } from '../helpers/TMDB'

export async function loader({ params }) {
  const [details_response, credits_response] = await Promise.all([
    TMDB.getMovieDetails(params.movieId),
    TMDB.getMovieCredits(params.movieId)
  ])
  
  const details_status = details_response.status;
  const details = (details_status === 200 ? details_response.data : {});
  console.log(details);

  const credits_status = credits_response.status;
  const credits = (credits_status === 200 ? credits_response.data : {});
  console.log(credits)
  
  return { details, details_status, credits, credits_status }
}

export default function Movie() {
  const { details } = useLoaderData();
  const navigate = useNavigate();

  return (
    <div className="container mt-6 mx-6">
      <button type="button" onClick={() => {
            navigate(-1);
        }}>Back</button>

      <div className="level mt-5">
        <div className="level-left">
          <div className="level-item">
            <figure className="image">
              <img src={ TMDB.getFullAssetUrl(details.backdrop_path) } alt="Placeholder image" />
            </figure>
          </div>
        </div>
      </div>

      <p className="title is-3 mt-3">{details.title}</p>
      <p><b>Release date: </b>{ details.release_date}</p>
      <p className="mt-3">{ details.overview }</p>
      
    </div>
  )
}