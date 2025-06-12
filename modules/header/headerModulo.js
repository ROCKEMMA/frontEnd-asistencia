import { cargarCSS } from "../../controles/controlCSS.js";

export function headerModulo(logo, nombreUsuario) {
    cargarCSS('../modules/header/headerModulo.css');

    const usuario = JSON.parse(localStorage.getItem("usuario"));

    let header = document.createElement('header');
    header.className = "header";

    let userContainer = document.createElement('div');
    userContainer.className = "user-container";
    header.appendChild(userContainer);

    let imgLogo = document.createElement('img');
    imgLogo.src = usuario.user.link_img;
    imgLogo.alt = "Logo usuario";
    imgLogo.className = "user-logo";
    userContainer.appendChild(imgLogo);

    let spanNombre = document.createElement('span');
    spanNombre.textContent = usuario.user.nombre;
    spanNombre.className = "user-name";
    userContainer.appendChild(spanNombre);

    let logoutBtn = document.createElement('button');
    logoutBtn.textContent = "Salir";
    logoutBtn.className = "logout-btn";
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("usuario");
        window.location.href = "../index.html";
    });
    header.appendChild(logoutBtn);

    return header;
}
