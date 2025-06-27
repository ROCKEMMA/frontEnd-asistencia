import { headerModulo } from "../../modules/header/headerModulo.js";
import { crearGraficaAsistenciaGrado } from "../../modules/gradoGraficos/itemGraficosModulos.js";

export async function cargarProyeccionGrado() {
  const contenedor = document.createElement("div");

  contenedor.appendChild(
    headerModulo(
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.TCcYPZkra7mTMPCWre3uagAAAA%26pid%3DApi&f=1&ipt=8f255ef1389d07972910aa50f4f5e2fa0a9cb54dbb3a090d9aa506d50a588d0f",
      "Jossue Fuentes"
    )
  );

  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const gradoId = usuario?.grado_proyeccion_activo_id;

  if (!gradoId) {
    const msg = document.createElement("p");
    msg.textContent = "No hay grado activo seleccionado.";
    contenedor.appendChild(msg);
    return contenedor;
  }

  try {
    const mes = 5;
    const anio = 2025;

    const response = await fetch(
      `https://asistencia.jossuefuentes.space/porcentajeGrado?grado_id=${gradoId}&mes=${mes}&anio=${anio}`
    );

    if (!response.ok) throw new Error("Error al obtener datos del servidor");

    const data = await response.json();
    const porcentajesAlumnos = data.porcentajesAlumnos || [];
    const nombreGrado = data.nombreGrado[0].nombre;

    const grafica = await crearGraficaAsistenciaGrado(
      nombreGrado,
      porcentajesAlumnos
    );

    contenedor.appendChild(grafica);
  } catch (error) {
    console.error(error);
    const errorMsg = document.createElement("p");
    errorMsg.textContent = "No se pudo cargar la gráfica de asistencia.";
    contenedor.appendChild(errorMsg);
  }

  return contenedor;
}

document.body.appendChild(await cargarProyeccionGrado());
