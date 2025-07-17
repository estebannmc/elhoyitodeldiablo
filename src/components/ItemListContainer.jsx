import { useEffect, useState } from "react";

const API_URL = "https://6878456731d28a460e1dbc55.mockapi.io/api/elhoyito/articulos";

function ItemListContainer({ greeting }) {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error("Error al cargar productos:", error));
  }, []);

  return (
    <div className="container py-4">
      <h2>{greeting}</h2>
      <div className="row">
        {productos.length === 0 ? (
          <p>Cargando productos...</p>
        ) : (
          productos.map((producto) => (
            <div className="col-md-4 mb-4" key={producto.id}>
              <div className="card h-100">
                <img
                  src={producto.image || "https://via.placeholder.com/300"}
                  className="card-img-top"
                  alt={producto.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{producto.title}</h5>
                  <p className="card-text">${producto.price}</p>
                  {/* Podés agregar un botón de “ver más” si querés */}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ItemListContainer;