import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";

// Obtenemos la URL de la API desde las variables de entorno
const API_URL = import.meta.env.VITE_API_URL;

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    // Hacemos la petición a la API para obtener los productos
    fetch(`${API_URL}/products`)
      .then((res) => {
        if (!res.ok) {
          // Si la respuesta no es exitosa, lanzamos un error
          throw new Error("No se pudieron cargar los productos. Intenta de nuevo más tarde.");
        }
        return res.json();
      })
      .then((data) => {
        // Guardamos los productos en el estado
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        // Si hay un error, lo guardamos en el estado
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Mostramos un mensaje de carga mientras se obtienen los datos
  if (loading) return <div className="alert alert-info">Cargando productos...</div>;
  // Mostramos un mensaje de error si la petición falla
  if (error) return <div className="alert alert-danger">Error: {error}</div>;
  // Mostramos un mensaje si no hay productos
  if (products.length === 0) return <div>No hay productos para mostrar.</div>;

  return (
    <div className="container">
      <h3 className="mb-4">Productos disponibles</h3>
      <div className="row">
        {products.map((prod) => (
          <div className="col-md-4 mb-4" key={prod.id}>
            <ProductItem product={prod} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
