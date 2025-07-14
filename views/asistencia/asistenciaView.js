import { cargarCSS } from "../../controles/controlCSS.js";
import { headerModulo } from "../../modules/header/headerModulo.js";
import { moduloAsistencia } from "../../modules/asistencia/asistenciaModulo.js";
import { registrarAsistencia } from "../../controles/enviarAsistencia.js";
import { prepararDatosAsistencia } from "../../controles/empaquetarAsistencia.js";
import { verificarAsistencia } from "../../controles/verificarAsistencia.js";
import { cargarFormularioAgregarAlumno } from "../../modules/formularioAgregarAlumno/agregarAlumnoFormulario.js";

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

    const correoAlumnos = [];

    let divCorreoTodos = document.createElement('div');
    divCorreoTodos.style.border = "1px solid #dd7064";
    divCorreoTodos.style.height = '2.5rem';
    divCorreoTodos.innerText = "Enviar correo a seccion"
    divCorreoTodos.addEventListener('click', () => {
        const listaCorreos = correoAlumnos.join(',');
        const subject = encodeURIComponent(`Asunto para la clase`);
        const body = encodeURIComponent(`Hola,\n\nQuiero enviarte este mensaje referente a la clase .`);
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(listaCorreos)}&su=${subject}&body=${body}`;
        window.open(gmailUrl, "_blank");
    });
    sectionAsistencia.appendChild(divCorreoTodos);
    



    let iconoAgregarAlumno = document.createElement('img');
    iconoAgregarAlumno.src = "https://raw.githubusercontent.com/ROCKEMMA/assets/bb82b2d7cc9331ceed368217fa820c282a6b68f5/ico_google/person_add.svg";
    iconoAgregarAlumno.className = "ico-agregarAlumno";
    sectionAsistencia.appendChild(iconoAgregarAlumno);

    iconoAgregarAlumno.addEventListener('click', ()=>{
        sectionAsistencia.appendChild(cargarFormularioAgregarAlumno());
    });

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
                divAlumnos.appendChild(moduloAsistencia(element.nombres,element.correo, element.estado));
                correoAlumnos.push(element.correo);
            });
            sectionAsistencia.appendChild(divAlumnos);

            // codigo para enviar correos a todos
            
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