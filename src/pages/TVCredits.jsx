import { useLoaderData, Link } from "react-router-dom";
import { TMDB } from '../helpers/TMDB'

export async function loader({ params }) {
  const response = await TMDB.getTVCredits(params.tvId, params.seasonNumber);
  const status = response.status;
  const credits = (status === 200 ? response.data : {});
  console.log(credits);
  return { credits, status }
}

export default function TVCredits() {
  const { credits, status } = useLoaderData();

  return (
    <div>
      <div className="columns ml-0 mt-3">
        <div className="mr-4">
        <p><b>Cast:</b></p>
        {
          credits.cast.map((cast) => {
            return <Link key={`cast-${cast.id}`} to={`/person/${cast.id}`}>
              <p>{cast.name}</p>
            </Link>
          })
        }
        </div>
        <div>
        <p><b>Crew:</b></p>
        {
          credits.crew.filter((item, index, self) => {
            return self.findIndex(t => t.id === item.id) === index
          }).map((crew) => {
            return <Link key={`crew-${crew.id}`} to={`/person/${crew.id}`}>
              <p>{crew.name}</p>
            </Link>
          })
        }
        </div>
      </div>
    </div>
  );
}