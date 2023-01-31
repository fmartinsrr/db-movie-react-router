import { ResultCard } from "./ResultCard";

export function ResultsRow({title, results, emptyMsg}) {

  return (
    <>
    <p className="title is-4 mt-6">{title}</p>
      { results.length ? (
        <div className="columns">
          { results.slice(0, 5).map((result) => {
            return <div key={result.id} className="column" >
              <ResultCard result={result}/>
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