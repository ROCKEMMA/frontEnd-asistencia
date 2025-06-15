import { cargarCSS } from "../../controles/controlCSS.js";

export function moduloAsistencia(nombreAlumno, estado) {
    cargarCSS('../modules/asistencia/asistenciaModulo.css');

    let div = document.createElement('div');
    div.className = `div-contenedor ${estado}`;

    let p = document.createElement('p');
    p.className = "texto-asisten";
    p.innerText = nombreAlumno;
    div.appendChild(p);

    let divAsistencia = document.createElement('div');
    divAsistencia.className = "div-asistencia";
    divAsistencia.classList.add(estado ? "presente" : "ausente");

    divAsistencia.addEventListener("click", () => {
        divAsistencia.classList.toggle("presente");
        divAsistencia.classList.toggle("ausente");
    });

    div.appendChild(divAsistencia);

    let divUniforme = document.createElement('div');
    divUniforme.className = "div-cuadrito2";
    div.appendChild(divUniforme);

    let imgCorreo = document.createElement('img');
    imgCorreo.src = "../assets/icos/email_ico.svg";
    imgCorreo.className = "img-correo";
    div.appendChild(imgCorreo);

    return div;
}
