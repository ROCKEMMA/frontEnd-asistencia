import { headerModulo } from "../../modules/header/headerModulo.js";
import { moduloGrado } from "../../modules/grado/gradoModulo.js";
import { cargarCSS } from "../../controles/controlCSS.js";


async function cargarGradosView(nivel) {
    cargarCSS('../views/grados/gradosView.css');

    let sectionGrados = document.createElement('section');
    sectionGrados.className = "section-grados";

    let nombreNivel = document.createElement('h2');
    nombreNivel.className = "nombre-nivel";
    nombreNivel.innerText = nivel;
    sectionGrados.appendChild(nombreNivel);
    
    try {
        const response = await fetch("https://asistencia.jossuefuentes.space/grados");
        const data = await response.json();
        
        if (!response.ok) throw new Error(data.message || "Error al cargar grados");

        data.forEach(element => {
/*             let estado = element.estado === true ? "completado" : 
                 element.estado === false ? "no-completado" : 
                 "en-espera"; */
            let estado = null;

            sectionGrados.appendChild(moduloGrado(element.nombre, estado));
        });

    } catch (error) {
        console.error("Error:", error);
        // Mostrar mensaje de error en la UI
        const errorElement = document.createElement('p');
        errorElement.className = "error";
        errorElement.textContent = "No se pudieron cargar los grados. Intenta más tarde.";
        sectionGrados.appendChild(errorElement);
    }

    return sectionGrados;
}

document.body.appendChild(headerModulo("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.TCcYPZkra7mTMPCWre3uagAAAA%26pid%3DApi&f=1&ipt=8f255ef1389d07972910aa50f4f5e2fa0a9cb54dbb3a090d9aa506d50a588d0f","Jossue Fuentes"));
cargarGradosView("Grados").then(section => {
    document.body.appendChild(section);
});