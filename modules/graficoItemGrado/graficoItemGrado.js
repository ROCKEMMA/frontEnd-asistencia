export function cargarItemGraficoGrado(nivel, grado, porcentaje, profesor) {
  let div = document.createElement("div");
  div.style.backgroundColor = "white";
  div.style.padding = "20px";
  div.style.width = "auto";
  div.style.borderRadius = "12px";
  div.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
  div.style.fontFamily = "'Segoe UI', sans-serif";

  // Nivel (ej: "Primaria")
  const nivelLabel = document.createElement("div");
  nivelLabel.textContent = nivel;
  nivelLabel.style.fontSize = "14px";
  nivelLabel.style.color = "#888";

  // Grado (ej: "Quinto")
  const gradoLabel = document.createElement("div");
  gradoLabel.innerHTML = grado.replace(" ", "<br>");
  gradoLabel.style.fontSize = "15px";
  gradoLabel.style.fontWeight = "bold";
  gradoLabel.style.margin = "4px 0 12px";

  // Contenedor de barras
  const barContainer = document.createElement("div");
  barContainer.style.display = "flex";
  barContainer.style.gap = "2px";
  barContainer.style.marginBottom = "8px";

  const totalBarras = 16;
  const barrasLlenas = Math.round(totalBarras * porcentaje);

  for (let i = 0; i < totalBarras; i++) {
    const bar = document.createElement("span");
    bar.style.width = "5px";
    bar.style.height = "20px";
    bar.style.borderRadius = "2px";
    bar.style.backgroundColor = i < barrasLlenas ? "#007bff" : "#d0dbe6";
    barContainer.appendChild(bar);
  }

  // Profesor (pie)
  const footer = document.createElement("div");
  footer.textContent = profesor;
  footer.style.fontSize = "12px";
  footer.style.color = "#666";

  // Ensamblar todo
  div.appendChild(nivelLabel);
  div.appendChild(gradoLabel);
  div.appendChild(barContainer);
  div.appendChild(footer);

  return div;
}
