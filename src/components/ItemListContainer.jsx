import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import productos from "../data/productos";
import Item from "./Item";

const ItemListContainer = ({ saludo }) => {
  const [items, setItems] = useState([]);
  const { categoriaId } = useParams();

  useEffect(() => {
    const productosFiltrados = categoriaId
      ? productos.filter(prod => prod.categoria === categoriaId)
      : productos;

    setTimeout(() => {
      setItems(productosFiltrados);
    }, 500);
  }, [categoriaId]);

  return (
    <div>
      <h1>{saludo}</h1>
      <div style={{ display: "flex", gap: "1rem" }}>
        {items.map(prod => (
          <Item key={prod.id} producto={prod} />
        ))}
      </div>
    </div>
  );
};

export default ItemListContainer;
