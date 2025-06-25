import { cargarCSS } from "../../controles/controlCSS.js";

export async function crearGraficaAsistencia(nombreNivel, porcentajesGrados) {
  cargarCSS("../modules/nivelGrafico/nivelGraficoModulo.css");


  const labels = porcentajesGrados.map((item) => item.grado_nombre);
  const valores = porcentajesGrados.map((item) => Number(item.porcentaje_asistencia));

  let divGrafico = document.createElement("div");
  divGrafico.className = "grafico-general";

  let h2 = document.createElement("h2");
  h2.innerText = nombreNivel;
  divGrafico.appendChild(h2);

  const contenedor = document.createElement("div");
  contenedor.style.width = "100%";
  contenedor.style.height = "100%";
  contenedor.style.position = "relative";

  const canvas = document.createElement("canvas");
  canvas.id = "graficaAsistencia";
  contenedor.appendChild(canvas);

  divGrafico.appendChild(contenedor);

  new Chart(canvas, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "",
          data: valores,
          backgroundColor: "rgba(54, 162, 235, 0.7)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
        },
      },
    },
  });

  return divGrafico;
}
