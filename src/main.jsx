import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home, { loader as homeLoader } from './pages/Home'
import Results, { loader as resultsLoader} from './pages/Results'
import Movie, { loader as movieLoader} from './pages/Movie'
import 'bulma/css/bulma.min.css';
import './main.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    loader: homeLoader,
  },
  {
    path: "/results",
    element: <Results />,
    loader: resultsLoader
  },
  {
    path: "movie/:movieId",
    element: <Movie />,
    loader: movieLoader,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
