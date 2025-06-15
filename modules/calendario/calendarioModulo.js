import { cargarCSS } from "../../controles/controlCSS.js";

export function calendarioModulo (mesIndex = new Date().getMonth()) {

    cargarCSS('../modules/calendario/calendarioModulo.css');

  let calendario = document.createElement("div");
  calendario.classList.add("calendario");

  let meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  let estados = ["ninguno", "presente", "tarde", "ausente"];

  // Encabezado con botones y título del mes
  let encabezado = document.createElement("div");
  encabezado.classList.add("encabezado");

  let btnAnterior = document.createElement("button");
  btnAnterior.textContent = "❮";

  let tituloMes = document.createElement("div");
  tituloMes.textContent = meses[mesIndex];

  let btnSiguiente = document.createElement("button");
  btnSiguiente.textContent = "❯";

  encabezado.appendChild(btnAnterior);
  encabezado.appendChild(tituloMes);
  encabezado.appendChild(btnSiguiente);
  calendario.appendChild(encabezado);

  // Tabla de calendario
  let tabla = document.createElement("div");
  tabla.classList.add("tabla");

  let secciones = ["S1", "S2", "S3", "S4"];
  let diasPorSemana = 5;

  for (let seccion of secciones) {
    let etiqueta = document.createElement("div");
    etiqueta.classList.add("etiqueta");
    etiqueta.textContent = seccion;
    tabla.appendChild(etiqueta);

    for (let dia = 1; dia <= diasPorSemana; dia++) {
      let celda = document.createElement("div");
      celda.classList.add("celda");
      celda.dataset.estado = "ninguno";
      celda.textContent = dia;

      celda.addEventListener("click", () => {
        let actual = celda.dataset.estado;
        let siguiente = estados[(estados.indexOf(actual) + 1) % estados.length];
        celda.dataset.estado = siguiente;
        actualizarColor(celda, siguiente);
      });

      tabla.appendChild(celda);
    }
  }

  calendario.appendChild(tabla);

  // Eventos para cambiar de mes
  btnAnterior.addEventListener("click", () => {
    let nuevoMes = (mesIndex - 1 + 12) % 12;
    let nuevoCalendario = generarCalendario(nuevoMes);
    calendario.replaceWith(nuevoCalendario);
  });

  btnSiguiente.addEventListener("click", () => {
    let nuevoMes = (mesIndex + 1) % 12;
    let nuevoCalendario = generarCalendario(nuevoMes);
    calendario.replaceWith(nuevoCalendario);
  });

  return calendario;
}

function actualizarColor(celda, estado) {
  celda.classList.remove("presente", "tarde", "ausente", "ninguno");
  celda.classList.add(estado);
}
