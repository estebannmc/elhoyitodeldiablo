import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!form.username || !form.email || !form.password) {
      setError("Completa todos los campos.");
      return false;
    }
    if (form.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError("El email no es válido.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some(u => u.email === form.email || u.username === form.username)) {
      setError("El usuario o email ya existe.");
      return;
    }
    users.push(form);
    localStorage.setItem("users", JSON.stringify(users));
    navigate("/login");
  };

  return (
    <div className="container py-4" style={{ maxWidth: 400 }}>
      <h2 className="mb-3">Registro</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          className="form-control mb-2"
          placeholder="Nombre de usuario"
          value={form.username}
          onChange={handleChange}
        />
        <input
          name="email"
          type="email"
          className="form-control mb-2"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          className="form-control mb-3"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
        />
        <button className="btn btn-primary w-100" type="submit">Registrarse</button>
      </form>
    </div>
  );
}

export default Register;