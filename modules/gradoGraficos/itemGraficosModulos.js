import { cargarCSS } from "../../controles/controlCSS.js";

export async function crearGraficaAsistenciaGrado(
  nombreGrado,
  porcentajesAlumnos
) {
  cargarCSS("../modules/nivelGrafico/nivelGraficoModulo.css");

  const contenedorPrincipal = document.createElement("div");
  contenedorPrincipal.className = "grafico-general";

  const titulo = document.createElement("h2");
  titulo.innerText = nombreGrado;
  contenedorPrincipal.appendChild(titulo);

  const barrasContainer = document.createElement("div");
  barrasContainer.style.display = "flex";
  barrasContainer.style.flexDirection = "column";
  barrasContainer.style.gap = "16px";

  porcentajesAlumnos.forEach((item) => {
    const contenedorAlumno = document.createElement("div");
    contenedorAlumno.style.display = "flex";
    contenedorAlumno.style.flexDirection = "column";
    contenedorAlumno.style.gap = "4px";

    const nombre = document.createElement("span");
    nombre.innerText = `${item.nombres} ${item.apellidos}`;
    nombre.style.fontWeight = "bold";
    nombre.style.fontSize = "14px";

    const barraFondo = document.createElement("div");
    barraFondo.style.background = "#eee";
    barraFondo.style.height = "24px";
    barraFondo.style.position = "relative";
    barraFondo.style.borderRadius = "4px";
    barraFondo.style.overflow = "hidden";

    const barraRelleno = document.createElement("div");
    barraRelleno.style.width = `${item.porcentaje_asistencia}%`;
    barraRelleno.style.height = "100%";
    barraRelleno.style.background = "rgba(54, 162, 235, 0.7)";
    barraRelleno.style.borderRight = "2px solid rgba(54, 162, 235, 1)";

    const textoPorcentaje = document.createElement("span");
    textoPorcentaje.innerText = `${item.porcentaje_asistencia}%`;
    textoPorcentaje.style.position = "absolute";
    textoPorcentaje.style.right = "8px";
    textoPorcentaje.style.top = "2px";
    textoPorcentaje.style.color = "#333";
    textoPorcentaje.style.fontWeight = "bold";

    barraFondo.appendChild(barraRelleno);
    barraFondo.appendChild(textoPorcentaje);

    contenedorAlumno.appendChild(nombre);
    contenedorAlumno.appendChild(barraFondo);

    barrasContainer.appendChild(contenedorAlumno);
  });

  contenedorPrincipal.appendChild(barrasContainer);

  return contenedorPrincipal;
}
