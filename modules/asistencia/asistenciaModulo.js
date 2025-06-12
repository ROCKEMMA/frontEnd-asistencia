import { cargarCSS } from "../../controles/controlCSS.js";

export function moduloAsistencia(nombreDeAsistencia, estado) {
    cargarCSS('../modules/asistencia/asistenciaModulo.css');

    // DIV DEL BLOQUE DE ASISTENCIA 
    let bloque2 = document.createElement('div');
    bloque2.className = `div-asistencia ${estado}`;

    // Texto del bloque de asistencia
    let texto_asistencia = document.createElement('p');
    texto_asistencia.className = "texto-asisten";
    texto_asistencia.innerText = nombreDeAsistencia;
    bloque2.appendChild(texto_asistencia);

    // ESTE SUB DIV ES PARA CREAAR LO QUE SON LOS CUADIRTROS 
    let divAsistencia = document.createElement('div');
    divAsistencia.className = "div-cuadritos";
    //console.log(estado)
    if(estado){
        divAsistencia.classList.add("AAA");
    }else {
        divAsistencia.classList.add("BBB");
    }
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


