import { cargarCSS } from "../../controles/controlCSS.js";
import { headerModulo } from "../../modules/header/headerModulo.js";
import { moduloAsistencia } from "../../modules/asistencia/asistenciaModulo.js";

function asistenciaView(estadoAsistencia){
    cargarCSS("../views/asistencia/asistenciaView.css");

    let sectionAsistencia = document.createElement('section');
    sectionAsistencia.className = "section-asistencia";

    document.body.appendChild(headerModulo("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.TCcYPZkra7mTMPCWre3uagAAAA%26pid%3DApi&f=1&ipt=8f255ef1389d07972910aa50f4f5e2fa0a9cb54dbb3a090d9aa506d50a588d0f","Jossue Fuentes"));

    let h2 = document.createElement('h2');
    h2.innerText = "Marcar todo el grado";
    sectionAsistencia.appendChild(h2);

    let divMarcarTodo = document.createElement('div');
    divMarcarTodo.className = "div-marcar-todo";
    sectionAsistencia.appendChild(divMarcarTodo);

    const listaAlumnos = [
        {
            nombre: "Juan Carlos Pérez López",
            estado: true
        },
        {
            nombre: "María Fernanda García Ruiz",
            estado: false
        },
        {
            nombre: "José Antonio Martínez",
            estado: true
        },
        {
            nombre: "Ana Patricia Rodríguez Díaz",
            estado: false
        },
        {
            nombre: "Luis Alberto González",
            estado: true
        }
    ];

    // Caja que contiene a todos los alumos de la base de datos
    let divAlumnos = document.createElement('div');
    divAlumnos.className = "div-alumnos";
    listaAlumnos.forEach(element => {
        divAlumnos.appendChild(moduloAsistencia(element.nombre,element.estado));
    });
    sectionAsistencia.appendChild(divAlumnos);

    // Evaluar si se toma la asistencia por primera vez o actualización
    let textoBoton = estadoAsistencia ? "Actualizar" :"Tomar Asistencia";
    let clasebtn = estadoAsistencia ?  "btn-tomar-asistencia-true":"btn-tomar-asistencia";

    let btnTomarAsistencia = document.createElement('div');
    btnTomarAsistencia.className = `btn-tomar-asistencia ${clasebtn}`;
    btnTomarAsistencia.innerText = textoBoton;
    sectionAsistencia.appendChild(btnTomarAsistencia);

    return sectionAsistencia;
}

let baseDeDatos = true;

document.body.appendChild(asistenciaView(baseDeDatos));