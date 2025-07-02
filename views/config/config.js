import { headerModulo } from "../../modules/header/headerModulo.js";
import { cargarCSS } from "../../controles/controlCSS.js";

export function cargarConfigView() {
  cargarCSS("../views/config/config.css");

  const section = document.createElement("section");
  section.classList.add("config-view");

  const titulo = document.createElement("h2");
  titulo.textContent = "Configuración de Alumnos";
  section.appendChild(titulo);

  const inputBuscar = document.createElement("input");
  inputBuscar.type = "text";
  inputBuscar.placeholder = "Buscar alumno por nombre...";
  inputBuscar.classList.add("buscador-alumno");
  section.appendChild(inputBuscar);

  const listaResultados = document.createElement("ul");
  listaResultados.classList.add("lista-alumnos");
  section.appendChild(listaResultados);

  const panelInfo = document.createElement("div");
  panelInfo.classList.add("info-alumno");
  section.appendChild(panelInfo);

  // Almacenar aquí los alumnos
  let listaAlumnos = [];

  async function cargarAlumnos() {
    try {
        const usuario = JSON.parse(localStorage.getItem("usuario"));
        const nivel_id = usuario.user.nivel_id;

      const res = await fetch(
        `https://asistencia.jossuefuentes.space/buscar-alumno?nivel_id=${nivel_id}`
      );
      const data = await res.json();
      listaAlumnos = data;
    } catch (error) {
      console.error("❌ Error al cargar alumnos:", error);
    }
  }

  function mostrarInfoAlumno(alumno) {
    inputBuscar.value = "";
    listaResultados.innerHTML = "";
    panelInfo.innerHTML = "";

    const nombre = document.createElement("p");
    nombre.textContent = `Nombre: ${alumno.nombres} ${alumno.apellidos}`;

    const correo = document.createElement("p");
    correo.textContent = `Correo: ${alumno.correo}`;

    const grado = document.createElement("p");
    grado.textContent = `Grado: ${alumno.grado}`;

    const nivel = document.createElement("p");
    nivel.textContent = `Nivel: ${alumno.nivel}`;

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar Alumno";
    btnEliminar.classList.add("btn-eliminar");

    btnEliminar.addEventListener("click", async () => {
      try {
        const res = await fetch(
          `https://asistencia.jossuefuentes.space/eliminar-alumno?correo=${encodeURIComponent(
            alumno.correo
          )}`,
          {
            method: "DELETE",
          }
        );

        if (res.ok) {
          const resultado = await res.json();
          console.log("✅ Alumno eliminado:", resultado);
          location.reload(); // Recarga la página después de la eliminación
        } else {
          const error = await res.json();
          console.error("❌ Error al eliminar:", error);
        }
      } catch (err) {
        console.error("💥 Error de red al eliminar:", err);
      }
    });


    panelInfo.append(nombre, correo, grado, nivel, btnEliminar);
  }

  inputBuscar.addEventListener("input", () => {
    const filtro = inputBuscar.value.trim().toLowerCase();
    listaResultados.innerHTML = "";

    const resultados = listaAlumnos.filter((alumno) =>
      alumno.nombres.toLowerCase().includes(filtro)
    );

    resultados.forEach((alumno) => {
      const item = document.createElement("li");
      item.textContent = `${alumno.nombres} ${alumno.apellidos}`;
      item.classList.add("item-alumno");

      item.addEventListener("click", () => {
        mostrarInfoAlumno(alumno);
      });

      listaResultados.appendChild(item);
    });
  });

  // Llamar al cargar
  cargarAlumnos();

  return section;
}

document.body.appendChild(headerModulo());
document.body.appendChild(cargarConfigView());
