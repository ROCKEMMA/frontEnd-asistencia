import { cargarCSS } from "../../controles/controlCSS.js";

export function headerModulo(logo, nombreUsuario) {
    cargarCSS('../modules/header/headerModulo.css');

    let header = document.createElement('header');
    header.className = "header";

    let userContainer = document.createElement('div');
    userContainer.className = "user-container";
    header.appendChild(userContainer);

    let imgLogo = document.createElement('img');
    imgLogo.src = logo;
    imgLogo.alt = "Logo usuario";
    imgLogo.className = "user-logo";
    userContainer.appendChild(imgLogo);

    let spanNombre = document.createElement('span');
    spanNombre.textContent = nombreUsuario;
    spanNombre.className = "user-name";
    userContainer.appendChild(spanNombre);


    return header;
}