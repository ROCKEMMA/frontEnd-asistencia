import { cargarCSS } from "../../controles/controlCSS.js";
import { moduloGrado } from "../../modules/grado/gradoModulo.js";

function cargarGradosView(nivel){
    cargarCSS('../views/grados/gradosView.css');

    let sectionGrados = document.createElement('section');
    sectionGrados.className = "section-grados";

    let nombreNivel = document.createElement('h2');
    nombreNivel.className = "nombre-nivel";
    nombreNivel.innerText = nivel;
    sectionGrados.appendChild(nombreNivel);
    
    let grados = [
        { nombre: "IV Computación", estado: true },
        { nombre: "IV Diseño", estado: false },
        { nombre: "IV Biología", estado: null },
        { nombre: "IV Perito", estado: true },
        { nombre: "V Computación", estado: true },
        { nombre: "V Diseño", estado: null },
        { nombre: "V Biología", estado: false },
        { nombre: "V Perito", estado: null },
        { nombre: "VI Perito", estado: true },
        { nombre: "VI Magisterio", estado: false }
    ];

    grados.forEach(element => {
        let estado = element.estado === true ? "completado" : 
             element.estado === false ? "no-completado" : 
             "en-espera";

        sectionGrados.appendChild(moduloGrado(element.nombre,estado));
    });

    return sectionGrados;
}

export { cargarGradosView }
