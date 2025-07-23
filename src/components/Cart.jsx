import { useCart } from "../hooks/useCart";
import { Link } from "react-router-dom";

function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container">
      <h3 className="mb-3">Carrito de compras</h3>
      {cart.length === 0 ? (
        <div className="alert alert-warning">El carrito está vacío.</div>
      ) : (
        <>
          <ul className="list-group mb-3">
            {cart.map((item) => (
              <li className="list-group-item d-flex justify-content-between align-items-center" key={item.id}>
                <span>
                  {item.title} - ${item.price} x {item.quantity}
                </span>
                <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item.id)}>
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
          <h5>Total: <span className="text-success">${total.toFixed(2)}</span></h5>
          <button className="btn btn-secondary mt-2" onClick={clearCart}>Vaciar carrito</button>
          <Link to="/checkout" className="btn btn-success mt-3">Finalizar compra
          </Link>
        </>
      )}
    </div>
  );
}

export default Cart;