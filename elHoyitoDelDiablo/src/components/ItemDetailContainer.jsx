import { useParams } from "react-router-dom";
import productos from "../data/productos";

const ItemDetailContainer = () => {
  const { itemId } = useParams();
  const producto = productos.find(prod => prod.id === itemId);

  if (!producto) return <p>Che, este producto no existe :/</p>;

  return (
    <div>
      <h2>{producto.nombre}</h2>
      <img src={producto.imagen} alt={producto.nombre} width="300" />
      <p>{producto.descripcion}</p>
      <p><strong>${producto.precio}</strong></p>
    </div>
  );
};

export default ItemDetailContainer;
