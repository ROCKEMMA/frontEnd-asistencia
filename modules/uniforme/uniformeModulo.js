import { cargarCSS } from "../../controles/controlCSS.js";

export function moduloUniforme(nombreUniforme) {
    cargarCSS('../modules/uniforme/uniformeModulo.css');

    let bloqueUniforme = document.createElement('div');
    bloqueUniforme.className = "div-uniforme";

    let textoUniforme = document.createElement('p');
    textoUniforme.className = "texto-uniforme";
    textoUniforme.innerText = nombreUniforme;
    bloqueUniforme.appendChild(textoUniforme);

    // Contenedor de imágenes SVG
    let divImagenes = document.createElement('div');
    divImagenes.className = "imagenes-uniforme";
    bloqueUniforme.appendChild(divImagenes);

    // Imagen 1
    let img1 = document.createElement('img');
    img1.src = "../../assets/icos/camisa_ico.jpg"; // Cambia según el nombre de tu archivo
    img1.className = "icono-uniforme";
    divImagenes.appendChild(img1);

    // Imagen 2
    let img2 = document.createElement('img');
    img2.src = "../../assets/icos/sueter_ico.png";
    img2.className = "icono-uniforme";
    divImagenes.appendChild(img2);

    // Imagen 3
    let img3 = document.createElement('img');
    img3.src = "../../assets/icos/pantalon_ico.png";
    img3.className = "icono-uniforme";
    divImagenes.appendChild(img3);

    // Imagen 4
    let img4 = document.createElement('img');
    img4.src = "../../assets/icos/zapato_ico.png";
    img4.className = "icono-uniforme";
    divImagenes.appendChild(img4);

    let informacion = document.createElement('textarea');
    informacion.className = "cuerpo-uniforme";
    informacion.placeholder = "Escribe tu mensaje aquí...";
    bloqueUniforme.appendChild(informacion);

    let botonRegistro = document.createElement('button');
    botonRegistro.className = "boton1";
    botonRegistro.innerText = " Registrar";
    bloqueUniforme.appendChild(botonRegistro);

    let botonEnviarCorreo = document.createElement('button');
    botonEnviarCorreo.className = "boton2";
    botonEnviarCorreo.innerText = "Enviar correo";
    bloqueUniforme.appendChild(botonEnviarCorreo);

    document.body.appendChild(bloqueUniforme);
}
