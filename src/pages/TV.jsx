import { useLoaderData, useNavigate, Link, NavLink, Outlet } from "react-router-dom";
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
      <div className="columns ml-0">
        <div>
          <p><b>First air date: </b>{ details.first_air_date}</p>
          <p><b>Created by: </b></p>
          {details.created_by.map((person) => {
            return <Link key={person.id} to={`/person/${person.id}`}>
              <p>{person.name}</p>
            </Link>
          })}
        </div>
        <div className="ml-5">
          <p><b>Last episode to air: </b>{ details.last_air_date}</p>
          <p><b>Genres: </b></p>
          {details.genres.map((genre) => {
              return <p key={genre.id}>{genre.name}</p>
          })}
        </div>
      </div>
      
      <p className="mt-3">{ details.overview }</p>
      {
        details.seasons.length ?
          (
          <div>
            <p className="mt-3"><b>Credits by season: </b></p>
            <div className="columns ml-0 mt-2">
              { 
              details.seasons.map((season) => {
                return <div key={season.id} className="mr-3">
                    <Link to={`season/${season.season_number}/credits`}>
                      <p>{season.name}</p>
                    </Link>
                  </div>
                })
              }
            </div>

            <div>
              <Outlet />
            </div>
          </div>
          )
        :
        null
      }
      
      
    </div>
  )
}