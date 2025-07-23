import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Nav() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg mb-4" style={{ background: "#00AEEF", borderBottom: "4px solid #FFD90F" }}>
      <div className="container">
        {/* Nombre del sitio */}
        <Link className="navbar-brand fw-bold" to="/">
          El Hoyito del Diablo
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/productos">Productos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">Carrito</Link>
            </li>
            {user && (
              <li className="nav-item">
                <Link className="nav-link" to="/orders">Mis compras</Link>
              </li>
            )}
            {user && user.username === "admin" && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin">Admin</Link>
              </li>
            )}
          </ul>
          <ul className="navbar-nav ms-auto">
            {user ? (
              <>
                <li className="nav-item">
                  <span className="navbar-text me-2" style={{ color: "#FFD90F", fontWeight: "bold" }}>
                    Hola, {user.username}
                  </span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-light btn-sm" onClick={logout}>
                    Cerrar sesión
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;