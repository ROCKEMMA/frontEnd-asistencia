import { cargarCSS } from "../../controles/controlCSS.js";

export function moduloAsistencia(nombreDeAsistencia, estado) {
    cargarCSS('../modules/asistencia/asistenciaModulo.css');

    // DIV DEL BLOQUE DE ASISTENCIA 
    let bloque2 = document.createElement('div');
    bloque2.className = `div-asistencia ${estado}`;

    // Texto del bloque de asistencia
    let texto_asistencia = document.createElement('p'); // crear la etiqueta "variable"
    texto_asistencia.className = "texto-asisten"; // nombre que se llama para el css 
    texto_asistencia.innerText = nombreDeAsistencia; // es el contenido que se almacena en el parrafo
    bloque2.appendChild(texto_asistencia);

    // ESTE SUB DIV ES PARA CREAAR LO QUE SON LOS CUADIRTROS 
    let cuadro1 = document.createElement('div');
    cuadro1.className = "div-cuadritos";
    bloque2.appendChild(cuadro1);

    let cuadro2 = document.createElement('div');
    cuadro2.className = "div-cuadrito2";
    bloque2.appendChild(cuadro2);

    let imgCorreo = document.createElement('img');
    imgCorreo.src = "../assets/icos/email_ico.svg";
    imgCorreo.className = "img-correo";
    bloque2.appendChild(imgCorreo);

    return bloque2;
}


