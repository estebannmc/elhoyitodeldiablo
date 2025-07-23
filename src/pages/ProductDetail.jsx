import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../hooks/useCart";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar producto");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="alert alert-info">Cargando producto...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;
  if (!product) return <div className="alert alert-warning">No encontrado</div>;

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-md-5">
          <img
            src={product.image}
            alt={product.title}
            className="img-fluid rounded shadow"
            style={{ maxHeight: "350px", objectFit: "contain" }}
          />
        </div>
        <div className="col-md-7">
          <h2 className="mb-3">{product.title}</h2>
          <h4 className="text-success mb-3">${product.price}</h4>
          <p>{product.description}</p>
          <button className="btn btn-primary mt-3" onClick={() => addToCart(product)}>
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;