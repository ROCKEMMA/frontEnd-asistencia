
import { cargarCSS } from "../../controles/controlCSS.js";
cargarCSS("../modules/establecerHorario/establecerHorarioModule.css");

export function cargarEstablecerHorari() {
  const div = document.createElement('div');
  div.classList.add('contenedor-horarios');

  const titulo = document.createElement('h2');
  titulo.textContent = "Establecer Horarios Reiterados";
  div.appendChild(titulo);

  const form = document.createElement("form");
  form.className = "formulario-horario";

  const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

  // Hora de inicio
  const labelInicio = document.createElement("label");
  labelInicio.textContent = "Hora de entrada:";
  const inputInicio = document.createElement("input");
  inputInicio.type = "time";
  inputInicio.name = "hora_entrada";

  // Hora de fin
  const labelFin = document.createElement("label");
  labelFin.textContent = "Hora tarde:";
  const inputFin = document.createElement("input");
  inputFin.type = "time";
  inputFin.name = "hora_tarde";

  // Botón para agregar
  const btnAgregar = document.createElement("button");
  btnAgregar.type = "button";
  btnAgregar.textContent = "Agregar Horario";

  // Lista de horarios
  

  // Evento de agregar
  btnAgregar.addEventListener("click", async () => {
    const inicio = inputInicio.value;
    const fin = inputFin.value;
    if (inicio && fin) {
      try {
      const datos = {
        hora_entrada: inicio,
        hora_tarde: fin,
      };
       const res = await fetch("https://asistencia.jossuefuentes.space/actualizar-horario", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });

      const result = await res.json();
      console.log("✅ Respuesta del servidor:", result);
      alert("✅ Horario actualizado correctamente");
      }
      catch (error) {
        console.error("💥 Error al actualizar el horario:", error);
      }
    } else {
      alert("Por favor, complete ambos campos de hora.");
    }   
  });

  form.appendChild(labelInicio);
  form.appendChild(inputInicio);
  form.appendChild(labelFin);
  form.appendChild(inputFin);
  form.appendChild(btnAgregar);

  div.appendChild(form);

  return div;
}