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

  // Día de la semana
  const labelDia = document.createElement("label");
  labelDia.textContent = "Día:";
  const selectDia = document.createElement("select");
  selectDia.name = "dia";
  dias.forEach(dia => {
    const option = document.createElement("option");
    option.value = dia;
    option.textContent = dia;
    selectDia.appendChild(option);
  });

  // Hora de inicio
  const labelInicio = document.createElement("label");
  labelInicio.textContent = "Hora de inicio:";
  const inputInicio = document.createElement("input");
  inputInicio.type = "time";
  inputInicio.name = "hora_inicio";

  // Hora de fin
  const labelFin = document.createElement("label");
  labelFin.textContent = "Hora de fin:";
  const inputFin = document.createElement("input");
  inputFin.type = "time";
  inputFin.name = "hora_fin";

  // Botón para agregar
  const btnAgregar = document.createElement("button");
  btnAgregar.type = "button";
  btnAgregar.textContent = "Agregar Horario";

  // Lista de horarios
  const lista = document.createElement("ul");
  lista.className = "lista-horarios";

  // Evento de agregar
  btnAgregar.addEventListener("click", () => {
    const dia = selectDia.value;
    const inicio = inputInicio.value;
    const fin = inputFin.value;

    if (!inicio || !fin) {
      alert("Completa las horas");
      return;
    }

    const item = document.createElement("li");
    item.textContent = `${dia}: ${inicio} - ${fin}`;
    lista.appendChild(item);

    // Limpiar campos
    inputInicio.value = "";
    inputFin.value = "";
  });

  // Agregar al formulario
  form.appendChild(labelDia);
  form.appendChild(selectDia);
  form.appendChild(labelInicio);
  form.appendChild(inputInicio);
  form.appendChild(labelFin);
  form.appendChild(inputFin);
  form.appendChild(btnAgregar);

  div.appendChild(form);
  div.appendChild(lista);

  return div;
}
