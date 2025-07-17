## 🧸 El Hoyito del Diablo – Tienda online

Este proyecto lo armé como práctica para seguir aprendiendo React. Es una tienda online ficticia con estética mística donde se pueden ver productos, consultar detalles y gestionar un inventario básico. Los datos se conectan con [MockAPI](https://mockapi.io/), ideal para desarrollo y testeo rápido de endpoints.

---

## ⚙️ Tecnologías que usé

- **React** – Para construir toda la interfaz
- **Vite** – Para un entorno de desarrollo más rápido
- **React Router DOM** – Para manejar las rutas de la app
- **MockAPI** – Para simular una API REST
- **ESLint** – Para mantener el código ordenado
- CSS puro (aunque más adelante puedo sumar Tailwind o Bootstrap)

---

## 🛒 ¿Qué se puede hacer?

- Ver un listado de productos
- Entrar a ver el detalle de cada producto por nombre
- Crear, editar y eliminar productos desde el admin
- Consumir datos desde una API externa (MockAPI)
- Manejar errores y estados de carga (como cuando un producto no existe)

---

## 🚀 Cómo correr el proyecto

```bash
# Cloná el repo
git clone https://github.com/estebannmc/elhoyitodeldiablo.git

# Entrá a la carpeta del proyecto
cd elhoyitodeldiablo

# Instalá las dependencias
npm install

# Levantá el servidor de desarrollo
npm run dev

🔗 API utilizada
https://6878456731d28a460e1dbc55.mockapi.io/api/elhoyito/articulos

🧱 Estructura del proyecto
src/
├── components/
│   ├── NavBar.jsx
│   ├── ItemListContainer.jsx
│   ├── ItemDetailContainer.jsx
│   └── ...
├── App.jsx
├── main.jsx
└── ...

--------------

Thanks for reading!

🧸 El Hoyito del Diablo – Online Store
This is a small project I built to keep practicing React. It's a fictional online store with a mystical vibe, where users can browse products, see their details, and manage a basic inventory. It connects to MockAPI, which is great for quickly mocking and testing endpoints.

⚙️ Tech Stack
React – For the entire UI

Vite – For a faster development experience

React Router DOM – To manage routes

MockAPI – To simulate a REST API

ESLint – For cleaner code

Plain CSS (though I might add Tailwind or Bootstrap soon)

🛒 Features
View a list of products

See detailed view by product name

Create, edit, and delete products from the admin

Fetch data from an external API (MockAPI)

Handle errors and loading states (like when a product doesn't exist)

🚀 How to run it
bash
Copiar
Editar
# Clone the repo
git clone https://github.com/estebannmc/elhoyitodeldiablo.git

# Enter the project folder
cd elhoyitodeldiablo

# Install dependencies
npm install

# Start the dev server
npm run dev
Then open http://localhost:5173 in your browser and you're good to go.

🔗 Public API
The app connects to this public API I created using MockAPI:
https://6878456731d28a460e1dbc55.mockapi.io/api/elhoyito/articulos

🧱 Project structure

src/
├── components/
│   ├── NavBar.jsx
│   ├── ItemListContainer.jsx
│   ├── ItemDetailContainer.jsx
│   └── ...
├── App.jsx
├── main.jsx
└── ...

✍️ About me
I'm Esteban, a web developer from Argentina. This is one of the projects I created as part of my React learning process. If you're curious about other things I'm working on, feel free to get in touch or check out my profile.