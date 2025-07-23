## 🧸 El Hoyito del Diablo – Tienda online

Este proyecto lo armé como práctica para seguir aprendiendo React. Es una tienda online ficticia con estética mística donde se pueden ver productos, consultar detalles y gestionar un inventario básico. Los datos se conectan con [MockAPI](https://mockapi.io/), ideal para desarrollo y testeo rápido de endpoints.

---

## ⚙️ Tecnologías que usé

- **React** – Para construir toda la interfaz
- **Vite** – Para un entorno de desarrollo más rápido
- **React Router DOM** – Para manejar las rutas de la app
- **Bootstrap** – Para estilos responsivos y componentes UI
- **Styled-components** – Para personalizar los estilos y hacer el código más modular
- **React Icons** – Para agregar iconos en botones y elementos interactivos
- **React Toastify** – Para mostrar notificaciones de éxito y error
- **React Helmet Async** – Para mejorar el SEO y la accesibilidad (títulos y metaetiquetas)
- **MockAPI** – Para simular una API REST
- **ESLint** – Para mantener el código ordenado

---

## 🛒 ¿Qué se puede hacer?

- Ver un listado de productos
- Buscar productos por nombre
- Entrar a ver el detalle de cada producto por nombre
- Crear, editar y eliminar productos desde el panel de administración
  - **Validación de formulario:** Los campos de producto ahora tienen validaciones (nombre obligatorio, precio > 0, descripción mínima de 10 caracteres).
  - **Manejo de estados de carga:** Se muestran mensajes de carga al obtener los productos.
- Consumir datos desde una API externa (MockAPI)
- Manejar errores y estados de carga (como cuando un producto no existe)
- **SEO y Accesibilidad:** Las páginas principales ahora tienen títulos y metaetiquetas dinámicas para mejorar el SEO y la accesibilidad.

---

## 🚀 Cómo correr el proyecto

1.  **Clona el repositorio:**
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd el-hoyito-del-diablo
    ```

2.  **Instala las dependencias:**
    ```bash
    npm install
    ```

3.  **Inicia el servidor de desarrollo:**
    ```bash
    npm run dev
    ```

Luego, abre [http://localhost:5173](http://localhost:5173) en tu navegador y ¡listo!

---

🔗 **API Pública**
La aplicación se conecta a esta API pública que creé usando MockAPI:
`https://6878456731d28a460e1dbc55.mockapi.io/api/elhoyito/articulos`

---

🧱 **Estructura del proyecto**

```
src/
├── assets/             # Archivos estáticos como imágenes
├── components/         # Componentes reutilizables de UI (NavBar, ProductList, etc.)
├── context/            # Contextos de React (AuthContext, CartContext)
├── data/               # Datos locales (ej. productos iniciales)
├── hooks/              # Custom Hooks (useAuth, useCart)
├── pages/              # Componentes de página (Home, Login, Admin, etc.)
├── routes/             # Definición de rutas y rutas protegidas
├── App.jsx             # Componente principal de la aplicación
├── index.css           # Estilos globales de la aplicación
└── main.jsx            # Punto de entrada de la aplicación
```

---

¡Gracias por leer!