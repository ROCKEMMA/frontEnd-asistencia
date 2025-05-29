import { cargarCSS } from "../../controles/controlCSS.js";

export function itemModulo(nombreInforme, correoEstado) {

    cargarCSS("../modules/informe/itemInformeModulo.css");

    let itemInfor = document.createElement('div');
    itemInfor.className = `div-item ${correoEstado}`;

    let textoInforme = document.createElement('p');
    textoInforme.className = "texto-item";
    textoInforme.innerText = nombreInforme;
    itemInfor.appendChild(textoInforme);

    let contenedor = document.createElement('img');
    contenedor.className = 'icono';
    contenedor.src = '../../assets/icos/email_ico.svg';
    itemInfor.appendChild(contenedor);

    let camisa = document.createElement('img');
    camisa.className = 'icono-camisa';
    camisa.src = '../../assets/icos/camisa.svg';
    itemInfor.appendChild(camisa);

    // Evento para selección única: solo este elemento queda verde al hacer clic
    itemInfor.addEventListener('click', () => {
        document.querySelectorAll('.div-item.a').forEach(el => el.classList.remove('a'));

        // Agregar la clase .a solo al elemento clickeado
        itemInfor.classList.add('a');
    });

    console.log("cargado");
    return itemInfor;
}
