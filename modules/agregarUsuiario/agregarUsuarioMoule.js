import { cargarCSS } from "../../controles/controlCSS.js";
cargarCSS("../modules/agregarUsuiario/agregarUsuarioMoule.css");

export function cargarAgregarUsuario() {
  const overlay = document.createElement("div");
  overlay.classList.add("overlay-formulario");

  const ventana = document.createElement("div");
  ventana.classList.add("ventana-formulario");

  const titulo = document.createElement("h2");
  titulo.textContent = "Agregar Usuario";
  ventana.appendChild(titulo);

  const form = document.createElement("form");
  let gradosDisponibles = [];

  const selectGrado = document.createElement("select");
  selectGrado.id = "grado-select";
  selectGrado.name = "grado-select";

  const usuario = JSON.parse(localStorage.getItem("usuario"));
  form.id = "formulario-profesor";
    fetch(
    `https://asistencia.jossuefuentes.space/grados?tipo_usuario_id=1`
  )
    .then((res) => res.json())
    .then((data) => {
      gradosDisponibles = [...data];
      console.log("Grados disponibles:", gradosDisponibles);
      data.forEach((grado) => {
        const option = document.createElement("option");
        option.value = grado.id;
        option.textContent = grado.nombre;
        selectGrado.appendChild(option);
      });
    })
    .catch((err) => {
      console.error("Error al cargar grados:", err);
    });


  const campos = [
    { label: "Nombre:", id: "nombre", type: "text" },
    { label: "Apellido:", id: "apellido", type: "text" },
    { label: "Correo:", id: "correo", type: "email" },
    { label: "Contrasena:", id: "contrasena", type: "password" },
    { label: "Link de Imagen:", id: "link_img", type: "url" },
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
    input.autocomplete = "off";

    inputs[id] = input;

    form.appendChild(etiqueta);
    form.appendChild(input);
  });

  const etiquetaSelectTipoUsuario = document.createElement("label");
  etiquetaSelectTipoUsuario.textContent = "Tipo de Usuario:";
  etiquetaSelectTipoUsuario.setAttribute("for", "tipo_usuario_id");
  etiquetaSelectTipoUsuario.style.fontSize = "16px";

  const selectTipoUsuario = document.createElement("select");
  selectTipoUsuario.id = "tipo_usuario_id";
  selectTipoUsuario.name = "tipo_usuario_id";
  selectTipoUsuario.required = true;

  const opcionesTipoUsuario = [
    { value: 1, text: "Administrador" },
    { value: 2, text: "Coordinador" },
    { value: 3, text: "Profesor" }
  ];

  opcionesTipoUsuario.forEach(({ value, text }) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = text;
    selectTipoUsuario.appendChild(option);
  });

  form.appendChild(etiquetaSelectTipoUsuario);
  form.appendChild(selectTipoUsuario);

  const etiquetaSelectGrado = document.createElement("label");
  etiquetaSelectGrado.textContent = "Seleccionar Grado:";

  


  // select nivel
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

  form.appendChild(etiquetaSelectGrado);
  etiquetaSelectGrado.setAttribute("for", "grado-select");
  etiquetaSelectGrado.style.fontSize = "16px";
  form.appendChild(selectGrado);

  selectTipoUsuario.addEventListener("change", () => {
    const tipoUsuario = parseInt(selectTipoUsuario.value);

    if (tipoUsuario === 1) { // Administrador
      selectNivel.disabled = true;
      selectGrado.disabled = true;
    } else if (tipoUsuario === 2) { // Coordinador
      selectNivel.disabled = false;
      selectGrado.disabled = true;
    } else if (tipoUsuario === 3) { // Profesor
      selectNivel.disabled = true;
      selectGrado.disabled = false;
    }
  });

  // Inicializar el estado al cargar
  selectTipoUsuario.dispatchEvent(new Event("change"));

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

    datos.grado_id = selectGrado.value;
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
    datos.tipo_usuario_id = parseInt(selectTipoUsuario.value);
    if (datos.tipo_usuario_id === 2) {
      // Coordinador
      datos.nivel_id = parseInt(selectNivel.value);
      datos.grado_id = null; // No aplica para coordinadores
    } else if (datos.tipo_usuario_id === 3) {
      // Profesor
      // Buscar el nivel_id correspondiente al grado_id seleccionado
      const gradoSeleccionado = gradosDisponibles.find(g => g.id == datos.grado_id);
      datos.nivel_id = gradoSeleccionado ? gradoSeleccionado.nivel_id : null;
    } else {
      // Administrador
      datos.nivel_id = null; // No aplica para administradores
      datos.grado_id = null; // No aplica para administradores
    }                                                 
    //datos.grado_id = parseInt(datos.grado_id);
    //datos.nivel_id = parseInt(selectNivel.value);

    try {
      console.log("📤 Datos enviados:", datos);
      overlay.remove();
      console.log('datos', datos);

      const res = await fetch("https://asistencia.jossuefuentes.space/registrar-usuario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      }); 
      if (!res.ok) {
        throw new Error(`Error en la respuesta del servidor: ${res.status}`);
      }
      const result = await res.json();
      if (result.error) {
        throw new Error(`Error del servidor: ${result.error}`);
      }
      console.log("✅ Usuario registrado exitosamente:", result);
      //alert("Usuario registrado exitosamente");
      // Aquí podrías redirigir o actualizar la UI según sea necesario
      console.log("✅ Respuesta del servidor:", result);
    } catch (error) {
      console.error("💥 Error de red o JSON:", error);
    }
  });

  return overlay;
}
