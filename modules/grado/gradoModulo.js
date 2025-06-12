import { cargarCSS } from "../../controles/controlCSS.js";

export function moduloGrado(gradoId,nombreGrado,estado){
    cargarCSS('../modules/grado/gradoModulo.css');

    //div del bloque grado
    let blque1 = document.createElement('div');
    blque1.className = `div-grado ${estado}`;


    //texto del bloque grado 
    let texto1 = document.createElement('p');
    texto1.className = "texto-inicio";
    texto1.innerText = nombreGrado;
    blque1.appendChild(texto1);

    blque1.addEventListener("click",()=>{
        localStorage.setItem("gradoActivo",JSON.stringify({gradoId: gradoId}))       
        const usuario = JSON.parse(localStorage.getItem("gradoActivo"));
        console.log(usuario);
        setTimeout(() => {
            window.location.href = "./asistencia.html";
        }, 100);
    });

    //retornar mi modulo
    return blque1;
}
