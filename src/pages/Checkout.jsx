import { useCart } from "../hooks/useCart";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Checkout() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", address: "", phone: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validación básica
    if (!form.name || !form.address || !form.phone) {
      setError("Por favor completa todos los datos.");
      return;
    }
    if (cart.length === 0) {
      setError("El carrito está vacío.");
      return;
    }

    // Guarda la orden en el historial (localStorage)
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) || { username: "invitado" };

    const newOrder = {
      id: Date.now(),
      user: currentUser.username,
      items: cart,
      shipping: form,
      date: new Date().toLocaleString(),
    };
    orders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));

    // Limpiar carrito y mostrar éxito
    clearCart();
    setSuccess(true);
    setTimeout(() => navigate("/"), 2000);
  };

  const total = cart.reduce((sum, p) => sum + p.price * p.quantity, 0);

  if (success) {
    return (
      <div className="container py-4" style={{ maxWidth: 500 }}>
        <h3>¡Compra realizada con éxito!</h3>
        <p>Serás redirigido al inicio...</p>
      </div>
    );
  }

  return (
    <div className="container py-4" style={{ maxWidth: 500 }}>
      <h2>Checkout</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <h4 className="mt-4">Resumen de tu pedido:</h4>
      {cart.length === 0 ? (
        <div>No hay productos en el carrito.</div>
      ) : (
        <ul className="list-group mb-3">
          {cart.map((item) => (
            <li className="list-group-item d-flex justify-content-between align-items-center" key={item.id}>
              <span>
                {item.title} x {item.quantity}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
          <li className="list-group-item d-flex justify-content-between fw-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </li>
        </ul>
      )}
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          className="form-control mb-2"
          placeholder="Nombre completo"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="address"
          className="form-control mb-2"
          placeholder="Dirección de envío"
          value={form.address}
          onChange={handleChange}
        />
        <input
          name="phone"
          className="form-control mb-3"
          placeholder="Teléfono"
          value={form.phone}
          onChange={handleChange}
        />
        <button className="btn btn-success w-100" type="submit" disabled={cart.length === 0}>
          Confirmar compra
        </button>
      </form>
    </div>
  );
}

export default Checkout;