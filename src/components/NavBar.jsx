import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src="https://picsum.photos/id/237/50/50" alt="Logo" className="d-inline-block align-text-top me-2" style={{ borderRadius: '50%' }} />
          Tienda Online
        </Link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/categoria/remeras">Remeras</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/categoria/pantalones">Pantalones</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/categoria/camperas">Camperas</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
