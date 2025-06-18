import { cargarCSS } from "../../controles/controlCSS.js";
import { proyeccionView } from "../../views/proyección/proyecciónView.js";

export function headerModulo(logo, nombreUsuario) {
    cargarCSS('../modules/header/headerModulo.css');

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    
    let header = document.createElement('header');
    header.className = "header";

    // Botón de menú
    let menuBtn = document.createElement('button');
    menuBtn.innerHTML = "☰";
    menuBtn.className = "menu-btn";
    header.appendChild(menuBtn);

    // Menú desplegable lateral
    let sidebar = document.createElement('div');
    sidebar.className = "sidebar";
    sidebar.innerHTML = `
        <ul class="sidebar-menu">
            <li><a href="#">Inicio</a></li>
            <li><a href="#">Perfil</a></li>
            <li><a href="#">Configuración</a></li>
            <li><a href="proyecciones.html">Proyección</a></li>
        </ul>
        <button class="logout-btn logout-sidebar-btn">Salir</button>
    `;
    document.body.appendChild(sidebar);

    // Evento para cerrar sesión desde botón dentro del menú
    sidebar.querySelector('.logout-sidebar-btn').addEventListener("click", () => {
        localStorage.removeItem("usuario");
        window.location.href = "../index.html";
    });

    // Mostrar/Ocultar menú
    menuBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        sidebar.classList.toggle("open");
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener("click", (event) => {
        const esClickDentroDelSidebar = sidebar.contains(event.target);
        const esClickEnMenuBtn = menuBtn.contains(event.target);

        if (!esClickDentroDelSidebar && !esClickEnMenuBtn) {
            sidebar.classList.remove("open");
        }
    });

    // Contenedor usuario
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

    return header;
}
