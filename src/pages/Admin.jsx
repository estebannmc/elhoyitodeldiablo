import { useEffect, useState, useRef } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { StyledTitle } from "../components/StyledTitle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet-async";

function Admin() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ title: "", price: "", image: "", description: "" });
  const [editingId, setEditingId] = useState(null);
  const [formError, setFormError] = useState(""); // Nuevo estado para errores del formulario
  const [loadingProducts, setLoadingProducts] = useState(true); // Nuevo estado para carga de productos
  const [errorProducts, setErrorProducts] = useState(null); // Nuevo estado para errores de productos
  
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const cancelBtnRef = useRef(null);

  const API_URL = "https://6878456731d28a460e1dbc55.mockapi.io/api/elhoyito/articulos";

  // Cargar productos desde la API
  useEffect(() => {
    const fetchProducts = async () => {
      setLoadingProducts(true);
      setErrorProducts(null);
      try {
        const res = await fetch(API_URL);
        if (!res.ok) {
          throw new Error("Error al cargar los productos.");
        }
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        setErrorProducts(error.message);
        toast.error("Error al cargar los productos.");
      } finally {
        setLoadingProducts(false);
      }
    };
    fetchProducts();
  }, []);

  // Maneja cambios en el formulario
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Validar formulario
  const validateForm = () => {
    if (!form.title.trim()) {
      setFormError("El nombre del producto es obligatorio.");
      return false;
    }
    if (parseFloat(form.price) <= 0) {
      setFormError("El precio debe ser mayor a 0.");
      return false;
    }
    if (form.description.trim().length < 10) {
      setFormError("La descripción debe tener al menos 10 caracteres.");
      return false;
    }
    setFormError(""); // Limpiar errores si la validación es exitosa
    return true;
  };

  // Agregar o editar producto
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
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
      
      toast.success("Producto guardado correctamente");
    } catch (error) {
      console.error("Error al guardar el producto:", error);
      toast.error("Error al guardar el producto");
    }
  };

  // Eliminar producto
  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setProducts(products.filter((p) => p.id !== id));
      toast.success("Producto eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      toast.error("Error al eliminar el producto");
    }
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
    
  };

  useEffect(() => {
    if (showModal && cancelBtnRef.current) {
      cancelBtnRef.current.focus();
    }
  }, [showModal]);

  return (
    <div className="container py-4 bg-light rounded">
      <Helmet>
        <title>Tienda Online - Administración</title>
        <meta name="description" content="Panel de administración para gestionar productos de la tienda online." />
      </Helmet>
      <StyledTitle>Panel de administración</StyledTitle>
      {/* Formulario */}
      <form className="mb-4" onSubmit={handleSubmit}>
        {formError && <div className="alert alert-danger mb-3">{formError}</div>} {/* Mostrar errores del formulario */}
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
            
          </div>
        </div>
        
        <div className="mt-3 d-flex flex-wrap gap-2">
          <button type="submit" className="btn btn-primary w-100">
            {editingId ? <><FaEdit /> Editar producto</> : <>Agregar producto</>}
          </button>
          {editingId && (
            <button
              type="button"
              className="btn btn-secondary w-100"
              onClick={() => {
                setEditingId(null);
                setForm({ title: "", price: "", image: "", description: "" });
                
              }}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
      {/* Lista de productos */}
      <h4 className="mt-4 mb-3 text-center">Productos actuales</h4>
      {loadingProducts && <div className="alert alert-info">Cargando productos...</div>} {/* Mostrar estado de carga */}
      {errorProducts && <div className="alert alert-danger">Error: {errorProducts}</div>} {/* Mostrar error al cargar productos */}
      {!loadingProducts && !errorProducts && products.length === 0 && (
        <div className="alert alert-warning">No hay productos para mostrar.</div>
      )} {/* Mensaje si no hay productos */}
      {!loadingProducts && !errorProducts && products.length > 0 && (
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
                    <button className="btn btn-primary" onClick={() => handleEdit(product)}>
                      <FaEdit /> Editar
                    </button>
                    <button className="btn btn-danger" onClick={() => {
                      setShowModal(true);
                      setDeleteId(product.id);
                    }}>
                      <FaTrash /> Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
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
