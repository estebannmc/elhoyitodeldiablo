import { useAuth } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(form.username, form.password)) {
      navigate("/admin");
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="container py-4">
      <Helmet>
        <title>Tienda Online - Iniciar Sesión</title>
        <meta name="description" content="Inicia sesión en tu cuenta para acceder a tus pedidos y más." />
      </Helmet>
      <div style={{ maxWidth: 400, margin: 'auto' }}>
        <h2 className="mb-3" id="login-title">Iniciar sesión</h2>
        {error && (
          <div className="alert alert-danger" role="alert" aria-live="assertive">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} aria-labelledby="login-title">
          <label htmlFor="username" className="form-label">Usuario</label>
          <input
            id="username"
            name="username"
            className="form-control mb-2"
            placeholder="Usuario"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            aria-required="true"
          />
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input
            id="password"
            name="password"
            type="password"
            className="form-control mb-3"
            placeholder="Contraseña"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            aria-required="true"
          />
          <button className="btn btn-primary w-100" type="submit">
            Iniciar sesión
          </button>
        </form>
        <p className="mt-2">
          ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;