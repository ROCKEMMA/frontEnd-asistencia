import { cargarCSS } from "../../controles/controlCSS.js";

export function headerModulo() {
  cargarCSS("../modules/header/headerModulo.css");

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  // Crear header
  const header = document.createElement("header");
  header.className = "header";

  // Botón menú
  const menuBtn = document.createElement("button");
  menuBtn.className = "menu-btn";
  menuBtn.textContent = "≡";
  header.appendChild(menuBtn);

  // Título header
  if(usuario.sesion.grado_activo!=""){
    const spanNombre = document.createElement("span");
    spanNombre.className = "user-name";
    spanNombre.textContent = usuario.sesion.nombre_grado_activo;
    header.appendChild(spanNombre);
  }else {
    const spanNombre = document.createElement("span");
    spanNombre.className = "user-name";
    spanNombre.textContent = usuario.user.nombre;
    header.appendChild(spanNombre);
  }


  // Imagen de usuario
  const imgLogo = document.createElement("img");
  imgLogo.src = "../assets/icos/perfil.svg";
  imgLogo.alt = "Logo usuario";
  imgLogo.className = "user-logo";
  header.appendChild(imgLogo);

  // Crear sidebar
  const sidebar = document.createElement("div");
  sidebar.className = "sidebar";

  const ulMenu = document.createElement("ul");
  ulMenu.className = "sidebar-menu";

  const items = [
    { icon: "☐", text: "Inicio", href: "dasboar.html" },
    { icon: "➤", text: "Perfil", href: "#" },
    { icon: "⚙", text: "Configuración", href: "#" },
    { icon: "☷", text: "Proyección", href: "proyecciones.html" },
  ];

  items.forEach(({ icon, text, href }) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = href;
    a.textContent = `${icon} ${text}`;
    li.appendChild(a);
    ulMenu.appendChild(li);
  });

  // Submenú de grados (carga dinámica)
  const gradosLi = document.createElement("li");
  gradosLi.className = "submenu";

  const gradosToggle = document.createElement("span");
  gradosToggle.className = "submenu-toggle";
  gradosToggle.textContent = "➤ Grados";
  gradosLi.appendChild(gradosToggle);

  const gradosList = document.createElement("ul");
  gradosList.className = "submenu-list";

  // Cargar grados desde API
  fetch(
    `https://asistencia.jossuefuentes.space/grados?tipo_usuario_id=${usuario.user.tipo_usuario_id}&nivel_id=${usuario.user.nivel_id}`
  )
    .then((res) => res.json())
    .then((data) => {
      data.forEach((grado) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = "#";
        a.textContent = grado.nombre;

        a.addEventListener("click", () => {
          // Actualizar usuario con grado seleccionado
          const usuario = JSON.parse(localStorage.getItem("usuario"));
          usuario.grado_proyeccion_activo_id = grado.id;
          localStorage.setItem("usuario", JSON.stringify(usuario));

          // Redirigir a proyeccionGrado.html
          window.location.href = "proyeccionGrado.html";
        });

        li.appendChild(a);
        gradosList.appendChild(li);
      });
    })
    .catch((err) => {
      console.error("Error al cargar grados:", err);
    });

  gradosLi.appendChild(gradosList);
  ulMenu.appendChild(gradosLi);
  sidebar.appendChild(ulMenu);

  // Botón cerrar sesión
  const logoutBtn = document.createElement("button");
  logoutBtn.className = "logout-btn logout-sidebar-btn";
  logoutBtn.textContent = "Salir";
  sidebar.appendChild(logoutBtn);

  // Eventos
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("usuario");
    window.location.href = "../index.html";
  });

  menuBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    sidebar.classList.toggle("open");
  });

  document.addEventListener("click", (event) => {
    const clickDentroSidebar = sidebar.contains(event.target);
    const clickMenuBtn = menuBtn.contains(event.target);
    if (!clickDentroSidebar && !clickMenuBtn) {
      sidebar.classList.remove("open");
    }
  });

  gradosToggle.addEventListener("click", () => {
    gradosList.classList.toggle("open");
  });

  document.body.appendChild(sidebar);
  return header;
}
