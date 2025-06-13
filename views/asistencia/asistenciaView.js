import { cargarCSS } from "../../controles/controlCSS.js";
import { headerModulo } from "../../modules/header/headerModulo.js";
import { moduloAsistencia } from "../../modules/asistencia/asistenciaModulo.js";

function asistenciaView(estadoAsistencia){
    cargarCSS("../views/asistencia/asistenciaView.css");

    let sectionAsistencia = document.createElement('section');
    sectionAsistencia.className = "section-asistencia";

    document.body.appendChild(headerModulo("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.TCcYPZkra7mTMPCWre3uagAAAA%26pid%3DApi&f=1&ipt=8f255ef1389d07972910aa50f4f5e2fa0a9cb54dbb3a090d9aa506d50a588d0f","Jossue Fuentes"));

    let h2 = document.createElement('h2');
    h2.innerText = "Nombre del grado";
    sectionAsistencia.appendChild(h2);

    let divMarcarTodo = document.createElement('div');
    divMarcarTodo.className = "div-marcar-todo";
    sectionAsistencia.appendChild(divMarcarTodo);

    let marcado = false;

    divMarcarTodo.addEventListener("click", () => {
        marcado = !marcado;
        const cuadros = document.querySelectorAll(".div-asistencia .div-cuadritos");

        cuadros.forEach(cuadro => {
            cuadro.classList.remove("presente", "ausente");
            cuadro.classList.add(marcado ? "presente" : "ausente");
        });
    });


    async function obtenerAlumnos (){
        try {
            const grado = JSON.parse(localStorage.getItem("gradoActivo"));
    
            const response = await fetch(`https://asistencia.jossuefuentes.space/alumnos?grado_id=${grado.gradoId}`);
            const data = await response.json();
            console.log(data);
            
            let divAlumnos = document.createElement('div');
            divAlumnos.className = "div-alumnos";
            data.forEach(element => {
                divAlumnos.appendChild(moduloAsistencia(element.nombres,element.estado));
                console.log(element.estado);
            });
            sectionAsistencia.appendChild(divAlumnos);
            
            // BOTÓN ACTUALIZAR O MARCAR ASISTENCIA
            // Evaluar si se toma la asistencia por primera vez o actualización
            let textoBoton = estadoAsistencia ? "Actualizar" :"Tomar Asistencia";
            let clasebtn = estadoAsistencia ?  "btn-tomar-asistencia-true":"btn-tomar-asistencia";

            let btnTomarAsistencia = document.createElement('div');
            btnTomarAsistencia.className = `btn-tomar-asistencia ${clasebtn}`;
            btnTomarAsistencia.innerText = textoBoton;
            sectionAsistencia.appendChild(btnTomarAsistencia);

        
        } catch (error) { 
            console.error("Error:", error);
        }
    }
    
    obtenerAlumnos();

    return sectionAsistencia;
}

let baseDeDatos = true;

document.body.appendChild(asistenciaView(baseDeDatos));
