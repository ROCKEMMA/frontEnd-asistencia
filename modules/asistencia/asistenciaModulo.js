import { cargarCSS } from "../../controles/controlCSS.js";
import { abrirModalUniforme } from "../uniforme/uniformeModulo.js";

export function moduloAsistencia(nombreAlumno, estado) {
  cargarCSS("../modules/asistencia/asistenciaModulo.css");

  let div = document.createElement("div");
  div.className = `div-contenedor ${estado}`;

  let p = document.createElement("p");
  p.className = "texto-asisten";
  p.innerText = nombreAlumno;
  div.appendChild(p);

  // -------------------------------------------------------------
  let divAsistencia = document.createElement("div");
  divAsistencia.className = "div-asistencia";
  divAsistencia.classList.add(estado ? "presente" : "ausente");

  divAsistencia.addEventListener("click", () => {
    if (divAsistencia.classList.contains("presente")) {
      divAsistencia.classList.replace("presente", "ausente");
    } else {
      divAsistencia.classList.replace("ausente", "presente");
    }
  });

  div.appendChild(divAsistencia);
  // -------------------------------------------------------------

  let divUniforme = document.createElement("div");
  divUniforme.className = "div-cuadrito2";
  divUniforme.classList.add(estado ? "conObservacion" : "sinObservacion");

  divUniforme.addEventListener("click", () => {
    if (divUniforme.classList.contains("conObservacion")) {
      divUniforme.classList.replace("conObservacion", "sinObservacion");
    } else {
      divUniforme.classList.replace("sinObservacion", "conObservacion");
    }

    abrirModalUniforme(nombreAlumno, "/api/uniforme");
  });
  div.appendChild(divUniforme);
  // -------------------------------------------------------------

  let imgCorreo = document.createElement("img");
  imgCorreo.src = "../assets/icos/email_ico.svg";
  imgCorreo.className = "img-correo";

  imgCorreo.addEventListener("click", () => {
    const subject = encodeURIComponent(`Asunto para ${nombreAlumno}`);
    const body = encodeURIComponent(`Hola,\n\nQuiero enviarte este mensaje referente a ${nombreAlumno}.`);

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=&su=${subject}&body=${body}`;
    window.open(gmailUrl, "_blank");
  });

  div.appendChild(imgCorreo);

  return div;
}
