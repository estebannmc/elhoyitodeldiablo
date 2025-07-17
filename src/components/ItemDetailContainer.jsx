import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const API_URL = "https://6878456731d28a460e1dbc55.mockapi.io/api/elhoyito/articulos";

const ItemDetailContainer = () => {
  const { itemId } = useParams(); // nombre como identificador
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        const encontrado = data.find(prod =>
          prod.title.toLowerCase() === decodeURIComponent(itemId).toLowerCase()
        );
        if (encontrado) {
          setProducto(encontrado);
        } else {
          setError("Che, este producto no existe :/");
        }
      })
      .catch(() => setError("Ocurrió un error al buscar el producto."));
  }, [itemId]);

  if (error) return <p>{error}</p>;
  if (!producto) return <p>Cargando producto...</p>;

  return (
    <div>
      <h2>{producto.title}</h2>
      <img src={producto.image || "https://via.placeholder.com/300"} alt={producto.title} width="300" />
      <p>{producto.descripcion || "Sin descripción disponible."}</p>
      <p><strong>${producto.price}</strong></p>
    </div>
  );
};

export default ItemDetailContainer;
