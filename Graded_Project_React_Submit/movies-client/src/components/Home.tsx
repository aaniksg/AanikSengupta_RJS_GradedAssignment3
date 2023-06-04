import { NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Card from 'react-bootstrap/Card';

const Home = () => {
  return (
    <div>
      <div style={{ marginTop: "160px", fontSize: "20px", color: "white" }}>
        <Nav.Link as={NavLink} to="/movies-in-theaters"
          className="btn btn-primary p-2 pt-3 pb-3">
          <strong>Explore Movies</strong>
        </Nav.Link>
      </div>
      <Card style={{ width: '100%', border: "none" }}>
        <Card.Img variant="top"
          style={{ marginTop: "30px", height: "350px", borderRadius: "10px" }}
          src="https://e1.pxfuel.com/desktop-wallpaper/400/487/desktop-wallpaper-movie-collage-90s-movie-poster.jpg"
        />
      </Card>
    </div>
  );
};
export default Home;