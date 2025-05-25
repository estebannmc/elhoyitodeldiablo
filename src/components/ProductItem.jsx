import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

function ProductItem({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="card h-100">
      <Link to={`/productos/${product.id}`}>
        <img src={product.image} className="card-img-top p-3" style={{ height: "200px", objectFit: "contain" }} alt={product.title} />
      </Link>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.title}</h5>
        <p className="card-text text-success fw-bold">${product.price}</p>
        <button className="btn btn-primary mt-auto" onClick={() => addToCart(product)}>
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}

export default ProductItem;