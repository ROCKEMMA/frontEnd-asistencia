import { cargarCSS } from "../../controles/controlCSS.js";
cargarCSS("../modules/formularioAgregarAlumno/agregarAlumnoFormulario.css");

export function cargarFormularioAgregarAlumno() {
  const overlay = document.createElement("div");
  overlay.classList.add("overlay-formulario");

  const ventana = document.createElement("div");
  ventana.classList.add("ventana-formulario");
  ventana.innerHTML = `
        <h2>Agregar Alumno</h2>
        <form id="formulario-alumno">
            <label for="nombres">Nombres:</label>
            <input type="text" id="nombres" name="nombres" required>

            <label for="apellidos">Apellidos:</label>
            <input type="text" id="apellidos" name="apellidos" required>

            <label for="correo">Correo:</label>
            <input type="email" id="correo" name="correo" required>

            <div class="botones-formulario">
                <button type="submit">Enviar</button>
                <button type="button" id="cancelar">Cancelar</button>
            </div>
        </form>
    `;

  // Cerrar ventana al dar click en Cancelar
  ventana.querySelector("#cancelar").addEventListener("click", () => {
    document.body.removeChild(overlay);
  });

  // Manejar envío de formulario
  ventana
    .querySelector("#formulario-alumno")
    .addEventListener("submit", (e) => {
      e.preventDefault();
      const datos = {
        nombres: e.target.nombres.value,
        apellidos: e.target.apellidos.value,
        correo: e.target.correo.value,
      };
      console.log("Formulario enviado:", datos);
      document.body.removeChild(overlay);
    });

  overlay.appendChild(ventana);
  document.body.appendChild(overlay);
}


