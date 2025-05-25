import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch("https://fakestoreapi.com/products")
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar productos");
        return res.json();
      })
      .then((data) => {
        console.log("Productos recibidos:", data); // <-- LOGEO
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="alert alert-info">Cargando productos...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;
  if (products.length === 0) return <div>No hay productos para mostrar.</div>; // <-- MENSAJITO

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