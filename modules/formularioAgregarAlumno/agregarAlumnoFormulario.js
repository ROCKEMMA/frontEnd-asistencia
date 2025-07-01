import { cargarCSS } from "../../controles/controlCSS.js";
cargarCSS("../modules/formularioAgregarAlumno/agregarAlumnoFormulario.css");

export function cargarFormularioAgregarAlumno() {
  const overlay = document.createElement("div");
  overlay.classList.add("overlay-formulario");

  const ventana = document.createElement("div");
  ventana.classList.add("ventana-formulario");

  const titulo = document.createElement("h2");
  titulo.textContent = "Agregar Alumno";
  ventana.appendChild(titulo);

  const form = document.createElement("form");
  form.id = "formulario-alumno";

  const campos = [
    { label: "Nombres:", id: "nombres", type: "text" },
    { label: "Apellidos:", id: "apellidos", type: "text" },
    { label: "Correo:", id: "correo", type: "email" },
  ];

  const inputs = {};

  campos.forEach(({ label, id, type }) => {
    const etiqueta = document.createElement("label");
    etiqueta.setAttribute("for", id);
    etiqueta.textContent = label;

    const input = document.createElement("input");
    input.type = type;
    input.id = id;
    input.name = id;
    input.required = true;

    inputs[id] = input;

    form.appendChild(etiqueta);
    form.appendChild(input);
  });

  const contenedorBotones = document.createElement("div");
  contenedorBotones.classList.add("botones-formulario");

  const btnEnviar = document.createElement("button");
  btnEnviar.type = "button"; // Cambiado a botón normal
  btnEnviar.textContent = "Enviar";

  const btnCancelar = document.createElement("button");
  btnCancelar.type = "button";
  btnCancelar.id = "cancelar";
  btnCancelar.textContent = "Cancelar";

  contenedorBotones.appendChild(btnEnviar);
  contenedorBotones.appendChild(btnCancelar);
  form.appendChild(contenedorBotones);
  ventana.appendChild(form);
  overlay.appendChild(ventana);
  document.body.appendChild(overlay);

  // Cancelar: eliminar el modal
  btnCancelar.addEventListener("click", () => {
    overlay.remove();
  });

  // Validar antes de enviar
  btnEnviar.addEventListener("click", async () => {
    const { nombres, apellidos, correo } = inputs;

    if (
      !nombres.value.trim() ||
      !apellidos.value.trim() ||
      !correo.value.trim()
    ) {
      alert("Por favor complete todos los campos antes de enviar.");
      return;
    }

    try {
      const usuario = JSON.parse(localStorage.getItem("usuario"));
      const grado_id = usuario?.sesion?.grado_activo;

      const datos = {
        nombres: nombres.value.trim(),
        apellidos: apellidos.value.trim(),
        correo: correo.value.trim(),
        grado_id,
      };

      const registrarUsuario = await fetch(
        "https://asistencia.jossuefuentes.space/reg-alumno",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datos),
        }
      );

      const resultado = await registrarUsuario.json();

      if (registrarUsuario.ok) {
        alert("Alumno registrado correctamente. ID: " + resultado.alumnoId);
        overlay.remove();
      } else {
        alert("Error: " + resultado.error);
      }
    } catch (error) {
      console.log("Error", error);
      alert("Error al conectar con el servidor.");
    }
  });

  return overlay;
}
