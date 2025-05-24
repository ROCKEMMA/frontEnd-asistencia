import { cargarCSS } from "../../controles/controlCSS.js";

export function moduloCorreo(nombreCorreo, infoCorreo) {
    cargarCSS('../modules/correo/correoModulo.css');

    const bloqueCorreo = document.createElement('div');
    bloqueCorreo.className = "div-correo";

    const textoCorreo = document.createElement('p');
    textoCorreo.className = "texto-correo";
    textoCorreo.innerText = nombreCorreo;
    bloqueCorreo.appendChild(textoCorreo);

    // es ek cuerpo del correo
    const areaTexto = document.createElement('textarea');
    areaTexto.className = "cuerpo-correo";
    areaTexto.placeholder = "Escribe tu mensaje aquí...";
    areaTexto.value = infoCorreo;
    bloqueCorreo.appendChild(areaTexto);

    //  botón del correo
    const botonCorreo = document.createElement('button');
    botonCorreo.className = "boton";
    botonCorreo.innerText = "Enviar correo";
    bloqueCorreo.appendChild(botonCorreo);

    return bloqueCorreo;
}
