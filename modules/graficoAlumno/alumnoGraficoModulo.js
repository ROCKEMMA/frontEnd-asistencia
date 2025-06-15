import { cargarCSS } from "../../controles/controlCSS.js";

export function GraficaAlumno (porcentaje) {

    cargarCSS("../modules/graficoAlumno/alumnoGraficoModulo.css");

  let totalBarras = 20;
  let cantidadActiva = Math.round((porcentaje / 100) * totalBarras);

  let claseColor = "rojo";
  if (porcentaje > 80) {
    claseColor = "verde";
  } else if (porcentaje > 60) {
    claseColor = "naranja";
  }

  let item = document.createElement("div");
  item.classList.add("item");


  let img = document.createElement("img")
  img.src = "../assets/icos/personaIcoNegro.svg"; 
  img.classList.add("imagen-icono");
  item.appendChild(img);


  let grafica = document.createElement("div");
  grafica.classList.add("grafica");

  for (let i = 0; i < totalBarras; i++) {
    let div = document.createElement("div");
    div.classList.add("barra");

    if (i < cantidadActiva) {
      div.classList.add(claseColor);
    } else {
      div.classList.add("gris");
    }

    grafica.appendChild(div);
  }

  item.appendChild(grafica);

  let texto = document.createElement("span");
  texto.classList.add("porcentaje");
  texto.textContent = `${porcentaje}%`;
  item.appendChild(texto);

  return item;
}