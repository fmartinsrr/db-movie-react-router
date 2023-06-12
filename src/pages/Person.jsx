import { useLoaderData, useNavigate } from "react-router-dom";
import { TMDB } from '../helpers/TMDB'

export async function loader({ params }) {
  const [details_response, credits_tv_response, credits_movie_response] = await Promise.all([
    TMDB.getPersonDetails(params.personId),
    TMDB.getPersonTVCredits(params.personId),
    TMDB.getPersonMovieCredits(params.personId)
  ])

  const details_status = details_response.status;
  const details = (details_status === 200 ? details_response.data : {});
  console.log(details);

  const credits_tv_status = credits_tv_response.status;
  const credits_tv = (credits_tv_status === 200 ? credits_tv_response.data : {});
  console.log(credits_tv);

  const credits_movie_status = credits_movie_response.status;
  const credits_movie = (credits_movie_status === 200 ? credits_movie_response.data : {});
  console.log(credits_movie);

  return { details, details_status, credits_tv, credits_tv_status, credits_movie, credits_movie_status }
}

export default function Person() {
  const { details, status } = useLoaderData();
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
              <img src={ TMDB.getFullAssetUrl(details.profile_path) } alt="Placeholder image" />
            </figure>
          </div>
        </div>
      </div>

      <p className="title is-3 mt-3">{details.name}</p>
      
    </div>
  )
}