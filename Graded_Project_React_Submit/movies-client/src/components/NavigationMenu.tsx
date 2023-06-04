import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Container from "react-bootstrap/Container";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { InputGroup } from "react-bootstrap";
import { useContext } from "react";
import SearchContext from "../contexts/SearchContext";

const NavigationMenu = () => {
  const { search } = useContext(SearchContext);
  return (
    <nav style={{ marginBottom: "120px" }}>
      <Navbar expand="lg" fixed="top" variant="dark" bg="black"
        style={{ padding: "30px" }}>

        <Container>
          <Navbar.Brand as={NavLink} to="/">
            <FontAwesomeIcon icon={faFilm} className="me-2 display-5" />
            <span className="display-6"><strong>GL Movies</strong></span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto" style={{ fontWeight: "700" }}>

              <Nav.Link as={NavLink} to="/movies-in-theaters"
                className="btn btn-primary me-2 mb-1">
                In-Theaters
              </Nav.Link>

              <Nav.Link as={NavLink} to="/movies-coming"
                className="btn btn-primary me-2 mb-1">
                Coming-Soon
              </Nav.Link>

              <Nav.Link as={NavLink} to="/top-rated-india"
                className="btn btn-primary me-2 mb-1">
                Indian-Movies
              </Nav.Link>

              <Nav.Link as={NavLink} to="/top-rated-movies"
                className="btn btn-primary me-2 mb-1">
                Top-Rated
              </Nav.Link>

              <Nav.Link as={NavLink} to="/favourite"
                className="btn btn-primary me-2 mb-1">
                Favourite
              </Nav.Link>

            </Nav>
          </Navbar.Collapse>

          <Navbar.Collapse className="justify-content-end me-2 mb-2">
            <InputGroup>
              <input
                type="search"
                id="searchbar"
                placeholder="Type To Search A Movie"
                className="form-control"
                onChange={search}
              />
            </InputGroup>
          </Navbar.Collapse>

        </Container>
      </Navbar>
    </nav>
  );
};
export default NavigationMenu;