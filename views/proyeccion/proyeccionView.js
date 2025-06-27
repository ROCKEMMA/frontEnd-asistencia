import { cargarCSS } from "../../controles/controlCSS.js";
import { headerModulo } from "../../modules/header/headerModulo.js";
import { crearGraficaAsistencia } from "../../modules/nivelGrafico/nivelGraficoModulo.js";
import { consultarPorcentajePorNivel } from "../../controles/consultarPromedioPorNivel.js";
import { cargarItemGraficoGrado } from "../../modules/graficoItemGrado/graficoItemGrado.js";

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
  try {
    const usuarioString = localStorage.getItem("usuario");
    const usuarioObj = JSON.parse(usuarioString);
    const nivel_id = usuarioObj.user.nivel_id;


    const datos = await consultarPorcentajePorNivel(nivel_id, 5);
    const grafica = await crearGraficaAsistencia(
      datos.nombreNivel,
      datos.porcentajesGrados
    );
    seccionProyecciones.appendChild(grafica);
    contenedor.appendChild(seccionProyecciones);

    let seccionGraficos = document.createElement("section");
    seccionGraficos.className = "seccion-graficos";

    datos.porcentajesGrados.forEach((element) => {
      seccionGraficos.appendChild(
        cargarItemGraficoGrado(
          datos.nombreNivel,
          element.grado_nombre,
          0.8,
          "Jossue Fuentes"
        )
      );

      contenedor.appendChild(seccionGraficos);
    });
  } catch (error) {
    console.log("Error al consultar los datos:", error);
    seccionProyecciones.innerHTML = "<p>Error al cargar los datos</p>";
  }

  


  return contenedor;
}

proyeccionView().then((vista) => {
  document.body.appendChild(vista);
});
