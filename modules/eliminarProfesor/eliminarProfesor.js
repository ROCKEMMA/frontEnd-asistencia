import { cargarCSS } from "../../controles/controlCSS.js";

export function cargarEliminarProfesor() {
  cargarCSS("../modules/eliminarProfesor/eliminarProfesor.css");
  
  let moduloEliminarProfesor = document.createElement('div');
  moduloEliminarProfesor.classList.add("config-view");

  let tituloP = document.createElement("h2");
  tituloP.textContent = "Eliminar usuario";
  moduloEliminarProfesor.appendChild(tituloP);

  let inputBuscar = document.createElement("input");
  inputBuscar.type = "text";
  inputBuscar.placeholder = "correo usuario";
  inputBuscar.classList.add("buscador-profesor");
  moduloEliminarProfesor.appendChild(inputBuscar);

  const btnEliminar = document.createElement("button");
  btnEliminar.textContent = "Eliminar usuario";
  btnEliminar.classList.add("btn-eliminar");
  moduloEliminarProfesor.appendChild(btnEliminar);


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
          `https://asistencia.jossuefuentes.space/eliminar-usuario?correo=${encodeURIComponent(
            inputBuscar.value
          )}`,
          {
            method: "DELETE",
          }
        );

        if (res.ok) {
          const resultado = await res.json();
          console.log("✅ usuario eliminado:", resultado);
           alert(`✅ usuario eliminado:${resultado.estado}`);
          location.reload(); // Recarga la página después de la eliminación
        } else {
          const error = await res.json();
          console.error("❌ Error al eliminar:", error);
          alert(`❌ Error al eliminar:${error.estado}`);
        }
      } catch (err) {
        console.error("💥 Error de red al eliminar:", err);
      }
    });

  




  return moduloEliminarProfesor;
}
