import { useEffect, useState, useRef } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { StyledTitle } from "../components/StyledTitle";
import { SimpsonsButton } from "../components/SimpsonsButton";
import { SimpsonsActionButton } from "../components/SimpsonsActionButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";

function Admin() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ title: "", price: "", image: "", description: "" });
  const [editingId, setEditingId] = useState(null);
  const [errores, setErrores] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const cancelBtnRef = useRef(null);

  const API_URL = "https://6878456731d28a460e1dbc55.mockapi.io/api/elhoyito/articulos";

  // Cargar productos desde la API
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  // Maneja cambios en el formulario
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Agregar o editar producto
  const handleSubmit = async (e) => {
    e.preventDefault();
    // ...validaciones y manejo de errores...
    try {
      if (editingId) {
        // Editar producto
        await fetch(`${API_URL}/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else {
        // Crear nuevo producto
        await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }
      // Recargar productos
      const res = await fetch(API_URL);
      const data = await res.json();
      setProducts(data);
      setForm({ title: "", price: "", image: "", description: "" });
      setEditingId(null);
      setErrores({});
      toast.success("Producto guardado correctamente");
    } catch (error) {
      toast.error("Error al guardar el producto");
    }
  };

  // Eliminar producto
  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setProducts(products.filter((p) => p.id !== id));
  };

  // Cargar producto al formulario para editar
  const handleEdit = (product) => {
    setEditingId(product.id);
    setForm({
      title: product.title,
      price: product.price,
      image: product.image,
      description: product.description || "",
    });
    setErrores({});
  };

  useEffect(() => {
    if (showModal && cancelBtnRef.current) {
      cancelBtnRef.current.focus();
    }
  }, [showModal]);

  return (
    <div className="container py-4 bg-light rounded">
      <Helmet>
        <title>Panel de administración | El Hoyito del Diablo</title>
        <meta name="description" content="Administra los productos de El Hoyito del Diablo con estilo Simpsons." />
      </Helmet>
      <StyledTitle>Panel de administración</StyledTitle>
      {/* Formulario */}
      <form className="mb-4" onSubmit={handleSubmit}>
        <div className="row g-2">
          <div className="col-12 col-md-6 mb-3">
            <label htmlFor="title">Nombre del producto</label>
            <input
              id="title"
              name="title"
              className="form-control"
              placeholder="Nombre del producto"
              value={form.title}
              onChange={handleChange}
            />
            {errores.title && <span role="alert" aria-live="assertive" style={{ color: 'red' }}>{errores.title}</span>}
          </div>
          <div className="col-12 col-md-6 mb-3">
            <label htmlFor="price">Precio</label>
            <input
              id="price"
              name="price"
              className="form-control"
              placeholder="Precio"
              type="number"
              value={form.price}
              onChange={handleChange}
            />
            {errores.price && <span role="alert" style={{ color: 'red' }}>{errores.price}</span>}
          </div>
          <div className="col-12 col-md-6 mb-3">
            <label htmlFor="image">URL de la imagen</label>
            <input
              id="image"
              name="image"
              className="form-control"
              placeholder="URL de la imagen"
              value={form.image}
              onChange={handleChange}
            />
          </div>
          <div className="col-12 mb-3">
            <label htmlFor="description">Descripción del producto</label>
            <textarea
              id="description"
              name="description"
              className="form-control"
              placeholder="Descripción del producto"
              value={form.description}
              onChange={handleChange}
            />
            {errores.description && <span role="alert" style={{ color: 'red' }}>{errores.description}</span>}
          </div>
        </div>
        {errores.general && (
          <div role="alert" style={{ color: 'red', marginBottom: 10 }}>
            {errores.general}
          </div>
        )}
        <div className="mt-3 d-flex flex-wrap gap-2">
          <SimpsonsButton type="submit" style={{ width: "100%" }}>
            {editingId ? <><FaEdit /> Editar producto</> : <>Agregar producto</>}
          </SimpsonsButton>
          {editingId && (
            <SimpsonsButton
              type="button"
              style={{ background: "#7ac142", color: "#fff", width: "100%" }}
              onClick={() => {
                setEditingId(null);
                setForm({ title: "", price: "", image: "", description: "" });
                setErrores({});
              }}
            >
              Cancelar
            </SimpsonsButton>
          )}
        </div>
      </form>
      {/* Lista de productos */}
      <h4 className="mt-4 mb-3 text-center">Productos actuales</h4>
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-12 col-md-6 col-lg-4 mb-3">
            <div className="card h-100 shadow-sm rounded">
              <img
                src={product.image || "https://via.placeholder.com/150"}
                alt={product.title}
                className="card-img-top img-fluid"
                style={{ objectFit: "cover", height: 180 }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text mb-2">${product.price}</p>
                <div className="mt-auto d-flex gap-2">
                  <SimpsonsActionButton variant="edit" onClick={() => handleEdit(product)}>
                    <FaEdit /> Editar
                  </SimpsonsActionButton>
                  <SimpsonsActionButton variant="delete" onClick={() => {
                    setShowModal(true);
                    setDeleteId(product.id);
                  }}>
                    <FaTrash /> Eliminar
                  </SimpsonsActionButton>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Modal de confirmación accesible y responsivo */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0, left: 0, width: "100vw", height: "100vh",
            background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 9999
          }}
        >
          <div style={{ background: "#fff", padding: 24, borderRadius: 8, width: "100%", maxWidth: 350 }}>
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              aria-describedby="modal-desc"
            >
              <h5 id="modal-title">¿Seguro que deseas eliminar este producto?</h5>
              <p id="modal-desc">Esta acción no se puede deshacer.</p>
              <div className="d-flex flex-column flex-md-row justify-content-end mt-3 gap-2">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                  ref={cancelBtnRef}
                >
                  Cancelar
                </button>
                <button className="btn btn-danger" onClick={() => {
                  handleDelete(deleteId);
                  setShowModal(false);
                }}>
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default Admin;
