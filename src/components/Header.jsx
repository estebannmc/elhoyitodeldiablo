export default function Header() {
  return (
    <header className="text-center py-4" style={{
      backgroundColor: "#FFD90F",
      borderBottom: "6px solid #00AEEF"
    }}>
      <img
        src="/ruta-a-tu-logo-o-img-bob-patino.png"
        alt="Bob Patiño"
        style={{width: 100, marginBottom: 10}}
      />
      <h1 style={{fontFamily: "'Luckiest Guy', cursive", color: "#ED2939"}}>
        El hoyito del diablo
      </h1>
      <p style={{fontFamily: "'Luckiest Guy', cursive", color: "#00AEEF"}}>
        ¡La tienda más peligrosa de Springfield!
      </p>
    </header>
  );
}