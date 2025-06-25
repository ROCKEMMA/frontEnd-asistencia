import { cargarCSS } from "../../controles/controlCSS.js";
import { headerModulo } from "../../modules/header/headerModulo.js";
import { crearGraficaAsistencia } from "../../modules/nivelGrafico/nivelGraficoModulo.js";

async function cargarGrafica(seccionProyecciones) {
  try {
    const response = await fetch(
      "http://localhost:3000/porcentajeGrados?nivel_id=3&mes=5&año=2025"
    );
    if (!response.ok) throw new Error("Error en la respuesta del servidor");

    const data = await response.json();

    const grafica = await crearGraficaAsistencia(
      data.nombreNivel,
      data.porcentajesGrados
    );
    seccionProyecciones.appendChild(grafica);
  } catch (error) {
    console.log("Error de carga:", error);
    seccionProyecciones.innerHTML = "<p>Error al cargar los datos</p>";
  }
}

export function proyeccionView() {
  cargarCSS("../views/proyeccion/proyeccionView.css");

  document.body.appendChild(
    headerModulo(
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.TCcYPZkra7mTMPCWre3uagAAAA%26pid%3DApi&f=1&ipt=8f255ef1389d07972910aa50f4f5e2fa0a9cb54dbb3a090d9aa506d50a588d0f",
      "Jossue Fuentes"
    )
  );

  const seccionProyecciones = document.createElement("section");
  seccionProyecciones.className = "seccion-proyecciones";

  cargarGrafica(seccionProyecciones);

  return seccionProyecciones;
}

document.body.appendChild(proyeccionView());
