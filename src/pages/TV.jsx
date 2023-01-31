import { useLoaderData, useNavigate } from "react-router-dom";
import { TMDB } from '../helpers/TMDB'

export async function loader({ params }) {
  const response = await TMDB.getTVDetails(params.tvId);
  const status = response.status;
  const details = (status === 200 ? response.data : {});
  console.log(details);
  return { details, status }
}

export default function TV() {
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
              <img src={ TMDB.getFullAssetUrl(details.backdrop_path) } alt="Placeholder image" />
            </figure>
          </div>
        </div>
      </div>

      <p className="title is-3 mt-3">{details.name}</p>
      <p><b>First air date: </b>{ details.first_air_date}</p>
      <p className="mt-3">{ details.overview }</p>
      
    </div>
  )
}