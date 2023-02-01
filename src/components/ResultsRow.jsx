import { MovieCard } from "./MovieCard";
import { TVCard } from "./TVCard";
import { PersonCard } from "./PersonCard";
import { useContext } from "react";

export function ResultsRow({title, emptyMsg, context}) {
  const { results, resultsType } = useContext(context);

  return (
    <>
    <p className="title is-4 mt-6">{title}</p>
      { results.length ? (
        <div className="columns">
          { results.slice(0, 5).map((result) => {
            return <div key={result.id} className="column" >
              {(result.media_type || resultsType) == "movie" && <MovieCard result={result} /> }
              {(result.media_type || resultsType) == "tv" && <TVCard result={result} /> }
              {(result.media_type || resultsType) == "person" && <PersonCard result={result} /> }
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