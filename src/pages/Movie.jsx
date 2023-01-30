import { useEffect } from "react";
import { Form, useLoaderData, useNavigation } from "react-router-dom";
import { TMDB } from '../helpers/TMDB'
import { MovieCard } from "../components/MovieCard";

export async function loader({ params }) {
  const response = await TMDB.getMovieDetails(params.movieId);
  const status = response.status;
  const details = (status === 200 ? response.data : {});
  console.log(details);
  return { details, status }
}

export default function Results() {
  const { details, status } = useLoaderData();

  return (
    <div className="container mt-6">
      <p className="title is-4 mt-6">{details.title}</p>
    </div>
  )
}