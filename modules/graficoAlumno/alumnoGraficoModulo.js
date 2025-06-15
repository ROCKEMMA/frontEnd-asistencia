import { cargarCSS } from "../../controles/controlCSS.js";

export function GraficaAlumno(porcentaje, id = "") {
  cargarCSS("../modules/graficoAlumno/alumnoGraficoModulo.css");

  const totalBarras = 20;
  const cantidadActiva = Math.round((porcentaje / 100) * totalBarras);

  let claseColor = "rojo";
  if (porcentaje > 80) {
    claseColor = "verde";
  } else if (porcentaje > 60) {
    claseColor = "naranja";
  }

  const item = document.createElement("div");
  item.classList.add("item");

  // Contenedor de icono + ID
  const infoAlumno = document.createElement("div");
  infoAlumno.classList.add("info-alumno");

  const img = document.createElement("img");
  img.src = "../assets/icos/personaIcoNegro.svg";
  img.classList.add("imagen-icono");

  const spanId = document.createElement("span");
  spanId.classList.add("alumno-id");
  spanId.textContent = id;

  infoAlumno.appendChild(img);
  infoAlumno.appendChild(spanId);

  item.appendChild(infoAlumno);

  // Gráfica de barras
  const grafica = document.createElement("div");
  grafica.classList.add("grafica");

  for (let i = 0; i < totalBarras; i++) {
    const div = document.createElement("div");
    div.classList.add("barra");

    if (i < cantidadActiva) {
      div.classList.add(claseColor);
    } else {
      div.classList.add("gris");
    }

    grafica.appendChild(div);
  }

  item.appendChild(grafica);

  // Texto con el porcentaje
  const texto = document.createElement("span");
  texto.classList.add("porcentaje");
  texto.textContent = `${porcentaje}%`;

  item.appendChild(texto);

  return item;
}
