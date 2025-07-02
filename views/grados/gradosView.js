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
        const usuario = JSON.parse(localStorage.getItem("usuario"));
        let tipo_usuario = usuario.user.tipo_usuario_id;
        let grado = usuario.user.grado_id;
        let nivel = usuario.user.nivel_id;

        const response = await fetch(`https://asistencia.jossuefuentes.space/grados?tipo_usuario_id=${tipo_usuario}&nivel_id=${nivel}`);
        const data = await response.json();
        console.log("datos:",data);
        
        if (!response.ok) throw new Error(data.message || "Error al cargar grados");

        data.forEach(element => {
            let estado = null;
            sectionGrados.appendChild(moduloGrado(element.id,element.nombre, estado));
        });

    } catch (error) { 
        console.error("Error:", error);
        const errorElement = document.createElement('p');
        errorElement.className = "error";
        errorElement.textContent = "No se pudieron cargar los grados. Intenta más tarde.";
        sectionGrados.appendChild(errorElement);
    }

    return sectionGrados;
}

document.body.appendChild(headerModulo());

cargarGradosView("Grados").then(section => {
    document.body.appendChild(section);
});