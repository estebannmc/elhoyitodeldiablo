import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav style={{ display: "flex", gap: "1rem", padding: "1rem", backgroundColor: "#f5f5f5" }}>
      <Link to="/">Inicio</Link>
      <Link to="/categoria/remeras">Remeras</Link>
      <Link to="/categoria/pantalones">Pantalones</Link>
      <Link to="/categoria/camperas">Camperas</Link>
    </nav>
  );
};

export default NavBar;
