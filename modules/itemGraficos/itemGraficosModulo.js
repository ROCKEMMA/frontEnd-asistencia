export function itemGraficoModulo(valor, colorFondo, nombreGrado) {
    let itemModulo = document.createElement('div');
    itemModulo.style.width = "60px";
    itemModulo.style.height = valor;
    itemModulo.style.borderRadius = "3px 3px 0 0";
    itemModulo.style.background = colorFondo;
    itemModulo.style.position = "relative";
    itemModulo.style.cursor = "pointer";

    let cursorPorcentaje = document.createElement('div');
    cursorPorcentaje.textContent = nombreGrado; 
    cursorPorcentaje.className = 'cursorPorcentaje-barra';

    itemModulo.appendChild(cursorPorcentaje);

    return itemModulo;
}



