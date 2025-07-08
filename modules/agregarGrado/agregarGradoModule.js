import { cargarCSS } from "../../controles/controlCSS.js";
cargarCSS("../modules/agregarGrado/agregarGradoModule.css");

export function cargarAgregarGrado() {
  const overlay = document.createElement("div");
  overlay.className = "overlay-formulario";

  const ventana = document.createElement("div");
  ventana.className = "ventana-formulario";

  const titulo = document.createElement("h2");
  titulo.textContent = "Agregar Grado";
  ventana.appendChild(titulo);

  const form = document.createElement("form");
  form.id = "formulario-grado";

  const etiquetaSelectNivel = document.createElement("label");
  etiquetaSelectNivel.textContent = "Seleccionar Nivel:";
  etiquetaSelectNivel.setAttribute("for", "nivel-select");
  etiquetaSelectNivel.style.fontSize = "16px";
  const selectNivel = document.createElement("select");
  selectNivel.id = "nivel-select";
  selectNivel.name = "nivel-select";
  const opcionesNivel = [
    { value: 1, text: "Pre-kinder, nursery" },
    { value: 2, text: "Pre-primaria" },
    { value: 3, text: "Primaria" },
    { value: 4, text: "Basicos" },
    { value: 5, text: "Diversificado" },
  ];

  opcionesNivel.forEach(({ value, text }) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = text;
    selectNivel.appendChild(option);
  });

  form.appendChild(etiquetaSelectNivel);
  form.appendChild(selectNivel);

  // Campo: Nombre del grado
  const label = document.createElement("label");
  label.setAttribute("for", "nombre_grado");
  label.textContent = "Nombre del grado:";

  const input = document.createElement("input");
  input.type = "text";
  input.id = "nombre_grado";
  input.name = "nombre_grado";
  input.required = true;
  input.style.fontSize = "16px";

  form.appendChild(label);
  form.appendChild(input);

  // Contenedor de botones
  const contenedorBotones = document.createElement("div");
  contenedorBotones.className = "botones-formulario";

  const btnEnviar = document.createElement("button");
  btnEnviar.type = "button";
  btnEnviar.textContent = "Registrar";
  contenedorBotones.appendChild(btnEnviar);

  const btnCancelar = document.createElement("button");
  btnCancelar.type = "button";
  btnCancelar.textContent = "Cancelar";
  btnCancelar.id = "cancelar";
  contenedorBotones.appendChild(btnCancelar);

  form.appendChild(contenedorBotones);
  ventana.appendChild(form);
  overlay.appendChild(ventana);

  // Cancelar
  btnCancelar.addEventListener("click", () => {
    overlay.remove();
  });

  // Enviar
  btnEnviar.addEventListener("click", async () => {
    const nombre = input.value.trim();
    if (!nombre) {
      alert("⚠️ El campo está vacío");
      return;
    }

    const datos = { nombre, nivel_id: parseInt(selectNivel.value) };
    console.log("📤 Datos a enviar:", datos);
    try {
      console.log("📤 Enviando grado:", datos);
      overlay.remove();

      const res = await fetch("https://asistencia.jossuefuentes.space/agregar-grado", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });

      const result = await res.json();
      console.log("✅ Respuesta del servidor:", result);
    } catch (error) {
      console.error("💥 Error al registrar grado:", error);
    }
  });

  return overlay;
}