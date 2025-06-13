import { cargarCSS } from "../../controles/controlCSS.js";

export function moduloAsistencia(nombreDeAsistencia, estado) {
    cargarCSS('../modules/asistencia/asistenciaModulo.css');

    let bloque2 = document.createElement('div');
    bloque2.className = `div-asistencia ${estado}`;

    let texto_asistencia = document.createElement('p');
    texto_asistencia.className = "texto-asisten";
    texto_asistencia.innerText = nombreDeAsistencia;
    bloque2.appendChild(texto_asistencia);

    let divAsistencia = document.createElement('div');
    divAsistencia.className = "div-cuadritos";

    // Estado inicial
    divAsistencia.classList.add(estado ? "AAA" : "BBB");

    // 🟢 Evento para marcar/desmarcar individualmente
    divAsistencia.addEventListener("click", () => {
        divAsistencia.classList.toggle("presente");
        divAsistencia.classList.toggle("ausente");
    });

    bloque2.appendChild(divAsistencia);

    let divUniforme = document.createElement('div');
    divUniforme.className = "div-cuadrito2";
    bloque2.appendChild(divUniforme);

    let imgCorreo = document.createElement('img');
    imgCorreo.src = "../assets/icos/email_ico.svg";
    imgCorreo.className = "img-correo";
    bloque2.appendChild(imgCorreo);

    return bloque2;
}
