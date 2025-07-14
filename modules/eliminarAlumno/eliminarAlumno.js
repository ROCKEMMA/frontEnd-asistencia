import { cargarCSS } from "../../controles/controlCSS.js";

export function cargarEliminarAlumno() {
  cargarCSS("../modules/eliminarAlumno/eliminarAlumno.css");

  const section = document.createElement("section");
  section.classList.add("config-view");

  const titulo = document.createElement("h2");
  titulo.textContent = "Buscar Alumno";
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

    const verificarUsuario = async () => {
      const email = JSON.parse(localStorage.getItem("usuario")).user.correo;
      const modal = document.createElement("div");
      modal.style.position = "fixed";
      modal.style.top = "0";
      modal.style.left = "0";
      modal.style.width = "100vw";
      modal.style.height = "100vh";
      modal.style.background = "rgba(0,0,0,0.4)";
      modal.style.display = "flex";
      modal.style.alignItems = "center";
      modal.style.justifyContent = "center";
      modal.style.zIndex = "9999";

      const box = document.createElement("div");
      box.style.background = "#fff";
      box.style.padding = "2rem";
      box.style.borderRadius = "8px";
      box.style.boxShadow = "0 2px 8px rgba(0,0,0,0.2)";
      box.innerHTML = `
        <label style="display:block;margin-bottom:8px;">Ingrese su contraseña:</label>
        <input type="password" id="modal-password" style="width:100%;padding:8px;margin-bottom:12px;" autofocus />
        <button id="modal-ok" style="margin-right:8px;">Aceptar</button>
        <button id="modal-cancel">Cancelar</button>
      `;
      modal.appendChild(box);
      document.body.appendChild(modal);

      const getPassword = () =>
        new Promise((resolve) => {
          box.querySelector("#modal-ok").onclick = () => {
        const val = box.querySelector("#modal-password").value;
        document.body.removeChild(modal);
        resolve(val);
          };
          box.querySelector("#modal-cancel").onclick = () => {
        document.body.removeChild(modal);
        resolve(null);
          };
          box.querySelector("#modal-password").onkeydown = (e) => {
        if (e.key === "Enter") box.querySelector("#modal-ok").click();
          };
        });

      const password = await getPassword();
      if (!email || !password) {
        return false;
      }
      try {
        const response = await fetch('https://asistencia.jossuefuentes.space/login', {
          method: 'POST',
          headers: {
        'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (response.ok) {
          return true;
        } else {
          alert("Contraseña incorrecta. Inténtelo de nuevo.");
          return false;
        }
      } catch (error) {
        console.error(error);
        return false;
      }

    }

    btnEliminar.addEventListener("click", async () => {
      try {
        if (!(await verificarUsuario())) {
          return;
        } else {
          console.log('buena contrasena');
        }
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