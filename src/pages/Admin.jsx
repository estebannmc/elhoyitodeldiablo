import { useEffect, useState } from "react";

function Admin() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ title: "", price: "", image: "" });
  const [editing, setEditing] = useState(null);

  // Cargar productos del localStorage al montar
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(stored);
  }, []);

  // Guarda productos en localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  // Maneja cambios en el formulario
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Agregar o editar producto
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.price) return;

    if (editing !== null) {
      // Editar producto existente
      setProducts(products.map((p, idx) =>
        idx === editing ? { ...p, ...form, price: parseFloat(form.price) } : p
      ));
      setEditing(null);
    } else {
      // Agregar producto nuevo
      setProducts([
        ...products,
        {
          ...form,
          price: parseFloat(form.price),
          id: Date.now(),
        },
      ]);
    }
    setForm({ title: "", price: "", image: "" });
  };

  // Eliminar producto
  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  // Editar producto: carga datos al formulario
  const handleEdit = (idx) => {
    setEditing(idx);
    setForm(products[idx]);
  };

  return (
    <div className="container py-4" style={{ maxWidth: 600 }}>
      <h2>Panel de administración</h2>
      <form className="mb-4" onSubmit={handleSubmit}>
        <div className="mb-2">
          <input
            name="title"
            className="form-control"
            placeholder="Nombre del producto"
            value={form.title}
            onChange={handleChange}
          />
        </div>
        <div className="mb-2">
          <input
            name="price"
            className="form-control"
            placeholder="Precio"
            type="number"
            value={form.price}
            onChange={handleChange}
          />
        </div>
        <div className="mb-2">
          <input
            name="image"
            className="form-control"
            placeholder="URL de la imagen (opcional)"
            value={form.image}
            onChange={handleChange}
          />
        </div>
        <button className="btn btn-primary" type="submit">
          {editing !== null ? "Editar producto" : "Agregar producto"}
        </button>
        {editing !== null && (
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => {
              setEditing(null);
              setForm({ title: "", price: "", image: "" });
            }}
          >
            Cancelar
          </button>
        )}
      </form>
      <h4>Productos actuales</h4>
      <ul className="list-group">
        {products.map((product, idx) => (
          <li key={product.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>
              <img src={product.image || "https://via.placeholder.com/40"} alt="" style={{ width: 40, marginRight: 10 }} />
              {product.title} - ${product.price}
            </span>
            <span>
              <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(idx)}>
                Editar
              </button>
              <button className="btn btn-sm btn-danger" onClick={() => handleDelete(product.id)}>
                Eliminar
              </button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Admin;