import { cargarCSS } from "../../controles/controlCSS.js";
import { headerModulo } from "../../modules/header/headerModulo.js";
import { moduloAsistencia } from "../../modules/asistencia/asistenciaModulo.js";
import { registrarAsistencia } from "../../controles/enviarAsistencia.js";
import { prepararDatosAsistencia } from "../../controles/empaquetarAsistencia.js";
import { verificarAsistencia } from "../../controles/verificarAsistencia.js";

function asistenciaView(){
    cargarCSS("../views/asistencia/asistenciaView.css");

    // HEADER
    document.body.appendChild(headerModulo());

    // ASISTENCIAS VIEW
    let sectionAsistencia = document.createElement('section');
    sectionAsistencia.className = "section-asistencia";

    const grado = JSON.parse(localStorage.getItem("usuario")).sesion.grado_activo;
     
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
            const response = await fetch(`https://asistencia.jossuefuentes.space/alumnos?grado_id=${grado}`);
            const data = await response.json();
            
            let divAlumnos = document.createElement('div');
            divAlumnos.className = "div-alumnos";
            data.forEach(element => {
                divAlumnos.appendChild(moduloAsistencia(element.nombres,element.estado));
            });
            sectionAsistencia.appendChild(divAlumnos);
            
            // -----------------------------------------------------------------------
            let consultaEstadoAsistencia = await verificarAsistencia(grado);
            let estadoAsistencia = consultaEstadoAsistencia.estado_asistencia != 'completado';
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
