import { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    setUser(currentUser);
    const allOrders = JSON.parse(localStorage.getItem("orders")) || [];
    if (currentUser) {
      setOrders(allOrders.filter(order => order.user === currentUser.username));
    }
  }, []);

  if (!user) {
    return (
      <div className="container py-4">
        <h3>Debes iniciar sesión para ver tus compras.</h3>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2>Historial de compras</h2>
      {orders.length === 0 ? (
        <div>No tienes compras registradas.</div>
      ) : (
        <div>
          {orders.map(order => (
            <div key={order.id} className="card mb-4">
              <div className="card-header">
                <strong>Compra: </strong>{order.date}
              </div>
              <div className="card-body">
                <h5 className="card-title">Envío a: {order.shipping.name} ({order.shipping.address})</h5>
                <ul className="list-group mb-2">
                  {order.items.map(item => (
                    <li className="list-group-item d-flex justify-content-between align-items-center" key={item.id}>
                      <span>{item.title} x {item.quantity}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
                <div className="fw-bold text-end">
                  Total: ${order.items.reduce((sum, it) => sum + it.price * it.quantity, 0).toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;