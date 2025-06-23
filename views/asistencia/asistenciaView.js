import { cargarCSS } from "../../controles/controlCSS.js";
import { headerModulo } from "../../modules/header/headerModulo.js";
import { moduloAsistencia } from "../../modules/asistencia/asistenciaModulo.js";
import { registrarAsistencia } from "../../controles/enviarAsistencia.js";
import { prepararDatosAsistencia } from "../../controles/empaquetarAsistencia.js";
import { verificarAsistencia } from "../../controles/verificarAsistencia.js";

function asistenciaView(){
    cargarCSS("../views/asistencia/asistenciaView.css");

    let sectionAsistencia = document.createElement('section');
    sectionAsistencia.className = "section-asistencia";

    document.body.appendChild(headerModulo("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.TCcYPZkra7mTMPCWre3uagAAAA%26pid%3DApi&f=1&ipt=8f255ef1389d07972910aa50f4f5e2fa0a9cb54dbb3a090d9aa506d50a588d0f","Jossue Fuentes"));
    
    const grado = JSON.parse(localStorage.getItem("gradoActivo"));
    let h2 = document.createElement('h2');
    h2.innerText = grado.nombreGrado;
    sectionAsistencia.appendChild(h2);
     

    let divMarcarTodo = document.createElement('div');
    divMarcarTodo.className = "div-marcar-todo";
    divMarcarTodo.innerText = "Todos presentes"
    sectionAsistencia.appendChild(divMarcarTodo);

    let marcado = false;
    divMarcarTodo.addEventListener("click", () => {
        marcado = !marcado;
        const cuadros = document.querySelectorAll(".div-contenedor .div-asistencia");

        cuadros.forEach(cuadro => {
            cuadro.classList.remove("presente", "ausente");
            cuadro.classList.add(marcado ? "presente" : "ausente");
        });
    });


    async function obtenerAlumnos (){
        try {
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
            
            // -----------------------------------------------------------------------
            let consultaEstadoAsistencia = await verificarAsistencia(grado.gradoId);
            console.log("Mi resultado",consultaEstadoAsistencia);
            let estadoAsistencia = consultaEstadoAsistencia.estado_asistencia != 'completado';
            console.log(estadoAsistencia)
            let textoBoton = estadoAsistencia ? "Tomar Asistencia": "Actualizar";
            let clasebtn = estadoAsistencia ?  "btn-tomar-asistencia": "btn-tomar-asistencia-true";

            let btnTomarAsistencia = document.createElement('div');
            btnTomarAsistencia.className = `btn-tomar-asistencia ${clasebtn}`;
            btnTomarAsistencia.innerText = textoBoton;
            sectionAsistencia.appendChild(btnTomarAsistencia);

            btnTomarAsistencia.addEventListener("click", async () => {
                try {
                    if (estadoAsistencia) {
                        await registrarAsistencia(data);
                    }else {
                        console.log("Asistencia ya pasada");
                    }
                    location.reload();
                } catch (error) {
                    console.error("Error al tomar asistencia:", error);
                }
            });

    
        } catch (error) { 
            console.error("Error:", error);
        }
    }
    obtenerAlumnos();

    return sectionAsistencia;
}

document.body.appendChild(asistenciaView());
