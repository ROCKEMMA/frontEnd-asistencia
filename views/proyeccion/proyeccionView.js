import { cargarCSS } from "../../controles/controlCSS.js";
import { headerModulo } from "../../modules/header/headerModulo.js";
import { crearGraficaAsistencia } from "../../modules/nivelGrafico/nivelGraficoModulo.js";
import { consultarPorcentajePorNivel } from "../../controles/consultarPromedioPorNivel.js";
import { GraficaAlumno } from "../../modules/graficoAlumno/alumnoGraficoModulo.js";

export async function proyeccionView() {
  cargarCSS("../views/proyeccion/proyeccionView.css");

  const contenedor = document.createElement("div");
  contenedor.appendChild(
    headerModulo(
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.TCcYPZkra7mTMPCWre3uagAAAA%26pid%3DApi&f=1&ipt=8f255ef1389d07972910aa50f4f5e2fa0a9cb54dbb3a090d9aa506d50a588d0f",
      "Jossue Fuentes"
    )
  );

  const seccionProyecciones = document.createElement("section");
  seccionProyecciones.className = "seccion-proyecciones";

  const configuraciones = [
    { nivel: 3, mes: 5 },
    { nivel: 4, mes: 5 },
    { nivel: 1, mes: 5 },
  ];

  try {
    const datosArray = await Promise.all(
      configuraciones.map(({ nivel, mes }) =>
        consultarPorcentajePorNivel(nivel, mes)
      )
    );

    for (const datos of datosArray) {
      const grafica = await crearGraficaAsistencia(
        datos.nombreNivel,
        datos.porcentajesGrados
      );
      seccionProyecciones.appendChild(grafica);
    }
  } catch (error) {
    console.log("Error al consultar los datos:", error);
    seccionProyecciones.innerHTML = "<p>Error al cargar los datos</p>";
  }

  contenedor.appendChild(seccionProyecciones);
  return contenedor;
}

proyeccionView().then((vista) => {
  document.body.appendChild(vista);
});

document.body.appendChild(GraficaAlumno());
