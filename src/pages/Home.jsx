import { Helmet } from "react-helmet";

function Home() {
  return (
    <div>
      <Helmet>
        <title>Inicio | El Hoyito del Diablo</title>
        <meta name="description" content="Bienvenido a El Hoyito del Diablo, la mejor tienda temática de Los Simpsons." />
      </Helmet>
      {/* ...contenido de la página... */}
    </div>
  );
}

export default Home;