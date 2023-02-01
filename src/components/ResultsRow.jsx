import { MovieCard } from "./MovieCard";
import { TVCard } from "./TVCard";
import { PersonCard } from "./PersonCard";

export function ResultsRow({title, results, type, emptyMsg}) {
  return (
    <>
    <p className="title is-4 mt-6">{title}</p>
      { results.length ? (
        <div className="columns">
          { results.slice(0, 5).map((result) => {
            return <div key={result.id} className="column" >
              {(result.media_type || type) == "movie" && <MovieCard result={result} /> }
              {(result.media_type || type) == "tv" && <TVCard result={result} /> }
              {(result.media_type || type) == "person" && <PersonCard result={result} /> }
            </div>
          })}
        </div>
      ) : (
        <p>
          <i>{emptyMsg}</i>
        </p>
      )}
    </>
  );
}