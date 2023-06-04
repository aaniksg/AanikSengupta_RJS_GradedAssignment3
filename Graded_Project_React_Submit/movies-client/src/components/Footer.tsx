import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm, faCopyright } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <div
      style={{
        backgroundColor: "black",
        color: "white",
        padding: "10px",
        textAlign: "center"
      }}>
      <strong>
        <FontAwesomeIcon icon={faCopyright} className="me-1" />
        {new Date().getFullYear()}
      </strong>

      <FontAwesomeIcon icon={faFilm} className="ms-4 me-1" />
      <span><strong>GL Movies</strong></span>
    </div>
  );
};
export default Footer;