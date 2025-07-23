import { useState } from "react";
import productos from "../data/productos";
import ProductList from "../components/ProductList";
import { Helmet } from "react-helmet-async";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = productos.filter((product) =>
    product && product.title && product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container py-4">
      <Helmet>
        <title>Tienda Online - Inicio</title>
        <meta name="description" content="Explora nuestra amplia selección de productos de alta calidad." />
      </Helmet>
      <h2 className="text-center mb-4">Nuestros Productos</h2>
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <ProductList products={filteredProducts} />
    </div>
  );
}

export default Home;