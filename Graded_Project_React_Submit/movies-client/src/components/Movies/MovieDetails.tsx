import { useEffect, useState } from "react";
import { Alert, Col, Row } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import LoadingIndicator from "../../common/LoadingIndicator";
import IMoviesData from "../../models/IMoviesModel";
import { getMovieByTitle } from "../../services/movies";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faClapperboard } from "@fortawesome/free-solid-svg-icons";

type Params = {
  path: string;
  category: string;
};

const MovieDetails = () => {
  const { path, category } = useParams<Params>();

  const [movies, setMovies] = useState<IMoviesData | null>(null);
  const [error, setError] = useState<null | Error>(null);
  const [loading, setLoading] = useState(true);

  useEffect(
    () => {
      const helper = async () => {
        try {
          const details = await getMovieByTitle(
            category as string,
            path as string
          );
          setMovies(details);
        } catch (error) {
          setError(error as Error);
        } finally {
          setLoading(false);
        }
      };

      helper();
    },
    [category, path]
  );

  // Go Back Function
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  }

  return (
    <div style={{ paddingTop: "20px", fontWeight: "700", color: "#606060" }}>
      {loading && <LoadingIndicator size="large" message="Loading..." />}
      {!loading && error && <Alert variant="danger">{error.message}</Alert>}
      {!loading && !error && movies && (
        <>
          <button onClick={goBack}
            className="btn btn-outline-dark btn-lg ms-4 ps-4 pe-4">
            Back
          </button>

          <Row className="mx-2 my-4">
            <Col xs={12} lg={3} className="my-2">
              <a href={`${movies?.posterurl}`} className="w-100 h-100">
                <img
                  src={`${movies?.posterurl}`}
                  alt={movies?.title}
                  className="w-100 h-100 border border-dark rounded"
                />
              </a>
            </Col>
            <Col xs={12} lg={9} className="my-3">
              <div>
                <h2
                  style={{
                    backgroundColor: "#9F9F9F",
                    color: "black",
                    padding: "10px",
                    borderRadius: "5px"
                  }}>
                  <span>
                    <FontAwesomeIcon icon={faClapperboard} className="me-3" />
                    {movies?.title} ({movies?.year})
                  </span>
                </h2>
              </div>
              <div className="my-4">
                <Row>
                  <Col xs={3}>IMDB Rating :</Col>
                  <Col xs={9}>
                    <span
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
                  </Col>
                </Row>
                <Row className="my-2">
                  <Col xs={3}>Content Rating :</Col>
                  <Col xs={9} >
                    <span
                      style={{
                        backgroundColor: "#0d6efd",
                        fontSize: "15px",
                        color: "white",
                        padding: "2px",
                        borderRadius: "10px"
                      }}>
                      <span className="p-2">{movies?.contentRating}</span>
                    </span>
                  </Col>
                </Row>
                <Row className="my-2">
                  <Col xs={3}>Average Rating :</Col>
                  <Col xs={9}>
                    <span
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
                  </Col>
                </Row>
                <Row className="my-2">
                  <Col xs={3}>Duration :</Col>
                  <Col xs={9}>{movies?.duration}</Col>
                </Row>
                <Row className="my-2">
                  <Col xs={3}>Genres :</Col>
                  <Col xs={9}>
                    {movies?.genres.map((genres) => (
                      <span className="me-2" key={genres}
                        style={{
                          backgroundColor: "#0d6efd",
                          fontSize: "15px",
                          color: "white",
                          padding: "2px",
                          borderRadius: "10px",
                          paddingLeft: "5px",
                          paddingRight: "5px"
                        }}>
                        {genres}
                      </span>
                    ))}
                  </Col>
                </Row>
                <Row className="my-2">
                  <Col xs={3}>Actors :</Col>
                  <Col xs={9}>
                    {movies?.actors.map((actors) => (
                      <span className="me-2" key={actors}>
                        {actors}
                      </span>
                    ))}
                  </Col>
                </Row>
                <Row className="my-2">
                  <Col xs={3}>Released Date :</Col>
                  <Col xs={9}>{movies?.releaseDate}</Col>
                </Row>
                <Row className="text-justify my-2" style={{ textAlign: "justify" }}>
                  <Col xs={3}>Story Line :</Col>
                  <Col xs={9}>{movies?.storyline}</Col>
                </Row>
              </div>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};
export default MovieDetails;