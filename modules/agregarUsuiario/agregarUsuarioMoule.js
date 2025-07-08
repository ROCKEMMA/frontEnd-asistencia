import { cargarCSS } from "../../controles/controlCSS.js";
cargarCSS("../modules/agregarUsuiario/agregarUsuarioMoule.css");

export function cargarAgregarUsuario() {
  const overlay = document.createElement("div");
  overlay.classList.add("overlay-formulario");

  const ventana = document.createElement("div");
  ventana.classList.add("ventana-formulario");

  const titulo = document.createElement("h2");
  titulo.textContent = "Agregar Profesor";
  ventana.appendChild(titulo);

  const form = document.createElement("form");
  form.id = "formulario-profesor";

  const campos = [
    { label: "Nombre:", id: "nombre", type: "text" },
    { label: "Apellido:", id: "apellido", type: "text" },
    { label: "Correo:", id: "correo", type: "email" },
    { label: "Contraseña:", id: "contraseña", type: "password" },
    { label: "Link de Imagen:", id: "link_img", type: "url" },
    { label: "ID Tipo Usuario:", id: "tipo_usuario_id", type: "number" },
    { label: "ID Grado:", id: "grado_id", type: "number" },
    { label: "ID Nivel:", id: "nivel_id", type: "number" },
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
    input.style.fontSize = "16px";

    inputs[id] = input;

    form.appendChild(etiqueta);
    form.appendChild(input);
  });

  const contenedorBotones = document.createElement("div");
  contenedorBotones.classList.add("botones-formulario");

  const btnEnviar = document.createElement("button");
  btnEnviar.type = "button";
  btnEnviar.textContent = "Registrar";
  contenedorBotones.appendChild(btnEnviar);

  const btnCancelar = document.createElement("button");
  btnCancelar.type = "button";
  btnCancelar.id = "cancelar";
  btnCancelar.textContent = "Cancelar";
  contenedorBotones.appendChild(btnCancelar);

  form.appendChild(contenedorBotones);
  ventana.appendChild(form);
  overlay.appendChild(ventana);

  // Cancelar
  btnCancelar.addEventListener("click", () => {
    console.log("❎ Modal cancelado");
    overlay.remove();
  });

  // Enviar
  btnEnviar.addEventListener("click", async () => {
    const datos = {};
    for (let key in inputs) {
      datos[key] = inputs[key].value.trim();
    }

    // Validación básica
    for (let key in datos) {
      if (datos[key] === "") {
        alert(`El campo "${key}" está vacío.`);
        return;
      }
    }

    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correoValido.test(datos.correo)) {
      alert("Correo inválido");
      return;
    }

    // Convertir a número los ID
    datos.tipo_usuario_id = parseInt(datos.tipo_usuario_id);
    datos.grado_id = parseInt(datos.grado_id);
    datos.nivel_id = parseInt(datos.nivel_id);

    try {
      console.log("📤 Datos enviados:", datos);
      overlay.remove();

      const res = await fetch("https://asistencia.jossuefuentes.space/reg-profesor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });

      const result = await res.json();
      console.log("✅ Respuesta del servidor:", result);
    } catch (error) {
      console.error("💥 Error de red o JSON:", error);
    }
  });

  return overlay;
}
