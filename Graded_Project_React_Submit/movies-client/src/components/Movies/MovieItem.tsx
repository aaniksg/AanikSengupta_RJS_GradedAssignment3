import React from "react";
import { Button, Card, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import IMoviesData from "../../models/IMoviesModel";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  postFavoriteMovie,
  deleteFavoriteMovie,
  getLastId,
  getMovieByTitle,
} from "../../services/movies";

import "./MovieItem.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

type Props = {
  movies: IMoviesData;
  path: string;
  onRemove: (title: string) => void;
};

const MovieListItem = ({ movies, path, onRemove }: Props) => {
  const toastTimer = 1000;
  const isFavouritePage = path === "favourite";

  let toPath = `${movies.title}`;

  const addFavourite = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const movieTitle = await getMovieByTitle("favourite", movies.title);
      if (movieTitle !== null) {
        toast("Already Added To Favourites...", {
          autoClose: toastTimer,
          position: toast.POSITION.TOP_LEFT,
          className: "toast-messageDanger"
        });
        return;
      }

      const lastId = await getLastId("favourite");
      movies.id = lastId + 1;
      await postFavoriteMovie("favourite", movies);
      toast("Successfully Added To Favourites", {
        autoClose: toastTimer,
        position: toast.POSITION.TOP_LEFT,
        className: "toast-messageSuccess"
      });
    } catch (error: any) {
      toast.warn("Cannot Be Added...", {
        autoClose: toastTimer,
        position: toast.POSITION.TOP_LEFT
      });
    }
  };

  const removeFavourite = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    try {
      if (movies.id === null) {
        toast.warn("Cannot Find the Movie...");
      }
      await deleteFavoriteMovie("favourite", movies.id);
      toast("Successfully Removed From The List...", {
        autoClose: toastTimer,
        position: toast.POSITION.TOP_LEFT,
        className: "toast-messageSuccess"
      });
      onRemove(movies.title);
    } catch (errormsg: any) {
      toast.warn("Unable To Remove From List...", {
        autoClose: toastTimer,
        position: toast.POSITION.TOP_LEFT
      });
    }
  };

  return (
    <>
      <Card className="w-100 border border-dark rounded">
        <Image
          fluid
          rounded-start
          src={`${movies?.posterurl}`}
          alt={movies?.title}
          style={{ height: "340px" }}
        />
        <Card.Body>
          <Card.Title className="d-flex justify-content-between">
            <div>
              <div className="fw-bold">{movies?.title}</div>
              <div className="fs-6 fw-bold">( {movies?.year} )</div>
            </div>

            <Link
              className={"btn btn-lg btn-outline-dark ms-2 me-2 mb-2 fw-bold"}
              to={toPath}
              style={{ height: "50px" }}
            >
              Info
            </Link>
          </Card.Title>

          <div className="mt-2 mb-4 text-left">
            <div className="fs-6 fw-bold mb-2">
              IMBD Rating
              <span className="ms-2"
                style={{
                  backgroundColor: "#fcf200",
                  fontSize: "15px",
                  color: "black",
                  padding: "2px",
                  borderRadius: "10px"
                }}>
                <span className="ps-2">{movies?.imdbRating}</span>
                <FontAwesomeIcon icon={faStar} className="ms-2 me-2" />
              </span>
            </div>
            <div className="fs-6 fw-bold">
              Average Rating
              <span className="ms-2"
                style={{
                  backgroundColor: "#fcf200",
                  fontSize: "15px",
                  color: "black",
                  padding: "2px",
                  borderRadius: "10px"
                }}>
                <span className="ps-2">{movies?.averageRating}</span>
                <FontAwesomeIcon icon={faStar} className="ms-2 me-2" />
              </span>
            </div>
            <div className="fw-bold mt-3">
              {movies?.genres.map((genres) => (
                <span className="me-2" key={genres}
                  style={{
                    backgroundColor: "#0d6efd",
                    fontSize: "15px",
                    color: "#FBFBFB",
                    padding: "5px",
                    borderRadius: "10px",
                    paddingLeft: "5px",
                    paddingRight: "5px"
                  }}>
                  {genres}
                </span>
              ))}
            </div>
          </div>


          <Card.Text className="text-center">
            <Button
              hidden={isFavouritePage}
              onClick={addFavourite}
              variant="outline-info"
              className="fw-bold"
            >
              Add To Favourite List
            </Button>

            <Button
              hidden={!isFavouritePage}
              onClick={removeFavourite}
              variant="outline-danger"
            >
              Remove From Favourite List
            </Button>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};
export default MovieListItem;