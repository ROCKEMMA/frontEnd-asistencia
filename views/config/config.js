import { headerModulo } from "../../modules/header/headerModulo.js";
import { cargarCSS } from "../../controles/controlCSS.js";
import { cargarEliminarAlumno } from "../../modules/eliminarAlumno/eliminarAlumno.js";
import { cargarAgregarUsuario } from "../../modules/agregarUsuiario/agregarUsuarioMoule.js";
import { cargarAgregarGrado } from "../../modules/agregarGrado/agregarGradoModule.js";
import { cargarEstablecerHorari } from "../../modules/establecerHorario/establecerHorarioModule.js";

export function cargarConfigView() {
  cargarCSS("../views/config/config.css");

  const section = document.createElement("section");
  section.classList.add("config-view");

  const botonesDiv = document.createElement("div");
  botonesDiv.classList.add("botones-div");

  const mostrarDiv = document.createElement("div");
  mostrarDiv.classList.add("mostrar-div");

  const mensajeBanner = document.createElement("div");
  mensajeBanner.classList.add("banner-mensaje");
  mensajeBanner.textContent =
    "En esta sección se administra el acceso y configuración de usuarios de la plataforma.";

  mostrarDiv.appendChild(mensajeBanner);
  


  const botonesVistas1 = [
    [
    "Eliminar usuario",
    "Agregar usuario",
    "Agregar grado",
    "Establecer horario",
    ],
    [
      cargarEliminarAlumno(),
      cargarAgregarUsuario(),
      cargarAgregarGrado(),
      cargarEstablecerHorari(),
    ]
  ]

    const botonesVistas2 = [
      ["Eliminar usuario"],
      [cargarEliminarAlumno()],
    ];

  let user = JSON.parse(localStorage.getItem("usuario")).user.tipo_usuario_id;

  let botones = user == 1 ? botonesVistas1 : botonesVistas2;
  // condición aqui

  const [textos, vistas] = botones;

  textos.forEach((texto, index) => {
    const btn = document.createElement("button");
    btn.textContent = texto;

    btn.addEventListener("click", () => {
      mostrarDiv.innerHTML = "";

      const vista = vistas[index];

      if (typeof vista === "function") {
        const resultado = vista();
        if (resultado instanceof HTMLElement) {
          mostrarDiv.appendChild(resultado);
        }
      } else if (vista instanceof HTMLElement) {
        mostrarDiv.appendChild(vista);
      }
    });

  botonesDiv.appendChild(btn);
});

  // Agregar ambos al section
  section.appendChild(botonesDiv);
  section.appendChild(mostrarDiv);

  return section;
}

document.body.appendChild(headerModulo());
document.body.appendChild(cargarConfigView());
